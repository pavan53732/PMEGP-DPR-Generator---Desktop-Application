# PHASE6_THE_MISSING_FINANCIALS_REVELATION.md

## Final Verification: The Net Profit / DSCR / ROI Trace

During the final manual verification to trace the exact formula chain for Net Profit, DSCR, and ROI in `Project_Report` rows 251-300, a critical architectural discovery was made.

### The Revelation: The Formulas Do Not Exist

The assumption that the workbook calculates detailed financial ratios (DSCR, ROI, Payback) in the `Project_Report` sheet is **incorrect**. 

A complete row dump of `Project_Report` rows 250-400 reveals the true nature of these rows:

1. **Rows 250-275** are the **Project Cost Summary** (Fixed Assets + Working Capital).
2. **Rows 280-307** are the **Means of Financing** (Equity, Subsidy, Term Loans).
3. **Rows 340-341** (Projected Profitability) contain only text: `"Projected Profitability Statement given in the Detailed Project Report."`
4. **Rows 344-345** (Projected Cash flow) contain only text: `"Projected Cash flow Statement given in the Detailed Project Report."`
5. **Row 359** (Repayment Programme) contains only text: `"Detailed Repayment programme for Term loan and Working capital loan have been given in the DPR."`

### Conclusion

The original `DPRPACKAGE.xls` workbook **is not a full financial modeling engine**. It is an **Application Form & Project-At-A-Glance Generator**. 

It aggregates costs, computes the government subsidy caps, and calculates the margin money. However, for the actual detailed financial projections (P&L, Cash Flow, Balance Sheet, DSCR, ROI, Payback), the workbook explicitly states that these are `"given in the Detailed Project Report"`. 

This means the original system expects the applicant or their Chartered Accountant to attach an **external, manually prepared** Detailed Project Report containing these complex financial models.

### Implementation Impact for the New Application

To build the "PMEGP DPR Pro" desktop application, we have two paths:

**Path A: True Parity (The Minimum Viable Engine)**
We only implement what the workbook implements. We calculate Project Cost and Means of Finance, and output the PDF forms. The user is still expected to attach their own P&L and Cash Flow projections separately.

**Path B: The "Pro" Upgrade (Recommended)**
We build our own standard financial modeling engine (Standard 5-year P&L, Cash Flow, DSCR, and ROI calculations) using the existing inputs (Interest Rate `DataSheet!B173`, Depreciation `B176-B177`, Payback Period `F179`). This transforms the software from a simple form-filler into a true, comprehensive DPR generator that provides a massive value-add over the government's legacy Excel file.

### Final Verification Complete

The 100% workbook knowledge capture is truly complete. The "missing" formulas were never there to begin with.
