# SheetMappings.md

## DPRPACKAGE.xls — Sheet-to-Application Mapping

### Sheet Purpose Mapping

| Sheet | Role in Workbook | Role in Application |
|-------|-----------------|-------------------|
| **DataSheet** | **Master Input Sheet** — all user data entry | **Wizard Steps 1-7**: Personal details, Project details, Financial inputs, Narrative |
| **Application_form** | **Generated Output** — PMEGP Application Form PDF | **Export only** — generated from DataSheet data |
| **DPR_print** | **Generated Print** — Detailed Project Report | **Export/Print only** — generated PDF |
| **Project_Report** | **Generated Report** — Comprehensive financial report | **Export only** — generated from DataSheet data |
| **DPR_FRONT** | **Generated Cover** — Front page of DPR | **Export only** — generated cover sheet |

### Wizard Step → DataSheet Row Mapping

| Wizard Step | DataSheet Rows | Content | UI Elements |
|------------|----------------|---------|------------|
| **Step 1: Applicant Details** | 5-10 | Applicant name, agency preference | Text input (B8), radio/select (agency) |
| **Step 2: Personal Info** | 11-23 | Gender, address, contact, qualification | Radio (gender), text (address), select (qualification) |
| **Step 3: Category & Project** | 25-36 | Category, business type, project name, legal status | Radio (category/type), text inputs |
| **Step 4: Building & Machinery** | 39-67 | Building items (7), machinery items (13) | Dynamic table/array inputs |
| **Step 5: Other Costs & Financing** | 70-89 | Preliminary cost, furniture, contingency, working capital, own contribution %, bank finance % | Numeric inputs, auto-calculated % |
| **Step 6: Sales, Materials, Labour** | 91-139 | Products (8), raw materials (9), wages (7), salaries (5) | Dynamic table inputs |
| **Step 7: Overheads & Parameters** | 142-180 | WC estimate, power, overheads (7), payback period, depreciation | Numeric inputs |
| **Step 8: Narrative** | 182-268 | Introduction, promoter, address, signature, beneficiary | Text areas (rich text) |

### DataSheet Column Mapping

| Column | Content | Application Field Type |
|--------|---------|----------------------|
| A (1) | Section numbering (1.1, 1.2, 2, 3...) | UI section identifiers |
| B (2) | Section labels + primary input values | Labels + Text inputs |
| C-J (3-10) | Checkbox cells, rate/quantity columns | Radio groups, numeric inputs |
| F (6) | Quantity, area, rate inputs | Numeric input fields |
| G (7) | Rate, quantity, percentage inputs | Numeric input fields |
| H-I (8-9) | Calculated amounts (merged) | Read-only calculated display |
| K-T (11-20) | **HIDDEN** — Enumeration labels, indices, helper % | Internal application enums (not shown in UI) |

### Output Sheet → DataSheet Reference Mapping

| Output Cell | DataSheet Cell | Content | Notes |
|------------|---------------|---------|-------|
| Application_form!B59 | DataSheet!L91:L93 + M91 | Premises type label | INDEX formula |
| Application_form!C59 | DataSheet!H48 | Building cost | Direct reference |
| Application_form!D59 | DataSheet!H67 + H72 | Machinery + Furniture | Addition formula |
| Application_form!E59 | DataSheet!H70 + H74 | Preliminary + Contingency | Addition formula |
| Application_form!F59 | DataSheet!H76 | Working capital | Direct reference |
| DPR_print!B3 | Project_Report!B9 | Applicant name | Cross-sheet reference |
| DPR_print!B86:E86 | DataSheet!B41:E41 | Building item 1 label | Multi-cell reference |
| DPR_print!F86 | DataSheet!F41 | Building item 1 rate | Direct reference |
| DPR_print!H86 | DataSheet!H41:I41 | Building item 1 amount | Range reference |
| DPR_print!H117 | =ROUND(H290,0) | Working capital | In-sheet calculation |
| DPR_print!H119 | =H93+H108+H109+H111+H113+H117 | Total project cost | In-sheet aggregation |
| DPR_print!H131 | IF(AND(...),...) | Subsidy amount | Complex conditional |

### Application Data Model Fields Not in Workbook

The following fields may exist in the application but are not present in the workbook:

- User session/authentication data
- Application workflow status (draft, submitted, approved)
- Timestamp/logging fields
- Multi-language support fields
- Version tracking
- Digital signature data

### Workbook Fields Not in Current Application

Fields that exist in the workbook but may not be implemented in the current application UI:

- Coir Board agency option
- Transgender category
- Aspirational Districts category
- Hill Border Area category
- PHC (Physically Handicapped) category
- Ex-Serviceman category
- Depreciation details (on Building, on Machinery)
- Stock in process / Finished goods / Receivable by (WC elements)
- Qualification enumeration (Under 8th through PhD)
