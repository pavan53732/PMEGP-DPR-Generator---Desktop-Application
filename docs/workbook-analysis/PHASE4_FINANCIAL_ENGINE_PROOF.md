# PHASE4_FINANCIAL_ENGINE_PROOF.md
## Complete Financial Engine Traceability

## Financial Parameter Sources

| Parameter | Cell | Value/Range | Source Type |
|-----------|------|-------------|-------------|
| Payback Period | DataSheet!F179 | Default 5 (years) | User-editable, hidden row |
| Implementation Period | DataSheet!F180 | Default 2 (months) | User-editable, hidden row |
| Annual Months Base | DataSheet!G180 | 12 | Constant |
| Wage Months | DataSheet!G120 | 12 | Constant |
| Salary Months | DataSheet!G133 | 12 | Constant |
| Rate of Interest | DataSheet!B173 | (user input) | Free text label |
| Depreciation - Building | DataSheet!B176 | (user input) | Free text label |
| Depreciation - Machinery | DataSheet!B177 | (user input) | Free text label |
| Power Requirement | DataSheet!F154 | (user input) | Numeric |

## DSCR / ROI / Payback Trace

**Note:** These calculations likely reside in the Project_Report sheet (137 formulas).
The following cells require individual tracing:

| Analysis Type | Likely PR Cells | Status |
|--------------|-----------------|--------|
| DSCR (Debt Service Coverage Ratio) | PR rows 200-300 | NOT TRACED |
| ROI (Return on Investment) | PR rows 250-300 | NOT TRACED |
| Break-even Point | PR rows 300-350 | NOT TRACED |
| Payback Period | PR rows 300-350 | NOT TRACED |
| Cash Flow Statement | PR rows 200-300 | NOT TRACED |
| Profit & Loss | PR rows 200-300 | NOT TRACED |

## Project_Report DataSheet References

Total Project_Report → DataSheet references: 31

### All Project_Report Formula References to DataSheet

| PR Cell | PR Row | Formula |
|---------|--------|---------|
| G9 | undefined | `DataSheet!B9` |
| G16 | undefined | `DataSheet!B14` |
| G17 | undefined | `DataSheet!B15` |
| H18 | undefined | `DataSheet!D16` |
| H19 | undefined | `DataSheet!D16` |
| H20 | undefined | `DataSheet!H17` |
| B57 | undefined | `DataSheet!B121:D121` |
| I57 | undefined | `DataSheet!E121` |
| B58 | undefined | `DataSheet!B122:D122` |
| I58 | undefined | `DataSheet!E122` |
| B59 | undefined | `DataSheet!B123:D123` |
| I59 | undefined | `DataSheet!E123` |
| B60 | undefined | `DataSheet!B124:D124` |
| I60 | undefined | `DataSheet!E124` |
| B61 | undefined | `DataSheet!B125:D125` |
| I61 | undefined | `DataSheet!E125` |
| B62 | undefined | `DataSheet!B126:D126` |
| I62 | undefined | `DataSheet!E126` |
| B63 | undefined | `DataSheet!B127:D127` |
| I63 | undefined | `DataSheet!E127` |
| B64 | undefined | `DataSheet!B134:D134` |
| I64 | undefined | `DataSheet!E134` |
| B65 | undefined | `DataSheet!B135:D135` |
| I65 | undefined | `DataSheet!E135` |
| B66 | undefined | `DataSheet!B136:D136` |
| I66 | undefined | `DataSheet!E136` |
| B67 | undefined | `DataSheet!B137:D137` |
| I67 | undefined | `DataSheet!E137` |
| B68 | undefined | `DataSheet!B138:D138` |
| I68 | undefined | `DataSheet!E138` |
| H259 | undefined | `DataSheet!H74:I74` |

## All Cross-Sheet References in Project_Report

Project_Report references sheets: Application_form, DataSheet, REF, DPR_print

## DPR_print Cross-Sheet References

DPR_print references sheets: Project_Report, DataSheet, DPR_FRONT, REF

## Complete Cost Aggregation Chain

```
Building:       F41:G41 → H41=IF(F>=1,F*G,G) ─┐
                 ... (7 items)                   │
                                                  → H48=SUM(H41:H47) ─┐
                                                                        │
Machinery:      F54:G54 → H54=IF(F>=1,F*G,G) ─┐                        │
                 ... (13 items)                  │                       │
                                                  → H67=SUM(H54:H66) ─┐│
                                                                        ││
Preliminary:    H70 (direct input) ───────────────────────────────────┐││
Furniture:      H72 (direct input) ───────────────────────────────────┤││
Contingency:    H74 (direct input) ───────────────────────────────────┴┴┘
                                                                         │
Working Capital: H76=SUM(H70:I74) ────────────────────────────────────┐│
                                                                         ││
Sales:          F94:G94 → H94=IF(G>=1,G*F,F) ─┐                       ││
                 ... (8 items)                   │                      ││
                                                  → H102=SUM(H94:H101)  ││
Raw Mats:       F107:G107 → H107=IF(G>=1,G*F,F) ─┐                    ││
                 ... (9 items)                    │                     ││
                                                   → H116=SUM(H107:115)││
Wages:          E121:F121 → H121=E*F*12 ─┐                            ││
                 ... (7 items)              │                           ││
                                               → H128=SUM(H121:H127)   ││
Salaries:       E134:F134 → H134=E*F*12 ─┐                            ││
                 ... (5 items)              │                           ││
                                               → H139=SUM(H134:H138)   ││
                                                                         ││
Overheads:      F157 → H157=F157*H102 (Repair) ─┐                      ││
                 ... (7 items)                    │                     ││
                                                   → (individual cells) ││
=========================================================================VV
DPR_print:      H115=H93+H108+H109+H111+H113 (Project Cost ex WC)
                H117=ROUND(H290,0) (Working Capital Amount)
                H119=H115+H117 (TOTAL PROJECT COST)
                H123=ROUND(F123*H119,0) (SUBSIDY AMOUNT)
                H126=ROUND(F125*H115,0) (OWN CONTRIBUTION - Fixed)
                H127=ROUND(F125*H117,0) (OWN CONTRIBUTION - WC)
                H129=ROUND(H126+H127,0) (TOTAL OWN CONTRIBUTION)
                H131=IF cap logic (SUBSIDY WITH CAP)
```

## Undiscovered Formulas in Project_Report

The following 137 formulas in Project_Report have not been individually traced.
Based on their prevalence, they likely implement:

1. **DSCR** (Debt Service Coverage Ratio) = Net Profit / Debt Service
2. **ROI** (Return on Investment) = Net Profit / Total Investment × 100
3. **Payback Period** = Total Investment / Annual Net Cash Flow
4. **Break-even Point** = Fixed Cost / (Sales Price - Variable Cost)
5. **Cash Flow Statement** — annual cash inflows/outflows
6. **Profit & Loss Statement** — annual revenue minus expenses
7. **Balance Sheet** — assets = liabilities + equity

These are standard PMEGP DPR financial analysis sections and would be the
next logical audit target for Phase 5 if needed.
