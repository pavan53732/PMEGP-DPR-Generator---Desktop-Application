# FINAL_REPORT.md

## DPRPACKAGE.xls — Workbook Reverse Engineering Final Report

### Overview

The DPRPACKAGE.xls workbook has been fully reverse engineered. This report summarizes the analysis findings, the documentation generated, and the key architectural insights.

### Documentation Generated

| # | File | Description |
|---|------|-------------|
| 1 | MASTER_WORKBOOK_KNOWLEDGE.md | Complete encyclopedia of the workbook |
| 2 | WorkbookSchema.md | Structural schema of all sheets |
| 3 | SheetMappings.md | Sheet-to-application wizards mapping |
| 4 | RowAtlas.md | Row-by-row analysis for every sheet |
| 5 | CellMappings.md | Key cell reference map |
| 6 | FormulaRegistry.md | Complete formula catalog |
| 7 | NamedRanges.md | Named ranges (all auto-print-area) |
| 8 | ValidationRules.md | Data validation (none found) |
| 9 | MergedCells.md | Merged cell registry |
| 10 | DependencyGraph.md | Data flow and dependency graph |
| 11 | DomainModel.md | Normalized domain entities |
| 12 | BrokenReferences.md | Broken formula investigation |
| 13 | WorkbookMetadata.md | Workbook properties and metadata |
| 14 | HiddenStructureReport.md | Hidden structure inventory |
| 15 | FinalRenderMap.md | Output rendering specifications |
| 16 | FieldRegistry.json | 51-field canonical field registry |
| 17 | CellInventory.csv | 1924-cell exhaustive inventory |

### Key Findings

#### 1. Architecture

- **DataSheet is the single source of truth** — all user input enters through this sheet
- **4 output sheets** consume DataSheet data (Application_form, DPR_print, Project_Report, DPR_FRONT)
- **Strict DAG** — no circular references, no sheet references back to DataSheet
- **Hidden columns K-T in DataSheet** contain the enumeration logic and percentage calculations that drive formatting percentages

#### 2. Formula Patterns

- **987 total formulas** across the workbook
- **Primary pattern**: `=IF(F>=1,F*G,G)` for cost calculations (quantity × rate)
- **Percentage pattern**: Hidden M-column indices drive IF-based percentage selection
- **Subsidy logic**: Complex multi-level IF in DPR_print!F131 enforces PMEGP cost limits
- **All references are direct cell references** — no named ranges, no INDIRECT, no OFFSET

#### 3. PMEGP Rules Discovered

| Rule | Evidence |
|------|----------|
| Own Contribution: 10% for Women+General, 5% for others | Formula: `=IF(AND(M55=1,M70=9),10%,5%)` |
| Subsidy cap: ₹5L for Service (8th pass), ₹10L for Mfg (8th pass) | DPR_print!F131 formula |
| Subsidy cap: ₹20L for Service (above 8th), ₹50L for Mfg (above 8th) | DPR_print!F131 formula |
| Margin money varies by category, gender, location | Complex cascaded IF in G87, R57-R60 |
| Bank Finance = 100% - Own Contribution % | Formula: `=100%-G85` |

#### 4. Broken References

- **1 primary `#REF!` error**: DPR_print!B94 with `=DataSheet!#REF!` — functional impact on DPR print output
- **1 orphaned named range**: `_xlfn.SINGLE` — cosmetic only
- **1 `#VALUE!` error**: DataSheet!M36 — hidden helper, minimal impact

#### 5. Financial Engine

The workbook's financial engine is **entirely formula-driven with no manual hardcoding**:

- Building/Machinery costs: `IF(F>=1,F*G,G)` pattern
- Wages/Salaries: `=E*F*12` (workers × wage × 12 months)
- Overheads: `=F*TotalSales` (percentage of total sales)
- Own Contribution: Conditional on gender + category
- Margin Money: Conditional on category + location + business type
- Subsidy: Capped at PMEGP limits with multi-level IF

#### 6. Domain Model

15 entities derived: Applicant, AgencyPreference, Location, Project, Building, Machinery, CapitalCost, Financing, SalesProjection, RawMaterial, Labour, Salary, OverheadExpenses, FinancialParameters, Narrative

#### 7. Application Mapping

8 wizard steps map directly to DataSheet row blocks:

- Step 1: Applicant Details (rows 5-10)
- Step 2: Personal Info (rows 11-23)
- Step 3: Category & Project (rows 25-36)
- Step 4: Building & Machinery (rows 39-67)
- Step 5: Other Costs & Financing (rows 70-89)
- Step 6: Sales, Materials, Labour (rows 91-139)
- Step 7: Overheads & Parameters (rows 142-180)
- Step 8: Narrative (rows 182-268)

### Critical Issues Found

1. **DPR_print!B94 #REF! error** must be fixed before PDF generation
2. **No data validation** in workbook — all validation must be implemented in application
3. **Direct cell references** make the workbook fragile — row reordering breaks formulas
4. **Hidden helper columns** (K-T) contain critical enumeration data not visible in standard view

### Recommendations

1. Implement all workbook formulas as application business logic
2. Use FieldRegistry.json as the canonical schema source
3. Replicate hidden enumeration values (columns L-M) as application enums
4. Fix DPR_print!B94 before generating outputs
5. Do not use the workbook as a runtime dependency — parse once, cache schema
6. Preserve merged-cell layout semantics in PDF generation
7. All financial calculations should use the same conditional logic patterns found in the workbook

### Success Criteria Met

- [x] Entire workbook reverse engineered
- [x] MASTER_WORKBOOK_KNOWLEDGE.md created
- [x] Every sheet documented
- [x] Every row block documented
- [x] Every field documented
- [x] Every formula cataloged
- [x] Every validation documented (none exist)
- [x] Every merged cell documented
- [x] Every dependency mapped
- [x] Every broken reference documented
- [x] Workbook architecture understood
- [x] Domain model derived
- [x] Application schema derived
- [x] Future AI agents can understand DPRPACKAGE.xls without opening Excel
