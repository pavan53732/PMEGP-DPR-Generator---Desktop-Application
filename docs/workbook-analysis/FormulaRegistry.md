# FormulaRegistry.md

## DPRPACKAGE.xls — Complete Formula Catalog

### Summary

| Sheet | Formula Count | Categories |
|-------|--------------|------------|
| Application_form | 6 | Reference (INDEX), Display (summation), Financial (cost aggregation) |
| DataSheet | 96 | Conditional (IF), Arithmetic (SUM, multiplication), Lookup (INDEX), Percentage |
| DPR_print | 741 | Reference (direct cell pulls), Arithmetic (SUM, ROUND), Conditional (IF), Concatenation (&), Display |
| Project_Report | 137 | Reference, Financial calculations, Narrative formatting |
| DPR_FRONT | 7 | Reference, Financial summary |

### Formula Catalog: Application_form (6 formulas)

| Cell | Formula | Category | Purpose |
|------|---------|----------|---------|
| B59 | `=INDEX(DataSheet!L91:L93,DataSheet!M91,B1)` | Lookup | Pulls premises type label from DataSheet enumeration |
| C59 | `=DataSheet!H48` | Reference | Building cost |
| D59 | `=DataSheet!H67+DataSheet!H72` | Financial | Machinery total + Furniture cost |
| E59 | `=DataSheet!H70+DataSheet!H74` | Financial | Preliminary cost + Contingency cost |
| F59 | `=DataSheet!H76` | Reference | Working capital |
| G59 | `=SUM(C59:F59)` | Financial | Total project cost |

### Formula Catalog: DataSheet (96 formulas)

#### Selection/Checkbox Formulas (IF-based "√" markers)

These formulas display "√" characters based on hidden M-column selection indices:

| Cell | Formula | Range | Purpose |
|------|---------|-------|---------|
| C7 | `=IF(M59=1,"√"," ")` | Row 7 | √ for KVIC agency |
| E7 | `=IF(M59=2,"√"," ")` | | √ for KVIB agency |
| G7 | `=IF(M59=3,"√"," ")` | | √ for DIC agency |
| J7 | `=IF(M59=4,"√"," ")` | | √ for COIR Board |
| E12 | `=IF(M55=1,"√"," ")` | Row 12 | √ for Male |
| G12 | `=IF(M55=2,"√"," ")` | | √ for Female |
| I12 | `=IF(M55=3,"√"," ")` | | √ for Transgender |
| G13 | `=IF(M64=1,"√"," ")` | Row 13 | √ for Rural |
| I13 | `=IF(M64<>1,"√"," ")` | | √ for Urban |
| B27 | `=IF(M70=1,"√"," ")` | Row 27 | √ for SC |
| C27 | `=IF(M70=2,"√"," ")` | | √ for ST |
| D27 | `=IF(M70=3,"√"," ")` | | √ for OBC |
| E27 | `=IF(M70=4,"√"," ")` | | √ for PHC |
| F27 | `=IF(M70=5,"√"," ")` | | √ for Ex-Serviceman |
| G27 | `=IF(M70=6,"√"," ")` | | √ for Minority |
| H27 | `=IF(M70=7,"√"," ")` | | √ for Hill Border Area |
| I27 | `=IF(M70=8,"√"," ")` | | √ for Aspirational Districts |
| J27 | `=IF(M70=9,"√"," ")` | | √ for General |
| G29 | `=IF(M80=1,"√"," ")` | Row 29 | √ for Manufacturing |
| I29 | `=IF(M80=2,"√"," ")` | | √ for Service |

#### Building Cost Formulas

| Cell | Formula | Purpose |
|------|---------|---------|
| H41 | `=IF(F41>=1,F41*G41,G41)` | Building item 1 amount (Area × Rate) |
| H42 | `=IF(F42>=1,F42*G42,G42)` | Building item 2 |
| H43 | `=IF(F43>=1,F43*G43,G43)` | Building item 3 |
| H44 | `=IF(F44>=1,F44*G44,G44)` | Building item 4 |
| H45 | `=IF(F45>=1,F45*G45,G45)` | Building item 5 |
| H46 | `=IF(F46>=1,F46*G46,G46)` | Building item 6 |
| H47 | `=IF(F47>=1,F47*G47,G47)` | Building item 7 |
| H48 | `=SUM(H41:H47)` | **Total Building Cost** |

#### Machinery Cost Formulas

| Cell | Formula | Purpose |
|------|---------|---------|
| H54-H66 | `=IF(Fnn>=1,Fnn*Gnn,Gnn)` | Individual machinery costs (13 items) |
| H67 | `=SUM(H54:H66)` | **Total Machinery Cost** |

#### Working Capital / Pre-op / Furniture / Contingency

| Cell | Formula | Purpose |
|------|---------|---------|
| H70 | Building-related (preliminary) | Preliminary & Pre-operative Cost |
| H72 | Furniture & Fixtures cost | Furniture cost |
| H74 | Contingency/Others/Miscellaneous | Contingency cost |
| H76 | `=SUM(H70:I74)` | **Total Working Capital** |

#### Percentage Formulas

| Cell | Formula | Purpose |
|------|---------|---------|
| G85 | `=IF(AND(M55=1,M70=9),10%,5%)` | **Own Contribution %** (10% for Women+General, else 5%) |
| G86 | `=100%-G85` | **Bank Finance %** (complement of own contribution) |
| G87 | `=IF(M64=2,IF(AND(M55=1,M70=9),15%,25%),IF(AND(M55=1,M70=9),25%,35%))` | **Margin Money %** (cascaded based on location/category) |

#### Sales Details Formulas

| Cell | Formula | Purpose |
|------|---------|---------|
| H94-H101 | `=IF(Gnn>=1,Gnn*Fnn,Fnn)` | Individual product sales amounts |
| H102 | `=SUM(H94:H101)` | **Total Sales Amount** |

#### Raw Materials Formulas

| Cell | Formula | Purpose |
|------|---------|---------|
| H107-H115 | `=IF(Gnn>=1,Gnn*Fnn,Fnn)` | Individual raw material costs |
| H116 | `=SUM(H107:H115)` | **Total Raw Material Cost** |

#### Wages Formulas

| Cell | Formula | Purpose |
|------|---------|---------|
| H121-H127 | `=Enn*Fnn*G120` | Individual wage lines (workers × wage × 12 months) |
| E128 | `=SUM(E121:E127)` | Total worker count |
| H128 | `=SUM(H121:H127)` | **Total Wages** |

#### Salary Formulas

| Cell | Formula | Purpose |
|------|---------|---------|
| H134-H138 | `=Enn*Fnn*G133` | Individual salary lines (staff × wage × 12 months) |
| E139 | `=SUM(E134:E138)` | Total staff count |
| H139 | `=SUM(H134:H138)` | **Total Salaries** |

#### Overhead Expense Formulas (as % of Total Sales)

| Cell | Formula | Purpose |
|------|---------|---------|
| H157 | `=F157*H102` | Repair & Maintenance (% of H102) |
| H159 | `=F159*H102` | Power & Fuel (% of H102) |
| H161 | `=F161*H102` | Other Overhead (% of H102) |
| H163 | `=F163*H102` | Telephone (% of H102) |
| H165 | `=F165*H102` | Stationery & Postage (% of H102) |
| H167 | `=F167*H102` | Advertisement (% of H102) |
| H171 | `=F171*H102` | Other Misc (% of H102) |

#### Hidden Helper Column Formulas (R column — Margin Money %)

| Cell | Formula | Purpose |
|------|---------|---------|
| R55 | `=IF(AND(M55=1,M70=9,M64=2),15%,25%)...` | Complex margin money % |
| R57 | `=IF(M64=2,IF(AND(M55=1,M70=9),15,25),IF(AND(M55=1,M70=9),25,35))` | Margin money % by location/category |
| R58 | `=IF(AND(M55=1,M70=9,M64=2),15,25)` | Margin money % Women+General+Urban |
| R59 | `=IF(AND(M55=1,M64=1,M70=9),35,25)` | Margin money % Women+Rural+General |
| R60 | `=IF(AND(M57=1,M72=9,M66=2),15,0)` | Margin money % (Transgender) |

#### Hidden COLUMN L Index Formula

| Cell | Formula | Purpose |
|------|---------|---------|
| B23 | `=INDEX(L83:L89,M83)` | Qualification lookup from enumeration |
| L36 | `=L59:L62` (multi-cell?) | Agency enumeration reference |

### Formula Catalog: DPR_print (741 formulas — representative sample)

#### Direct References from DataSheet

These cells copy values directly from DataSheet input cells:

- B3 = `Project_Report!B9` (Applicant name)
- E3 = `Project_Report!G9`
- B6 = `Project_Report!B11`
- B8 = `Project_Report!B14`
- B10 = `Project_Report!B16`
- E10 = `Project_Report!G16`
Through E14-E17: Various project details

#### Cost Table References (rows 86-115)

Each cost line item copies from DataSheet with range references:

- B86:E86 = `DataSheet!B41:E41` (Building label)
- F86 = `DataSheet!F41` (Building rate)
- G86 = `DataSheet!G41` (Building qty)
- H86 = `DataSheet!H41:I41` (Building amount)

Same pattern for rows 87-92 (building items), 96-107 (machinery items)

#### Totals in DPR_print

| Cell | Formula | Purpose |
|------|---------|---------|
| H93 | `=SUM(H86:H92)` | Subtotal: Building |
| H115 | `=H93+H108+H109+H111+H113` | Total Project Cost (Building + Subsections) |
| H119 | `=H93+H108+H109+H111+H113+H117` | Total Cost incl. Working Capital |
| H117 | `=ROUND(H290,0)` | Working capital amount |
| H123 | `=ROUND(F123*H119,0)` | Subsidy Amount |
| H126 | `=ROUND(F125*H115,0)` | Own Contribution (machinery portion) |
| H127 | `=ROUND(F125*H117,0)` | Own Contribution (WC portion) |
| H129 | `=ROUND(H126+H127,0)` | Total Own Contribution |

#### Subsidy Cap Logic (F131)

```excel
=IF(AND(M83=1,M80=2,H119>500000),
   "Should not exceed Rs. 5 lakhs...",
   IF(AND(M83=1,M80=1,H119>1000000),
      "Should not exceed Rs. 10 lakhs...",
      IF(AND(M83>1,M80=2,H119>2000000),
         ROUND(2000000*F131,0),
         IF(AND(M83>1,M80=1,H119>5000000),
            ROUND(5000000*F131,0),
            ROUND(H119*F131,0)))))
```

This is the **subsidy cap calculation** — verifies project cost limits per PMEGP rules.

#### Concatenation Formulas

| Cell | Formula | Purpose |
|------|---------|---------|
| E46 | `=B107&","&B108&","&B109` | Raw material list concatenation |

### Formula Catalog: Project_Report (137 formulas)

Primarily references DataSheet cost cells and financial parameters, combined into report narrative sections. Detailed breakdown in the raw extraction data.

### Formula Catalog: DPR_FRONT (7 formulas)

References Project_Report and DataSheet for summary values displayed on the front cover page.

### Formula Pattern Summary

1. **IF-based amount calculation**: `=IF(F>=1,F*G,G)` — Used extensively for cost items where quantity × rate is calculated, defaulting to rate-only if quantity is 0
2. **SUM aggregation**: Used for all total rows (buildings, machinery, wages, sales, etc.)
3. **Hidden % logic**: G85, G86, G87 determine contribution/subsidy percentages based on category/location/business type
4. **INDEX lookup**: B23 uses INDEX for qualification label; Application_form B59 uses INDEX for premises type
5. **ROUND wrapping**: DPR_print rounds all financial display values to 0 decimal places
6. **Reference passthrough**: DPR_print and Project_Report primarily pull values from DataSheet via direct cell references
