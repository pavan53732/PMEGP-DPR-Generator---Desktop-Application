# BrokenReferences.md

## DPRPACKAGE.xls — Broken Formula Registry

### Identified Broken References

#### 1. DPR_print!B94 (Cell B94)

| Property | Value |
|----------|-------|
| **Sheet** | DPR_print |
| **Cell** | B94 |
| **Address (R1C1)** | R94C2 |
| **Broken Formula** | `=DataSheet!#REF!` |
| **Symptoms** | `#REF!` error displayed in cell |
| **Label context** | Row 94 contains project cost line items |

**Root Cause:** The formula originally referenced a DataSheet cell or range that was deleted. The `#REF!` error propagated when the source range was removed during editing.

**Impact:** Functional — this cell should be displaying a cost value pulled from DataSheet. Instead it shows an error, which cascades into any DPR_print totals that depend on row 94.

**Dependencies:** DPR_print!H93 = `SUM(H86:H92)` — row 93 contains the subtotal up to row 92. Row 94 is the broken row, then row 95+ continue with subsequent cost items. The total at row 115 `=H93+H108+H109+H111+H113` does NOT include H94, so the broken reference may be partially isolated.

**Suggested Repair:**

1. Determine what DataSheet range was originally referenced (likely DataSheet!B48:E48 or similar pre-operative cost row)
2. Check if DataSheet row 48 is the intended source (currently a hidden row with building-related calculations)
3. Replace with the correct DataSheet target range, or remove the cell reference entirely if the row is legacy/unused

**Repair Priority:** MEDIUM — the broken cell displays `#REF!` in the DPR_print output, but parent formulas (H115, H119) may exclude H94 from their sums.

#### 2. `_xlfn.SINGLE` Named Range

| Property | Value |
|----------|-------|
| **Scope** | Workbook |
| **Named Range** | `_xlfn.SINGLE` |
| **Resolves To** | `=#NAME?` |
| **Source** | Unsupported BIFF function (possibly XL4 macro function) |

**Root Cause:** The workbook was created in an older Excel version or with an add-in that provided a custom function named `SINGLE`. The function definition is not present in the current file, causing the `#NAME?` error.

**Impact:** Cosmetic — no cell references use this named range. It does not affect any calculation or output.

**Repair Strategy:** Remove the orphaned named range. No code impact.

#### 3. DataSheet!M36 (Cell M36)

| Property | Value |
|----------|-------|
| **Sheet** | DataSheet |
| **Cell** | M36 |
| **Value** | `#VALUE!` |
| **Root Cause** | The formula in M36 attempts an arithmetic operation on incompatible types (likely text operand where numeric expected) |
| **Impact** | Localized — M36 is in the hidden column M which stores helper/lookup data. The `#VALUE!` error likely prevents the corresponding row value from being used in INDEX/MATCH lookups. |

**Note:** This error was identified in the raw cell dump as `M36=#VALUE!`. The broken value does not cascade into print outputs because M36 is in a hidden helper column.

### Impact Summary

| # | Location | Severity | Type | Affects Output? |
|---|----------|----------|------|----------------|
| 1 | DPR_print!B94 | Medium | `#REF!` | Yes — DPR print output shows error |
| 2 | `_xlfn.SINGLE` | Low | `#NAME?` | No — orphaned named range |
| 3 | DataSheet!M36 | Low | `#VALUE!` | No — hidden helper column |

### Systematic Detection Notes

- Total formulas across workbook: ~987 (6 + 96 + 741 + 137 + 7)
- Total verified broken formulas: 1 primary (DPR_print!B94)
- Orphaned named range: 1 (`_xlfn.SINGLE`)
- Additional `#VALUE!` error: 1 (DataSheet!M36)
- The extracted formula text for DPR_print!R94C2 (cell B94) contains `=DataSheet!#REF!` which confirms a deleted precedent range.

### Recommendations

1. Fix DPR_print!B94 by determining correct DataSheet source
2. Remove orphaned `_xlfn.SINGLE` named range
3. Investigate DataSheet!M36 to determine if it impacts any lookup
