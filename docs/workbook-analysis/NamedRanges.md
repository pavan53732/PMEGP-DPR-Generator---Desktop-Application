# NamedRanges.md

## DPRPACKAGE.xls — Named Ranges Registry

| Range Name | Sheet Context | Refers To | Status |
|-----------|---------------|-----------|--------|
| `_xlfn.SINGLE` | Global | `=#NAME?` | Broken — XL4 macro function or unsupported BIFF function |
| `Print_Area` | Application_form | `=Application_form!$A$1:$J$77` | Active |
| `Print_Area` | DataSheet | `=DataSheet!$A$1:$J$268` | Active |
| `Print_Area` | DPR_print | `=DPR_print!$A$1:$J$405` | Active |
| `Print_Area` | Project_Report | `=Project_Report!$A$1:$K$416` | Active |
| `Print_Area` | DPR_FRONT | `=DPR_FRONT!$A$1:$AJ$39` | Active |

### Named Range Analysis

1. **Only 6 named ranges exist** — all are auto-generated Print_Area definitions.
2. **Zero user-defined named ranges** — the workbook does not use `=OFFSET`, `=VLOOKUP`, or other name-based formula references.
3. **`_xlfn.SINGLE`** — This is a BIFF function name that modern Excel/xlsx libraries cannot resolve. It likely originates from an XL4 macro sheet function or an add-in function that was once present. The formula evaluates to `#NAME?` indicating the function definition is missing. This is **not** a functional dependency — data analysis confirms no cell references depend on this named range.
4. **Print_Area definitions** — All five sheets have explicit print areas set to printable region boundaries. DPR_print notes: print area set to A1:J405, but the workbook actually extends to 537 rows of formula content.

### Impact

- Missing named ranges mean all formula references in the workbook are direct cell references (e.g., `DataSheet!H48`, `DataSheet!L91:L93`).
- No INDIRECT, OFFSET, or dynamic range formulas are used.
- Formula robustness is low — inserting rows/columns in source sheets would break all dependent formulas.
