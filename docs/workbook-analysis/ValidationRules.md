# ValidationRules.md

## DPRPACKAGE.xls — Data Validation Registry

### Summary

**No Excel data validation rules exist in any sheet of this workbook.**

The `xlrd` forensic summary confirms `"data_validations": []` for all sheets. The `xlsx` library found zero validation definitions.

### Implications

- No dropdown lists, numeric constraints, date limits, or input restrictions are enforced at the workbook level.
- All validation in the current application must be implemented in code (UI-side validation layer).
- The workbook relies entirely on user discipline and formula-based conditional checks (e.g., `IF` statements that flag cost limits) rather than Excel data validation:
  - Example: DPR_print!R131 (Cell F131) contains a multi-conditional `IF` that checks `H119>500000`, `H119>1000000`, `H119>2000000`, `H119>5000000` — these are post-hoc limit checks, not pre-emptive validations.

### Application Impact

- Every field in FieldRegistry.json must have its validation defined in the application layer.
- The workbook provides zero validation structure — all field constraints must be derived from:
  1. Cell labels and field descriptions
  2. Formula behavior (e.g., which cells are summed)
  3. PMEGP scheme rules (external knowledge)
  4. Business logic inferred from formula patterns
