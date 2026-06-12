import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

base = Path(r"c:\Users\manog\OneDrive\Desktop\Pmegp Dpr Generater\PMEGP-DPR-Generator---Desktop-Application")
xlsx = base / "audit-output" / "DPRPACKAGE.xlsx"
out = base / "DPRPACKAGE-AUDIT"
out.mkdir(exist_ok=True)

NS = {
    "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"


def cell_to_rowcol(cell):
    letters = "".join(ch for ch in cell if ch.isalpha())
    nums = "".join(ch for ch in cell if ch.isdigit())
    col = 0
    for ch in letters:
        col = col * 26 + ord(ch.upper()) - 64
    return int(nums), col


def rowcol_to_cell(row, col):
    name = ""
    while col:
        col, rem = divmod(col - 1, 26)
        name = chr(65 + rem) + name
    return f"{name}{row}"


def text_of_node(node):
    if node is None:
        return ""
    return "".join(t.text or "" for t in node.findall(".//m:t", NS))


def parse_cell(c, sheet_name):
    ref = c.attrib.get("r")
    if not ref:
        return None
    rr, cc = cell_to_rowcol(ref)
    t = c.attrib.get("t")
    f = c.find("m:f", NS)
    v = c.find("m:v", NS)
    is_ = c.find("m:is", NS)

    value = ""
    if t == "inlineStr" and is_ is not None:
        value = text_of_node(is_)
    elif t == "s" and v is not None:
        # Shared strings are handled by the caller when possible.
        value = v.text or ""
    elif v is not None:
        value = v.text or ""
    elif is_ is not None:
        value = text_of_node(is_)

    formula = f.text or "" if f is not None else ""
    return {
        "sheet": sheet_name,
        "row": rr,
        "col": cc,
        "cell": ref,
        "type": t or "number/text",
        "value": value,
        "formula": formula,
    }


def load_shared_strings(z):
    try:
        root = ET.fromstring(z.read("xl/sharedStrings.xml"))
    except KeyError:
        return {}
    strings = []
    for si in root.findall("m:si", NS):
        strings.append(text_of_node(si))
    return {i: s for i, s in enumerate(strings)}


def load_styles(z):
    try:
        root = ET.fromstring(z.read("xl/styles.xml"))
    except KeyError:
        return {}
    styles = {}
    for idx, cell_xf in enumerate(root.findall(".//m:cellXfs/m:xf", NS)):
        styles[idx] = {
            "numFmtId": cell_xf.attrib.get("numFmtId"),
            "applyNumberFormat": cell_xf.attrib.get("applyNumberFormat"),
        }
    return styles


def load_num_formats(z):
    try:
        root = ET.fromstring(z.read("xl/styles.xml"))
    except KeyError:
        return {}
    formats = {}
    for nf in root.findall(".//m:numFmts/m:numFmt", NS):
        formats[nf.attrib.get("numFmtId")] = nf.attrib.get("formatCode")
    return formats


def suspicious_reasons(rec):
    reasons = []
    text = (rec.get("value") or "") + " " + (rec.get("formula") or "")
    if any(tok in text for tok in ["#REF!", "#NAME?", "#VALUE!", "#DIV/0!", "#N/A", "REF!"]):
        reasons.append("contains spreadsheet error token")
    f = (rec.get("formula") or "").upper()
    if any(tok in f for tok in ["0.06", "0.075", "0.12", "0.10", "0.15", "0.20", "0.25", "0.30", "0.35", "0.40", "0.45", "0.50", "1.00", "100.00", "95.00", "90.00", "85.00", "80.00", "75.00", "70.00", "65.00", "60.00", "55.00", "50.00", "45.00", "40.00", "35.00", "30.00", "25.00", "20.00", "15.00", "10.00", "5.00"]):
        reasons.append("formula contains common percentage constant")
    if re.search(r"(?:SUM|AVERAGE|MAX|MIN)\s*\(", f):
        reasons.append("aggregate formula")
    if any(target in f for target in ["G85", "G86", "G87", "L25", "R57", "R58", "R59", "R60"]):
        reasons.append("formula mentions suspected target")
    return reasons


def main():
    if not xlsx.exists():
        raise FileNotFoundError(f"Missing converted workbook: {xlsx}")

    with zipfile.ZipFile(xlsx) as z:
        workbook = ET.fromstring(z.read("xl/workbook.xml"))
        rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        relmap = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels}
        shared_strings = load_shared_strings(z)
        styles = load_styles(z)
        num_formats = load_num_formats(z)

        sheets = []
        for sh in workbook.findall("m:sheets/m:sheet", NS):
            rid = sh.attrib[f"{{{REL_NS}}}id"]
            target = relmap[rid]
            if not target.startswith("xl/"):
                target = "xl/" + target.lstrip("/")
            sheets.append((sh.attrib["name"], target))

        summary = []
        all_cells = []
        formulas = []
        suspicious = []
        key_cells = []
        row_labels = []
        merged = []

        for sheet_name, sheet_path in sheets:
            root = ET.fromstring(z.read(sheet_path))
            max_row = 0
            max_col = 0
            nonempty = 0

            for row in root.findall("m:sheetData/m:row", NS):
                rnum = int(row.attrib["r"])
                max_row = max(max_row, rnum)
                row_text = []

                for c in row.findall("m:c", NS):
                    rec = parse_cell(c, sheet_name)
                    if not rec:
                        continue
                    ref = rec["cell"]
                    rr, cc = cell_to_rowcol(ref)
                    max_col = max(max_col, cc)

                    if rec["type"] == "s":
                        try:
                            rec["value"] = shared_strings[int(rec["value"])]
                        except Exception:
                            pass

                    # Style metadata for selected cells.
                    style_index = c.attrib.get("s")
                    if style_index:
                        rec["style_index"] = int(style_index)
                        rec["style"] = styles.get(int(style_index), {})
                        rec["num_format"] = num_formats.get(str(rec.get("style", {}).get("numFmtId", "")), "")

                    reasons = suspicious_reasons(rec)
                    if rec["value"] or rec["type"] or rec["formula"]:
                        nonempty += 1
                        all_cells.append(rec)
                        if rec["value"]:
                            row_text.append(rec["value"].strip())
                    if rec["formula"]:
                        formulas.append(rec)
                    for reason in reasons:
                        srec = dict(rec)
                        srec["reason"] = reason
                        suspicious.append(srec)

                if row_text:
                    row_labels.append({"sheet": sheet_name, "row": rnum, "labels": row_text[:8]})

            for mr in root.findall(".//m:mergeCell", NS):
                merged.append({"sheet": sheet_name, "range": mr.attrib["ref"]})

            summary.append({"sheet": sheet_name, "rows": max_row, "cols": max_col, "nonempty_cells": nonempty})

        # Key cell dump.
        wanted = set()
        for row in range(1, 101):
            wanted.add(("DataSheet", f"A{row}"))
        for cell in ["G85", "G86", "G87", "L25", "R57", "R58", "R59", "R60"]:
            wanted.add(("DataSheet", cell))
        for row in range(1, 405, 2):
            wanted.add(("DPR_print", f"A{row}"))
        for row in range(1, 426, 2):
            wanted.add(("Project_Report", f"A{row}"))
        for row in range(1, 40):
            wanted.add(("DPR_FRONT", f"A{row}"))
        lookup = {(rec["sheet"], rec["cell"]): rec for rec in all_cells}
        for key in sorted(wanted):
            if key in lookup:
                key_cells.append(lookup[key])

    (base / "DPRPACKAGE-XLSX-summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")
    (base / "DPRPACKAGE-XLSX-nonempty-cells.json").write_text(json.dumps(all_cells, indent=2, ensure_ascii=False), encoding="utf-8")
    (base / "DPRPACKAGE-XLSX-formulas.json").write_text(json.dumps(formulas, indent=2, ensure_ascii=False), encoding="utf-8")
    (base / "DPRPACKAGE-XLSX-suspicious.json").write_text(json.dumps(suspicious, indent=2, ensure_ascii=False), encoding="utf-8")
    (base / "DPRPACKAGE-XLSX-key-cells.json").write_text(json.dumps(key_cells, indent=2, ensure_ascii=False), encoding="utf-8")
    (base / "DPRPACKAGE-XLSX-row-labels.json").write_text(json.dumps(row_labels, indent=2, ensure_ascii=False), encoding="utf-8")
    (base / "DPRPACKAGE-XLSX-merged-ranges.json").write_text(json.dumps(merged, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps({
        "summary": summary,
        "total_nonempty_cells": len(all_cells),
        "total_formulas": len(formulas),
        "total_merged_ranges": len(merged),
        "suspicious_count": len(suspicious),
        "reports": [
            "DPRPACKAGE-XLSX-summary.json",
            "DPRPACKAGE-XLSX-nonempty-cells.json",
            "DPRPACKAGE-XLSX-formulas.json",
            "DPRPACKAGE-XLSX-suspicious.json",
            "DPRPACKAGE-XLSX-key-cells.json",
            "DPRPACKAGE-XLSX-row-labels.json",
            "DPRPACKAGE-XLSX-merged-ranges.json",
        ],
    }, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
