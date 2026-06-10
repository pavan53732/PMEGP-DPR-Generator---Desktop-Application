# Parity Acceptance Criteria

To successfully replace the legacy `DPRPACKAGE.xls` macro workbook, the new system must guarantee 100% parity for core outputs. This document defines what "100% parity" means for developers and testers.

## 1. What IS Part of Parity (Strict Enforcement)

The following areas must match the legacy workbook exactly, with a 0-tolerance difference:

### A. Core Calculations
- **Subsidy Calculation:** The subsidy percentage and total maximum subsidy must perfectly match the workbook's logic (including rural/urban, special category, and maximum project cost limits).
- **Margin Money / Promoter Contribution:** The calculated margin (5% or 10%) must match exactly.
- **Term Loan Amount:** The final term loan amount and working capital limits suggested by the workbook.
- **Cost Aggregations:** Total Project Cost must equal the sum of Building, Machinery, Furniture, and Working Capital cycle.

### B. Outputs (Documents)
- **Application Form (PDF):** Must be a pixel-equivalent recreation of the `Application_form` sheet output. All mapped fields must appear in the same order with the exact same labels.
- **Project At A Glance (PDF):** Must be a value-equivalent recreation of the `DPR_print` sheet. Exact calculated values must match what the workbook would have printed.

## 2. What is NOT Part of Parity (Enhancements)

The following areas are part of the Layer 2 (Enhanced Financial Engine) and are explicitly excluded from strict parity validation:

- **Financial Projection Calculations:** DSCR, ROI, Payback, BEP, and IRR. (The original workbook omitted these, thus we use our own standardized models).
- **5-Year P&L and Cash Flow:** Standardized models replace the original workbook's non-existent schedules.
- **UI Structure:** The wizard flow is structured logically (8 steps) and does not need to look like an Excel grid.

## 3. Parity Test Automation

The automated parity test suite must iterate over 100+ known scenarios (permutations of Industry Type, Location, Social Category, Project Cost) and assert:
`App.MarginMoney === Excel.MarginMoney`
`App.Subsidy === Excel.Subsidy`
`App.TermLoan === Excel.TermLoan`
