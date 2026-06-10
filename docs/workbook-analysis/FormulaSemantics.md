# FormulaSemantics.md
## Business Rule Translation of Every Financial Formula

Total financial formulas decoded: 30

### DataSheet!G85

| Property | Value |
|----------|-------|
| **Formula** | `=IF(AND(M55=1,M70=9),10%,5%)` |
| **Domain Field** | `finance.ownContributionPercentage` |
| **Meaning** | Own Contribution %. Concessional 5% for Women/special categories; 10% for Male+General. |
| **Truth Table** | gender=Male(1)+category=General(9) → 10%; all other combinations → 5% |
| **Dependencies** | M55 (Gender), M70 (Category) |
| **Code Spec** | `if (gender === "Male" && category === "General") return 0.10; else return 0.05;` |

### DataSheet!G86

| Property | Value |
|----------|-------|
| **Formula** | `=100%-G85` |
| **Domain Field** | `finance.bankFinancePercentage` |
| **Meaning** | Bank Finance % = 100 - Own Contribution %. Always the complement. |
| **Truth Table** | If G85=10% → G86=90%. If G85=5% → G86=95%. |
| **Dependencies** | G85 (Own Contribution %) |
| **Code Spec** | `return 1.0 - ownContributionPercentage;` |

### DataSheet!G87

| Property | Value |
|----------|-------|
| **Formula** | `=IF(M64=2,IF(AND(M55=1,M70=9),15%,25%),IF(AND(M55=1,M70=9),25%,35%))` |
| **Domain Field** | `finance.marginMoneyPercentage` |
| **Meaning** | Margin Money (Government Subsidy) %. Depends on location, gender, category. |
| **Truth Table** | Urban+Male+General=15%; Urban+other=25%; Rural+Male+General=25%; Rural+other=35% |
| **Dependencies** | M64 (Location), M55 (Gender), M70 (Category) |
| **Code Spec** | `if (location==="Urban") return (gender==="Male"&&category==="General")?0.15:0.25; else return (gender==="Male"&&category==="General")?0.25:0.35;` |

### DataSheet!R57

| Property | Value |
|----------|-------|
| **Formula** | `=IF(M64=2,IF(AND(M55=1,M70=9),15,25),IF(AND(M55=1,M70=9),25,35))` |
| **Domain Field** | `finance.marginMoneyRateRaw` |
| **Meaning** | Same logic as G87 but returns raw number (not formatted %) |
| **Truth Table** | Same as G87: Urban+Male+Gen=15, Urban+other=25, Rural+Male+Gen=25, Rural+other=35 |
| **Dependencies** | M64, M55, M70 |
| **Code Spec** | `same as G87 but returns int (15/25/35)` |

### DataSheet!R58

| Property | Value |
|----------|-------|
| **Formula** | `=IF(AND(M55=1,M70=9,M64=2),15,25)` |
| **Domain Field** | `finance.marginMoneyUrbanMaleGeneral` |
| **Meaning** | Margin money helper: Urban+Male+General specific case |
| **Truth Table** | Urban+Male+General=15; all other combos=25 |
| **Dependencies** | M55, M70, M64 |
| **Code Spec** | `if (gender==="Male"&&category==="General"&&location==="Urban") return 15; else return 25;` |

### DataSheet!R59

| Property | Value |
|----------|-------|
| **Formula** | `=IF(AND(M55=1,M64=1,M70=9),35,25)` |
| **Domain Field** | `finance.marginMoneyRuralMaleGeneral` |
| **Meaning** | Margin money helper: Rural+Male+General specific case |
| **Truth Table** | Rural+Male+General=35; all other combos=25 |
| **Dependencies** | M55, M64, M70 |
| **Code Spec** | `if (gender==="Male"&&location==="Rural"&&category==="General") return 35; else return 25;` |

### DataSheet!H41-H47

| Property | Value |
|----------|-------|
| **Formula** | `=IF(F>=1,F*G,G)` |
| **Domain Field** | `building.items[].amount` |
| **Meaning** | Building cost = area × rate. If no area specified, rate is used as fixed cost. |
| **Truth Table** | F≥1 → H=F×G. F<1 → H=G. |
| **Dependencies** | F (Area), G (Rate) |
| **Code Spec** | `item.area >= 1 ? item.area * item.rate : item.rate` |

### DataSheet!H48

| Property | Value |
|----------|-------|
| **Formula** | `=SUM(H41:H47)` |
| **Domain Field** | `building.totalCost` |
| **Meaning** | Total Building Cost = sum of all building item amounts |
| **Truth Table** | undefined |
| **Dependencies** | H41:H47 |
| **Code Spec** | `buildingItems.reduce((sum, item) => sum + item.amount, 0)` |

### DataSheet!H54-H66

| Property | Value |
|----------|-------|
| **Formula** | `=IF(F>=1,F*G,G)` |
| **Domain Field** | `machinery.items[].amount` |
| **Meaning** | Machinery cost = qty × rate. If qty=0, rate is fixed cost. |
| **Truth Table** | undefined |
| **Dependencies** | F (Qty), G (Rate) |
| **Code Spec** | `item.qty >= 1 ? item.qty * item.rate : item.rate` |

### DataSheet!H67

| Property | Value |
|----------|-------|
| **Formula** | `=SUM(H54:H66)` |
| **Domain Field** | `machinery.totalCost` |
| **Meaning** | Total Machinery Cost |
| **Truth Table** | undefined |
| **Dependencies** | H54:H66 |
| **Code Spec** | `machineryItems.reduce((sum, item) => sum + item.amount, 0)` |

### DataSheet!H76

| Property | Value |
|----------|-------|
| **Formula** | `=SUM(H70:I74)` |
| **Domain Field** | `capitalCost.workingCapital` |
| **Meaning** | Working Capital = PreliminaryCost + FurnitureCost + ContingencyCost |
| **Truth Table** | undefined |
| **Dependencies** | H70 (Preliminary), H72 (Furniture), H74 (Contingency) |
| **Code Spec** | `preliminaryCost + furnitureCost + contingencyCost` |

### DataSheet!H94-H101

| Property | Value |
|----------|-------|
| **Formula** | `=IF(G>=1,G*F,F)` |
| **Domain Field** | `sales.items[].amount` |
| **Meaning** | Sales amount = qty × rate. If qty=0, rate is used as fixed value. |
| **Truth Table** | undefined |
| **Dependencies** | F (Rate), G (Qty) |
| **Code Spec** | `item.qty >= 1 ? item.qty * item.rate : item.rate` |

### DataSheet!H102

| Property | Value |
|----------|-------|
| **Formula** | `=SUM(H94:H101)` |
| **Domain Field** | `sales.totalSales` |
| **Meaning** | Total Sales Revenue |
| **Truth Table** | undefined |
| **Dependencies** | H94:H101 |
| **Code Spec** | `salesItems.reduce((sum, item) => sum + item.amount, 0)` |

### DataSheet!H107-H115

| Property | Value |
|----------|-------|
| **Formula** | `=IF(G>=1,G*F,F)` |
| **Domain Field** | `rawMaterials.items[].cost` |
| **Meaning** | Raw material cost = required_units × rate |
| **Truth Table** | undefined |
| **Dependencies** | F (Rate), G (Reqd Unit) |
| **Code Spec** | `item.requiredUnits >= 1 ? item.requiredUnits * item.rate : item.rate` |

### DataSheet!H116

| Property | Value |
|----------|-------|
| **Formula** | `=SUM(H107:H115)` |
| **Domain Field** | `rawMaterials.totalCost` |
| **Meaning** | Total Raw Material Cost |
| **Truth Table** | undefined |
| **Dependencies** | H107:H115 |
| **Code Spec** | `rawMaterialsItems.reduce((sum, item) => sum + item.cost, 0)` |

### DataSheet!H121-H127

| Property | Value |
|----------|-------|
| **Formula** | `=E*F*G120` |
| **Domain Field** | `labour.items[].annualCost` |
| **Meaning** | Annual wages = workers × wage/month × 12 months |
| **Truth Table** | undefined |
| **Dependencies** | E (Count), F (Wage/Month), G120=12 |
| **Code Spec** | `item.workerCount * item.wagePerMonth * 12` |

### DataSheet!H128

| Property | Value |
|----------|-------|
| **Formula** | `=SUM(H121:H127)` |
| **Domain Field** | `labour.totalAnnualWages` |
| **Meaning** | Total Annual Wages |
| **Truth Table** | undefined |
| **Dependencies** | H121:H127 |
| **Code Spec** | `labourItems.reduce((sum, item) => sum + item.annualCost, 0)` |

### DataSheet!H134-H138

| Property | Value |
|----------|-------|
| **Formula** | `=E*F*G133` |
| **Domain Field** | `salary.items[].annualCost` |
| **Meaning** | Annual salaries = staff × salary/month × 12 months |
| **Truth Table** | undefined |
| **Dependencies** | E (Count), F (Salary/Month), G133=12 |
| **Code Spec** | `item.staffCount * item.salaryPerMonth * 12` |

### DataSheet!H139

| Property | Value |
|----------|-------|
| **Formula** | `=SUM(H134:H138)` |
| **Domain Field** | `salary.totalAnnualSalary` |
| **Meaning** | Total Annual Salaries |
| **Truth Table** | undefined |
| **Dependencies** | H134:H138 |
| **Code Spec** | `salaryItems.reduce((sum, item) => sum + item.annualCost, 0)` |

### DataSheet!H157

| Property | Value |
|----------|-------|
| **Formula** | `=F157*H102` |
| **Domain Field** | `overheads.repairMaintenance` |
| **Meaning** | Repair & Maintenance = F157(% of sales) × Total Sales. F157 is user-input percentage. |
| **Truth Table** | undefined |
| **Dependencies** | F157 (user %), H102 (Total Sales) |
| **Code Spec** | `userInputs.repairPercent * totalSales` |

### DataSheet!H159

| Property | Value |
|----------|-------|
| **Formula** | `=F159*H102` |
| **Domain Field** | `overheads.powerFuel` |
| **Meaning** | Power & Fuel = % of Total Sales |
| **Truth Table** | undefined |
| **Dependencies** | F159, H102 |
| **Code Spec** | `userInputs.powerFuelPercent * totalSales` |

### DataSheet!H161

| Property | Value |
|----------|-------|
| **Formula** | `=F161*H102` |
| **Domain Field** | `overheads.otherOverhead` |
| **Meaning** | Other Overhead = % of Total Sales |
| **Truth Table** | undefined |
| **Dependencies** | F161, H102 |
| **Code Spec** | `userInputs.otherOverheadPercent * totalSales` |

### DataSheet!H163

| Property | Value |
|----------|-------|
| **Formula** | `=F163*H102` |
| **Domain Field** | `overheads.telephone` |
| **Meaning** | Telephone = % of Total Sales |
| **Truth Table** | undefined |
| **Dependencies** | F163, H102 |
| **Code Spec** | `userInputs.telephonePercent * totalSales` |

### DataSheet!H165

| Property | Value |
|----------|-------|
| **Formula** | `=F165*H102` |
| **Domain Field** | `overheads.stationery` |
| **Meaning** | Stationery = % of Total Sales |
| **Truth Table** | undefined |
| **Dependencies** | F165, H102 |
| **Code Spec** | `userInputs.stationeryPercent * totalSales` |

### DataSheet!H167

| Property | Value |
|----------|-------|
| **Formula** | `=F167*H102` |
| **Domain Field** | `overheads.advertisement` |
| **Meaning** | Advertisement = % of Total Sales |
| **Truth Table** | undefined |
| **Dependencies** | F167, H102 |
| **Code Spec** | `userInputs.advertisementPercent * totalSales` |

### DataSheet!H171

| Property | Value |
|----------|-------|
| **Formula** | `=F171*H102` |
| **Domain Field** | `overheads.otherMisc` |
| **Meaning** | Other Misc = % of Total Sales |
| **Truth Table** | undefined |
| **Dependencies** | F171, H102 |
| **Code Spec** | `userInputs.otherMiscPercent * totalSales` |

### DPR_print!H115

| Property | Value |
|----------|-------|
| **Formula** | `=H93+H108+H109+H111+H113` |
| **Domain Field** | `projectCost.excludingWorkingCapital` |
| **Meaning** | Project Cost (excl WC) = Building Subtotal + Preliminary + Furniture + Contingency + (other subsections) |
| **Truth Table** | undefined |
| **Dependencies** | H93 (Building), H108 (Prelim), H109 (Furniture), H111 (Contingency), H113 (WC subsections) |
| **Code Spec** | `buildingTotal + preliminaryCost + furnitureCost + contingencyCost + workingCapitalSubsections` |

### DPR_print!H119

| Property | Value |
|----------|-------|
| **Formula** | `=H93+H108+H109+H111+H113+H117` |
| **Domain Field** | `projectCost.total` |
| **Meaning** | Total Project Cost = Fixed Asset Cost + Working Capital |
| **Truth Table** | undefined |
| **Dependencies** | H115 (Fixed), H117 (WC) |
| **Code Spec** | `fixedAssetCost + workingCapital` |

### DPR_print!F131

| Property | Value |
|----------|-------|
| **Formula** | `Multi-level IF (see truth table)` |
| **Domain Field** | `subsidy.cappedAmount` |
| **Meaning** | Subsidy amount capped by PMEGP limits. See F131 truth table for full logic. |
| **Truth Table** | undefined |
| **Dependencies** | M83 (Education), M80 (BusinessType), H119 (TotalCost), F131 (MarginMoney%) |
| **Code Spec** | `See PHASE3_TRUTH_TABLES_AND_LINEAGE.md for complete code spec (4-tier cap logic)` |

### Application_form!G59

| Property | Value |
|----------|-------|
| **Formula** | `=SUM(C59:F59)` |
| **Domain Field** | `applicationForm.totalProjectCost` |
| **Meaning** | Total Project Cost on Application Form = Building + Machinery+Furniture + Preliminary+Contingency + WorkingCapital |
| **Truth Table** | undefined |
| **Dependencies** | C59 (Building), D59 (Mach+Furn), E59 (Prelim+Cont), F59 (WC) |
| **Code Spec** | `buildingTotal + machineryTotal + furnitureCost + preliminaryCost + contingencyCost + workingCapital` |

