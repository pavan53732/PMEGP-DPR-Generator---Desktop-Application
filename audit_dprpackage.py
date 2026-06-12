import json
import re
from pathlib import Path

import xlrd

base = Path(r'c:\Users\manog\OneDrive\Desktop\Pmegp Dpr Generater\PMEGP-DPR-Generator---Desktop-Application')
path = base / 'DPRPACKAGE.xls'
out = base / 'DPRPACKAGE-AUDIT'
out.mkdir(exist_ok=True)

book = xlrd.open_workbook(str(path), formatting_info=True)


def cellname(row, col):
    return xlrd.colname(col) + str(row + 1)


def display(v):
    if v is None:
        return ''
    if isinstance(v, str):
        return v.replace('\r', '\\r').replace('\n', '\\n')
    return str(v)


def cell_type_name(t):
    return {
        0: 'empty',
        1: 'text',
        2: 'number',
        3: 'date',
        4: 'boolean',
        5: 'error',
        6: 'blank',
    }.get(t, str(t))

summary = []
all_cells = []
formulas = []
merged = []
suspicious = []
nonempty_by_sheet = {}

for si, sh in enumerate(book.sheets()):
    nonempty = []
    for r in range(sh.nrows):
        for c in range(sh.ncols):
            cell = sh.cell(r, c)
            ctype = sh.cell_type(r, c)
            val = sh.cell_value(r, c)
            if ctype != 0 or (isinstance(val, str) and val.strip() != ''):
                cn = cellname(r, c)
                rec = {
                    'sheet': sh.name,
                    'row': r + 1,
                    'col': c + 1,
                    'cell': cn,
                    'type': cell_type_name(ctype),
                    'value': display(val),
                    'formula': '',
                    'xf': sh.cell_xf_index(r, c),
                }
                nonempty.append(rec)
                all_cells.append(rec)
                if rec['formula']:
                    formulas.append(rec)
                text = display(val)
                if any(tok in text for tok in ['#REF!', '#NAME?', '#VALUE!', '#DIV/0!', '#N/A', 'REF!']):
                    suspicious.append(rec)
    nonempty_by_sheet[sh.name] = len(nonempty)
    summary.append({
        'sheet': sh.name,
        'index': si,
        'rows': sh.nrows,
        'cols': sh.ncols,
        'nonempty_cells': len(nonempty),
        'merged_ranges': len(sh.merged_cells),
    })

for sh in book.sheets():
    for m in sh.merged_cells:
        merged.append({
            'sheet': sh.name,
            'range': f'{cellname(m[0], m[1])}:{cellname(m[2] - 1, m[3] - 1)}',
            'start_row': m[0] + 1,
            'end_row': m[2],
            'start_col': m[1] + 1,
            'end_col': m[3],
        })

# Key cells and ranges from prior audit / suspected workbook contract.
key_cells = []
for row in range(1, 101):
    key_cells.append(('DataSheet', f'A{row}'))
for row in range(1, 404, 2):
    key_cells.append(('DPR_print', f'A{row}'))
for row in range(1, 416, 2):
    key_cells.append(('Project_Report', f'A{row}'))
for row in range(1, 40):
    key_cells.append(('DPR_FRONT', f'A{row}'))
key_cells.extend([
    ('Application_form', 'A1'),
    ('Application_form', 'A3'),
    ('Application_form', 'A5'),
    ('Application_form', 'A7'),
    ('Application_form', 'A9'),
    ('Application_form', 'A11'),
    ('Application_form', 'A13'),
    ('Application_form', 'A15'),
    ('Application_form', 'A17'),
    ('Application_form', 'A19'),
    ('Application_form', 'A21'),
    ('Application_form', 'A23'),
    ('Application_form', 'A25'),
    ('Application_form', 'A27'),
    ('Application_form', 'A29'),
    ('Application_form', 'A31'),
    ('Application_form', 'A33'),
    ('Application_form', 'A35'),
    ('Application_form', 'A37'),
    ('Application_form', 'A39'),
    ('Application_form', 'A41'),
    ('Application_form', 'A43'),
    ('Application_form', 'A45'),
    ('Application_form', 'A47'),
    ('Application_form', 'A49'),
    ('Application_form', 'A51'),
    ('Application_form', 'A53'),
    ('Application_form', 'A55'),
    ('Application_form', 'A57'),
    ('Application_form', 'A59'),
    ('Application_form', 'A61'),
    ('Application_form', 'A63'),
    ('Application_form', 'A65'),
    ('Application_form', 'A67'),
    ('Application_form', 'A69'),
    ('Application_form', 'A71'),
    ('Application_form', 'A73'),
    ('Application_form', 'A75'),
    ('Application_form', 'A77'),
    ('DataSheet', 'G85'),
    ('DataSheet', 'G86'),
    ('DataSheet', 'G87'),
    ('DataSheet', 'L25'),
    ('DataSheet', 'R57'),
    ('DataSheet', 'R58'),
    ('DataSheet', 'R59'),
    ('DataSheet', 'R60'),
])

cell_lookup = {(rec['sheet'], rec['cell']): rec for rec in all_cells}
key_values = []
for sheet, cell in key_cells:
    rec = cell_lookup.get((sheet, cell))
    if rec:
        key_values.append(rec)

# Row labels: first non-empty text in rows 1..140 for each sheet.
row_labels = []
for sh in book.sheets():
    for r in range(min(sh.nrows, 140)):
        vals = []
        for c in range(sh.ncols):
            ctype = sh.cell_type(r, c)
            val = sh.cell_value(r, c)
            if ctype == 1 and str(val).strip():
                vals.append(str(val).strip())
        if vals:
            row_labels.append({'sheet': sh.name, 'row': r + 1, 'labels': vals[:8]})

# Formula reference scan is skipped here because xlrd 2.x does not expose formula_text on Cell objects.

# Write reports.
(base / 'DPRPACKAGE-AUDIT-summary.json').write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding='utf-8')
(base / 'DPRPACKAGE-AUDIT-nonempty-cells.json').write_text(json.dumps(all_cells, indent=2, ensure_ascii=False), encoding='utf-8')
(base / 'DPRPACKAGE-AUDIT-formulas.json').write_text(json.dumps(formulas, indent=2, ensure_ascii=False), encoding='utf-8')
(base / 'DPRPACKAGE-AUDIT-merged-ranges.json').write_text(json.dumps(merged, indent=2, ensure_ascii=False), encoding='utf-8')
(base / 'DPRPACKAGE-AUDIT-suspicious.json').write_text(json.dumps(suspicious, indent=2, ensure_ascii=False), encoding='utf-8')
(base / 'DPRPACKAGE-AUDIT-key-cells.json').write_text(json.dumps(key_values, indent=2, ensure_ascii=False), encoding='utf-8')
(base / 'DPRPACKAGE-AUDIT-row-labels.json').write_text(json.dumps(row_labels, indent=2, ensure_ascii=False), encoding='utf-8')

print(json.dumps({
    'summary': summary,
    'total_nonempty_cells': len(all_cells),
    'total_formulas': len(formulas),
    'total_merged_ranges': len(merged),
    'suspicious_count': len(suspicious),
    'output_dir': str(out),
    'reports': [
        'DPRPACKAGE-AUDIT-summary.json',
        'DPRPACKAGE-AUDIT-nonempty-cells.json',
        'DPRPACKAGE-AUDIT-formulas.json',
        'DPRPACKAGE-AUDIT-merged-ranges.json',
        'DPRPACKAGE-AUDIT-suspicious.json',
        'DPRPACKAGE-AUDIT-key-cells.json',
        'DPRPACKAGE-AUDIT-row-labels.json',
    ],
}, indent=2, ensure_ascii=False))
