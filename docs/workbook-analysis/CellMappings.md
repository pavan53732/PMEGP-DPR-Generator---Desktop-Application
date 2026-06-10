# CellMappings.md

## DPRPACKAGE.xls — Key Cell Mappings

### DataSheet → Cell Reference Map

This document maps the most important cells in the workbook, organized by purpose. For the complete cell inventory refer to `CellInventory.csv` and `_all_cells.json`.

### Primary Input Cells (Editable by User)

| Cell | Label | Type | Default |
|------|-------|------|---------|
| B8 | Name of the Applicant/Institution | Text | - |
| B16 | Taluk/Block | Text | - |
| B17 | District | Text | - |
| B18 | State | Text | - |
| B19 | Email | Text | - |
| F19 | Mobile | Text | - |
| B31 | Name of project/business activity | Text | - |
| B34 | Legal Status | Text | - |
| F41:F47 | Building Area (sq.ft) | Number | 0 |
| G41:G47 | Building Rate (₹/sq.ft) | Number | 0 |
| F54:F66 | Machinery Qty | Number | 0 |
| G54:G66 | Machinery Rate | Number | 0 |
| H70 | Preliminary & Pre-operative Cost | Number | 0 |
| H72 | Furniture & Fixtures | Number | 0 |
| H74 | Contingency/Others/Misc | Number | 0 |
| F94:F101 | Sales Rate/Unit | Number | 0 |
| G94:G101 | Sales Quantity | Number | 0 |
| E121:E127 | Number of Workers | Number | 0 |
| F121:F127 | Wages per Month | Number | 0 |
| E134:E138 | Number of Staff | Number | 0 |
| F134:F138 | Salary per Month | Number | 0 |
| F157 | Repair & Maintenance % | Number | 0 |
| F159 | Power & Fuel % | Number | 0 |
| F161 | Other Overhead % | Number | 0 |
| F163 | Telephone % | Number | 0 |
| F165 | Stationery & Postage % | Number | 0 |
| F167 | Advertisement % | Number | 0 |
| F169 | Building Rent (₹) | Number | 0 |
| F171 | Other Misc % | Number | 0 |
| F179 | Pay Back Period | Number | 5 |
| F180 | Implementation Period (months) | Number | 2 |
| B182 | INTRODUCTION | Text | - |
| B200 | ABOUT THE PROMOTER | Text | - |
| B219 | Office Address | Text | - |
| B220 | District | Text | - |
| B224 | Taluk/Block | Text | - |
| B227 | Name & Signature Incharge | Text | - |
| B233 | INTRODUCTION (Beneficiary) | Text | - |
| B250 | ABOUT THE BENEFICIARY | Text | - |

### Selection/Enum Cells (Hidden M Column Values)

| Cell | Purpose | Values |
|------|---------|--------|
| M55 | Gender | 1=Male, 2=Female, 3=Transgender |
| M59 | Agency | 1=KVIC, 2=KVIB, 3=DIC, 4=COIR Board |
| M64 | Location | 1=Rural, 2=Urban |
| M70 | Category | 1=SC ... 9=General |
| M80 | Business Type | 1=Manufacturing, 2=Service |
| M83 | Qualification | 1=Under 8th ... 7=PhD |
| M91 | Premises | 1=Own, 2=Rented, 3=Leased |

### Calculated Cells (Read-Only Outputs)

| Cell | Formula | Purpose |
|------|---------|---------|
| H48 | SUM(H41:H47) | Total Building Cost |
| H67 | SUM(H54:H66) | Total Machinery Cost |
| H76 | SUM(H70:I74) | Working Capital |
| H102 | SUM(H94:H101) | Total Sales |
| H116 | SUM(H107:H115) | Total Raw Material Cost |
| H128 | SUM(H121:H127) | Total Wages |
| H139 | SUM(H134:H138) | Total Salaries |
| G85 | IF(AND(M55=1,M70=9),10%,5%) | Own Contribution % |
| G86 | 100%-G85 | Bank Finance % |
| G87 | IF(M64=2,...) | Margin Money % |

### Application_form Cost Summary Row 59

| Cell | Formula | Maps to |
|------|---------|---------|
| B59 | INDEX(L91:L93,M91,B1) | Premises Type |
| C59 | =DataSheet!H48 | Building Cost |
| D59 | =DataSheet!H67+DataSheet!H72 | Machinery + Furniture |
| E59 | =DataSheet!H70+DataSheet!H74 | Preliminary + Contingency |
| F59 | =DataSheet!H76 | Working Capital |
| G59 | =SUM(C59:F59) | Total Project Cost |

### DPR_print Key Output Cells

| Cell | Formula | Purpose |
|------|---------|---------|
| B3 | =Project_Report!B9 | Applicant Name |
| H93 | =SUM(H86:H92) | Building Subtotal |
| H115 | =H93+H108+H109+H111+H113 | Project Cost (excl WC) |
| H117 | =ROUND(H290,0) | Working Capital Amount |
| H119 | =H93+H108+H109+H111+H113+H117 | Total Cost |
| H131 | (subsidy cap formula) | Subsidy Amount |
| H126 | =ROUND(F125*H115,0) | Own Contribution (fixed assets) |
| H127 | =ROUND(F125*H117,0) | Own Contribution (WC) |
