# WorkbookSchema.md

## DPRPACKAGE.xls — Structural Schema

### Workbook File

| Property | Value |
|----------|-------|
| File | DPRPACKAGE.xls |
| Format | BIFF8 (.xls) |
| Total Sheets | 5 |
| Total Formulas | ~987 |
| Total Merged Cells | ~1,588 |
| Total Named Ranges | 6 |
| Hidden Sheet Count | 0 (all visible) |

### Sheet Schemas

#### 1. DataSheet — Master Input Sheet

| Aspect | Schema |
|--------|--------|
| **Role** | Primary data entry, calculations, financial engine |
| **State** | Visible |
| **Used Range** | A1:T268 (A-J visible, K-T hidden) |
| **Print Area** | A1:J268 |
| **Page Breaks** | 4 horizontal |
| **Hidden Rows** | 67 (14-19, 21-23, 48, 179-198, 200-228+) |
| **Hidden Columns** | 10 (K, L, M, N, O, P, Q, R, S, T) |
| **Merged Cells** | 299 |
| **Formulas** | 96 |
| **Section Count** | 12 distinct input sections |
| **Data Types** | Text, Number, Enum selection, Calculated |

**Column Layout:**

| Col | Content | Visibility | Schema Type |
|-----|---------|-----------|-------------|
| A | Section numbering (1.1, 1.2, 2...) | Visible | Identifier |
| B | Labels + text input values | Visible | Label/Input |
| C-E | Checkbox markers (formulas) | Visible | Display |
| F | Quantity/Area/Rate input | Visible | Numeric Input |
| G | Rate/Percentage input | Visible | Numeric Input |
| H-I | Calculated Amount (merged) | Visible | Calculated Output |
| J | Checkbox markers (cont.) | Visible | Display |
| K-T | Helpers: enums, indices, % | Hidden | Internal Logic |

#### 2. Application_form — Application Form Output

| Aspect | Schema |
|--------|--------|
| **Role** | PMEGP Application Form generation |
| **State** | Visible |
| **Used Range** | A1:V88 |
| **Print Area** | A1:J77 |
| **Page Breaks** | 2 horizontal |
| **Hidden Rows** | 11 (78-88) |
| **Merged Cells** | 25 |
| **Formulas** | 6 (all in row 59) |
| **Sections** | Header, Agency, Personal, Project, Cost, Signature |

#### 3. DPR_print — Detailed Project Report Output

| Aspect | Schema |
|--------|--------|
| **Role** | Primary DPR print output with cost tables, subsidy calc, narratives |
| **State** | Visible |
| **Used Range** | A1:CY537 |
| **Print Area** | A1:J405 |
| **Hidden Columns** | 245 (K-CY) |
| **Merged Cells** | 498 |
| **Formulas** | 741 |
| **Data Content** | A-J columns: labels, cost tables, narratives |
| **Subsidy Logic** | Row 131: Multi-level IF cap check |

#### 4. Project_Report — Comprehensive Report Output

| Aspect | Schema |
|--------|--------|
| **Role** | Detailed financial + narrative report |
| **State** | Visible |
| **Used Range** | A1:N425 |
| **Print Area** | A1:K416 |
| **Hidden Rows** | 9 (417-425) |
| **Merged Cells** | 754 |
| **Formulas** | 137 |
| **Layout** | Heavy merged cell formatting for narrative sections |
| **Sections** | Header, Applicant, Location, Cost, Financials, Narrative |

#### 5. DPR_FRONT — Cover Page Output

| Aspect | Schema |
|--------|--------|
| **Role** | Front cover/title page for DPR document |
| **State** | Visible |
| **Used Range** | A1:I44 |
| **Print Area** | A1:AJ39 |
| **Hidden Columns** | 248 (J-CY) |
| **Hidden Rows** | 3 (40-42) |
| **Merged Cells** | 12 |
| **Formulas** | 7 |

### Cross-Sheet Reference Schema

| Source | Target | Type | Fields |
|--------|--------|------|--------|
| DataSheet → Application_form | Direct + INDEX | C59=H48, D59=H67+H72, E59=H70+H74, F59=H76, G59=SUM, B59=INDEX |
| DataSheet → DPR_print | Direct range | B86:E86=DataSheet!B41:E41 ... |
| DataSheet → Project_Report | Direct cell | Multiple cell references |
| Project_Report → DPR_print | Direct cell | B3=Project_Report!B9, ... |
| DPR_print → DPR_FRONT | Direct cell | Summary values |

### Enumeration Schemas (Hidden Columns L-M)

| Enumeration | Column L Labels | Column M Index | Used In |
|-------------|----------------|----------------|---------|
| Gender | Male(55), Female(56), Transgender(57) | M55=1 | Row 12 √ |
| Agency | KVIC(59), KVIB(60), DIC(61), COIR Board(62) | M59=1 | Row 7 √ |
| Location | Rural(64), Urban(65) | M64=1 | Row 13 √ |
| Category | SC(70), ST(71), OBC(72), PHC(73), Ex-Serviceman(74), Minority(75), Hill Border(76), Aspirational(77), General(78) | M70=1 | Row 27 √ |
| Business Type | Manufacturing(80), Service(81) | M80=1 | Row 29 √ |
| Education | Under 8th(83), 8th(84), 10th(85), 12th(86), Graduate(87), Post Graduate(88), PhD(89) | M83=4 | Row 23 INDEX |
| Premises | Own(91), Rented(92), Leased(93) | M91=2 | Application_form!B59 |
