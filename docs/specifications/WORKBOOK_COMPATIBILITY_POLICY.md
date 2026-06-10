# Workbook Compatibility Policy

## 1. Scope
This policy dictates how the `WorkbookReader` utility and the core application treat imported `DPRPACKAGE.xls` files to ensure financial parity and prevent silent data corruption.

## 2. Workbook States

### SUPPORTED
- **Condition**: The workbook's structural fingerprint (sheet count, names, explicit cell markers) and its formula registry hash exactly match the known, verified PMEGP template version.
- **Action**: Import proceeds smoothly. The `metadata.formulaRegistryHash` is stamped with the known hash.

### WARNING
- **Condition**: The workbook structure matches the expected format, but the computed formula registry hash does not match the known hash (indicating minor user edits to formulas, such as expanding a sum range).
- **Action**: Import is allowed, but the user is explicitly warned: *"Minor structural modifications detected. The generated DPR may not match the original workbook exactly."* The `metadata.formulaRegistryHash` is stamped with the custom computed hash, which flags the audit log.

### BLOCKED
- **Condition**: The workbook lacks critical sheets (`DataSheet`, `DPR_print`, `Project_Report`, `Application_form`), sheet count is insufficient, or essential structural markers (e.g., Applicant Name at `B8`, Project Cost formula signature) are missing or fundamentally altered.
- **Action**: Import is strictly blocked. An error is shown: *"Unsupported Workbook Version: The structural fingerprint of this workbook is unknown or severely modified."* No data is imported.

## 3. Version Fingerprinting Strategy
The structural fingerprint is composed of:
1. `SheetNames` array hash.
2. Presence of 10 anchor cells (e.g., `DataSheet!B8`, `DataSheet!H53`).
3. Hash of all formulas located in `DataSheet` and `Project_Report`.
