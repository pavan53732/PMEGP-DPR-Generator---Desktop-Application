# Unlocked Cell → DPRData Field Mapping

> **Source:** `DPRPACKAGE.xls` deep analysis (2026-06-14 xlrd with `formatting_info=True`)
> **Total unlocked cells:** 50 (DataSheet: 21, Project_Report: 29)
> **Purpose:** Maps every unlocked cell to its corresponding `DPRData` app field name for the TypeScript schema in `src/lib/dpr-types.ts`

---

## Part 1: DataSheet (21 unlocked cells)

### 1.1 Selector Inputs (12 cells — user-editable dropdowns)

| # | Cell | DPRData Field | Type | Allowed Values | UI Label |
|---|------|--------------|------|----------------|----------|
| 1 | **M55** | `applicant.gender` | `enum` | 1=Male, 2=Female, 3=Transgender | Gender |
| 2 | **M59** | `applicant.sponsoringAgency` | `enum` | 1=KVIC, 2=KVIB, 3=DIC, 4=Coir Board | Sponsoring Agency |
| 3 | **M64** | `applicant.location` | `enum` | 1=Rural, 2=Urban | Location |
| 4 | **M67** | `loan.isSecondLoan` | `enum` | 1=No (1st loan, default), 2=Yes (2nd loan / upgradation) | Previous Loan |
| 5 | **M70** | `applicant.category` | `enum` | 1=General, 2=SC, 3=ST, 4=OBC, 5=Minority, 6=Ex-Serviceman, 7=Hill & Border, 8=Aspirational, 9=PHC | Category |
| 6 | **M80** | `project.sector` | `enum` | 1=Manufacturing, 2=Service | Sector |
| 7 | **M83** | `applicant.qualification` | `enum` | 1=Under 8th, 2=8th Pass, 3=10th Pass, 4=12th Pass, 5=Graduate, 6=Post Graduate, 7=PhD | Qualification |
| 8 | **M91** | `project.buildingOwnership` | `enum` | 1=Own, 2=Rented, 3=Leased | Building Ownership |

### 1.2 Block Placeholder Defaults (2 cells — overwritten on export)

| # | Cell | DPRData Field | Default | Export Policy | UI Label |
|---|------|--------------|---------|---------------|----------|
| 9 | **B41** | `building[0].name` | `"2 Floor Building"` | Overwrite with user's 1st building entry; clear string if no entries | Building #1 Name |
| 10 | **B54** | `machinery[0].name` | `"CNC"` | Overwrite with user's 1st machinery entry; clear string if no entries | Machinery #1 Name |

### 1.3 Financial Hardcoded Inputs (2 cells — preserved on export)

| # | Cell | DPRData Field | Type | Default | Notes | UI Label |
|---|------|--------------|------|---------|-------|----------|
| 11 | **F179** | `payback_period_years` | `number` | 5 | Payback period in years | Payback Period |
| 12 | **F180** | `implementation_months` | `number` | 2 | Project implementation period in years. **NOT a grace period** (see §6.2) | Project Implementation Period |

### 1.4 Unknown / Sub-Flag (1 cell — preserve value)

| # | Cell | DPRData Field | Type | Value | Notes |
|---|------|--------------|------|-------|-------|
| 13 | **P61** | `loan.unknownP61` | `number` | `1` | Sub-flag / calculation pass toggle. Arial 10pt (0.2pt smaller than selectors). Preserve on export. |

### 1.5 Non-Canonical Draft / Helper Cells (5 cells — read-only, preserved on export)

| # | Cell | DPRData Field | Actual Value | Reason for Exclusion |
|---|------|--------------|-------------|---------------------|
| 14 | **L25** | *(none — preserve raw)* | *(formula)* | Internal draft subsidy formula `=IF(M59=4,IF(AND(M56=1,M70=8),15%,25%),IF(AND(M56=1,M70=8),25%,35%))`; references M56 (empty) and M70=8 |
| 15 | **Q55** | *(none — preserve raw)* | `0.35` | Internal draft formula (non-canonical) |
| 16 | **R57** | *(none — preserve raw)* | `35` | Whole-number duplicate of G87; non-canonical helper |
| 17 | **R58** | *(none — preserve raw)* | `25` | Partial urban-check helper; incomplete |
| 18 | **R59** | *(none — preserve raw)* | `25` | **Conflicts with G87** (R59 returns 35 for Rural Male General, G87 returns 25). Preserve raw, do NOT use for calculation |

### 1.6 Broken Formula Cell (1 cell — app provides replacement)

| # | Cell | DPRData Field | Cached | App Action |
|---|------|--------------|--------|------------|
| 19 | **M36** | *(none — computed from M59)* | `#VALUE!` (15) | Bare range `=L59:L62`. Compute selected agency name from `M59`/lookup list. Do NOT fix the M36 formula. |

### 1.7 Structural / Spacer Cells (2 cells — preserved verbatim)

| # | Cell | DPRData Field | Contents | Purpose |
|---|------|--------------|----------|---------|
| 20 | **K46** | *(none — preserve)* | `" "` | Structural spacer between blocks |
| 21 | **B121** | *(none — preserve)* | `"Labor"` | Labor block header label, Arial 11pt |

---

## Part 2: Project_Report (29 unlocked cells)

### 2.1 Editable Selector (1 cell)

| # | Cell | DPRData Field | Type | Notes |
|---|------|--------------|------|-------|
| 1 | **K10** | `project.constitutionType` | `enum` or `text` | Constitution/legal status selector in printed report. May map to `project.legalStatus` (DataSheet!B34) |

### 2.2 Structural Section Markers (11 cells — preserved verbatim)

These are section-number cells that label the printed report sections. Preserve exact values on export.

| # | Cell | Content | Section |
|---|------|---------|---------|
| 2 | **A56** | `"8.3"` | Project description section |
| 3 | **A132** | `"9.7"` | Financial section |
| 4 | **A215** | `"9.14"` | Financial subsection |
| 5 | **A233** | `"10.0"` | Project cost section |
| 6 | **A312** | `"11.1"` | Means of finance |
| 7 | **A317** | `"11.2"` | Subsidy/margin money |
| 8 | **A321** | `"11.3"` | Working capital limit |
| 9 | **A340** | `"13.0"` | Projected P&L |
| 10 | **A344** | `"14.0"` | Projected balance sheet |
| 11 | **A355** | `"15.0"` | Projected cash flow |
| 12 | **A405** | `"19.0"` | DSCR |

### 2.3 Structural Labels (14 cells — preserved verbatim)

These label cells are part of the printed report structure. Preserve exact values on export.

| # | Cell | Content | Purpose |
|---|------|---------|---------|
| 13 | **B156** | *(instructional text)* | Instruction/guidance text for user |
| 14 | **B236** | `"A"` | Checklist/label marker "A" |
| 15 | **B239** | `"B"` | Checklist/label marker "B" |
| 16 | **B242** | `"C"` | Checklist/label marker "C" |
| 17 | **B247** | `"D"` | Checklist/label marker "D" |
| 18 | **B250** | `"E"` | Checklist/label marker "E" |
| 19 | **B253** | `"F"` | Checklist/label marker "F" |
| 20 | **B256** | `"G"` | Checklist/label marker "G" |
| 21 | **B259** | `"H"` | Checklist/label marker "H" |
| 22 | **B262** | `"I"` | Checklist/label marker "I" |
| 23 | **B265** | `"J"` | Checklist/label marker "J" (1st occurrence) |
| 24 | **B271** | `"K"` | Checklist/label marker "K" |
| 25 | **B307** | `"J"` | Duplicate "J" at B307 (documented typo in template — preserve BOTH) |

### 2.4 Column Header / Unit Labels (3 cells — preserved verbatim)

| # | Cell | Content | Purpose |
|---|------|---------|---------|
| 26 | **H349** | `"Days"` | Column header for working capital days table |
| 27 | **H352** | `"Days"` | Column header for payable days table |
| 28 | **F355** | `"Rs."` | Currency label for financial table |

### 2.5 Spacer Cell (1 cell — preserved verbatim)

| # | Cell | Content | Purpose |
|---|------|---------|---------|
| 29 | **L163** | `" "` | Empty spacer (whitespace placeholder) |

---

## Part 3: Additional Write-Target Cells (Locked — NOT in unlocked cell count)

**Important:** The 50 unlocked cells above are only cells the template user can directly edit. The app also **writes values** to many **locked cells** during export. These are documented in Groups 1–6 of the DPRData schema.

### Group 1: Applicant Identity (data cells — locked, app writes on export)

| DPRData Field | DataSheet Cell | Type | Required |
|--------------|---------------|------|----------|
| `applicant.name` | B8 | text | ✅ |
| `applicant.address` | B13 | text | ✅ |
| `applicant.talukBlock` | B16 | text | ❌ |
| `applicant.district` | B17 | text | ✅ |
| `applicant.state` | B18 | text | ✅ (dropdown) |
| `applicant.pin` | G17 | text (6 digits) | ✅ |
| `applicant.email` | B19 | text (email) | ✅ |
| `applicant.mobile` | F19 | text (10 digits) | ✅ |
| `applicant.qualificationAcademic` | B22 | text | ❌ |
| `applicant.qualificationTechnical` | E22 | text | ❌ |
| `project.name` | B31 | text | ✅ |
| `project.legalStatus` | B34 | text (dropdown) | ✅ |

### Group 2: Selectors (these ARE unlocked — see Part 1.1 above)

All 8 selector cells (M55, M59, M64, M67, M70, M80, M83, M91) are already covered in Part 1.1.

### Group 3: Block Line-Item Inputs (locked — app writes on export)

| DPRData Field | Range | Items | Description |
|--------------|-------|-------|-------------|
| `building[]` | DataSheet!B41:G47 | 7 items | Building name, area, rate per sq.ft |
| `machinery[]` | DataSheet!B54:G66 | 13 items | Machine name, make, model, power, qty, rate |
| `raw_materials[]` | DataSheet!B107:G115 | 9 items | Material name, unit, rate, qty |
| `sales_y1[]` | DataSheet!B94:G101 | 8 items | Product, rate, qty (Year 1) |
| `sales_y23[]` | DataSheet!B107:G115 | 9 items | Product, rate, qty (Year 2-3) |
| `wages[]` | DataSheet!B121:F127 | 7 items | Designation, skill level, qty, monthly rate |
| `salary[]` | DataSheet!B134:F138 | 5 items | Designation, skill level, qty, monthly rate |
| `preliminary_preoperative` | DataSheet!H70 | single currency | Preliminary & pre-operative expenses |
| `furniture_fixtures` | DataSheet!H72 | single currency | Furniture & fixtures cost |
| `contingency_others_misc` | DataSheet!H74 | single currency | Contingency / other misc cost |

### Group 4: Working Capital & Overheads (locked — app writes on export)

| DPRData Field | DataSheet Cell | Type |
|--------------|---------------|------|
| `stock_in_process_days` | G144 | number (days) |
| `finished_goods_days` | G146 | number (days) |
| `receivable_days` | G148 | number (days) |
| `power_units_kw` | F154 | number (kW) |
| `power_cost_per_unit` | H154 | number (Rs.) |
| `repair_pct_of_sales` | F157 | number (% decimal) |
| `power_fuel_pct_of_sales` | F159 | number (% decimal) |
| `other_overhead_pct` | F161 | number (% decimal) |
| `telephone_annual` | F163 | number (Rs.) |
| `stationery_annual` | F165 | number (Rs.) |
| `advertisement_annual` | F167 | number (Rs.) |
| `building_rent_monthly` | F169 | number (Rs./month) |
| `other_misc_pct` | F171 | number (% decimal) |

### Group 5: Financial Assumptions (locked — app writes on export)

| DPRData Field | DataSheet Cell | Type | Default | Notes |
|--------------|---------------|------|---------|-------|
| `rate_of_interest` | F173 | number (% p.a.) | user input | Write before export to fix "Interest @ 0%" in DPR_print |
| `depreciation_building` | F176 | number (% p.a.) | `0.05` (5% SLN) | **NOT 10%** — Gemini was wrong |
| `depreciation_machinery` | F177 | number (% p.a.) | `0.15` (15% WDV) | ✅ Matches Gemini |
| `payback_period_years` | F179 | number | `5` | **UNLOCKED** (see Part 1.3) |
| `implementation_months` | F180 | number | `2` | **UNLOCKED** (see Part 1.3) |

### Group 6: Broken-Reference Cells (locked — app provides direct input)

| DPRData Field | Cell | Type | Inferred Label |
|--------------|------|------|----------------|
| `applicant.fatherSpouseName` | Project_Report!G14 | text (required) | Father's/Spouse's Name |
| `applicant.state` | Project_Report!J20 | text (required, dropdown) | State |
| `applicant.phone` | Project_Report!H21 | text (10 digits) | Phone |
| `applicant.email` | Project_Report!H22 | text (email pattern) | Email |
| `front.preparedBy` | DPR_FRONT!B33 | text (required) | Preparing Officer/Office Name |
| `front.agencyAddressLine1` | DPR_FRONT!B35 | text (required) | Agency Address Line 1 |
| `front.agencyAddressLine2` | DPR_FRONT!B36 | text | Agency Address Line 2 |
| `front.agencyCityDistrict` | DPR_FRONT!B37 | text (required) | Agency City/District |
| `front.agencyState` | DPR_FRONT!F37 | text (required, dropdown) | State |

---

## Part 4: Summary Statistics

### By Sheet

| Sheet | Unlocked Cells | Map to DPRData Field | Structural/Preserve | Draft/Non-Canonical |
|-------|---------------|---------------------|--------------------|--------------------|
| **DataSheet** | 21 | 14 (67%) | 2 (10%) | 5 (24%) |
| **Project_Report** | 29 | 1 (3%) | 28 (97%) | 0 |
| **Total** | **50** | **15 (30%)** | **30 (60%)** | **5 (10%)** |

### By Category

| Category | Count | Action |
|----------|-------|--------|
| Selector dropdowns (user input) | 8 | Map to enum fields; validate against allowed values |
| Financial hardcoded inputs | 2 | Map to number fields; preserve default |
| Block placeholder defaults | 2 | Overwrite with user entries on export |
| Sub-flag / unknown | 1 | Preserve value on export |
| Draft / non-canonical (read-only) | 5 | Preserve raw values; never use for calculation |
| Broken formula (app replacement) | 1 | Compute from M59 in app logic |
| Structural / spacer / preserved verbatim | 30 | Do not overwrite; preserve exact contents |
| Section number markers | 11 | (subset of structural) |
| Editable selector (Project_Report) | 1 | Map to constitution/legal status field |

---

## Part 5: TypeScript Reference (for `src/lib/dpr-types.ts`)

```typescript
// DPRData field mapping for the 50 unlocked cells
// Keys = DPRData field path, Values = workbook cell coordinates
// Only cells that map to user-facing input fields are listed.

export const UNLOCKED_CELL_FIELD_MAP: Record<string, string> = {
  // DataSheet selectors (Part 1.1)
  'applicant.gender':            'DataSheet!M55',
  'applicant.sponsoringAgency':  'DataSheet!M59',
  'applicant.location':          'DataSheet!M64',
  'loan.isSecondLoan':           'DataSheet!M67',
  'applicant.category':          'DataSheet!M70',
  'project.sector':              'DataSheet!M80',
  'applicant.qualification':     'DataSheet!M83',
  'project.buildingOwnership':   'DataSheet!M91',

  // DataSheet placeholders (Part 1.2)
  'building[0].name':            'DataSheet!B41',
  'machinery[0].name':           'DataSheet!B54',

  // DataSheet financial inputs (Part 1.3)
  'payback_period_years':        'DataSheet!F179',
  'implementation_months':       'DataSheet!F180',

  // DataSheet sub-flag (Part 1.4)
  'loan.unknownP61':             'DataSheet!P61',

  // Project_Report selector (Part 2.1)
  'project.constitutionType':    'Project_Report!K10',
};

// Full cell→field map including locked write-target cells (Groups 1-6)
export const ALL_WRITE_TARGETS: Record<string, string> = {
  // Group 1: Applicant identity
  'applicant.name':                 'DataSheet!B8',
  'applicant.address':              'DataSheet!B13',
  'applicant.talukBlock':           'DataSheet!B16',
  'applicant.district':             'DataSheet!B17',
  'applicant.state':                'DataSheet!B18',
  'applicant.pin':                  'DataSheet!G17',
  'applicant.email':                'DataSheet!B19',
  'applicant.mobile':               'DataSheet!F19',
  'applicant.qualificationAcademic':  'DataSheet!B22',
  'applicant.qualificationTechnical': 'DataSheet!E22',
  'project.name':                   'DataSheet!B31',
  'project.legalStatus':            'DataSheet!B34',

  // Group 2: Selectors (unlocked — already in UNLOCKED_CELL_FIELD_MAP above)

  // Group 4: Working capital & overheads (G-col verified, not F-col)
  'stock_in_process_days':          'DataSheet!G144',
  'finished_goods_days':            'DataSheet!G146',
  'receivable_days':                'DataSheet!G148',
  'power_units_kw':                 'DataSheet!F154',
  'power_cost_per_unit':            'DataSheet!H154',
  'repair_pct_of_sales':            'DataSheet!F157',
  'power_fuel_pct_of_sales':        'DataSheet!F159',
  'other_overhead_pct':             'DataSheet!F161',
  'telephone_annual':               'DataSheet!F163',
  'stationery_annual':              'DataSheet!F165',
  'advertisement_annual':           'DataSheet!F167',
  'building_rent_monthly':          'DataSheet!F169',
  'other_misc_pct':                 'DataSheet!F171',

  // Group 5: Financial assumptions
  'rate_of_interest':               'DataSheet!F173',
  'depreciation_building':          'DataSheet!F176',
  'depreciation_machinery':         'DataSheet!F177',

  // Group 6: Broken-reference cells (use the canonical DPRData field names
  // that match DataSheet!B19/F19 and project-report project_Report sibling cells;
  // no `state2`/`email2`/`fatherOrSpouseName` variants - one field per concept)
  'applicant.fatherSpouseName':     'Project_Report!G14',
  'applicant.state':                'Project_Report!J20',
  'applicant.phone':                'Project_Report!H21',
  'applicant.email':                'Project_Report!H22',
  'front.preparedBy':               'DPR_FRONT!B33',
  'front.agencyAddressLine1':       'DPR_FRONT!B35',
  'front.agencyAddressLine2':       'DPR_FRONT!B36',
  'front.agencyCityDistrict':       'DPR_FRONT!B37',
  'front.agencyState':              'DPR_FRONT!F37',
};
```

---

## Part 6: Export Policy Notes

| Rule | Applies To | Rationale |
|------|-----------|-----------|
| **Overwrite Placeholders** | B41, B54 | "2 Floor Building" and "CNC" are placeholder defaults, not protected labels |
| **Preserve Draft Cells** | L25, Q55, R57, R58, R59 | Non-canonical formulas; preserve raw values as-is |
| **Compute Broken Cells** | M36 | Dead formula `=L59:L62`; compute agency name from M59 index |
| **Write Silent Cells** | F173 (interest rate) | Prevents "Interest @ 0%" in DPR_print output |
| **Preserve Section Markers** | All Project_Report A-column cells | Part of the legal KVIC template structure |
| **Preserve Label Markers** | All Project_Report B-column checklist cells | Include duplicate "J" at B307 — part of template |
| **Never Insert/Delete Rows** | All sheets | 1,588 merged ranges make structural changes destructive |
| **Unhide on Export** | All sheets | Application_form, Project_Report, DPR_FRONT are hidden in template |

---

## Cross-Check Footer (DPR-GUIDE-BLUEPRINT §14.1 / §17 / §18.1)

This file was cross-checked against `DPR-GUIDE-BLUEPRINT.md` on 2026-06-14. Corrections applied during cross-check:

1. **M67 allowed-values order:** flipped to `1=No (1st loan, default), 2=Yes (2nd loan / upgradation)` per `L67:L68` lookup list and `pmegp-rules.ts` `isSecondLoan: boolean` convention.
2. **L25 actual value:** the cell contains a **formula** (`=IF(M59=4,IF(AND(M56=1,M70=8),15%,25%),IF(AND(M56=1,M70=8),25%,35%))`), not a literal `0.35`. xlrd only shows the cached value `0.35`; the formula is the canonical artefact.
3. **Working-capital days cells (Group 4):** corrected `F146/F148/F150` → **`G144/G146/G148/G150`** per `DPR_print!E282/E284/E286/E288 = =DataSheet!G144/G146/G148/G150` cross-sheet references. F146/F148/F150 are not the WC day input cells; they are unused in the printed report.
4. **Broken-reference cell field names (Group 6):** collapsed `applicant.fatherOrSpouseName` → `applicant.fatherSpouseName`, `applicant.state2` → `applicant.state`, `applicant.email2` → `applicant.email` to match the canonical `DPRData` schema in `src/lib/dpr-types.ts` (one field per concept, not per occurrence). The `applicant.email` / `applicant.mobile` already exist as `DataSheet!B19` / `DataSheet!F19`; the `Project_Report!H21/H22` cells are the printed-narrative mirrors and should reuse the same field name (not create a separate `phone` / `email2`).

*Generated from DPRPACKAGE.xls deep analysis (2026-06-14) and DPR-GUIDE-BLUEPRINT.md §14.1, §17 Groups 1-6. Cross-checked and corrected against the blueprint 2026-06-14.*
