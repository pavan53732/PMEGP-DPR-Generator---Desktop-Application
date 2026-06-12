import json
from pathlib import Path

base = Path(r"c:\Users\manog\OneDrive\Desktop\Pmegp Dpr Generater\PMEGP-DPR-Generator---Desktop-Application")
cells = json.loads((base / "DPRPACKAGE-XLSX-nonempty-cells.json").read_text(encoding="utf-8"))
lookup = {(r["sheet"], r["cell"]): r for r in cells}

wanted = [
    "DataSheet!A5:V100",
    "DataSheet!G85:G87",
    "DataSheet!L25:R60",
    "Application_form!A54:G60",
    "DPR_print!A90:H135",
    "Project_Report!A1:G40",
]

lines = []

def get(sheet, cell):
    return lookup.get((sheet, cell))

def fmt(rec):
    if not rec:
        return ""
    return f"{rec['cell']} t={rec.get('type')} v={rec.get('value')!r} f={rec.get('formula')!r} fmt={rec.get('num_format')}"

# DataSheet rows 5-100, columns A-V.
lines.append("# DataSheet rows 5-100, A-V")
for r in range(5, 101):
    row_parts = []
    for c in range(1, 23):
        col = c - 1
        letter = ""
        n = col
        while n:
            n, rem = divmod(n - 1, 26)
            letter = chr(65 + rem) + letter
        if col >= 26:
            letter = chr(64 + col // 26) + chr(65 + col % 26)
        rec = get("DataSheet", f"{letter}{r}")
        if rec:
            val = rec.get("value") or ""
            if val.strip():
                row_parts.append(f"{letter}{r}={val!r}")
            if rec.get("formula"):
                row_parts.append(f"{letter}{r} formula={rec['formula']!r}")
    if row_parts:
        lines.append(f"Row {r}: " + " | ".join(row_parts))

# Key suspected formulas.
lines.append("\n# Key suspected cells")
for cell in ["G85", "G86", "G87", "L25", "R57", "R58", "R59", "R60"]:
    lines.append(f"DataSheet!{cell}: {fmt(get('DataSheet', cell))}")
for cell in ["B59", "C59", "D59", "E59", "F59", "G59"]:
    lines.append(f"Application_form!{cell}: {fmt(get('Application_form', cell))}")
for cell in ["H48", "H67", "H72", "H70", "H74", "H76"]:
    lines.append(f"DataSheet!{cell}: {fmt(get('DataSheet', cell))}")
for cell in ["F123", "F125", "B94"]:
    lines.append(f"DPR_print!{cell}: {fmt(get('DPR_print', cell))}")

# DataSheet formulas only, grouped by row.
lines.append("\n# DataSheet formulas")
for r in range(1, 269):
    row_formulas = []
    for c in range(1, 258):
        col = c - 1
        letter = ""
        n = col
        while n:
            n, rem = divmod(n - 1, 26)
            letter = chr(65 + rem) + letter
        if col >= 26:
            letter = chr(64 + col // 26) + chr(65 + col % 26)
        rec = get("DataSheet", f"{letter}{r}")
        if rec and rec.get("formula"):
            row_formulas.append(f"{rec['cell']}={rec['formula']} v={rec.get('value')!r}")
    if row_formulas:
        lines.append(f"Row {r}: " + " | ".join(row_formulas))

# Suspicious formulas/errors.
suspicious = json.loads((base / "DPRPACKAGE-XLSX-suspicious.json").read_text(encoding="utf-8"))
lines.append("\n# Suspicious/error formulas")
for rec in suspicious:
    if rec.get("formula") or rec.get("value") in ["#REF!", "#VALUE!", "#NAME?", "#DIV/0!", "#N/A"]:
        lines.append(f"{rec.get('sheet')}!{rec.get('cell')} {rec.get('reason')}: v={rec.get('value')!r} f={rec.get('formula')!r}")

(base / "DPRPACKAGE-XLSX-targeted-audit.md").write_text("\n".join(lines), encoding="utf-8")
print(base / "DPRPACKAGE-XLSX-targeted-audit.md")
print(f"lines={len(lines)}")
