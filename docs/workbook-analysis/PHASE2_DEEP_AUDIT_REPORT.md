# Phase 2 Deep Semantic Audit Report

## 1. Complete Enum Registry

### Agency
- Current selection index: 1
- Enum values:
  - 1: KVIC
  - 2: KVIB
  - 3: DIC
  - 4: COIR Board

### Gender
- Current selection index: 1
- Enum values:
  - 1: Male
  - 2: Female
  - 3: Transgender

### Location
- Current selection index: 1
- Enum values:
  - 1: Rural
  - 2: Urban

### Category
- Current selection index: 1
- Enum values:
  - 1: SC
  - 2: ST
  - 3: OBC
  - 4: PHC
  - 5: Ex- Serviceman
  - 6: Minority
  - 7: Hill Boarder Area
  - 8: Aspirational Districts
  - 9: General

### BusinessType
- Current selection index: 1
- Enum values:
  - 1: Manufacturing 
  - 2: Service

### Education
- Current selection index: 4
- Enum values:
  - 1: Under 8th
  - 2: 8th Pass
  - 3: 10th Pass
  - 4: 12th Pass
  - 5: Graduate
  - 6: Post Graduate
  - 7: PhD

### Premises
- Current selection index: 2
- Enum values:
  - 1: Own
  - 2: Rented
  - 3: Leased

## 2. Hidden Columns (K-T) Complete Inventory

### Column K (11)
| Row | Cell | Value | Formula |
|-----|------|-------|---------|
| undefined | K46 |   |  |

### Column L (12)
| Row | Cell | Value | Formula |
|-----|------|-------|---------|
| undefined | L25 | 0.35 | IF(DataSheet!M59=4,IF(AND(DataSheet!M56=1, DataSheet!M70=8),15%,25%),IF(AND(DataSheet!M56=1, DataShe |
| undefined | L55 | Male |  |
| undefined | L56 | Female |  |
| undefined | L57 | Transgender |  |
| undefined | L59 | KVIC |  |
| undefined | L60 | KVIB |  |
| undefined | L61 | DIC |  |
| undefined | L62 | COIR Board |  |
| undefined | L64 | Rural |  |
| undefined | L65 | Urban |  |
| undefined | L67 | No |  |
| undefined | L68 | Yes |  |
| undefined | L70 | SC |  |
| undefined | L71 | ST |  |
| undefined | L72 | OBC |  |
| undefined | L73 | PHC |  |
| undefined | L74 | Ex- Serviceman |  |
| undefined | L75 | Minority |  |
| undefined | L76 | Hill Boarder Area |  |
| undefined | L77 | Aspirational Districts |  |
| undefined | L78 | General |  |
| undefined | L80 | Manufacturing  |  |
| undefined | L81 | Service |  |
| undefined | L83 | Under 8th |  |
| undefined | L84 | 8th Pass |  |
| undefined | L85 | 10th Pass |  |
| undefined | L86 | 12th Pass |  |
| undefined | L87 | Graduate |  |
| undefined | L88 | Post Graduate |  |
| undefined | L89 | PhD |  |
| undefined | L91 | Own |  |
| undefined | L92 | Rented |  |
| undefined | L93 | Leased |  |

### Column M (13)
| Row | Cell | Value | Formula |
|-----|------|-------|---------|
| undefined | M36 | #VALUE! | L59:L62 |
| undefined | M55 | 1 |  |
| undefined | M59 | 1 |  |
| undefined | M64 | 1 |  |
| undefined | M67 | 1 |  |
| undefined | M70 | 1 |  |
| undefined | M80 | 1 |  |
| undefined | M83 | 4 |  |
| undefined | M91 | 2 |  |

### Column P (16)
| Row | Cell | Value | Formula |
|-----|------|-------|---------|
| undefined | P61 | 1 |  |

### Column Q (17)
| Row | Cell | Value | Formula |
|-----|------|-------|---------|
| undefined | Q55 | 0.35 | IF(IF(AND(DataSheet!M55=1, DataSheet!M70=9, DataSheet!M64=2),15%,25%),IF(AND(DataSheet!M55=1, DataSh |

### Column R (18)
| Row | Cell | Value | Formula |
|-----|------|-------|---------|
| undefined | R57 | 35 | IF(M64=2,IF(AND(M55=1,M70=9),15,25),IF(AND(M55=1,M70=9),25,35)) |
| undefined | R58 | 25 | IF(AND(M55=1,M70=9,M64=2),15,25) |
| undefined | R59 | 25 | IF(AND(M55=1,M64=1,M70=9),35,25) |
| undefined | R60 | 0 | IF(AND(M57=1,M72=9,M66=2),15,0) |

## 3. Complete Financial Calculation Lineage

### Building
- Input rows: 41, 42, 43, 44, 45, 46, 47
- Non-zero inputs: B41=2 Floor Building
- Total cell: H48
- Calculation formulas:
  - H41: IF(F41>=1,F41*G41,G41)
  - H42: IF(F42>=1,F42*G42,G42)
  - H43: IF(F43>=1,F43*G43,G43)
  - H44: IF(F44>=1,F44*G44,G44)
  - H45: IF(F45>=1,F45*G45,G45)
  - H46: IF(F46>=1,F46*G46,G46)
  - H47: IF(F47>=1,F47*G47,G47)

### Machinery
- Input rows: 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66
- Total cell: H67
- Calculation formulas:
  - H54: IF(F54>=1,F54*G54,G54)
  - H55: IF(F55>=1,F55*G55,G55)
  - Q55: IF(IF(AND(DataSheet!M55=1, DataSheet!M70=9, DataSheet!M64=2),15%,25%),IF(AND(DataSheet!M55=1, DataSheet!M70=9, DataSheet!M64=1),25%,35%))
  - H56: IF(F56>=1,F56*G56,G56)
  - H57: IF(F57>=1,F57*G57,G57)
  - R57: IF(M64=2,IF(AND(M55=1,M70=9),15,25),IF(AND(M55=1,M70=9),25,35))
  - H58: IF(F58>=1,F58*G58,G58)
  - R58: IF(AND(M55=1,M70=9,M64=2),15,25)
  - H59: IF(F59>=1,F59*G59,G59)
  - R59: IF(AND(M55=1,M64=1,M70=9),35,25)
  - H60: IF(F60>=1,F60*G60,G60)
  - R60: IF(AND(M57=1,M72=9,M66=2),15,0)
  - H61: IF(F61>=1,F61*G61,G61)
  - H62: IF(F62>=1,F62*G62,G62)
  - H63: IF(F63>=1,F63*G63,G63)
  - H64: IF(F64>=1,F64*G64,G64)
  - H65: IF(F65>=1,F65*G65,G65)
  - H66: IF(F66>=1,F66*G66,G66)

### WorkingCapital
- Input rows: 70, 72, 74
- Total cell: H76

### Sales
- Input rows: 94, 95, 96, 97, 98, 99, 100, 101
- Total cell: H102
- Calculation formulas:
  - H94: IF(G94>=1,G94*F94,F94)
  - H95: IF(G95>=1,G95*F95,F95)
  - H96: IF(G96>=1,G96*F96,F96)
  - H97: IF(G97>=1,G97*F97,F97)
  - H98: IF(G98>=1,G98*F98,F98)
  - H99: IF(G99>=1,G99*F99,F99)
  - H100: IF(G100>=1,G100*F100,F100)
  - H101: IF(G101>=1,G101*F101,F101)

### RawMaterials
- Input rows: 107, 108, 109, 110, 111, 112, 113, 114, 115
- Total cell: H116
- Calculation formulas:
  - H107: IF(G107>=1,G107*F107,F107)
  - H108: IF(G108>=1,G108*F108,F108)
  - H109: IF(G109>=1,G109*F109,F109)
  - H110: IF(G110>=1,G110*F110,F110)
  - H111: IF(G111>=1,G111*F111,F111)
  - H112: IF(G112>=1,G112*F112,F112)
  - H113: IF(G113>=1,G113*F113,F113)
  - H114: IF(G114>=1,G114*F114,F114)
  - H115: IF(G115>=1,G115*F115,F115)

### Wages
- Input rows: 121, 122, 123, 124, 125, 126, 127
- Total cell: undefined
- Calculation formulas:
  - H121: E121*F121*G120
  - H122: E122*F122*G120
  - H123: E123*F123*G120
  - H124: E124*F124*G120
  - H125: E125*F125*G120
  - H126: E126*F126*G120
  - H127: E127*F127*G120
- Total worker cell: E128
- Total cost cell: H128

### Salaries
- Input rows: 134, 135, 136, 137, 138
- Total cell: undefined
- Calculation formulas:
  - H134: E134*F134*G133
  - H135: E135*F135*G133
  - H136: E136*F136*G133
  - H137: E137*F137*G133
  - H138: E138*F138*G133
- Total cost cell: H139

### Financial Parameters
- paybackPeriod: 5
- implementationMonths: 2
- totalMonths: 12
- interestRate: null
- depreciationBuilding: null
- depreciationMachinery: null

### Complete Subsidy/Margin Money Logic Chain

**G85**: `IF(AND(DataSheet!M55=1, DataSheet!M70=9),10%,5%)`
  Current value: 5%

**G86**: `100%-G85`
  Current value: 95%

**G87**: `IF(DataSheet!M64=2,IF(AND(DataSheet!M55=1,DataSheet!M70=9),15%,25%),IF(AND(DataSheet!M55=1,DataSheet!M70=9),25%,35%))`
  Current value: 35%

### R-Column Margin Money Helper Formulas

- Row undefined: `IF(AND(M57=1,M72=9,M66=2),15,0)`

### DPR_print Subsidy Cap Formula (F131)

**F131**: `DataSheet!G87`
  Current value: 35%

**H131**: `IF(AND(DataSheet!M83=1, DataSheet!M80=2,H119>500000),"Should not exceed Rs. 5 lakhs Project cost under under Service Industry",IF(AND(DataSheet!M83=1, DataSheet!M80=1,H119>1000000),"Should not exceed Rs. 10 lakhs Project cost under Manufacturing Industry",IF(AND(DataSheet!M83>1, DataSheet!M80=2,H119>2000000), ROUND(2000000*F131,0), IF(AND(DataSheet!M83>1, DataSheet!M80=1,H119>5000000), ROUND(5000000*F131,0),ROUND(H119*F131,0)))))`
  Current value: 0.00

**J131**: `IF(AND(DataSheet!M83>1, DataSheet!M80=2,H119>2000000),"The maximum project cost eligible for subsidy is Rs. 20 lakhs under Service Industry", IF(AND(DataSheet!M83>1, DataSheet!M80=1,H119>5000000),"The maximum project cost eligible for subsidy is Rs. 50 Lakhs under Manufacturing Industry", TRUE))`
  Current value: TRUE

### DPR_print Subsidy Calculation Chain (Rows 119-131)

- Row 119, H119: value=0.00 formula=`H93+H108+H109+H111+H113+H117`
- Row 122, A122: value=3.1
- Row 123, F123: value=5% formula=`DataSheet!G85`
- Row 123, H123: value=0.00 formula=`ROUND((F123*H119),0)`
- Row 125, F125: value=95% formula=`DataSheet!G86`
- Row 126, H126: value=0.00 formula=`ROUND((F125*H115),0)`
- Row 127, H127: value=0.00 formula=`ROUND((F125*H117),0)`
- Row 129, H129: value=0.00 formula=`ROUND((H126+H127),0)`
- Row 131, F131: value=35% formula=`DataSheet!G87`
- Row 131, H131: value=0.00 formula=`IF(AND(DataSheet!M83=1, DataSheet!M80=2,H119>500000),"Should not exceed Rs. 5 lakhs Project cost under under Service Industry",IF(AND(DataSheet!M83=1, DataSheet!M80=1,H119>1000000),"Should not exceed Rs. 10 lakhs Project cost under Manufacturing Industry",IF(AND(DataSheet!M83>1, DataSheet!M80=2,H119>2000000), ROUND(2000000*F131,0), IF(AND(DataSheet!M83>1, DataSheet!M80=1,H119>5000000), ROUND(5000000*F131,0),ROUND(H119*F131,0)))))`
- Row 131, J131: value=TRUE formula=`IF(AND(DataSheet!M83>1, DataSheet!M80=2,H119>2000000),"The maximum project cost eligible for subsidy is Rs. 20 lakhs under Service Industry", IF(AND(DataSheet!M83>1, DataSheet!M80=1,H119>5000000),"The maximum project cost eligible for subsidy is Rs. 50 Lakhs under Manufacturing Industry", TRUE))`

## 4. Narrative Engine Flow Map

### Introduction
- Source: DataSheet!B182
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### About Promoter
- Source: DataSheet!B200
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### Office Address
- Source: DataSheet!B219
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### District
- Source: DataSheet!B220
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### Kvic Commission
- Source: DataSheet!B221
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### Taluk Block
- Source: DataSheet!B224
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### State
- Source: DataSheet!F224
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### Signature Name
- Source: DataSheet!B227
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### Introduction Beneficiary
- Source: DataSheet!B233
- Target reports: No direct formula references found — likely pulled via Project_Report chain

### About Beneficiary
- Source: DataSheet!B250
- Target reports: No direct formula references found — likely pulled via Project_Report chain

## 5. Output Sheet Traceability

### Application_form → DataSheet References

| Form Cell | Formula | Value |
|-----------|---------|-------|
| B59 | `INDEX(DataSheet!L91:L93,DataSheet!M91,B1)` | Rented |
| C59 | `DataSheet!H48` | 0 |
| D59 | `DataSheet!H67+DataSheet!H72` | 0 |
| E59 | `DataSheet!H70+DataSheet!H74` | 0 |
| F59 | `DataSheet!H76` | 0 |
| G59 | `SUM(C59:F59)` | 0 |

### DPR_print → DataSheet References (sample — first 30)

| DPR Cell | Formula | DPR Row | Value |
|----------|---------|---------|-------|
| E8 | `DataSheet!B11` | undefined | 0 |
| H14 | `DataSheet!C18` | undefined | 0 |
| F15 | `DataSheet!C19` | undefined | 0 |
| F16 | `DataSheet!G19` | undefined | 0 |
| E20 | `DataSheet!B32` | undefined | 0 |
| F31 | `DataSheet!F179` | undefined | 5 |
| F34 | `DataSheet!G181` | undefined | 0 |
| F43 | `DataSheet!G154` | undefined | 0 |
| E46 | `DataSheet!B107&","&DataSheet!B108&","&DataSheet!B109` | undefined | ,, |
| B53 | `DataSheet!B234` | undefined | 0 |
| B69 | `DataSheet!B251` | undefined | 0 |
| F83 | `DataSheet!F36:G36` | undefined | 0 |
| B86 | `DataSheet!B41:E41` | undefined | 2 Floor Building |
| F86 | `DataSheet!F41` | undefined | 0 |
| G86 | `DataSheet!G41` | undefined | 0.00 |
| H86 | `DataSheet!H41:I41` | undefined | 0.00 |
| B87 | `DataSheet!B42:E42` | undefined | 0 |
| F87 | `DataSheet!F42` | undefined | 0 |
| G87 | `DataSheet!G42` | undefined | 0.00 |
| H87 | `DataSheet!H42:I42` | undefined | 0.00 |
| B88 | `DataSheet!B43:E43` | undefined | 0 |
| F88 | `DataSheet!F43` | undefined | 0 |
| G88 | `DataSheet!G43` | undefined | 0.00 |
| H88 | `DataSheet!H43:I43` | undefined | 0.00 |
| B89 | `DataSheet!B44:E44` | undefined | 0 |
| F89 | `DataSheet!F44` | undefined | 0 |
| G89 | `DataSheet!G44` | undefined | 0.00 |
| H89 | `DataSheet!H44:I44` | undefined | 0.00 |
| B90 | `DataSheet!B45:E45` | undefined | 0 |
| F90 | `DataSheet!F45` | undefined | 0 |

(Total DPR_print→DataSheet references: 230)

### DPR_FRONT → Source References

| Front Cell | Formula | Value |
|-----------|---------|-------|
| B2 | `UPPER(Application_form!B55)` |  |
| B33 | `#REF!` | #REF! |
| B34 | `INDEX(Application_form!T21:T24,DataSheet!M59)` | Khadi & V.I. Commission |
| B35 | `#REF!` | #REF! |
| B36 | `#REF!` | #REF! |
| B37 | `#REF!` | #REF! |
| F37 | `#REF!` | #REF! |

## 6. Complete Field Inventory (DataSheet Visible + Hidden)

Total cells with content in DataSheet: 172

### Total fields inventoried: 0

