# MergedCells.md

## DPRPACKAGE.xls — Merged Cell Registry

### Overview

The workbook uses extensive merged cell regions for layout formatting. Each sheet's merged cell count:

| Sheet | Merged Regions | Purpose |
|-------|---------------|---------|
| Application_form | 25 | Form layout — labels span multiple columns |
| DataSheet | 299 | Input form layout — section headers, labels spanning input + unit columns |
| DPR_print | 498 | Print-report layout — title blocks, cost tables, narrative sections |
| Project_Report | 754 | Report layout — extensive merged cells for narrative and table formatting |
| DPR_FRONT | 12 | Front page layout — title and address blocks |

### Merged Cell Categories

#### 1. Section Header Blocks (DataSheet)

Common pattern: B-column labels merge into B:E or B:G to span the width of a section header.
Examples:

- `B8:E8` — "Name of the Applicant/Institution"
- `B83:G83` — "Means of Financing"
- `B91:I91` — "DETAILS OF SALES"
- `B105:I105` — "RAW MATERIALS"
- `B118:I118` — "WAGES"
- `B131:I131` — "SALARY DETAILS"
- `B142:G142` — "WORKING CAPITAL ESTIMATE"
- `B153:G153` — "POWER ESTIMATE"

#### 2. Label + Value Pairs (DataSheet)

Pattern: B-column labels merge left (B:E), F:G merge for Rate/Unit columns, H:I merge for Amount columns.
Examples:

- `B41:E41` through `B47:E47` — Building item labels
- `F41:G41` — Building rate/quantity
- `H41:I41` — Building calculated amount
- Same pattern for machinery (rows 54-66), raw materials, wages, salary, overheads

#### 3. Amount Column Merges

In all financial sections, H:I columns are merged to display calculated amounts (e.g., `H41:I41`, `H54:I54`, `H94:I94`, `H102:I102`).

#### 4. DPR_print Full-Row Labels

- Rows 2-80: Multi-column merged labels for project summary sections
- Rows 86-115: Cost table rows with merged B:E for item labels, F:I for values
- Rows 119-131: Subsidy and margin money summary merged cells

#### 5. Project_Report Layout

- 754 merged regions — the highest density in the workbook
- Used extensively for narrative text wrapping, table headers, and financial statement formatting
- Each report section header is a merged cell spanning the full printable width (A:K)

### Impact on Application Development

1. The UI must respect the visual grouping implied by merged regions
2. Section headers that merge across columns indicate logical grouping boundaries
3. H:I column merges indicate "calculated amount" cells
4. The heavy merge count (especially Project_Report) suggests the workbook uses Excel as a layout engine — something to replicate in PDF generation

### Representative Merged Regions (DataSheet)

| Range | Content | Role |
|-------|---------|------|
| B8:E8 | Name of the Applicant/Institution | Input label |
| B12:E12 | Gender | Section label |
| B25:G25 | Whether the applicant belongs to | Section label |
| B31:E31 | Name of the project/business activity proposed | Input label |
| B39:I39 | BUILDING DETAILS | Section header |
| B52:I52 | MACHINERY DETAILS | Section header |
| B83:G83 | Means of Financing | Section header |
| B85:E85 | Own Contribution | Input label + value |
| B86:E86 | Bank Finance | Input label + value |
| B87:E87 | Margin Money (Govt. Subsidy) | Input label + value |
| B91:I91 | DETAILS OF SALES | Section header |
| B105:I105 | RAW MATERIALS | Section header |
| B118:I118 | WAGES | Section header |
| B131:I131 | SALARY DETAILS | Section header |
| B142:G142 | WORKING CAPITAL ESTIMATE | Section header |
| B153:G153 | POWER ESTIMATE | Section header |

Full merged cell lists are available in the raw extraction data (`_all_cells.json` includes merge ranges per sheet).
