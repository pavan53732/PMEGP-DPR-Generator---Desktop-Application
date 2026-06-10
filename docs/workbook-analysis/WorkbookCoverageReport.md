# WorkbookCoverageReport.md
## Automated Coverage Verification

Generated: 2026-06-10T02:08:56.864Z

## 1. Sheet Cell Statistics

| **Application_form** | 1936 | 41 | 6 | 33 | 8 | 1056 |
| **DataSheet** | 5896 | 290 | 96 | 190 | 99 | 3216 |
| **DPR_print** | 137472 | 1128 | 741 | 359 | 743 | 132102 |
| **Project_Report** | 5950 | 452 | 137 | 279 | 169 | 1700 |
| **DPR_FRONT** | 396 | 13 | 7 | 8 | 0 | 0 |
| **TOTAL** | 151650 | 1924 | 987 | 869 | 1019 | 138074 |

## 2. DataSheet Coverage Against FieldRegistry_FULL

| Category | Count |
|----------|-------|
| Total non-empty DataSheet cells (visible cols) | 240 |
| Registered in FieldRegistry_FULL | 240 |
| **UNMAPPED** | **0** |
| Hidden helper (col K-T) | 50 |

**Result: 0 unmapped cells — FieldRegistry_FULL is complete for DataSheet visible columns.**

## 3. Cross-Sheet Reference Coverage

| Sheet | Total Formulas | Documented In | Coverage |
|-------|---------------|---------------|----------|
| Application_form | 6 | FormulaRegistry.md, CellMappings.md | 100% |
| DPR_print | 741 | FormulaRegistry.md, DependencyGraph.md | 230/741 traced to DataSheet |
| Project_Report | 137 | PHASE4_FINANCIAL_ENGINE_PROOF.md | Formula count known, NOT individually traced |
| DPR_FRONT | 7 | FormulaRegistry.md, Phase 3 | 100% (7 formulas) |

## 4. Hidden Column (K-T) Coverage

| Column | Cells With Data | Documented In | Coverage |
|--------|----------------|---------------|----------|
| K | 1 | HiddenStructureReport.md, EnumRegistry.json | 100% |
| L | 33 | HiddenStructureReport.md, EnumRegistry.json | 100% |
| M | 9 | HiddenStructureReport.md, EnumRegistry.json | 100% |
| N | 0 | HiddenStructureReport.md, EnumRegistry.json | 100% |
| O | 0 | HiddenStructureReport.md, EnumRegistry.json | 100% |
| P | 1 | HiddenStructureReport.md, EnumRegistry.json, Phase 2 audit | 100% |
| Q | 1 | HiddenStructureReport.md, EnumRegistry.json, FormulaSemantics.md (Q column) | 100% |
| R | 4 | HiddenStructureReport.md, EnumRegistry.json, FormulaSemantics.md (R57-R60) | 100% |
| S | 0 | HiddenStructureReport.md, EnumRegistry.json | 100% |
| T | 0 | HiddenStructureReport.md, EnumRegistry.json | 100% |

## 5. Enum Coverage Verification

| Enum | Values | Source Column | Verified Against Workbook |
|------|--------|---------------|--------------------------|
| agency | 4 values | M | ⚠️ Review |
| gender | 3 values | M | ⚠️ Review |
| location | 2 values | M | ⚠️ Review |
| category | 9 values | M | ⚠️ Review |
| businessType | 2 values | M | ⚠️ Review |
| education | 7 values | M | ⚠️ Review |
| premises | 3 values | M | ⚠️ Review |
| existingUnit | 2 values | M | ⚠️ Review |

## 6. Broken Reference Verification

| DPR_print | B94 | `#REF!` | #REF! |
| DPR_FRONT | B33 | #REF! | #REF! |
| DPR_FRONT | B35 | #REF! | #REF! |
| DPR_FRONT | B36 | #REF! | #REF! |
| DPR_FRONT | B37 | #REF! | #REF! |
| DPR_FRONT | F37 | #REF! | #REF! |
| Project_Report | G14 | #REF! | #REF! |
| Project_Report | J20 | #REF! | #REF! |
| Project_Report | H21 | #REF! | #REF! |
| Project_Report | H22 | #REF! | #REF! |
Total active broken references: 10

## 7. Coverage Summary

| Area | Coverage |
|------|----------|
| DataSheet visible cells in FieldRegistry_FULL | 100.0% (240/240) |
| Hidden helper columns documented | 100% (in HiddenStructureReport.md + EnumRegistry.json) |
| Application_form formulas documented | 100% |
| DPR_print formulas traced to DataSheet | ~31% (230/741) |
| DPR_FRONT formulas documented | 100% |
| Project_Report formulas individually traced | 0% (137 untraced) |
| Enum values locked | 100% (8 enums in EnumRegistry.json) |
| Financial formulas with code specs | 31 in FormulaSemantics.md |

## 8. Known Gaps

| Gap | Impact | Recommended Action |
|-----|--------|-------------------|
| 137 Project_Report formulas untraced | DSCR/ROI/payback not implementable from docs alone | Phase 5: Decompose PR sheet row by row |
| 511 DPR_print formulas not traced individual | Every output value does not have full source chain | Phase 5: Automated formula → source mapping |
| Narrative text flow not formula-proven | Narrative sections rely on cell text, not formulas | Compare DataSheet row text content against DPR_print output |
| FieldRegistry_FULL classifies labels as fields | ~85 labels vs ~65 inputs vs ~22 calculated | Review and separate label vs input vs calculated in the registry |

