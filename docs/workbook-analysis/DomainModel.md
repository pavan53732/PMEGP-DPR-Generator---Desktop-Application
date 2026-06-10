# DomainModel.md

## DPRPACKAGE.xls — Normalized Domain Model

### Entities Derived from Workbook

#### 1. Applicant

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| name | DataSheet!B8 | string | "Name of the Applicant/Institution" |
| genderId | DataSheet!M55 | int | 1=Male, 2=Female, 3=Transgender |
| genderLabel | DataSheet!L55:L57 | enum | Male/Female/Transgender |
| qualificationId | DataSheet!M83 | int | 1=Under 8th ... 7=PhD |
| qualificationLabel | DataSheet!L83:L89 | enum | Education levels |

#### 2. AgencyPreference

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| agencyId | DataSheet!M59 | int | 1=KVIC, 2=KVIB, 3=DIC, 4=COIR Board |
| agencyLabel | DataSheet!L59:L62 | enum | Agency names |

#### 3. Location

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| typeId | DataSheet!M64 | int | 1=Rural, 2=Urban |
| typeLabel | DataSheet!L64:L65 | enum | Rural/Urban |
| taluk | DataSheet!B16 | string | (hidden row) |
| district | DataSheet!B17 | string | (hidden row) |
| pin | DataSheet!G17 | string | (hidden row) |
| state | DataSheet!B18 | string | (hidden row) |
| email | DataSheet!B19 | string | (hidden row) |
| mobile | DataSheet!F19 | string | (hidden row) |

#### 4. Project

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| name | DataSheet!B31 | string | "Name of the project/business activity" |
| legalStatus | DataSheet!B34 | string | Proprietorship/Partnership/Private Ltd/etc. |
| categoryId | DataSheet!M70 | int | 1=SC...9=General |
| categoryLabel | DataSheet!L70:L78 | enum | Social categories |
| businessTypeId | DataSheet!M80 | int | 1=Manufacturing, 2=Service |
| businessTypeLabel | DataSheet!L80:L81 | enum | Manufacturing/Service |
| premisesId | DataSheet!M91 | int | 1=Own, 2=Rented, 3=Leased |
| premisesLabel | DataSheet!L91:L93 | enum | Premises type |

#### 5. Building

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| items[] | DataSheet!B41:E47 | string[] | Building descriptions |
| areas[] | DataSheet!F41:F47 | number[] | Area in sq.ft |
| rates[] | DataSheet!G41:G47 | number[] | Rate/sq.ft |
| amounts[] | DataSheet!H41:H47 | number[] | Calculated: IF(F>=1,F*G,G) |
| total | DataSheet!H48 | number | SUM(H41:H47) |

#### 6. Machinery

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| items[] | DataSheet!B54:E66 | string[] | Machinery descriptions |
| quantities[] | DataSheet!F54:F66 | number[] | Qty |
| rates[] | DataSheet!G54:G66 | number[] | Rate per unit |
| amounts[] | DataSheet!H54:H66 | number[] | Calculated: IF(F>=1,F*G,G) |
| total | DataSheet!H67 | number | SUM(H54:H66) |

#### 7. CapitalCost (Other Costs)

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| preliminaryCost | DataSheet!H70 | number | Preliminary & Pre-operative Cost |
| furnitureCost | DataSheet!H72 | number | Furniture & Fixtures |
| contingencyCost | DataSheet!H74 | number | Contingency/Others/Misc |
| workingCapital | DataSheet!H76 | number | SUM(H70:I74) |
| totalProjectCost | (calculated) | number | Sum of all cost components |

#### 8. Financing

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| ownContributionPercent | DataSheet!G85 | number | IF(AND(M55=1,M70=9),10%,5%) |
| bankFinancePercent | DataSheet!G86 | number | 100%-G85 |
| marginMoneyPercent | DataSheet!G87 | number | Based on category/location |
| ownContributionAmount | DPR_print!H126+H127 | number | Calculated |
| bankFinanceAmount | (calculated) | number | TotalCost - OwnContribution |
| subsidyAmount | DPR_print!H131 | number | Capped per PMEGP rules |

#### 9. SalesProjection

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| products[] | DataSheet!B94:E101 | string[] | Product names |
| rates[] | DataSheet!F94:F101 | number[] | Rate per unit |
| quantities[] | DataSheet!G94:G101 | number[] | Quantity |
| amounts[] | DataSheet!H94:H101 | number[] | IF(G>=1,G*F,F) |
| totalSales | DataSheet!H102 | number | SUM(H94:H101) |

#### 10. RawMaterial

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| materials[] | DataSheet!B107:E115 | string[] | Material names |
| units[] | DataSheet!E107:E115 | string[] | Unit of measure |
| rates[] | DataSheet!F107:F115 | number[] | Rate per unit |
| requiredUnits[] | DataSheet!G107:G115 | number[] | Required quantity |
| amounts[] | DataSheet!H107:H115 | number[] | IF(G>=1,G*F,F) |
| totalCost | DataSheet!H116 | number | SUM(H107:H115) |

#### 11. Labour

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| workerTypes[] | DataSheet!B121:D127 | string[] | Worker descriptions |
| workerCount[] | DataSheet!E121:E127 | number[] | Number of workers |
| wagesPerMonth[] | DataSheet!F121:F127 | number[] | Monthly wage |
| totalMonths | DataSheet!G120 | number | 12 (fixed) |
| amounts[] | DataSheet!H121:H127 | number[] | E*F*G120 |
| totalWorkers | DataSheet!E128 | number | SUM(E121:E127) |
| totalWages | DataSheet!H128 | number | SUM(H121:H127) |

#### 12. Salary

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| staffTypes[] | DataSheet!B134:D138 | string[] | Staff descriptions |
| staffCount[] | DataSheet!E134:E138 | number[] | Number of staff |
| wagesPerMonth[] | DataSheet!F134:F138 | number[] | Monthly salary |
| totalMonths | DataSheet!G133 | number | 12 (fixed) |
| amounts[] | DataSheet!H134:H138 | number[] | E*F*G133 |
| totalStaff | DataSheet!E139 | number | SUM(E134:E138) |
| totalSalaries | DataSheet!H139 | number | SUM(H134:H138) |

#### 13. OverheadExpenses

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| repairMaintenance | DataSheet!H157 | number | F157*H102 (% of sales) |
| powerFuel | DataSheet!H159 | number | F159*H102 |
| otherOverhead | DataSheet!H161 | number | F161*H102 |
| telephone | DataSheet!H163 | number | F163*H102 |
| stationery | DataSheet!H165 | number | F165*H102 |
| advertisement | DataSheet!H167 | number | F167*H102 |
| otherMisc | DataSheet!H171 | number | F171*H102 |

#### 14. FinancialParameters

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| paybackPeriod | DataSheet!F179 | number | Default 5 years |
| implementationMonths | DataSheet!F180 | number | Default 2 months |
| implementationTotalMonths | DataSheet!G180 | number | Default 12 |
| depreciationBuilding | DataSheet!B176 | string | Depreciation on building |
| depreciationMachinery | DataSheet!B177 | string | Depreciation on machinery |
| interestRate | DataSheet!B173 | string | Rate of interest |

#### 15. Narrative

| Field | Source Cell | Type | Notes |
|-------|-----------|------|-------|
| introduction | DataSheet!B182 | string | Free text |
| aboutPromoter | DataSheet!B200 | string | Free text |
| officeAddress | DataSheet!B219 | string | Free text |
| district | DataSheet!B220 | string | Free text |
| kvic | DataSheet!B221 | string | KVIC commission |
| talukBlock | DataSheet!B224 | string | Free text |
| state | DataSheet!F224 | string | Free text |
| signatureName | DataSheet!B227 | string | Name & Signature |
| introduction2 | DataSheet!B233 | string | Duplicate narrative |
| aboutBeneficiary | DataSheet!B250 | string | Free text |

### Entity Relationships

```
Applicant ──┐
            ├── AgencyPreference
            ├── Location
            ├── Project ──┐
            │              ├── Building
            │              ├── Machinery
            │              ├── CapitalCost
            │              ├── Financing
            │              ├── SalesProjection
            │              ├── RawMaterial
            │              ├── Labour
            │              ├── Salary
            │              ├── OverheadExpenses
            │              └── FinancialParameters
            └── Narrative
