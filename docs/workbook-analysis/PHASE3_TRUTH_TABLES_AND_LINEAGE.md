# Phase 3: Truth Tables, Output Lineage & Financial Traceability
## G85 Truth Table (Own Contribution %)
Formula: `=IF(AND(M55=1,M70=9),10%,5%)`
Where: M55=Gender, M70=Category, "1"=Male, "9"=General

| Gender | Gender# | Category | Category# | M55==1? | M70==9? | AND? | Result |
|--------|---------|----------|-----------|---------|---------|------|--------|
| Male | 1 | SC | 1 | Y | N | N | 5% |
| Male | 1 | ST | 2 | Y | N | N | 5% |
| Male | 1 | OBC | 3 | Y | N | N | 5% |
| Male | 1 | PHC | 4 | Y | N | N | 5% |
| Male | 1 | Ex-Serviceman | 5 | Y | N | N | 5% |
| Male | 1 | Minority | 6 | Y | N | N | 5% |
| Male | 1 | Hill Border | 7 | Y | N | N | 5% |
| Male | 1 | Aspirational Districts | 8 | Y | N | N | 5% |
| Male | 1 | General | 9 | Y | Y | Y | 10% |
| Female | 2 | SC | 1 | N | N | N | 5% |
| Female | 2 | ST | 2 | N | N | N | 5% |
| Female | 2 | OBC | 3 | N | N | N | 5% |
| Female | 2 | PHC | 4 | N | N | N | 5% |
| Female | 2 | Ex-Serviceman | 5 | N | N | N | 5% |
| Female | 2 | Minority | 6 | N | N | N | 5% |
| Female | 2 | Hill Border | 7 | N | N | N | 5% |
| Female | 2 | Aspirational Districts | 8 | N | N | N | 5% |
| Female | 2 | General | 9 | N | Y | N | 5% |
| Transgender | 3 | SC | 1 | N | N | N | 5% |
| Transgender | 3 | ST | 2 | N | N | N | 5% |
| Transgender | 3 | OBC | 3 | N | N | N | 5% |
| Transgender | 3 | PHC | 4 | N | N | N | 5% |
| Transgender | 3 | Ex-Serviceman | 5 | N | N | N | 5% |
| Transgender | 3 | Minority | 6 | N | N | N | 5% |
| Transgender | 3 | Hill Border | 7 | N | N | N | 5% |
| Transgender | 3 | Aspirational Districts | 8 | N | N | N | 5% |
| Transgender | 3 | General | 9 | N | Y | N | 5% |

**Interpretation:** Own Contribution = 10% only when Gender=Male(1) AND Category=General(9). All other combinations = 5%. Note: This means the workbook does NOT give a special 10% rate for Women. If PMEGP policy gives 10% for Women, this workbook formula does not implement it correctly.

## G87 Truth Table (Margin Money / Subsidy %)
Formula: `=IF(M64=2,IF(AND(M55=1,M70=9),15%,25%),IF(AND(M55=1,M70=9),25%,35%))`
Where: M64=Location (1=Rural, 2=Urban), M55=Gender, M70=Category

| Location | Loc# | Gender | Gender# | Cat | Cat# | M64=2? | M55=1&M70=9? | Result |
|----------|------|--------|---------|-----|------|--------|---------------|--------|
| Rural | 1 | Male | 1 | SC | 1 | N | N | 35% |
| Rural | 1 | Male | 1 | ST | 2 | N | N | 35% |
| Rural | 1 | Male | 1 | OBC | 3 | N | N | 35% |
| Rural | 1 | Male | 1 | PHC | 4 | N | N | 35% |
| Rural | 1 | Male | 1 | Ex-Serviceman | 5 | N | N | 35% |
| Rural | 1 | Male | 1 | Minority | 6 | N | N | 35% |
| Rural | 1 | Male | 1 | Hill Border | 7 | N | N | 35% |
| Rural | 1 | Male | 1 | Aspirational Districts | 8 | N | N | 35% |
| Rural | 1 | Male | 1 | General | 9 | N | Y | 25% |
| Rural | 1 | Female | 2 | SC | 1 | N | N | 35% |
| Rural | 1 | Female | 2 | ST | 2 | N | N | 35% |
| Rural | 1 | Female | 2 | OBC | 3 | N | N | 35% |
| Rural | 1 | Female | 2 | PHC | 4 | N | N | 35% |
| Rural | 1 | Female | 2 | Ex-Serviceman | 5 | N | N | 35% |
| Rural | 1 | Female | 2 | Minority | 6 | N | N | 35% |
| Rural | 1 | Female | 2 | Hill Border | 7 | N | N | 35% |
| Rural | 1 | Female | 2 | Aspirational Districts | 8 | N | N | 35% |
| Rural | 1 | Female | 2 | General | 9 | N | N | 35% |
| Rural | 1 | Transgender | 3 | SC | 1 | N | N | 35% |
| Rural | 1 | Transgender | 3 | ST | 2 | N | N | 35% |
| Rural | 1 | Transgender | 3 | OBC | 3 | N | N | 35% |
| Rural | 1 | Transgender | 3 | PHC | 4 | N | N | 35% |
| Rural | 1 | Transgender | 3 | Ex-Serviceman | 5 | N | N | 35% |
| Rural | 1 | Transgender | 3 | Minority | 6 | N | N | 35% |
| Rural | 1 | Transgender | 3 | Hill Border | 7 | N | N | 35% |
| Rural | 1 | Transgender | 3 | Aspirational Districts | 8 | N | N | 35% |
| Rural | 1 | Transgender | 3 | General | 9 | N | N | 35% |
| Urban | 2 | Male | 1 | SC | 1 | Y | N | 25% |
| Urban | 2 | Male | 1 | ST | 2 | Y | N | 25% |
| Urban | 2 | Male | 1 | OBC | 3 | Y | N | 25% |
| Urban | 2 | Male | 1 | PHC | 4 | Y | N | 25% |
| Urban | 2 | Male | 1 | Ex-Serviceman | 5 | Y | N | 25% |
| Urban | 2 | Male | 1 | Minority | 6 | Y | N | 25% |
| Urban | 2 | Male | 1 | Hill Border | 7 | Y | N | 25% |
| Urban | 2 | Male | 1 | Aspirational Districts | 8 | Y | N | 25% |
| Urban | 2 | Male | 1 | General | 9 | Y | Y | 15% |
| Urban | 2 | Female | 2 | SC | 1 | Y | N | 25% |
| Urban | 2 | Female | 2 | ST | 2 | Y | N | 25% |
| Urban | 2 | Female | 2 | OBC | 3 | Y | N | 25% |
| Urban | 2 | Female | 2 | PHC | 4 | Y | N | 25% |
| Urban | 2 | Female | 2 | Ex-Serviceman | 5 | Y | N | 25% |
| Urban | 2 | Female | 2 | Minority | 6 | Y | N | 25% |
| Urban | 2 | Female | 2 | Hill Border | 7 | Y | N | 25% |
| Urban | 2 | Female | 2 | Aspirational Districts | 8 | Y | N | 25% |
| Urban | 2 | Female | 2 | General | 9 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | SC | 1 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | ST | 2 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | OBC | 3 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | PHC | 4 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | Ex-Serviceman | 5 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | Minority | 6 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | Hill Border | 7 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | Aspirational Districts | 8 | Y | N | 25% |
| Urban | 2 | Transgender | 3 | General | 9 | Y | N | 25% |

**Interpretation:** Margin Money = 15% (Urban+Male+General), 25% (Urban+other combos or Rural+Male+General), 35% (Rural+other combos). This is the base rate before education/business-type caps in DPR_print.

## R57-R60 Truth Tables (Hidden Margin Money Helpers)

### R57 Formula: `=IF(M64=2,IF(AND(M55=1,M70=9),15,25),IF(AND(M55=1,M70=9),25,35))`
Same logic as G87 (produces raw number, not percentage)

### R58 Formula: `=IF(AND(M55=1,M70=9,M64=2),15,25)`
Truth table:

| Gender | Cat | Loc | M55=1? | M70=9? | M64=2? | AND? | Result |
|--------|-----|-----|--------|--------|--------|------|--------|
| Male | SC | Rural | Y | N | N | N | 25 |
| Male | ST | Rural | Y | N | N | N | 25 |
| Male | OBC | Rural | Y | N | N | N | 25 |
| Male | PHC | Rural | Y | N | N | N | 25 |
| Male | Ex-Serviceman | Rural | Y | N | N | N | 25 |
| Male | Minority | Rural | Y | N | N | N | 25 |
| Male | Hill Border | Rural | Y | N | N | N | 25 |
| Male | Aspirational Districts | Rural | Y | N | N | N | 25 |
| Male | General | Rural | Y | Y | N | N | 25 |
| Female | SC | Rural | N | N | N | N | 25 |
| Female | ST | Rural | N | N | N | N | 25 |
| Female | OBC | Rural | N | N | N | N | 25 |
| Female | PHC | Rural | N | N | N | N | 25 |
| Female | Ex-Serviceman | Rural | N | N | N | N | 25 |
| Female | Minority | Rural | N | N | N | N | 25 |
| Female | Hill Border | Rural | N | N | N | N | 25 |
| Female | Aspirational Districts | Rural | N | N | N | N | 25 |
| Female | General | Rural | N | Y | N | N | 25 |
| Transgender | SC | Rural | N | N | N | N | 25 |
| Transgender | ST | Rural | N | N | N | N | 25 |
| Transgender | OBC | Rural | N | N | N | N | 25 |
| Transgender | PHC | Rural | N | N | N | N | 25 |
| Transgender | Ex-Serviceman | Rural | N | N | N | N | 25 |
| Transgender | Minority | Rural | N | N | N | N | 25 |
| Transgender | Hill Border | Rural | N | N | N | N | 25 |
| Transgender | Aspirational Districts | Rural | N | N | N | N | 25 |
| Transgender | General | Rural | N | Y | N | N | 25 |
| Male | SC | Urban | Y | N | Y | N | 25 |
| Male | ST | Urban | Y | N | Y | N | 25 |
| Male | OBC | Urban | Y | N | Y | N | 25 |
| Male | PHC | Urban | Y | N | Y | N | 25 |
| Male | Ex-Serviceman | Urban | Y | N | Y | N | 25 |
| Male | Minority | Urban | Y | N | Y | N | 25 |
| Male | Hill Border | Urban | Y | N | Y | N | 25 |
| Male | Aspirational Districts | Urban | Y | N | Y | N | 25 |
| Male | General | Urban | Y | Y | Y | Y | 15 |
| Female | SC | Urban | N | N | Y | N | 25 |
| Female | ST | Urban | N | N | Y | N | 25 |
| Female | OBC | Urban | N | N | Y | N | 25 |
| Female | PHC | Urban | N | N | Y | N | 25 |
| Female | Ex-Serviceman | Urban | N | N | Y | N | 25 |
| Female | Minority | Urban | N | N | Y | N | 25 |
| Female | Hill Border | Urban | N | N | Y | N | 25 |
| Female | Aspirational Districts | Urban | N | N | Y | N | 25 |
| Female | General | Urban | N | Y | Y | N | 25 |
| Transgender | SC | Urban | N | N | Y | N | 25 |
| Transgender | ST | Urban | N | N | Y | N | 25 |
| Transgender | OBC | Urban | N | N | Y | N | 25 |
| Transgender | PHC | Urban | N | N | Y | N | 25 |
| Transgender | Ex-Serviceman | Urban | N | N | Y | N | 25 |
| Transgender | Minority | Urban | N | N | Y | N | 25 |
| Transgender | Hill Border | Urban | N | N | Y | N | 25 |
| Transgender | Aspirational Districts | Urban | N | N | Y | N | 25 |
| Transgender | General | Urban | N | Y | Y | N | 25 |

### R59 Formula: `=IF(AND(M55=1,M64=1,M70=9),35,25)`
Truth table:

| Gender | Loc | Cat | M55=1? | M64=1? | M70=9? | AND? | Result |
|--------|-----|-----|--------|--------|--------|------|--------|
| Male | Rural | SC | Y | Y | N | N | 25 |
| Male | Rural | ST | Y | Y | N | N | 25 |
| Male | Rural | OBC | Y | Y | N | N | 25 |
| Male | Rural | PHC | Y | Y | N | N | 25 |
| Male | Rural | Ex-Serviceman | Y | Y | N | N | 25 |
| Male | Rural | Minority | Y | Y | N | N | 25 |
| Male | Rural | Hill Border | Y | Y | N | N | 25 |
| Male | Rural | Aspirational Districts | Y | Y | N | N | 25 |
| Male | Rural | General | Y | Y | Y | Y | 35 |
| Female | Rural | SC | N | Y | N | N | 25 |
| Female | Rural | ST | N | Y | N | N | 25 |
| Female | Rural | OBC | N | Y | N | N | 25 |
| Female | Rural | PHC | N | Y | N | N | 25 |
| Female | Rural | Ex-Serviceman | N | Y | N | N | 25 |
| Female | Rural | Minority | N | Y | N | N | 25 |
| Female | Rural | Hill Border | N | Y | N | N | 25 |
| Female | Rural | Aspirational Districts | N | Y | N | N | 25 |
| Female | Rural | General | N | Y | Y | N | 25 |
| Transgender | Rural | SC | N | Y | N | N | 25 |
| Transgender | Rural | ST | N | Y | N | N | 25 |
| Transgender | Rural | OBC | N | Y | N | N | 25 |
| Transgender | Rural | PHC | N | Y | N | N | 25 |
| Transgender | Rural | Ex-Serviceman | N | Y | N | N | 25 |
| Transgender | Rural | Minority | N | Y | N | N | 25 |
| Transgender | Rural | Hill Border | N | Y | N | N | 25 |
| Transgender | Rural | Aspirational Districts | N | Y | N | N | 25 |
| Transgender | Rural | General | N | Y | Y | N | 25 |
| Male | Urban | SC | Y | N | N | N | 25 |
| Male | Urban | ST | Y | N | N | N | 25 |
| Male | Urban | OBC | Y | N | N | N | 25 |
| Male | Urban | PHC | Y | N | N | N | 25 |
| Male | Urban | Ex-Serviceman | Y | N | N | N | 25 |
| Male | Urban | Minority | Y | N | N | N | 25 |
| Male | Urban | Hill Border | Y | N | N | N | 25 |
| Male | Urban | Aspirational Districts | Y | N | N | N | 25 |
| Male | Urban | General | Y | N | Y | N | 25 |
| Female | Urban | SC | N | N | N | N | 25 |
| Female | Urban | ST | N | N | N | N | 25 |
| Female | Urban | OBC | N | N | N | N | 25 |
| Female | Urban | PHC | N | N | N | N | 25 |
| Female | Urban | Ex-Serviceman | N | N | N | N | 25 |
| Female | Urban | Minority | N | N | N | N | 25 |
| Female | Urban | Hill Border | N | N | N | N | 25 |
| Female | Urban | Aspirational Districts | N | N | N | N | 25 |
| Female | Urban | General | N | N | Y | N | 25 |
| Transgender | Urban | SC | N | N | N | N | 25 |
| Transgender | Urban | ST | N | N | N | N | 25 |
| Transgender | Urban | OBC | N | N | N | N | 25 |
| Transgender | Urban | PHC | N | N | N | N | 25 |
| Transgender | Urban | Ex-Serviceman | N | N | N | N | 25 |
| Transgender | Urban | Minority | N | N | N | N | 25 |
| Transgender | Urban | Hill Border | N | N | N | N | 25 |
| Transgender | Urban | Aspirational Districts | N | N | N | N | 25 |
| Transgender | Urban | General | N | N | Y | N | 25 |

### R60 Formula: `=IF(AND(M57=1,M72=9,M66=2),15,0)`
Note: M57=Transgender(3), M72=General(9), M66=Urban(2)? However M57 row=57 (Transgender label row), M72=General label row. This formula may be a specific transgender+general+urban case.

## DPR_print F131 Truth Table (Subsidy Cap Logic)

Formula:
```
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

Where: M83=Education, M80=BusinessType, H119=TotalProjectCost, F131=Subsidy%

| Education | Edu# | BusType | Bus# | Cost ≤ Cap? | Outcome |
|-----------|------|---------|------|-------------|---------|
| Under 8th | 1 | Service | 2 | ≤5L | Full cost × subsidy% |
| Under 8th | 1 | Service | 2 | >5L | **Cap message: max ₹5L** |
| Under 8th | 1 | Manufacturing | 1 | ≤10L | Full cost × subsidy% |
| Under 8th | 1 | Manufacturing | 1 | >10L | **Cap message: max ₹10L** |
| 8th+ Pass | 2+ | Service | 2 | ≤20L | Full cost × subsidy% |
| 8th+ Pass | 2+ | Service | 2 | >20L | Capped: ₹20L × subsidy% |
| 8th+ Pass | 2+ | Manufacturing | 1 | ≤50L | Full cost × subsidy% |
| 8th+ Pass | 2+ | Manufacturing | 1 | >50L | Capped: ₹50L × subsidy% |

**Verification:** These PMEGP subsidy caps (₹5L/₹10L/₹20L/₹50L) are consistent with official PMEGP guidelines. The workbook uses M83 (Education) as a proxy for "beneficiary category" — under 8th pass = lower caps, 8th+ = higher caps.

## Complete Output Lineage

### Application_form (6 formulas)

| Form Cell | Formula | Source | Semantic |
|-----------|---------|--------|----------|
| B59 | `INDEX(DataSheet!L91:L93,DataSheet!M91,B1)` | INDEXDataSheet | Display value |
| C59 | `DataSheet!H48` | DataSheet | Display value |
| D59 | `DataSheet!H67+DataSheet!H72` | DataSheet | Display value |
| E59 | `DataSheet!H70+DataSheet!H74` | DataSheet | Display value |
| F59 | `DataSheet!H76` | DataSheet | Display value |
| G59 | `SUM(C59:F59)` | SUMC59:F59 | Display value |

### DPR_print Formula Categories

- reference: 660
- sum: 53
- round: 13
- conditional: 13
- concat: 1
- broken: 1

Total: 741 formulas

### DPR_print Key Output → Source Chain

| Output Cell | Description | Source Chain |
|------------|-------------|--------------|
| H93 | Building Subtotal | DataSheet H41:H47 → H48 (SUM) → DPR_print B86:H92 → H93 (SUM) |
| H115 | Project Cost (excl WC) | H93 + H108 (Preliminary) + H109 (Furniture) + H111 (Contingency) + H113 (Working Capital sections) |
| H117 | Working Capital Amount | ROUND(H290,0) — H290 is internal DPR_print calc from DataSheet H76 |
| H119 | Total Project Cost | H115 + H117 (Project Cost + Working Capital) = Total Investment |
| H131 | Subsidy Amount | IF chain based on Edu×Type×Cost → capped subsidy (see F131 truth table) |
| H123 | Subsidy % Display | F123 (data from DataSheet G87) × H119 (Total Cost) |
| H126 | Own Contribution (Fixed) | F125 (Own Cont.%) × H115 (Fixed Asset Cost) |
| H127 | Own Contribution (WC) | F125 (Own Cont.%) × H117 (WC Cost) |
| H129 | Total Own Contribution | H126 + H127 |

## Financial Analysis Parameters

### Working Capital Elements

| Element | Row | Column | Notes |
|---------|-----|--------|-------|
| Stock in process | 146 | B | Working capital element (days) |
| Finished goods | 148 | B | Working capital element (days) |
| Receivable by | 150 | B | Working capital element (days) |

### Key Parameters (DataSheet, hidden rows)

| Parameter | Cell | Value | Source |
|-----------|------|-------|--------|
| Payback Period | F179 | 5 years | DataSheet hidden row |
| Implementation Period | F180 | 2 months | DataSheet hidden row |
| Annual Months | G180 | 12 | DataSheet hidden row |
| Power Requirement | F154 | (user input) | DataSheet |
| Interest Rate | B173 | (user input) | DataSheet |
| Depreciation (Building) | B176 | (user input) | DataSheet |
| Depreciation (Machinery) | B177 | (user input) | DataSheet |

## Project_Report Traceability

Total formulas: 137

Project_Report → DataSheet references:

| PR Cell | Formula | PR Row |
|---------|---------|--------|
| G9 | `DataSheet!B9` | undefined |
| G16 | `DataSheet!B14` | undefined |
| G17 | `DataSheet!B15` | undefined |
| H18 | `DataSheet!D16` | undefined |
| H19 | `DataSheet!D16` | undefined |
| H20 | `DataSheet!H17` | undefined |
| B57 | `DataSheet!B121:D121` | undefined |
| I57 | `DataSheet!E121` | undefined |
| B58 | `DataSheet!B122:D122` | undefined |
| I58 | `DataSheet!E122` | undefined |
| B59 | `DataSheet!B123:D123` | undefined |
| I59 | `DataSheet!E123` | undefined |
| B60 | `DataSheet!B124:D124` | undefined |
| I60 | `DataSheet!E124` | undefined |
| B61 | `DataSheet!B125:D125` | undefined |
| I61 | `DataSheet!E125` | undefined |
| B62 | `DataSheet!B126:D126` | undefined |
| I62 | `DataSheet!E126` | undefined |
| B63 | `DataSheet!B127:D127` | undefined |
| I63 | `DataSheet!E127` | undefined |
| B64 | `DataSheet!B134:D134` | undefined |
| I64 | `DataSheet!E134` | undefined |
| B65 | `DataSheet!B135:D135` | undefined |
| I65 | `DataSheet!E135` | undefined |
| B66 | `DataSheet!B136:D136` | undefined |
| ... | (6 more) | ... |

## DPR_FRONT Formula Lineage

| Front Cell | Formula | Source |
|-----------|---------|--------|
| B2 | `UPPER(Application_form!B55)` | internal |
| B33 | `#REF!` | internal |
| B34 | `INDEX(Application_form!T21:T24,DataSheet!M59)` | internal |
| B35 | `#REF!` | internal |
| B36 | `#REF!` | internal |
| B37 | `#REF!` | internal |
| F37 | `#REF!` | internal |

## Broken Reference Root Cause Analysis

### DPR_print B94 (#REF!)

Formula: `=DataSheet!#REF!`

**Root Cause Investigation:**

The formula in DPR_print B94 originally referenced a DataSheet range that was deleted.
Look at surrounding rows:
- Row 86-92: Building items (DataSheet rows 41-47)
- Row 93: Building subtotal
- Row 94: **BROKEN** — was likely a building-related sub-item or land cost
- Row 95: Next section (machinery-related items)

**Most likely original reference:**
- If row 94 was a building sub-item: `=DataSheet!B48` (which is now hidden and contains land/build cost total)
- If row 94 was a separate cost category: possibly a deleted DataSheet row between building and machinery sections

**Suggested Repair:**
1. Check the original DPR template to see what cost item belongs at row 94
2. If it was building items: reference DataSheet!H48 (total building cost)
3. If it was a deleted item: remove the row entirely from DPR_print
4. Update the parent SUM formulas (H115, H119) if they should exclude this line

### DataSheet M36 (#VALUE!)

Cell M36 is in the hidden helper column. The `#VALUE!` error suggests a formula attempted arithmetic on a text value.
This cell is not referenced by any output sheet formula — it is localized to the hidden calculation zone.
**Impact: COSMETIC** — No effect on outputs.

### `_xlfn.SINGLE` Named Range

Resolves to `=#NAME?` — orphaned BIFF function reference.
Not referenced by any cell in the workbook.
**Action:** Remove the orphaned named range.

## Complete Project Cost Flow Diagram

```
User Inputs                  Intermediate Calcs         Output Totals
────────────              ──────────────────          ─────────────
Building F41:G47 (×7)  →  H41:H47 = IF(F>=1,F*G,G)  → H48 = SUM(H41:H47)
Machinery F54:G66 (×13) →  H54:H66 = IF(F>=1,F*G,G)  → H67 = SUM(H54:H66)
Preliminary H70         →  (direct input)              →┐
Furniture H72           →  (direct input)              →┤
Contingency H74         →  (direct input)              →┴→ H76 = SUM(H70:H74)
                                                          ↓
                                                     DPR_print:
                                                     H115 = Building + Preliminary + Furniture + Contingency
                                                     H119 = H115 + Working Capital
                                                          ↓
Financing Logic:                                        H123 = F123 × H119 (Subsidy ₹)
  M55(Gender) ─┐                                       H126 = F125 × H115 (Own Cont. Fixed)
  M70(Category) ─┤ → G85=OwnCont.%                    H127 = F125 × H117 (Own Cont. WC)
  M64(Location) ─┤ → G86=BankFin.%                    H129 = H126+H127 (Total Own Cont.)
                   └ → G87=MarginMoney%                H131 = F131 cap formula (Subsidy)
```

