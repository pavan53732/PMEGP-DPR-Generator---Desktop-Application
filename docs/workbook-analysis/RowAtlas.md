# RowAtlas.md

## DPRPACKAGE.xls — Row-by-Row Atlas

### SHEET: DataSheet (Master Input Sheet)

#### Rows 1-4: Title and Headers

| Row | Content | Role |
|-----|---------|------|
| 1 | DATA INPUT SHEET | Sheet title (merged A1:I1) |
| 2-4 | (empty) | Spacing |

#### Rows 5-10: Applicant Details (Section 1)

| Row | Labels | Input Cells | Hidden Helpers | Section |
|-----|--------|-------------|----------------|---------|
| 5 | Preference for sponsoring agency | — | — | Section header |
| 6 | Unit Location | — | — | Section sub-header |
| 7 | KVIC / KVIB / DIC / COIR Board | — | M59 (agency index) | Selection checkboxes |
| 8 | 1.1 Name of the Applicant/Institution | B8 (text) | — | **Primary input** |
| 9 | (spacing) | — | — | |
| 10 | 1.2 (label) | — | — | |

#### Rows 11-20: Gender, Address, Contact

| Row | Labels | Input Cells | Hidden Helpers | Section |
|-----|--------|-------------|----------------|---------|
| 11 | (spacing) | — | — | |
| 12 | 2 / Gender (Male/Female/Transgender) | — | M55 (gender=1) | Selection checkboxes |
| 13 | 3 / Address / Rural/Urban | — | M64 (location=1) | Selection checkboxes |
| 14-19 | (HIDDEN) Address: Taluk, District, Pin, State, Email, Mobile | Various hidden B-column text | — | Address details |
| 20 | (empty) | — | — | |

#### Rows 21-23: Qualification (HIDDEN)

| Row | Content | Formula |
|-----|---------|---------|
| 21 | 4 / Qualification | Section label |
| 22 | Academic / Technical | Sub-labels |
| 23 | B23 = `=INDEX(L83:L89,M83)` | Qualification display |

#### Rows 25-30: Category & Business Type (Section 5-7)

| Row | Labels | Input/Helper | Description |
|-----|--------|-------------|-------------|
| 25 | Whether applicant belongs to | L25=0.35 (hidden %) | Section header |
| 26 | SC/ST/OBC/PHC/Ex-Serviceman/etc | — | Category labels |
| 27 | Checkboxes (from M70 index) | M70 (category=1=SC) | Selection display |
| 28 | (empty) | — | |
| 29 | Whether the project | M80 (type=1=Mfg) | Section |
| 30 | (empty) | — | |

#### Rows 31-36: Project Details

| Row | Labels | Input Cells | Description |
|-----|--------|-------------|-------------|
| 31 | 8 / Name of the project/business activity | B31 (text) | **Primary input** |
| 32-33 | (empty) | — | |
| 34 | Legal Status | B34 (text) | **Primary input** |
| 35 | (empty) | — | |
| 36 | Land | M36=#VALUE! | Helper (broken) |

#### Rows 39-48: BUILDING DETAILS

| Row | Labels | Input/Calculated | Description |
|-----|--------|-----------------|-------------|
| 39 | BUILDING DETAILS | — | Section header |
| 40 | Particulars / Area / Rate/Sqft / Amount | — | Column headers |
| 41-47 | Building items (7 rows) | F=Area, G=Rate, H=Amount | Cost lines |
| 48 | Total (hidden) | H48=SUM(H41:H47) | **Calculated total** |

#### Rows 52-67: MACHINERY DETAILS

| Row | Labels | Input/Calculated | Description |
|-----|--------|-----------------|-------------|
| 52 | MACHINERY DETAILS | — | Section header |
| 53 | Particulars / Qty / Rate / Amount | — | Column headers |
| 54-66 | Machinery items (13 rows) | F=Qty, G=Rate, H=Amount | Cost lines |
| 67 | Total (hidden) | H67=SUM(H54:H66) | **Calculated total** |

**Hidden helper columns in rows 54-67:**

- L55=Male, M55=1 (gender index)
- L59=KVIC, M59=1 (agency selection)
- L64=Rural, M64=1 (location index)
- R57-R60: Margin money % calculations

#### Rows 70-78: Other Costs

| Row | Label | Input/Formula | Description |
|-----|-------|--------------|-------------|
| 70 | Preliminary & Pre-operative Cost | H70 (text input) | Cost line |
| 72 | Furniture & Fixtures | H72 | Cost line |
| 74 | Contingency/Others/Misc | H74 | Cost line |
| 76 | Working Capital | H76=SUM(H70:I74) | **Calculated total** |

Hidden helpers: L70=SC, M70=1 (category index), L80=Manufacturing, M80=1

#### Rows 83-89: MEANS OF FINANCING

| Row | Label | Formula | Description |
|-----|-------|---------|-------------|
| 83 | Means of Financing | Section header | |
| 85 | Own Contribution | G85=IF(AND(M55=1,M70=9),10%,5%) | **Calculated %** |
| 86 | Bank Finance | G86=100%-G85 | **Calculated %** |
| 87 | Margin Money (Subsidy) | G87=IF(M64=2,...) | **Calculated %** |

Hidden helpers: L83=Under 8th (education labels), M83=4

#### Rows 91-102: DETAILS OF SALES

| Row | Labels / Items | Formulas | Description |
|-----|---------------|----------|-------------|
| 91 | DETAILS OF SALES | — | Section header |
| 92-93 | Particulars / Rate/Unit / Qty / Amount | — | Column headers |
| 94-101 | Product lines (8 rows) | H=IF(G>=1,G*F,F) | Sales data |
| 102 | Total | H102=SUM(H94:H101) | **Calculated total** |

#### Rows 105-116: RAW MATERIALS

| Row | Labels / Items | Formulas | Description |
|-----|---------------|----------|-------------|
| 105 | RAW MATERIALS | — | Section header |
| 106 | Particulars / Unit / Rate / Reqd Unit / Amount | — | Column headers |
| 107-115 | Raw material lines (9 rows) | H=IF(G>=1,G*F,F) | Material costs |
| 116 | Total | H116=SUM(H107:H115) | **Calculated total** |

#### Rows 118-128: WAGES

| Row | Labels / Items | Formulas | Description |
|-----|---------------|----------|-------------|
| 118 | WAGES | — | Section header |
| 119-120 | Particulars / No of workers / Wage / Months | — | Column headers (G120=12 months) |
| 121-127 | Worker lines (7 rows) | H=E*F*G120 | Wage lines |
| 128 | Total | E128=SUM(E121:E127), H128=SUM(H121:H127) | **Calculated totals** |

#### Rows 131-139: SALARY DETAILS

| Row | Labels / Items | Formulas | Description |
|-----|---------------|----------|-------------|
| 131 | SALARY DETAILS | — | Section header |
| 132-133 | Particulars / No of staff / Wage / Months | — | Column headers (G133=12 months) |
| 134-138 | Staff lines (5 rows) | H=E*F*G133 | Salary lines |
| 139 | Total | E139=SUM(E134:E138), H139=SUM(H134:H138) | **Calculated totals** |

#### Rows 142-180: WORKING CAPITAL, POWER, OVERHEADS, PARAMETERS

| Row | Label | Input/Formula | Description |
|-----|-------|--------------|-------------|
| 142 | WORKING CAPITAL ESTIMATE | — | Section header |
| 143-150 | WC elements | Text labels, day counts | Working capital inputs |
| 153 | POWER ESTIMATE | — | Section header |
| 154 | Power Requirement | F154 (numeric) | Power input |
| 157-171 | Overhead lines (7 items) | H=F*H102 (as % of sales) | Expense calculations |
| 175-177 | Depreciation | Text inputs | Depreciation IDs |
| 179 | Pay back period (HIDDEN) | F179=5 | **Key parameter** |
| 180 | Implementation period (HIDDEN) | F180=2, G180=12 | **Key parameter** |

#### Rows 182-268: NARRATIVE & SIGNATURE SECTION

| Row Block | Label | Description |
|-----------|-------|-------------|
| 182 | INTRODUCTION | Narrative section |
| 200 | ABOUT THE PROMOTER | Narrative section |
| 219-224 | Office Address, District, KVIC, Taluk, State | Address fields |
| 227-228 | Name & Signature Incharge | Signature block |
| 233 | INTRODUCTION (duplicate) | Secondary narrative |
| 250 | ABOUT THE BENEFICIARY | Secondary narrative |

---

### SHEET: Application_form

#### Rows 1-77: Form Layout (print area)

| Row Block | Content | Role |
|-----------|---------|------|
| 1-5 | Title and header section | PMEGP Application Form header |
| 6-10 | Agency preference, applicant name | Form fields |
| 11-20 | Gender, address, contact | Personal details |
| 21-30 | Qualification, category, business type | Eligibility section |
| 31-50 | Project name, legal status, premises | Project details |
| 51-60 | Cost summary (6 formulas) | Financial summary |
| 61-77 | Signatures, declarations | Footer section |
| **78-88** | **(HIDDEN)** | Continuation/signature rows |

**Key formula rows:**

- Row 59: 6 linked formulas = `INDEX(DataSheet!...)`, cell references to DataSheet H48, H67, H72, H70, H74, H76

---

### SHEET: DPR_print (Print Output — 537 rows)

#### Row Blocks

| Rows | Content | Source |
|------|---------|--------|
| 1-20 | Project title, applicant details | Project_Report references |
| 21-80 | Project description, location, summary | DataSheet/Project_Report |
| 81-84 | Cost section headers | — |
| 85-93 | Building costs table | DataSheet rows 41-48 |
| 94 | **BROKEN (#REF!)** | DataSheet!<deleted> |
| 95-115 | Machinery + other costs table | DataSheet rows 54-76 |
| 116-131 | Total cost, subsidy, contribution | Calculated in-sheet |
| 132-145 | Means of financing breakdown | DataSheet G85-G87 |
| 146-200 | Working capital, power, overhead details | DataSheet rows 142-180 |
| 201-405 | Extended narrative output | DataSheet narrative rows |
| 406-537 | (Extended formula/formatting area) | Print layout extension |

---

### SHEET: Project_Report (425 rows — Detailed Report)

| Row Block | Content | Source |
|-----------|---------|--------|
| 1-50 | Report header, applicant name, contact | DataSheet B8-B19 |
| 51-100 | Project description, location, summary | DataSheet narrative |
| 101-200 | Cost details (building, machinery, etc.) | DataSheet financial data |
| 201-300 | Working capital, sales, raw materials | DataSheet financial data |
| 301-350 | Financial analysis, DSCR, payback | Calculated |
| 351-416 | Narrative sections, signatures | DataSheet narrative |
| **417-425** | **(HIDDEN)** | Calculation footers/summaries |

---

### SHEET: DPR_FRONT (Cover Page — 44 rows)

| Row Block | Content | Source |
|-----------|---------|--------|
| 1-10 | PMEGP DPR title | Static + dynamic references |
| 11-20 | Applicant name, project name | Project_Report |
| 21-35 | Cost summary, subsidy, loan amounts | Calculated from DPR_print |
| 36-39 | Date, signatures | Footer |
| **40-44** | **(HIDDEN)** | Additional reference rows |
