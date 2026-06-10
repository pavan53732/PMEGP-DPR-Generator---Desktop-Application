# Financial Engine Specification

This document defines the exact formulas and assumptions for the 5-year Enhanced Financial Projection Engine (Layer 2) of PMEGP DPR Pro.

## 1. Assumptions & Growth Rates

| Parameter | Assumption | Source |
|-----------|------------|--------|
| **Project Life** | 5 Years | Standard Bank Requirement |
| **Capacity Utilization** | Y1: 60%, Y2: 70%, Y3: 80%, Y4: 90%, Y5: 100% | Standard Manufacturing Norm |
| **Revenue Growth** | Proportional to Capacity Utilization + 5% Annual Inflation | User Configurable |
| **Raw Material Growth** | Proportional to Capacity Utilization + 4% Annual Inflation | User Configurable |
| **Salary Growth** | 5% Annual Increment | User Configurable |
| **Power & Overheads Growth** | 5% Annual Increment | User Configurable |

## 2. Depreciation Schedules (WDV Method)

Following Income Tax Act (1961) rules, WDV (Written Down Value) method will be default.

- **Building/Sheds:** 10%
- **Plant & Machinery:** 15%
- **Computers/IT:** 40%
- **Furniture & Fixtures:** 10%

*Formula:* 
`Depreciation_Yn = Opening_Balance_Yn * Rate`
`Closing_Balance_Yn = Opening_Balance_Yn - Depreciation_Yn`

## 3. Repayment Schedules

- **Term Loan Interest:** Calculated on reducing balance.
- **Moratorium:** Defaults to 6 months (Configurable).
- **Repayment Period:** 5 to 7 years.
- **Working Capital Interest:** Flat rate on utilized limit.

## 4. Key Formulas

### 4.1 Debt Service Coverage Ratio (DSCR)
`DSCR = (Net Profit After Tax + Depreciation + Interest on Term Loan) / (Principal Repayment + Interest on Term Loan)`
*Requirement:* Average DSCR must be > 1.5.

### 4.2 Return on Investment (ROI)
`ROI = (Average Net Profit / Total Capital Employed) * 100`

### 4.3 Break-Even Point (BEP)
`Contribution Margin = Sales - Variable Costs`
`BEP (Value) = Fixed Costs / (Contribution Margin / Sales)`
`BEP (%) = (Fixed Costs / Contribution Margin) * 100`

### 4.4 Payback Period
`Payback Period = Total Initial Investment / Average Annual Cash Inflow (Net Profit + Depreciation)`

### 4.5 Internal Rate of Return (IRR)
Calculated using the standard NPV=0 formula over the 5-year cash flow stream:
`0 = NPV = Σ [ CFt / (1+IRR)^t ] - Initial Investment`
