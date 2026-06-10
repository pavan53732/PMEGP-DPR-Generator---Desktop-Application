# WorkbookMetadata.md

## DPRPACKAGE.xls — Metadata & Properties

### General Properties

| Property | Value |
|----------|-------|
| **File** | DPRPACKAGE.xls |
| **Format** | BIFF8 (.xls) |
| **Version** | Legacy Excel 97-2003 format |
| **Compatibility** | Open with Excel 97-2003, LibreOffice, or newer Excel with compatibility mode |

### Sheet Summary

| Sheet Name | State | Rows | Cols | Formulas | Merged Cells | Hidden Rows | Hidden Cols |
|------------|-------|------|------|----------|-------------|-------------|-------------|
| Application_form | visible | 88 | 22 | 6 | 25 | 78-88 (11) | none |
| DataSheet | visible | 268 | 22 | 96 | 299 | 67 hidden, see HiddenStructureReport | K-T (10 cols) |
| DPR_print | visible | 537 | 256 | 741 | 498 | none | K-CY (245 cols) |
| Project_Report | visible | 425 | 14 | 137 | 754 | 417-425 (9) | none |
| DPR_FRONT | visible | 44 | 9 | 7 | 12 | 40-42 (3) | J-CY (248 cols) |

### Named Ranges

| Name | Refers To |
|------|-----------|
| `_xlfn.SINGLE` | `=#NAME?` (broken/unsupported function) |
| `Application_form!Print_Area` | `=Application_form!$A$1:$J$77` |
| `DataSheet!Print_Area` | `=DataSheet!$A$1:$J$268` |
| `DPR_print!Print_Area` | `=DPR_print!$A$1:$J$405` |
| `Project_Report!Print_Area` | `=Project_Report!$A$1:$K$416` |
| `DPR_FRONT!Print_Area` | `=DPR_FRONT!$A$1:$AJ$39` |

### Print Areas

| Sheet | Print Area |
|-------|-----------|
| Application_form | A1:J77 |
| DataSheet | A1:J268 |
| DPR_print | A1:J405 |
| Project_Report | A1:K416 |
| DPR_FRONT | A1:AJ39 |

### Page Breaks

| Sheet | Horizontal | Vertical |
|-------|-----------|----------|
| Application_form | 2 | 0 |
| DataSheet | 4 | 0 |
| DPR_print | 0 | 0 |
| Project_Report | 0 | 0 |
| DPR_FRONT | 0 | 0 |

### Data Validations

No data validation rules found in any sheet across the workbook.

### Protection

No sheet-level or workbook-level protection detected.

### Cell Comments

No cell comments found.

### Known Broken References

- **DPR_print!B94** (R94C2): `=DataSheet!#REF!` — A `#REF!` error referencing DataSheet
- The `_xlfn.SINGLE` named range resolves to `=#NAME?` suggesting an unsupported BIFF function was used

### Format Quirks

- DPR_print uses 256 columns (legacy max) with only columns A-J actually containing data; K-CY hidden
- DPR_FRONT similarly uses 257 columns with only A-I relevant
- Heavy use of merged cells (754 in Project_Report alone) suggests complex layout formatting
- Hidden columns K-T (cols 11-20) in DataSheet contain helper/dropdown/lookup data essential for formula calculations
