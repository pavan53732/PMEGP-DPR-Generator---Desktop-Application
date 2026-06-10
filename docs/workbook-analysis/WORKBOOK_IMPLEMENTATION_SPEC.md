# WORKBOOK_IMPLEMENTATION_SPEC.md
## Bridge from Reverse Engineering to Production Code

### Architecture

```
UI (Wizard Steps 1-8)
    ↓
DomainService (Business Logic)
    ├── SchemaService     — FieldRegistry_FULL.json
    ├── FinanceService    — FormulaSemantics.md calculations
    ├── SubsidyService    — Truth tables from Phase 3
    ├── EnumService       — EnumRegistry.json
    └── OutputService     — PDF/Excel generation
    ↓
DataLayer
    ├── InputRepository   — stores user inputs
    └── OutputRepository  — generates DPR outputs
```

### Core Contracts

#### 1. FinanceService

| Method | Source | Description |
|--------|--------|-------------|
| `calcOwnContributionPercent(gender, category)` | DataSheet!G85 | Returns 0.05 or 0.10 |
| `calcBankFinancePercent(ownContributionPercent)` | DataSheet!G86 | Returns 1.0 - ownContributionPercent |
| `calcMarginMoneyPercent(location, gender, category)` | DataSheet!G87 | Returns 0.15, 0.25, or 0.35 |
| `calcBuildingAmount(area, rate)` | DataSheet!H41:H47 | IF(F>=1,F*G,G) |
| `calcMachineryAmount(qty, rate)` | DataSheet!H54:H66 | IF(F>=1,F*G,G) |
| `calcWorkingCapital(prelim, furniture, contingency)` | DataSheet!H76 | SUM of three costs |
| `calcSalesAmount(rate, qty)` | DataSheet!H94:H101 | IF(G>=1,G*F,F) |
| `calcRawMaterialCost(rate, reqdUnit)` | DataSheet!H107:H115 | IF(G>=1,G*F,F) |
| `calcAnnualWage(count, wagePerMonth)` | DataSheet!H121:H127 | count × wage × 12 |
| `calcAnnualSalary(count, salaryPerMonth)` | DataSheet!H134:H138 | count × salary × 12 |
| `calcOverhead(percentOfSales, totalSales)` | DataSheet!H157:H171 | percent × totalSales |
| `calcTotalProjectCost(fixedAssetCost, workingCapital)` | DPR_print!H119 | fixedAssets + workingCapital |
| `calcSubsidyCappedAmount(education, businessType, totalCost, marginMoneyPercent)` | DPR_print!F131 | Multi-level cap IF |

#### 2. SubsidyService

| Method | Source | Logic |
|--------|--------|-------|
| `getSubsidyCap(educationId, businessTypeId)` | DPR_print!F131 | Under8th+Service=5L, Under8th+Mfg=10L, 8th++Service=20L, 8th++Mfg=50L |
| `calcSubsidyAmount(totalCost, marginMoneyPercent, cap)` | DPR_print!F131 | If cost>cap → cap×%, else cost×% |
| `getSubsidyCapMessage(cap, exceeded)` | DPR_print!F131 | Returns warning message if cost exceeds cap |

#### 3. EnumService

| Method | Source Enum |
|--------|-------------|
| `getAgencies()` | EnumRegistry.agency |
| `getGenders()` | EnumRegistry.gender |
| `getLocations()` | EnumRegistry.location |
| `getCategories()` | EnumRegistry.category |
| `getBusinessTypes()` | EnumRegistry.businessType |
| `getEducationLevels()` | EnumRegistry.education |
| `getPremisesTypes()` | EnumRegistry.premises |

#### 4. OutputService

| Output | Sheet Source | Key Assemblies |
|--------|-------------|----------------|
| Application Form | Application_form | Row 59: 6 formula outputs mapped to DataSheet |
| DPR Print | DPR_print | Cost tables (rows 86-115), Subsidy (row 131), Narrative (rows 200+) |
| Project Report | Project_Report | 137 formulas, DSCR, payback, financial analysis |
| Cover Page | DPR_FRONT | 7 formula references to DPR_print/Project_Report |

### Data Flow per Wizard Step

| Step | UI Components | Domain Service | Validation |
|------|--------------|----------------|------------|
| 1: Applicant | Text + Radio | EnumService.getAgencies() | Required name |
| 2: Personal | Radio + Text + Select | EnumService.getGenders(), getLocations(), getEducationLevels() | Required fields |
| 3: Project | Radio + Text | EnumService.getCategories(), getBusinessTypes() | Required project name |
| 4: Costs | Dynamic Tables | FinanceService.calcBuildingAmount(), calcMachineryAmount() | Positive numbers |
| 5: Financing | Numeric + Auto% | FinanceService.calcOwnContributionPercent(), etc. | Non-negative |
| 6: Operations | Dynamic Tables | FinanceService.calcSalesAmount(), calcRawMaterialCost(), etc. | Non-negative |
| 7: Overheads | Numeric | FinanceService.calcOverhead() | 0-100% |
| 8: Narrative | Text Areas | Direct storage | Free text |

### Implementation Order

1. EnumService (no dependencies — pure data)
2. FinanceService (depends on EnumService for inputs)
3. SubsidyService (depends on FinanceService for cost calculations)
4. Wizard UI Steps 1-3 (basic text + enum selections)
5. Wizard UI Steps 4-6 (dynamic financial tables)
6. Wizard UI Steps 7-8 (overheads + narrative)
7. OutputService (all outputs — depends on everything above)
