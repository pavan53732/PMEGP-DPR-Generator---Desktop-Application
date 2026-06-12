# PMEGP DPR Generator — Application Blueprint

## 1. Introduction

> **Scope:** `DPRPACKAGE.xls`-backed Windows desktop application.
>
> **Purpose:** Safe implementation plan for a Windows desktop application.

> **Blueprint status**: This document is a target implementation plan. It should describe the product, architecture, PMEGP/workbook rules, validation, export, build, and verification requirements only. Do not include local folder assumptions, terminal output, or machine-specific state.

> **Product naming rule**: The working product name is **PMEGP DPR Generator**. Keep installer names, Electron `productName`, tray labels, report text, and documentation consistent with this name unless a formal rename is approved.

## 2. Platform

Desktop-only Windows application.

| Attribute | Value |
|-----------|-------|
| **Product / App Name** | PMEGP DPR Generator |
| **Workbook Template** | `DPRPACKAGE.xls` — canonical PMEGP DPR workbook/template source of truth |
| **Target OS** | Windows 10 / Windows 11 |
| **Runtime** | Electron |
| **UI Framework** | Next.js 16, pinned to a stable release after dependency verification |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 + shadcn/ui, pinned to stable versions after dependency verification |
| **State** | Zustand |
| **Excel Export** | ExcelJS or workbook template engine, depending on verified `.xls` support |
| **AI SDK** | OpenAI SDK (Electron main process only — user provides API key) |
| **Installer** | NSIS (via electron-builder) |
| **Output** | `PMEGP-DPR-Generator-Setup-{version}.exe` (NSIS installer) |

This application is desktop-only. No web deployment is supported.

> **Important workbook boundary**: `DPRPACKAGE.xls` is the candidate template and primary export contract. The app is not the official KVIC workbook itself, and it must not imply that generated files are government-issued documents. The workbook should drive fields, formulas, validation, and export behavior only after workbook audit and official verification.

> **Important product boundary**: This is an unofficial desktop tool for generating PMEGP DPR documents. It must not imply that it is KVIC, MSME, a bank, or an official government application.

> **Style**: Windows 11 native app — frameless window, Mica/Acrylic effects, rounded corners  
> **Theme**: Emerald green primary, dark/light mode, professional desktop app style  

---

## 3. 📐 DPRPACKAGE.xls Workbook Contract


### 3.1 Workbook-Centric Architecture


The application must be designed around `DPRPACKAGE.xls`, not around a generic PMEGP chatbot or loosely related Excel export.

Correct architecture:

```text
Workbook Audit
    ↓
Workbook Field Map
    ↓
DPRData Schema
    ↓
Validation Engine
    ↓
Calculation Engine / Formula Registry
    ↓
Workbook Mapper
    ↓
Excel Export / PDF Report
```

Rules:

1. `DPRPACKAGE.xls` is the canonical export contract only after workbook audit and official verification.
2. Every user-facing field must either:
   - map to a verified workbook sheet/cell/range, or
   - be marked as app-added metadata.
3. Export should prefer loading/copying the workbook and populating verified cells/ranges.
4. If `.xls` editing is not technically feasible, fallback export must be explicitly marked as **template-compatible generated workbook**, not the original workbook.
5. Workbook formulas should be audited before implementation.
6. Broken or ambiguous formulas must be documented and replaced only by canonical app-side calculations.
7. The export layer must never invent calculations.

### 3.2 Workbook Audit Requirements


Before implementing export logic, inspect the actual workbook and record:

1. **Template metadata**
   - File: `DPRPACKAGE.xls`
   - Template version/hash
   - Packaged runtime path
   - Output extension policy: `.xls` vs `.xlsx`
   - Whether formulas/formatting must be preserved exactly

2. **Verified sheet inventory**
   - Expected sheets to verify: `Application_form`, `DataSheet`, `DPR_print`, `Project_Report`, `DPR_FRONT`
   - Add any additional sheets found in the actual workbook
   - Do not claim sheet names are verified until the workbook is actually inspected

3. **Field mapping table**
   Every user-facing field must map to a workbook sheet/cell/range.

   | App Field | Type | Workbook Sheet | Cell/Range | Notes |
   |---|---|---|---|---|
   | `applicant.name` | string | DataSheet / Project_Report | verify exact cell | Required for export fidelity |
   | `applicant.gender` | enum | DataSheet | `M55` | Workbook code: 1=Male, 2=Female, 3=Transgender |
   | `applicant.category` | enum | DataSheet | `M70` | Workbook category code |
   | `project.location` | enum | DataSheet | `M64` | Workbook code: 1=Rural, 2=Urban |
   | `project.sector` | enum | DataSheet | `M80` | Workbook code: 1=Manufacturing, 2=Service |
   | `project.sponsoringAgency` | enum | DataSheet | `M59` | Workbook code: 1=KVIC, 2=KVIB, 3=DIC, 4=Coir Board |

4. **Line-item row mapping**
   - Building rows
   - Machinery rows
   - Other capital costs
   - Working capital rows
   - Sales/revenue rows
   - Raw material rows
   - Labor/wages rows
   - Staff salary rows
   - Other expenses

5. **Export rule**
   - **Canonical official export:** template-fill. Load the audited `DPRPACKAGE.xls`/`.xlsx` template, populate verified input cells/ranges, preserve formulas/formatting/print layout, then save as a new file.
   - Fallback export: generate a simplified workbook only when official template preservation is not technically feasible.
   - Every exported field must be traceable to a workbook cell/range or documented as a new app-added field.
   - ExcelJS-from-scratch export is **not** workbook-equivalent for official DPR output because the workbook contains 1,588 merged ranges and complex printable layouts.

### 3.3 Workbook Formula Audit and Canonical Formula Policy

Deep workbook audit status: LibreOffice-converted `.xlsx` formula extraction verified the primary DataSheet selector cells and subsidy formulas. Claims below are based on that audit and should still be rechecked against the original `.xls` behavior before final release.

For each formula, document the workbook source, intended rule, and app policy.

| Formula | Workbook Cell | Current Template Formula | Intended Rule | App Policy |
|---|---|---|---|---|
| Gender selector | `M55` | input/index value | 1=Male, 2=Female, 3=Transgender | ✅ Verified from workbook labels/checkmark formulas/lookup list |
| Sponsoring agency selector | `M59` | input/index value | 1=KVIC, 2=KVIB, 3=DIC, 4=COIR Board | ✅ Verified from workbook labels/checkmark formulas/lookup list |
| Location selector | `M64` | input/index value | 1=Rural, 2=Urban | ✅ Verified from workbook labels/checkmark formulas/lookup list |
| Category selector | `M70` | input/index value | 1=SC, 2=ST, 3=OBC, 4=PHC, 5=Ex-Serviceman, 6=Minority, 7=Hill Border Area, 8=Aspirational Districts, 9=General | ✅ Verified from workbook labels/checkmark formulas/lookup list |
| Sector selector | `M80` | input/index value | 1=Manufacturing, 2=Service | ✅ Verified from workbook labels/checkmark formulas/lookup list |
| Own contribution | `G85` | `=IF(AND(DataSheet!M55=1,DataSheet!M70=9),10%,5%)` | Male+General = 10%; all others = 5% | ✅ Canonical subsidy/finance formula |
| Bank finance | `G86` | `=100%-G85` | Complement of own contribution | ✅ Canonical subsidy/finance formula |
| Subsidy rate | `G87` | `=IF(DataSheet!M64=2,IF(AND(DataSheet!M55=1,DataSheet!M70=9),15%,25%),IF(AND(DataSheet!M55=1,DataSheet!M70=9),25%,35%))` | 15/25/35 logic based on location, gender, and category | ✅ Canonical subsidy formula |
| Parallel subsidy calc | `L25` | `=IF(DataSheet!M59=4,IF(AND(DataSheet!M56=1,DataSheet!M70=8),15%,25%),IF(AND(DataSheet!M56=1,DataSheet!M70=8),25%,35%))` | Uses Coir Board branch but references `M56` and `M70=8`; not consumed by output | ❌ Non-canonical / ignore for subsidy calculation |
| Legacy helper | `R57` | `=IF(M64=2,IF(AND(M55=1,M70=9),15,25),IF(AND(M55=1,M70=9),25,35))` | Whole-number duplicate of G87 | ❌ Non-canonical helper |
| Partial helper | `R58` | `=IF(AND(M55=1,M70=9,M64=2),15,25)` | Partial urban check | ❌ Non-canonical helper |
| Inconsistent helper | `R59` | `=IF(AND(M55=1,M64=1,M70=9),35,25)` | Conflicts with G87 for Rural Male General: R59 returns 35 while G87 returns 25 | ❌ Non-canonical helper |
| Broken helper | `R60` | `=IF(AND(M57=1,M72=9,M66=2),15,0)` | References non-input cells; returns 0 | ❌ Broken/dead formula |

Policy:

- Preserve valid `DPRPACKAGE.xls` formulas for export fidelity.
- Use `G85`, `G86`, and `G87` as the audited canonical workbook formulas for own contribution, bank finance, and subsidy rate.
- Do **not** use `L25`, `R57`, `R58`, `R59`, or `R60` as subsidy authority.
- Treat `DataSheet!M36` as a known broken lookup; compute the sponsoring agency display name from `M59` in app logic.
- Treat `DataSheet!M56` as non-canonical/empty; only `M55` is the active gender input.
- Use audited canonical formulas for known broken or ambiguous workbook formulas.
- Document every deviation from the workbook formula.
- Add tests for workbook load success, no unresolved `#REF!` in exported files, G87-equivalent subsidy logic, project-cost-limit handling, second-loan subsidy caps, and R59/R60 discrepancy handling.

---

## 4. 📐 Architecture Overview


```
┌──────────────────────────────────────────────────────────────────────┐
│  PMEGP DPR Generator — Windows Desktop Application                   │
│                                                                      │
│  ┌─ Electron Main Process ──────────────────────────────────────┐   │
│  │  • Window management (frameless, custom titlebar)            │   │
│  │  • System tray icon                                          │   │
│  │  • Native file dialogs (save/load DPR, export Excel)         │   │
│  │  • Windows notifications                                     │   │
│  │  • IPC bridge to renderer                                    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │ IPC                                   │
│  ┌─ Electron Renderer (Next.js) ───────────────────────────────┐   │
│  │                                                              │   │
│  │  ┌──────────┐  ┌──────────────────────────────────────────┐ │   │
│  │  │          │  │ ╔═══ CUSTOM TITLEBAR ══════════════════╗ │ │   │
│  │  │          │  │ ║ 🏠 PMEGP DPR Generator   ─ □ ✕  (Windows) ║ │ │   │
│  │  │  LEFT    │  │ ╚═══════════════════════════════════════╝ │ │   │
│  │  │  NAV     │  ├──────────────────────────────────────────┤ │   │
│  │  │          │  │                                          │ │   │
│  │  │  • Home  │  │         MAIN CONTENT AREA                │ │   │
│  │  │  • Form  │  │                                          │ │   │
│  │  │  • AI    │  │  (Changes based on selected nav item)    │ │   │
│  │  │  • Report│  │                                          │ │   │
│  │  │  • Settings│  │                                          │ │   │
│  │  │          │  ├──────────────────────────────────────────┤ │   │
│  │  │          │  │  AI Assistant Chat Panel (Collapsible)   │ │   │
│  │  └──────────┘  └──────────────────────────────────────────┘ │   │
│  │  ┌──────────────────────────────────────────────────────────┐│   │
│  │  │  Footer: PMEGP Info | Version | © 2026 | 📁 Save/Load  ││   │
│  │  └──────────────────────────────────────────────────────────┘│   │
│  └──────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5. 🤖 AI Interview & Autofill Flow — User Questions First, Calculations Second


The AI assistant should not behave like a generic PMEGP advisor that only answers free-form questions. For DPR creation, the preferred flow is an interview-first autofill process:

1. **AI asks missing required DPR/business questions first**.
2. The user answers in natural language or through guided form prompts.
3. The AI converts answers into structured `DPRData` fields.
4. The app validates the structured data.
5. The calculation engine computes subsidy, own contribution, bank loan, depreciation, P&L, DSCR, BEP, and workbook values.
6. The workbook mapper fills `DPRPACKAGE.xls` sheets/cells.
7. The user reviews autofilled fields and confirms before export.

### 5.1 Required AI Interview Topics


The AI should ask for missing required information before autofilling or calculating. At minimum, cover:

- **Project basics**
  - Project name and activity description.
  - Manufacturing or service/business sector.
  - Rural or urban location.
  - Sponsoring agency preference, if required.
- **Applicant / promoter**
  - Name, address, district, state, pin.
  - Gender.
  - Category: General, SC, ST, OBC, Women, Minority, Ex-Servicemen, PH/Transgender, NER/Hill/Border/Aspirational District, etc.
  - Qualification and constitution/legal status if relevant.
- **Loan and subsidy inputs**
  - Project cost required.
  - Bank loan amount required or target loan amount.
  - Whether this is a first loan or second loan/upgradation.
  - Whether the project is in NER/Hill/Border/Aspirational District, if applicable.
- **Premises**
  - Building owned, rented, or leased.
  - Building cost, if owned/renovation is claimed.
  - Rent/lease cost, if rented/leased.
- **Capital expenditure**
  - Machinery/equipment list with cost.
  - Furniture/fixtures, preliminary/pre-operative expenses, contingency.
  - Land cost must be excluded from PMEGP project cost.
- **Working capital**
  - Raw material cost.
  - Consumables, packaging, utilities, transport, marketing, admin expenses.
  - Required working capital period and stock assumptions.
- **Labor and wages**
  - Number of workers/staff.
  - Wages/salary per person.
  - Skilled/unskilled breakdown if available.
- **Sales and revenue**
  - Production/sales capacity.
  - Unit selling price.
  - Capacity utilization assumptions.
  - Expected monthly/annual sales.
- **Financial assumptions**
  - Interest rate, loan tenure, repayment method, if not already fixed by PMEGP/workbook defaults.
  - Depreciation and tax assumptions only if supported by verified workbook/rules.

### 5.2 AI-to-Form Autofill Rules


- AI may extract or suggest values, but it is **not** the final calculation authority.
- All numeric financial outputs must come from `pmegp-rules.ts`, `dpr-calculations.ts`, verified workbook formulas, or a future deterministic calculation engine.
- AI-suggested changes to critical fields must be shown as draft values and require user confirmation before insertion.
- Critical fields include project cost, loan amount, subsidy, own contribution, bank loan, machinery/building/raw material/labor/revenue assumptions, and any field used for PMEGP eligibility.
- If required data is missing or ambiguous, the AI should ask a follow-up question instead of guessing.
- If a user answer conflicts with PMEGP/workbook rules, the app should show a validation warning and let the user correct it.
- The AI interview flow is product behavior; Electron IPC channel names such as `ai:ask`, `ai:chat`, `ai:test`, or `ai:suggest` are technical implementation details.

### 5.3 Recommended Deterministic Flow


```text
AI Interview
  → Extract Candidate DPRData
  → Validation Engine
  → Calculation Engine
  → Workbook Mapper
  → Excel/PDF Export
```

This keeps the AI useful for user guidance, natural-language input, and field suggestions while keeping PMEGP calculations deterministic, auditable, and workbook-aligned.

---

## 6. 🇮🇳 PMEGP Knowledge Base — Rule, Validation, and Reference Content

Rules used in calculations, validation, AI responses, or exported reports must be verified against the workbook and current official PMEGP/MSME/KVIC/CGTMSE sources before release.

### 0. AI Boundary Rules

The AI assistant is a PMEGP/DPR support assistant, not a legal, financial, tax, banking, or government authority.

Required boundaries:

1. The AI must not claim to be KVIC, MSME, a bank, or a government official.
2. The AI must not guarantee loan approval, subsidy approval, collateral-free status, or bank acceptance.
3. The AI must not invent PMEGP rules that are not present in the workbook, validation engine, or verified official source.
4. The AI must distinguish between verified workbook-derived rules, verified official PMEGP rules, assumptions, and optional guidance.
5. The AI must not provide legal, tax, CA-substitute, or investment advice.
6. The AI must not expose, echo, or log API keys.
7. The AI must run through Electron IPC only.
8. The AI must use structured DPR data and the PMEGP rules engine as context, not free-form hallucinated policy.
9. The AI must not send full DPR data containing personal or financial information to third-party APIs unless the user explicitly consents.
10. AI suggestions that could change critical legal/financial fields must require user confirmation before insertion.

---

### 1. Scheme Overview

| Attribute | Detail |
|-----------|--------|
| **Full Name** | Prime Minister's Employment Generation Programme |
| **Type** | Central Sector Scheme (100% Govt of India funded, credit-linked subsidy) |
| **Nature** | NOT a direct loan — it is a subsidy on a bank loan |
| **Sector** | Non-farm sector — micro enterprises only |
| **Official Portal** | kviconline.gov.in/pmegpeportal |
| **Margin Money Mechanics** | Subsidy is routed through the bank, held in TDR/lock-in for 3 years, then adjusted against the loan after physical verification. During lock-in, liability is the full sanctioned amount. |

---

### 2. Eligibility Criteria — Complete

#### 2.1 Who CAN Apply

> Per official PMEGP FAQ: beneficiaries include **individuals, institutions, co-operative societies, SHGs, and trusts**.

| Category | Eligible? | Notes |
|----------|-----------|-------|
| **Individuals (above 18 years)** | ✅ YES | No income ceiling |
| **Institutions** (under Societies Registration Act 1860) | ✅ YES | |
| **Co-operative Societies** | ✅ YES | |
| **Self Help Groups (SHGs)** | ✅ YES | |
| **Trusts** (Charitable Trusts etc.) | ✅ YES | |

#### 2.2 Who CANNOT Apply

- ❌ PMEGP is for **new units only** — the only exception is 2nd loan for existing PMEGP/REGP/MUDRA units (upgradation)
- ❌ Existing units that already availed Govt subsidy under other State/Central schemes
- ❌ Units in the **Negative List** (see Section 7)
- ❌ Applicants who already availed PMEGP/REGP/MUDRA subsidy (except 2nd loan for upgradation)
- ❌ One applicant = one project only (cannot submit multiple projects)
- ❌ **Family definition**: Self and Spouse — only ONE project per family

#### 2.3 Special Category Beneficiaries (Enhanced Subsidy)

| # | Category | Code in DPR |
|---|----------|-------------|
| 1 | **SC** (Scheduled Caste) | M70=1 |
| 2 | **ST** (Scheduled Tribe) | M70=2 |
| 3 | **OBC** (Other Backward Class) | M70=3 |
| 4 | **PHC** (Differently Abled) | M70=4 |
| 5 | **Ex-Serviceman** | M70=5 |
| 6 | **Minority** | M70=6 |
| 7 | **Hill & Border Area** (notified by Govt) | M70=7 |
| 8 | **Aspirational Districts** | M70=8 |
| 9 | **General** (General Category — MALE ONLY) | M70=9 |

> **Critical rule:** Women = Special Category always. Women are classified as Special Category regardless of their social category (SC/ST/OBC/General). In the Excel template, if Gender=Female (M55=2), the applicant automatically gets Special Category subsidy rates even if M70=9 (General). Transgender (M55=3) also gets Special Category rates. The AI should explain this only when the user's entered gender/category data indicates it applies, and should advise verifying with the latest official/workbook rule.

---

### 3. Maximum Project Cost & Loan Limits

#### 3.1 First Loan (New Enterprise)

| Sector | Maximum Project Cost | Maximum Subsidy Amount |
|--------|---------------------|----------------------|
| **Manufacturing** | **₹50,00,000** (₹50 Lakh) | ₹17.50 Lakh (35% of ₹50L) |
| **Service/Business** | **₹20,00,000** (₹20 Lakh) | ₹7.00 Lakh (35% of ₹20L) |

#### 3.2 Second Loan (Upgradation of Existing Unit)

| Sector | Maximum Project Cost | Maximum Subsidy |
|--------|---------------------|----------------|
| **Manufacturing** | **₹1,00,00,000** (₹1 Crore) | ₹15.00 Lakh (general) / ₹20.00 Lakh (NER & Hill) |
| **Service/Business** | **₹25,00,000** (₹25 Lakh) | ₹3.75 Lakh (general) / ₹5.00 Lakh (NER & Hill) |

#### 3.3 If Project Cost Exceeds Limits

> If the total project cost exceeds ₹50 Lakh (manufacturing) or ₹20 Lakh (service), the balance credit may be availed from banks without Government subsidy, while the portion up to the limit may receive subsidy. Verify this rule from the current official/workbook source before using it as a hard validation rule. The AI should warn users that subsidy applies only to the verified eligible portion.

#### 3.4 Components of Project Cost

| Component | Type |
|-----------|------|
| Capital Expenditure (Term Loan) | Building, Machinery, Equipment |
| Working Capital | Raw materials, operating expenses |
| **Total Project Cost** | = Capital Expenditure + Working Capital |

**Own Contribution is NOT added on top** — it is a percentage of the project cost:

| Category | Own Contribution | Bank Finance |
|----------|-----------------|-------------|
| General Male | 10% of Project Cost | 90% of Project Cost |
| Special Category | 5% of Project Cost | 95% of Project Cost |

> **Cost of LAND CANNOT be included** in the project cost. This is a common mistake — the validation engine should flag this, and the AI should explain it as a rule only after workbook/official verification.

**Example**: If Building = ₹10L + Machinery = ₹25L + Working Capital = ₹15L, then **Project Cost = ₹50L**. Own Contribution (5%) = ₹2.5L. Bank Finance (95%) = ₹47.5L. Own Contribution is derived from project cost, NOT added to it.

---

### 4. Subsidy Rates — Deep Dive

#### 4.1 Complete Subsidy Matrix

| Category | Location | Own Contribution | Subsidy Rate | Bank Finance |
|----------|----------|-----------------|--------------|-------------|
| **General** (Male only) | Urban | 10% | **15%** | 90% |
| **General** (Male only) | Rural | 10% | **25%** | 90% |
| **Special** (SC/ST/OBC/Women/Minority/Ex-Svc/PH/Transgender/NER/Hill/Border/Aspirational) | Urban | 5% | **25%** | 95% |
| **Special** | Rural | 5% | **35%** | 95% |

#### 4.2 Subsidy Decision Tree (Decoded from Excel Cell G87)

```excel
IF Location = Urban (M64=2):
    IF Gender = Male (M55=1) AND Category = General (M70=9): 15%
    ELSE: 25%
IF Location = Rural (M64=1):
    IF Gender = Male (M55=1) AND Category = General (M70=9): 25%
    ELSE: 35%
```

#### 4.3 Own Contribution Formula (Cell G85)

```excel
IF Gender = Male (M55=1) AND Category = General (M70=9): 10%
ELSE: 5%
```

#### 4.4 Subsidy Calculation Examples — Test/Explanation Cases

**Example 1: General Male, Urban, Manufacturing**
- Project Cost: ₹25,00,000
- Own Contribution: 10% = ₹2,50,000
- Subsidy (Margin Money): 15% = ₹3,75,000
- Bank Loan (Sanctioned): ₹22,50,000 (90%)
- Net Liability After Lock-In: ₹18,75,000 (Bank Loan − Margin Money, after 3-yr lock-in + verification)

**Example 2: SC Male, Rural, Manufacturing**
- Project Cost: ₹50,00,000
- Own Contribution: 5% = ₹2,50,000
- Subsidy (Margin Money): 35% = ₹17,50,000
- Bank Loan (Sanctioned): ₹47,50,000 (95%)
- Net Liability After Lock-In: ₹30,00,000 (Bank Loan − Margin Money, after 3-yr lock-in + verification)

**Example 3: OBC Woman, Urban, Service**
- Project Cost: ₹15,00,000
- Own Contribution: 5% = ₹75,000
- Subsidy (Margin Money): 25% = ₹3,75,000
- Bank Loan (Sanctioned): ₹14,25,000 (95%)
- Net Liability After Lock-In: ₹10,50,000 (Bank Loan − Margin Money, after 3-yr lock-in + verification)

#### 4.5 Maximum Subsidy Amounts (Practical Caps) — Validation/Warning Cases

| Scenario | Project Cost | Subsidy % | Max Subsidy |
|----------|-------------|-----------|-------------|
| Manufacturing, Special, Rural | ₹50 Lakh | 35% | **₹17.50 Lakh** |
| Manufacturing, General, Rural | ₹50 Lakh | 25% | **₹12.50 Lakh** |
| Manufacturing, Special, Urban | ₹50 Lakh | 25% | **₹12.50 Lakh** |
| Manufacturing, General, Urban | ₹50 Lakh | 15% | **₹7.50 Lakh** |
| Service, Special, Rural | ₹20 Lakh | 35% | **₹7.00 Lakh** |
| Service, General, Rural | ₹20 Lakh | 25% | **₹5.00 Lakh** |
| Service, Special, Urban | ₹20 Lakh | 25% | **₹5.00 Lakh** |
| Service, General, Urban | ₹20 Lakh | 15% | **₹3.00 Lakh** |

---

### 5. How the Subsidy Math Works

```text
Project Cost = ₹50,00,000
Own Contribution = 5% = ₹2,50,000
Bank Sanctions = 95% = ₹47,50,000

Bank loan includes:
  - Margin Money (Subsidy) = 35% = ₹17,50,000, routed through bank and held in TDR/lock-in
  - Net Liability After Lock-In = ₹47,50,000 - ₹17,50,000 = ₹30,00,000

During the 3-year lock-in, borrower liability is the full ₹47,50,000.
After 3 years + physical verification + geo-tagging, the IA issues an MM Adjustment Letter and the bank writes off the Margin Money from the loan.
```

---

### 6. Interest Rate & Loan Repayment

#### 6.1 Interest Rate

- **Not fixed by PMEGP** — charged at **prevailing bank rates**
- **Typical range: 8% to 14%** depending on bank, category, and scheme
- The app must store the user-selected interest rate as an input/default assumption.
- AI may explain interest-rate ranges only as examples and must not recommend a specific bank or guarantee lower rates.

#### 6.2 Repayment Schedule


| Parameter | Value |
|-----------|-------|
| **Repayment Frequency** | Quarterly |
| **Tenure** | 3-7 years |
| **Moratorium** | As per bank (typically 6-12 months) |
| **Interest during moratorium** | May be capitalized or serviced |

#### 6.3 EMI Calculation (From Excel PMT Formula)


```
EMI = PMT(annual_rate/12, months, -loan_amount)
```

Example: ₹30,00,000 loan at 11% for 7 years:
- Monthly EMI = PMT(11%/12, 84, -3000000) = **₹51,571/month**

---

### 7. Negative List — Activities NOT Allowed (with REASONS)

#### 7.1 Completely Prohibited



| # | Activity | Reason |
|---|----------|--------|
| 1 | **Meat processing/canning/serving** (slaughtered meat) | Socio-religious sensitivity |
| 2 | **Beedi/Paan/Cigar/Cigarette** manufacturing or sale | Health hazards |
| 3 | **Hotels/Dhabas serving liquor** | Intoxicant items |
| 4 | **Tobacco preparation** as raw material | Health hazards |
| 5 | **Toddy tapping** for sale | Intoxicant |
| 6 | **Polythene carry bags < 75 microns** | Environmental concerns (Ministry of Environment rule) |
| 7 | **Recycled plastic containers** for food storage | Health/environment |
| 8 | **Cultivation of crops/plantation** (Tea, Coffee, Rubber) | Agricultural exclusion |
| 9 | **Sericulture** (cocoon rearing — basic) | Agricultural exclusion |
| 10 | **Horticulture / Floriculture** (basic cultivation) | Agricultural exclusion |
| 11 | **Animal Husbandry** (basic rearing) | Agricultural exclusion |
| 12 | Activities **prohibited by local authorities** | Legal compliance |
| 13 | **Pashmina Wool hand spinning/hand weaving** | Comes under Khadi Certification |
| 14 | **Rural Transport** (except specific exceptions) | Not village industry |

#### 7.2 ALLOWED with Conditions (Complete Exceptions List)



| Activity | Conditions |
|----------|-----------| 
| **Non-vegetarian food** at Hotels/Dhabas (WITHOUT liquor) | ✅ Allowed |
| **Value addition** under Tea/Coffee/Rubber (e.g., coffee processing, tea packaging) | ✅ Allowed |
| **Off-farm/Farm-linked activities** in sericulture/horticulture/floriculture | ✅ Allowed |
| **Dairy** (cows, sheep, goats, camels, buffaloes) | ✅ Allowed |
| **Poultry** (chickens, turkeys, geese, ducks) | ✅ Allowed |
| **Aquaculture** (fish, molluscs, crustaceans, aquatic plants) | ✅ Allowed |
| **Insects** (Bees, Sericulture) | ✅ Allowed |
| **Piggery** | ✅ NER states only (North Eastern Region) |
| **Auto rickshaws** | ✅ A&N Islands and NER only (CNG only, Chief Secretary approval required) |
| **House boats / Tourist boats** | ✅ A&N Islands and J&K only |

> 🔴 **AI/Validation NOTE**: When user enters a business name/description, the AI or validation engine should check against this Negative List and warn immediately with the reason, but should not block export unless the activity is confirmed from the official/current negative list.

---

### 8. Common Mistakes & Rejection Reasons — Validation Warnings


| # | Mistake | How to Avoid | AI Action |
|---|---------|-------------|-----------|
| 1 | **Applying for existing unit** | Only NEW units eligible (except 2nd loan for existing PMEGP/REGP/MUDRA units) | Warn if user mentions existing business |
| 2 | **Including land cost** in project cost | Land cost NOT allowed | Flag any "land" line item in cost breakdown |
| 3 | **Wrong category selection** (M55, M56, M70) | Double-check gender + category | Auto-verify: if Female + General → still Special Category |
| 4 | **Project cost exceeds limit** | Max ₹50L (Mfg), ₹20L (Svc) | Show warning when cost exceeds limit |
| 5 | **Negative list activity** | Check Section 9 carefully | Warn immediately on business name entry |
| 6 | **Multiple applications** | One project per family (self + spouse) | Remind user of family rule |
| 7 | **Not completing EDP training** | Mandatory for >₹2L projects | Show EDP requirement based on project cost |
| 8 | **Poor CIBIL score** | Check before applying | Advise: "Check your CIBIL score first" |
| 9 | **Incomplete documentation** | Upload all required certificates | Show document checklist per category |
| 10 | **Per capita investment exceeds limit** | ≤₹3L (plain) / ₹4.5L (hilly) per worker | Validate employment vs investment ratio |

---

### 9. Collateral & CGTMSE — Validation/Guidance Rule


#### 9.1 Collateral-Free Loans


| Project Cost | Collateral Required? |
|-------------|---------------------|
| Up to ₹10 Lakh | **No collateral** (RBI mandate — banks CANNOT insist) |
| ₹10 Lakh to ₹50 Lakh | CGTMSE guarantee available |
| Above ₹50 Lakh | Collateral may be required by bank |

#### 9.2 CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises)


- Provides **guarantee cover** for collateral-free loans up to **₹2 Crore**
- Guarantee coverage: **75% to 85%** of the loan amount
- PMEGP loans up to ₹50 Lakh are covered under CGTMSE
- The guarantee fee is paid by the **lending bank** (not you!)
- **RBI has mandated** that banks must NOT ask for collateral for loans up to ₹10 Lakh

> **AI/Validation NOTE**: If your project is up to ₹10 Lakh, PMEGP/RBI/CGTMSE guidance generally supports collateral-free loans. For projects up to ₹2 Crore, CGTMSE coverage may be available. The AI should phrase this as general guidance and recommend verifying current bank/KVIC/CGTMSE rules before submission.

---

### 10. Lock-in Period & Subsidy Adjustment — The Complete Process

#### 10.1 Lock-in Period
- **3 years** from the date of Margin Money claim
- During lock-in, the subsidy amount is held as a deposit and cannot be withdrawn
- After lock-in + physical verification, subsidy is adjusted (written off) against loan

#### 10.2 Subsidy Adjustment Process — Validation/Guidance Rule

```text
Step 1: Bank sanctions loan (90% or 95% of project cost)
Step 2: You deposit own contribution (5% or 10%)
Step 3: Bank disburses loan
Step 4: Bank claims Margin Money (subsidy) from KVIC/IA
Step 5: Margin Money deposited in your loan account
Step 6: Lock-in period of 3 years begins
Step 7: After 3 years + successful physical verification + geo-tagging:
   → IA issues "MM Adjustment Letter" to the bank
   → Bank writes off the subsidy amount from your loan
   → You now repay only the remaining loan amount
```

#### 10.3 Physical Verification & Geo-tagging (2023 Mandate)
- Conducted by Implementing Agency (KVIC/KVIB/DIC)
- Must confirm unit is operational and viable
- **Geo-tagging of the unit is done** (mandatory since Dec 2023)
- If unit is NOT operational, subsidy must be **REMITTED BACK** to the government

---

### 11. EDP Training Requirements


| Project Cost | EDP Duration | Mandatory? |
|-------------|-------------|------------|
| Up to ₹2 Lakh | — | **NOT mandatory** |
| ₹2 Lakh to ₹5 Lakh | **5 working days** | ✅ Mandatory |
| Above ₹5 Lakh | **10 working days** | ✅ Mandatory |

**Training Centers:**
- 582+ RSETI/RUDSETI training centers across India
- KVIC training centers (training.kvic.gov.in)
- **Online EDP training available at udyami.org.in** (accepted since 2023 revision)
- EDP training is **FREE of cost** for PMEGP beneficiaries
- Must complete EDP **BEFORE** Margin Money claim through PMEGP e-portal
- EDP certificate must be submitted to bank/IA
- **2nd loan**: EDP training NOT mandatory

---

### 12. 2nd Loan (Upgradation) Rules — Dec 2023 Addition


#### 12.1 Eligibility


| Condition | Requirement |
|-----------|-------------|
| **Existing unit type** | Must be PMEGP / REGP / MUDRA unit |
| **Performance** | Unit must be performing well |
| **Repayment** | Must have repaid 1st loan installments on time |
| **Physical verification** | Must have been completed |
| **Lock-in** | 1st loan lock-in period must be completed |
| **Purpose** | Upgradation, expansion, modernization |

#### 12.2 2nd Loan Subsidy Rates


| Category | Subsidy Rate |
|----------|-------------|
| **All Categories** (General + Special) | **15%** of project cost |
| **NER & Hill States** | **20%** of project cost |

#### 12.3 Key Conditions

- Building construction: max **25% of project cost** or **60%** of 2nd loan
- CGTMSE guarantee available up to ₹2 Crore
- Same bank should ideally finance both 1st and 2nd loan
- EDP training **not mandatory** for 2nd loan

---

### 13. Application Process — Implementation-Relevant Flow


The app should support the user-facing workflow only where it affects DPR creation and export:

1. User checks eligibility.
2. User enters applicant, project, cost, finance, sales, and expense details.
3. App validates PMEGP/workbook rules.
4. App calculates subsidy, own contribution, bank finance, P&L, ratios, and workbook values.
5. User exports DPR and uploads/submits it through the official PMEGP e-Portal or bank/IA process.

External portal navigation, tracking, and bank-sanction steps are reference guidance only and should not be treated as app functionality unless implemented as a separate Phase 2 guide.

---

### 14. Required Documents — Complete Checklist


| Document | Required? | When |
|----------|-----------|------|
| **Aadhaar Card** | ✅ Mandatory | Always |
| **PAN Card** | ✅ Mandatory | Always |
| **Passport Size Photo** | ✅ Mandatory | Always |
| **Educational Qualification Certificate** | ✅ If project > ₹10L (Mfg) / ₹5L (Svc) | Conditional |
| **Caste Certificate** | ✅ For SC/ST/OBC claims | If claiming category |
| **Special Category Certificate** | ✅ For PH/Ex-Serviceman/Minority | If claiming category |
| **Project Report / DPR** | ✅ Mandatory | Always |
| **Address Proof** | ✅ Mandatory | Always |
| **Bank Account Details** | ✅ Mandatory | Always |
| **Rural/Urban Certificate** | ✅ From revenue authority | Always |
| **Land/Building Ownership Proof** | ✅ If own premises | If own building |
| **Rental Agreement** | ✅ If rented premises | If rented |

---

### 15. Implementing Agencies & Financial Agencies


#### 15.1 Implementing Agencies (where you apply)


| Agency | Coverage | Rural/Urban Ratio |
|--------|----------|-------------------|
| **KVIC** (State Directorates) | Rural areas | 30% |
| **KVIB** (State Khadi & Village Industries Boards) | Rural areas | 30% |
| **DIC** (District Industries Centres) | Urban + Rural | 40% |
| **Coir Board** | Coir-based projects | Special |

#### 15.2 Financial Agencies (Banks — where you get the loan)


- Public Sector Banks
- Regional Rural Banks (RRBs)
- Co-operative Banks (RBI regulated)
- SIDBI
- Private Scheduled Commercial Banks approved by SLMC

The app must not claim that any bank offers the “best” PMEGP rate. Interest-rate guidance should be stored as a user-configurable assumption or general range, with official/bank verification required before final submission.

---

### 16. Employment Criteria & Rural/Urban Definitions


#### 16.1 Employment Generation Norms


| Area | Per Capita Investment Limit |
|------|---------------------------|
| **Plain Areas** | Fixed capital investment ≤ **₹3.00 Lakh** per full-time worker |
| **Hilly Areas, A&N Islands, Lakshadweep** | Fixed capital investment ≤ **₹4.50 Lakh** per full-time worker |

#### 16.2 Rural vs Urban Definition

- **Rural**: Any area classified as Village per revenue record + all areas under Panchayat Raj Institutions
- **Urban**: Areas NOT classified as rural. Implemented ONLY through DIC in urban areas

---

### 17. Key Changes in Revised Guidelines 2023 — Current Rules Only

| Rule | Current Rule (2023+) |
|------|----------------------|
| **2nd Loan** | Available for PMEGP/REGP/MUDRA upgradation |
| **2nd Loan Max (Mfg)** | ₹1 Crore |
| **2nd Loan Max (Svc)** | ₹25 Lakh |
| **2nd Loan Subsidy** | 15% (20% for NER/Hill) |
| **Transgender Category** | Added as Special Category |
| **Aspirational Districts** | Added as Special Category |
| **Geo-tagging** | **Mandatory** for physical verification |
| **Online EDP** | Online + Physical both accepted |
| **CGTMSE coverage** | Up to **₹2 Crore** |
| **Polythene thickness** | **75 microns** (updated) |

**What Stayed Same**: Subsidy rates (15/25/35%), own contribution (5/10%), max project cost for 1st loan, agency ratios (30:30:40), lock-in period (3 years), age limit (18 years).

---

### 6.18 Financial Model Architecture — For App Calculations

#### 6.18.1 Capacity Utilization (5-Year Projection)


| Year | Utilization |
|------|------------|
| Year 1 | 70% |
| Year 2 | 80% |
| Year 3 | 90% |
| Year 4 | 90% |
| Year 5 | 90% |

#### 6.18.2 Depreciation Rates


| Asset | Method | Rate |
|-------|--------|------|
| Building | Straight Line (SLN) | 5% per annum |
| Machinery | Written Down Value (WDV) | 15% per annum |
| Furniture & Fixtures | WDV | 10% per annum |

#### 6.18.3 Key Financial Ratios (Calculated in DPR_print sheet)


| Ratio | Formula | Purpose |
|-------|---------|---------| 
| **DSCR** | Net Cash Accrual / Total Debt Service | Loan repayment capacity (must be >1.5) |
| **Break-Even Point** | Fixed Costs / (Sales - Variable Costs) × 100 | Minimum sales needed |
| **ROI** | Net Profit / Total Investment × 100 | Profitability measure |
| **Current Ratio** | Current Assets / Current Liabilities | Liquidity measure |
| **Debt-Equity Ratio** | Total Debt / Total Equity | Leverage measure |

#### 6.18.4 Payback Period

- Standard: 5 years
- Implementation Period: Project-specific (user enters value; common range 6–24 months)

---

### 19. Excel Code Tables — Cell References in DataSheet


#### 19.1 Category Codes (M70)

| Code | Display Label | Excel Label | Subsidy Type |
|------|--------------|-------------|-------------|
| 1 | SC (Scheduled Caste) | SC | Special |
| 2 | ST (Scheduled Tribe) | ST | Special |
| 3 | OBC (Other Backward Class) | OBC | Special |
| 4 | PHC (Differently Abled) | PHC | Special |
| 5 | Ex-Serviceman | Ex-Serviceman | Special |
| 6 | Minority | Minority | Special |
| 7 | Hill & Border Area | Hill Boarder Area | Special |
| 8 | Aspirational Districts | Aspirational Districts | Special |
| 9 | General | General | General (only if Male) |

#### 19.2 Gender Codes (M55)

| Code | Gender |
|------|--------|
| 1 | Male |
| 2 | Female |
| 3 | Transgender |

> **M56 note:** `DataSheet!M56` is empty in the audited workbook. The adjacent lookup text `L56="Female"` suggests it may have been intended for a secondary gender/social-category display field, but no canonical output formula uses it. Treat only `M55` as the active gender input.

#### 19.3 Location Codes (M64)

| Code | Location |
|------|----------|
| 1 | Rural |
| 2 | Urban |

#### 19.4 Sponsoring Agency Codes (M59)

| Code | Agency |
|------|--------|
| 1 | KVIC |
| 2 | KVIB |
| 3 | DIC |
| 4 | Coir Board |

#### 19.5 Sector Codes (M80)

| Code | Sector | Max Project Cost (1st Loan) | Max Project Cost (2nd Loan) |
|------|--------|---------------------------|---------------------------|
| 1 | Manufacturing | ₹50 Lakh | ₹1 Crore |
| 2 | Service | ₹20 Lakh | ₹25 Lakh |

#### 19.6 Qualification Lookup (L83:L89, selected by M83)

| Index | Qualification |
|-------|--------------|
| 1 | Under 8th |
| 2 | 8th Pass |
| 3 | 10th Pass |
| 4 | 12th Pass |
| 5 | Graduate |
| 6 | Post Graduate |
| 7 | PhD |

#### 19.7 Building Ownership (L91:L93, selected by M91)

| Index | Type |
|-------|------|
| 1 | Own |
| 2 | Rented |
| 3 | Leased |

---

### 20. Excel Formula Errors (10 broken formulas: 9 × #REF! + 1 × #VALUE!)


| Sheet | Cell | Issue | App Fix |
|-------|------|-------|---------|
| DataSheet | M36 | Broken lookup formula `=L59:L62` produces `#VALUE!`; likely intended agency-name lookup but not canonical | Compute selected agency directly from `M59`/lookup list |
| Project_Report | G14 | Original source reference lost; surrounding label indicates Father's/Spouse's Name | Add direct Father's/Spouse's Name input field |
| Project_Report | J20 | Original source reference lost; surrounding label indicates State | Add direct State input/dropdown field |
| Project_Report | H21 | Original source reference lost; surrounding label indicates Phone | Add direct Phone field |
| Project_Report | H22 | Original source reference lost; surrounding label indicates Email | Add direct Email field |
| DPR_FRONT | B33 | Original source reference lost; below “Prepared By:” | Add direct prepared-by/office field |
| DPR_FRONT | B35 | Original source reference lost; agency block | Add direct agency address line field |
| DPR_FRONT | B36 | Original source reference lost; agency block | Add direct agency address line field |
| DPR_FRONT | B37 | Original source reference lost; city/district block | Add direct city/district field |
| DPR_FRONT | F37 | Original source reference lost; explicit `State:` label | Add direct state field |

The app MUST provide direct input fields for these broken-reference values. The audit can infer probable meanings from surrounding labels, but the original source cell references are permanently lost for `#REF!` cells.

Additional `#REF!` source note:
- `Project_Report!G14` → Father's/Spouse's Name, inferred from label at `B14`.
- `Project_Report!J20` → State, inferred from label at `I20`.
- `Project_Report!H21` → Phone, inferred from label at `G21`.
- `Project_Report!H22` → Email, inferred from label at `G22`.
- `DPR_FRONT!B33` → Preparing officer/office name, inferred from position below `Prepared By:`.
- `DPR_FRONT!B35:B36` → Agency address lines, inferred from agency block position.
- `DPR_FRONT!B37` → Agency city/district, inferred from merged block position.
- `DPR_FRONT!F37` → Agency state, inferred from explicit `State:` label.

Known non-`#REF!` issue: `DataSheet!M36` contains `=L59:L62`, which produces `#VALUE!`. It was likely intended as an agency-name lookup such as `=INDEX(L59:L62,M59)`, but the app should compute the selected agency directly from `M59` instead of relying on this broken formula.

`DPR_print!F333:I333`, `F386:I386`, `F388:I388`, `F390:I390`, `F392:I392`, and `F394:I394` produce `#DIV/0!` with empty template data. These formulas for DSCR, BEP%, break-even sales/units, current ratio, and net profit ratio are structurally valid; the error is caused by zero/blank input values. The app/export should handle division-by-zero gracefully by displaying `0`, `N/A`, or `—` as appropriate.

---

### 20.1 Workbook Formula Dependency Graph — Export Safety Rules


The dependency-graph audit confirms that the template is a rigid, cell-coordinate-driven workbook. Most output formulas link directly to fixed `DataSheet` cells/ranges. This makes the workbook useful as an export template, but fragile if its structure is changed.

Key dependencies to preserve:

| Dependency | Destination / Use | App Policy |
|------------|-------------------|------------|
| `DataSheet!G85` | Own contribution amount; flows to `DPR_print!F123` | ✅ Canonical; preserve formula |
| `DataSheet!G86` | Bank finance amount; flows to `DPR_print!F125` | ✅ Canonical; preserve formula |
| `DataSheet!G87` | Subsidy margin money; flows to `DPR_print!F131` | ✅ Canonical; preserve formula |
| `DataSheet!M59` | Sponsoring agency code; flows to `DPR_FRONT!B34` and related agency display logic | ✅ Verified selector; compute display name in app where formula is broken |
| `DataSheet!M80` | Project type/sector code; flows to `DPR_print!H131` and `J131` | ✅ Verified selector |
| `DataSheet!M91` | Building ownership code; flows to `Application_form!B59` | ✅ Verified selector |
| `DataSheet!B41:E41` | Building block dragged through `DPR_print!B86` row range | ✅ Fill existing rows only; do not insert/delete rows |
| `DataSheet!B54:E54` | Machinery block dragged through `DPR_print!B96` row range | ✅ Fill existing rows only; do not insert/delete rows |
| `DataSheet!B121:D121` | Labor/wages block; flows to `DPR_print!B215` and `Project_Report!B57` | ✅ Fill existing rows only; do not insert/delete rows |

Export safety rules:

- The app must **never insert or delete rows/columns** in the official workbook template during export.
- The app must **only overwrite values in existing cells/ranges**.
- If the user enters more line items than the template has visible rows, the app should unhide and fill existing hidden template rows, not append rows.
- The app should keep a workbook row-cap policy for each line-item block, for example:
  - building rows: existing template capacity only
  - machinery rows: existing template capacity only
  - sales/revenue rows: existing template capacity only
  - labor/wages rows: existing template capacity only
- If user data exceeds template capacity, the app should warn the user and either truncate with disclosure or require manual template expansion before export.
- Any future template expansion must be performed on a separate template-copy audit branch, followed by formula dependency verification before shipping.

---

### 21. Excel Formula Nuances — Technical Accuracy


#### 21.1 Cell L25 vs G87 Subsidy Formula


The following subsidy-cell notes are based on the deeper workbook audit. `G87` is the audited canonical subsidy formula. `L25` is **not** canonical.

`L25` contains:

```excel
=IF(DataSheet!M59=4,IF(AND(DataSheet!M56=1,DataSheet!M70=8),15%,25%),IF(AND(DataSheet!M56=1,DataSheet!M70=8),25%,35%))
```

It references `M59=4` (COIR Board branch), but it uses `M56`, which is empty, and `M70=8` (Aspirational Districts) instead of `M55`/Gender and `M70=9`/General. It is not consumed by output formulas. Therefore, `L25` is a parallel/draft subsidy calculation, not the subsidy authority. The app must use `G87` exclusively for subsidy rate calculation.

`G87` formula:

```excel
=IF(DataSheet!M64=2,IF(AND(DataSheet!M55=1,DataSheet!M70=9),15%,25%),IF(AND(DataSheet!M55=1,DataSheet!M70=9),25%,35%))
```

#### 21.2 R57:R60 Reference Tables


These cells are verified helper/reference formulas, not primary calculation authority. Do not use them as subsidy authority.

| Cell | Verified Formula | Meaning | App Policy |
|------|---------|---------|------------|
| R57 | `=IF(M64=2,IF(AND(M55=1,M70=9),15,25),IF(AND(M55=1,M70=9),25,35))` | Whole-number duplicate of G87 | ❌ Do not use; non-canonical helper |
| R58 | `=IF(AND(M55=1,M70=9,M64=2),15,25)` | Partial urban check only | ❌ Do not use; incomplete helper |
| R59 | `=IF(AND(M55=1,M64=1,M70=9),35,25)` | ❌ Confirmed conflict: Rural Male General returns 35 while canonical G87 returns 25 | ❌ Do not use; G87 is canonical |
| R60 | `=IF(AND(M57=1,M72=9,M66=2),15,0)` | ❌ Broken/dead: M57=`Transgender` text, M72=`OBC` text, M66 is empty, so conditions always fail and result is 0 | ❌ Do not use; broken helper |

---

### 22. Official Sources & References — App Should Link to These


> Treat these sources as candidates for verification. Every policy claim used in calculation, validation, AI responses, or exported reports should be checked against the current official source and recorded in a verification register.

#### 22.1 Government Portals

| Source | URL |
|--------|-----|
| PMEGP e-Portal | kviconline.gov.in/pmegpeportal |
| JanSamarth Portal | jansamarth.in |
| myScheme Portal | myscheme.gov.in/schemes/pmegp |
| MSME Ministry | msme.gov.in |
| KVIC Official | kvic.gov.in |
| KVIC FAQ | kviconline.gov.in/pmegpeportal/jsp/FAQ.jsp |
| KVIC Model Projects | kviconline.gov.in/pmegp/pmegpweb/docs/jsp/newprojectReports.jsp |
| KVIC EDP Training | training.kvic.gov.in |
| CGTMSE | cgtmse.in |

#### 22.2 Official PDF Guidelines

| Document | URL |
|----------|-----|
| PMEGP Guidelines 2022 | kviconline.gov.in/pmegpeportal/dashboard/notification/PMEGP_Guidelines_Certified_2022_3.pdf |
| Revised Guidelines Dec 2023 | msme.gov.in/sites/default/files/Revisedguidelines07.12.2023.pdf |
| 2nd Loan Guidelines | msme.gov.in/sites/default/files/final-guidlines-for-2nd-loan.pdf |

---

## 7. 🆕 Feature Prioritization — Core, Post-MVP, and Optional PMEGP Features


> Feature priority should be driven by workbook fidelity, deterministic PMEGP calculations, validation, and export correctness. AI guidance and educational views must not override verified workbook or rule-engine results.

### 7.1 Core / MVP Features


These are required for a correct workbook-backed DPR generator:

1. DPR form data model
2. Workbook field mapping
3. Validation engine
4. Subsidy / own contribution / 2nd-loan calculation engine
5. Excel export
6. PDF report export
7. Save/load DPR data
8. AI assistant with strict PMEGP boundaries and interview-first autofill

### 7.2 Useful Post-MVP Features


These improve usability but should be implemented after the core workbook/export path works:

1. Subsidy calculator with live preview
2. Rejection risk checker
3. Application workflow guidance (reference only)
4. EDP training guidance

### 7.3 Recommended MVP Sidebar


```
• 🏠 Home
• 📝 DPR Form
• 📊 Report
• 🤖 AI Assistant
• ⚙️ Settings
```

### 7.4 Recommended Post-MVP Sidebar


```
• 💰 Subsidy Calculator
• 🛡️ Rejection Check
• 🗺️ Application Guide
```

### 7.5 Updated File Structure Additions


```
src/components/views/
├── rejection-checker-view.tsx    # Phase 2
├── application-guide-view.tsx    # Phase 2 / reference workflow guidance
├── subsidy-calculator-view.tsx   # Phase 2
├── edp-training-view.tsx         # Phase 2
└── ai-interview-view.tsx         # Phase 2 / optional guided AI interview and autofill review
```

---

## 8. 🗂️ Complete File Structure


```
<project-root>/
├── electron/                              # ELECTRON MAIN PROCESS
│   ├── main.ts                            # Electron main entry
│   ├── preload.ts                         # Preload script (IPC bridge)
│   ├── tray.ts                            # System tray management
│   ├── ipc-handlers.ts                    # IPC handlers (file save/load, etc.)
│   ├── excel-export.ts                    # Excel export engine (consumes computed model)
│   ├── audit-logger.ts                    # Audit logging (DPR_CREATED, EXPORTED, etc.)
│   └── window.ts                          # Window creation & management
│
├── src/                                   # NEXT.JS RENDERER
│   ├── app/
│   │   ├── page.tsx                       # Main app (only route!)
│   │   └── layout.tsx                     # Root layout
│   │   # No API routes — all AI calls go through Electron IPC
│   ├── components/
│   │   ├── app-shell.tsx                  # Main layout wrapper
│   │   ├── titlebar.tsx                   # ⭐ CUSTOM WINDOWS TITLEBAR
│   │   ├── sidebar.tsx                    # Left navigation
│   │   ├── ai-chat-panel.tsx             # Collapsible AI chat and draft autofill review
│   │   ├── ai-interview-panel.tsx        # Proposed guided AI interview panel for missing DPR questions
│   │   ├── views/
│   │   │   ├── dashboard-view.tsx
│   │   │   ├── dpr-form-view.tsx
│   │   │   ├── ai-assistant-view.tsx
│   │   │   ├── report-view.tsx
│   │   │   ├── settings-view.tsx
│   │   │   ├── rejection-checker-view.tsx    # NEW — 10-point rejection risk checker
│   │   │   ├── application-guide-view.tsx    # NEW — implementation-relevant workflow guide
│   │   │   ├── subsidy-calculator-view.tsx   # NEW — live subsidy calculator
│   │   │   ├── edp-training-view.tsx         # NEW — EDP training finder
│   │   │   └── ai-interview-view.tsx         # NEW — guided AI interview and autofill review
│   │   ├── form-sections/
│   │   │   ├── applicant-info.tsx
│   │   │   ├── project-details.tsx
│   │   │   ├── cost-of-project.tsx
│   │   │   ├── sales-revenue.tsx
│   │   │   ├── expenses.tsx
│   │   │   ├── working-capital.tsx
│   │   │   └── financial-params.tsx
│   │   └── report-sections/
│   │       ├── project-at-glance.tsx
│   │       ├── cost-breakdown.tsx
│   │       ├── means-of-finance.tsx
│   │       ├── loan-repayment.tsx
│   │       ├── depreciation.tsx
│   │       ├── profit-loss.tsx
│   │       ├── balance-sheet.tsx
│   │       ├── cash-flow.tsx
│   │       ├── dscr.tsx
│   │       └── break-even.tsx
│   ├── hooks/
│   │   └── use-electron.ts               # ⭐ Hook for Electron IPC calls
│   ├── store/
│   │   ├── dpr-store.ts                  # Zustand store for DPR form data (persist to localStorage, auto-save timer, example data loader)
│   │   ├── ui-store.ts                   # Zustand store for UI state (active view, sidebar, theme)
│   │   └── ai-store.ts                   # Zustand store for AI chat state (messages, loading)
│   └── lib/
│       ├── pmegp-rules.ts                 # ⭐ PMEGP scheme rules engine
│       ├── dpr-calculations.ts            # ⭐ Financial calculation engine — ONLY place calculations happen
│       ├── dpr-types.ts                   # Type definitions + DPR schema versioning
│       ├── ai-system-prompt.ts            # AI system prompt (uses prompt-builder.ts)
│       ├── ai-interview/                  # ⭐ AI interview and autofill architecture
│       │   ├── interview-schema.ts        # Required-question definitions for AI autofill
│       │   ├── extractor.ts               # Converts AI/user answers into candidate DPRData
│       │   └── confirmation.ts            # Draft-value review and critical-field confirmation rules
│       ├── format-currency.ts             # ₹ Indian formatting
│       ├── report-generator.ts            # ⭐ HTML report generation for PDF export (DPRData → print-ready HTML)
│       ├── example-data.ts                # ⭐ Pre-filled example DPR data for new users (Manufacturing, Rural, SC Male)
│       ├── formula-registry.ts            # ⭐ Single source of truth for ALL PMEGP formulas
│       ├── errors.ts                      # ⭐ Error taxonomy (AppErrorCode enum + AppError class)
│       ├── validation/                    # ⭐ Validation engine — separate layer before calculation
│       │   ├── index.ts                   # runAllValidations() + re-exports
│       │   ├── pmegp-validator.ts         # PMEGP-specific rules
│       │   ├── category-validator.ts      # Gender + category + location cross-checks
│       │   ├── project-cost-validator.ts  # Max limits, per capita investment
│       │   ├── subsidy-validator.ts       # Subsidy rate + Margin Money validation
│       │   ├── negative-list-validator.ts # Activity classification check
│       │   └── dpr-file-validator.ts      # Schema version + data integrity on load
│       └── ai/                            # ⭐ AI assistant architecture
│           ├── prompt-builder.ts          # Version-controlled system prompt construction
│           ├── conversation-manager.ts    # Conversation history, token counting, truncation
│           ├── context-compressor.ts      # Compresses long DPR data for AI context
│           ├── ai-error-handler.ts        # Retry logic, rate limiting, failure recovery
│           └── token-budget.ts            # Token budget rules
│
├── build/                                 # ELECTRON BUILDER ASSETS
│   ├── icon.ico                           # ⭐ Windows app icon (256x256)
│   ├── installer-banner.bmp              # NSIS installer banner
│   └── installer-sidebar.bmp             # NSIS installer sidebar
│
├── public/                                # Optional renderer static assets
│   ├── dpr-logo.png                       # Create if used by the app
│   ├── dpr-hero.png                       # Create if used by the app
│   └── dpr-icons.png                      # Create if used by the app
│
├── electron-builder.yml                   # ⭐ Electron Builder config
├── next.config.ts                         # Modified for Electron
├── package.json                           # Updated with Electron scripts
└── tsconfig.json                          # Updated with Electron paths
```

---

## 9. 📦 Phase 0: Electron Setup & Configuration


### 9.1 Electron Dependency Plan


> **Blueprint note**: This section lists required dependencies only. Do not include machine-specific terminal commands in the product blueprint.

Required dependencies:

- `electron`
- `electron-builder`
- `concurrently`
- `wait-on`
- `tsup`
- `exceljs`
- `openai`

Do not install `electron-next` or `@electron/remote` unless a future architecture review explicitly requires them.

### 9.2 Update `package.json`


Add these scripts and build configuration. Use `npm` consistently, or replace it consistently with another package manager if the project standard changes.

```json
{
  "main": "dist-electron/main.cjs",
  "scripts": {
    "dev": "next dev -p 3000",
    "build:electron": "tsup",
    "dev:electron": "concurrently \"npm run dev\" \"npm run build:electron -- --watch\" \"wait-on http://127.0.0.1:3000 && electron .\"",
    "build": "next build && npm run build:electron && electron-builder",
    "build:win": "next build && npm run build:electron && electron-builder --win",
    "lint": "next lint"
  }
}
```

### 9.3 Create `tsup.config.ts` — Electron TypeScript Build


This compiles all `electron/*.ts` files into `dist-electron/*.cjs` so Electron can load them. Without this step, the `.exe` will NOT build because Electron cannot run TypeScript directly.

```typescript
// tsup.config.ts — Compiles electron/*.ts → dist-electron/*.cjs
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'electron/main.ts',
    'electron/preload.ts',
    'electron/ipc-handlers.ts',
    'electron/tray.ts',
    'electron/window.ts',
    'electron/excel-export.ts',
    'electron/audit-logger.ts',
  ],
  outDir: 'dist-electron',
  format: 'cjs',           // Electron requires CommonJS
  platform: 'node',
  target: 'node20',
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['electron', 'exceljs', 'openai'],  // Don't bundle these
});
```

### 9.4 Create `electron-builder.yml`


```yaml
appId: com.pmegp.dprgenerator
productName: PMEGP DPR Generator
copyright: Copyright © 2026 PMEGP DPR Generator

directories:
  buildResources: build
  output: dist

win:
  icon: build/icon.ico
  target:
    - target: nsis
      arch:
        - x64
        - ia32

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  createStartMenuShortcut: true
  shortcutName: PMEGP DPR Generator
  installerIcon: build/icon.ico
  uninstallerIcon: build/icon.ico
  artifactName: PMEGP-DPR-Generator-Setup-${version}.${ext}

files:
  - dist-electron/**/*
  - out/**/*
  - public/**/*
  - package.json

asar: true

npmRebuild: false

extraResources:
  - from: public/
    to: public/
```

### 9.5 Create `electron/main.ts` — The Electron Main Process


```typescript
// electron/main.ts
import { app, BrowserWindow, ipcMain, dialog, Notification, Tray, Menu } from 'electron';
import * as path from 'path';
import { setupIPCHandlers } from './ipc-handlers';
import { createTray } from './tray';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;

const isDev = !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    frame: false,                    // ⭐ FRAMELESS — custom titlebar
    transparent: false,
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, '../build/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,   // ⭐ Security: sandbox enabled — all renderer access via preload IPC only
    },
    // Windows 11 style: rounded corners, snap layout support
    autoHideMenuBar: true,
    show: false,                     // Show when ready (no flash)
  });

  // Load Next.js app
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.webContents.openDevTools(); // Uncomment for debugging
  } else {
    mainWindow.loadFile(path.join(__dirname, '../out/index.html'));
  }

  // Windows 11 snap layouts support (shows snap on maximize button hover)
  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-state-changed', 'maximized');
  });
  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window-state-changed', 'normal');
  });
  mainWindow.on('minimize', () => {
    mainWindow?.webContents.send('window-state-changed', 'minimized');
  });

  // Graceful show
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    mainWindow?.focus();
  });

  // Minimize to tray instead of closing
  mainWindow.on('close', (event) => {
    if (tray && !isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  setupIPCHandlers();
  tray = createTray(mainWindow!);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('before-quit', () => {
  isQuitting = true;
});

export function setIsQuitting(value: boolean) {
  isQuitting = value;
}

export { mainWindow, isQuitting };
```

### 9.6 Create `electron/preload.ts` — IPC Bridge


```typescript
// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
  onWindowStateChange: (callback: (state: string) => void) => {
    ipcRenderer.on('window-state-changed', (_, state) => callback(state));
  },

  // File operations
  saveDPR: (data: string) => ipcRenderer.invoke('file:save-dpr', data),
  loadDPR: () => ipcRenderer.invoke('file:load-dpr'),
  exportExcel: (data: string) => ipcRenderer.invoke('file:export-excel', data),
  exportPDF: (html: string) => ipcRenderer.invoke('file:export-pdf', html),  // ⭐ Uses webContents.printToPDF() in main process

  // Notifications
  showNotification: (title: string, body: string) =>
    ipcRenderer.invoke('notification:show', { title, body }),

  // App info
  getVersion: () => ipcRenderer.invoke('app:version'),

  // File system
  selectFolder: () => ipcRenderer.invoke('dialog:select-folder'),
});

// TypeScript declaration
export interface ElectronAPI {
  minimize: () => Promise<void>;
  maximize: () => Promise<void>;
  close: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  onWindowStateChange: (callback: (state: string) => void) => void;
  saveDPR: (data: string) => Promise<string | null>;
  loadDPR: () => Promise<string | null>;
  exportExcel: (data: string) => Promise<string | null>;
  exportPDF: (html: string) => Promise<string | null>;
  showNotification: (title: string, body: string) => Promise<void>;
  getVersion: () => Promise<string>;
  selectFolder: () => Promise<string | null>;
  aiChat: (messages: any[], dprData: any, config?: any) => Promise<{ success: boolean; response?: string; error?: string }>;
  aiTest: (config?: any) => Promise<{ success: boolean; message?: string; latencyMs?: number; error?: string }>;
  aiSuggest: (fieldName: string, context: string, projectType: string, config?: any) => Promise<{ success: boolean; suggestion?: string; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
```

### 9.7 Create `electron/ipc-handlers.ts`


```typescript
// electron/ipc-handlers.ts
import { app, ipcMain, BrowserWindow, dialog, Notification } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { exportDPRToExcel } from './excel-export';  // ⭐ Single authoritative Excel export engine

export function setupIPCHandlers(): void {
  ipcMain.handle('window:minimize', (e) => {
    BrowserWindow.fromWebContents(e.sender)?.minimize();
  });

  ipcMain.handle('window:maximize', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (win?.isMaximized()) win.unmaximize();
    else win?.maximize();
  });

  ipcMain.handle('window:close', (e) => {
    BrowserWindow.fromWebContents(e.sender)?.close();
  });

  ipcMain.handle('window:isMaximized', (e) => {
    return BrowserWindow.fromWebContents(e.sender)?.isMaximized() ?? false;
  });

  // ── Save DPR as JSON (with schema versioning) ──
  ipcMain.handle('file:save-dpr', async (e, data: string) => {
    const { canceled, filePath } = await dialog.showSaveDialog(
      BrowserWindow.fromWebContents(e.sender)!,
      {
        title: 'Save DPR Data',
        defaultPath: 'dpr-project-data.json',
        filters: [{ name: 'JSON', extensions: ['json'] }],
      }
    );
    if (!canceled && filePath) {
      // Wrap raw data in versioned schema
      const dprFile = {
        schemaVersion: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        data: JSON.parse(data),
      };
      fs.writeFileSync(filePath, JSON.stringify(dprFile, null, 2), 'utf-8');
      return filePath;
    }
    return null;
  });

  // ── Load DPR from JSON (renderer owns schema migration) ──
  // Main process only reads the file and returns raw JSON. The renderer imports
  // migrateDPRData from src/lib/dpr-types.ts and applies it after receiving data.
  ipcMain.handle('file:load-dpr', async (e) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(
      BrowserWindow.fromWebContents(e.sender)!,
      {
        title: 'Open DPR Data',
        filters: [{ name: 'JSON', extensions: ['json'] }],
        properties: ['openFile'],
      }
    );
    if (!canceled && filePaths.length > 0) {
      return fs.readFileSync(filePaths[0], 'utf-8');
    }
    return null;
  });

  // ── Export DPR as Excel (.xlsx) ──
  // ⭐ DELEGATES to excel-export.ts — NO inline calculation or workbook construction here.
  // Main process parses the renderer's JSON and delegates template-fill export.
  ipcMain.handle('file:export-excel', async (e, data: string) => {
    const parsedData = JSON.parse(data);
    const { canceled, filePath } = await dialog.showSaveDialog(
      BrowserWindow.fromWebContents(e.sender)!,
      {
        title: 'Export DPR as Excel',
        defaultPath: 'DPR-Project-Report.xlsx',
        filters: [{ name: 'Excel', extensions: ['xlsx'] }],
      }
    );
    if (!canceled && filePath) {
      await exportDPRToExcel(parsedData, filePath);
      return filePath;
    }
    return null;
  });

  // ── Export DPR as PDF (.pdf) ──
  ipcMain.handle('file:export-pdf', async (e, html: string) => {
    const { canceled, filePath } = await dialog.showSaveDialog(
      BrowserWindow.fromWebContents(e.sender)!,
      {
        title: 'Export DPR as PDF',
        defaultPath: 'DPR-Project-Report.pdf',
        filters: [{ name: 'PDF', extensions: ['pdf'] }],
      }
    );
    if (!canceled && filePath) {
      // Create a hidden BrowserWindow, load HTML, print to PDF
      const pdfWin = new BrowserWindow({ width: 800, height: 600, show: false, webPreferences: { sandbox: true } });
      await pdfWin.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
      const pdfData = await pdfWin.webContents.printToPDF({
        margins: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, marginType: 'inches' },
        printBackground: true,
        pageSize: 'A4',
      });
      fs.writeFileSync(filePath, pdfData);
      pdfWin.close();
      return filePath;
    }
    return null;
  });

  // ── Notifications ──
  ipcMain.handle('notification:show', (_, { title, body }) => {
    new Notification({ title, body, icon: path.join(__dirname, '../build/icon.ico') }).show();
  });

  // ── App Info ──
  ipcMain.handle('app:version', () => app.getVersion());

  // ── Folder Selection ──
  ipcMain.handle('dialog:select-folder', async (e) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(
      BrowserWindow.fromWebContents(e.sender)!,
      { properties: ['openDirectory'] }
    );
    if (!canceled) return filePaths[0];
    return null;
  });
}
```

### 9.8 Create `electron/tray.ts`


```typescript
// electron/tray.ts
import { Tray, Menu, BrowserWindow, app, nativeImage } from 'electron';
import * as path from 'path';
import { setIsQuitting } from './main';

export function createTray(mainWindow: BrowserWindow): Tray {
  const iconPath = path.join(__dirname, '../build/icon.ico');
  const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  const tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    { label: '🟢 Open PMEGP DPR Generator', click: () => mainWindow.show() },
    { type: 'separator' },
    { label: '📝 New DPR', click: () => { mainWindow.show(); mainWindow.webContents.send('action:new-dpr'); } },
    { type: 'separator' },
    { label: '❌ Quit', click: () => { setIsQuitting(true); app.quit(); } },
  ]);

  tray.setToolTip('PMEGP DPR Generator — PMEGP Report Builder');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  return tray;
}
```

### 9.9 Create `electron/window.ts`


```typescript
// electron/window.ts — Window utilities
import { BrowserWindow } from 'electron';

export function getWindow(): BrowserWindow | null {
  return BrowserWindow.getAllWindows()[0] || null;
}
```

### 9.10 Windows App Icon Requirement


Required asset: `build/icon.ico`, generated from `dpr-logo.png` or another approved product icon.

The icon should include Windows-compatible sizes such as 256×256 and be used for the app, installer, and uninstaller.

### 9.11 Update `next.config.ts` for Electron


```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',    // ⭐ Static export for Electron packaging
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features for Electron compatibility
  trailingSlash: true,
};

export default nextConfig;
```

**⚠️ IMPORTANT**: With `output: 'export'`, there are no server-side API routes. ALL backend operations (AI, file I/O, Excel export) go through **Electron IPC**.

**🔴 PROHIBITED under `output: 'export'`** — do NOT use any of these, they will silently break packaging:
- ❌ API Routes (`app/api/**/route.ts`)
- ❌ Route Handlers
- ❌ Next.js Middleware (`middleware.ts`)
- ❌ Server Actions (`'use server'`)
- ❌ Dynamic SSR (`getServerSideProps`, dynamic rendering)
- ❌ Edge Runtime
- ❌ `next/image` optimizer (use `unoptimized: true` instead)
- ❌ Incremental Static Regeneration (ISR)

---


#### 9.7a AI IPC Handlers — `electron/ipc-handlers.ts`


```typescript
// ADD to electron/ipc-handlers.ts

import OpenAI from 'openai';

// ─── OpenAI Client Factory ───
// The API key is stored in app settings (persisted via localStorage on renderer side).
// When the user configures their API key in Settings, it's passed via IPC config param.
// If no custom config is provided, falls back to OPENAI_API_KEY env variable.

function createOpenAIClient(config?: { apiKey?: string; baseURL?: string }): OpenAI {
  return new OpenAI({
    apiKey: config?.apiKey || process.env.OPENAI_API_KEY,
    baseURL: config?.baseURL || 'https://api.openai.com/v1',
  });
}

// ── AI Chat ──
ipcMain.handle('ai:chat', async (e, { messages, dprData, config }) => {
  try {
    const openai = createOpenAIClient(config);
    const systemPrompt = getDPRSystemPrompt(dprData);

    const allMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages,
    ];

    const completion = await openai.chat.completions.create({
      model: config?.model || 'gpt-4o',
      messages: allMessages,
    });

    return {
      success: true,
      response: completion.choices[0]?.message?.content,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// ── AI Connection Test ──
ipcMain.handle('ai:test', async (e, config) => {
  try {
    const startTime = Date.now();
    const openai = createOpenAIClient(config);

    const completion = await openai.chat.completions.create({
      model: config?.model || 'gpt-4o',
      messages: [
        { role: 'system' as const, content: 'Reply with exactly: CONNECTION_OK' },
        { role: 'user' as const, content: 'Test connection' },
      ],
    });

    const latencyMs = Date.now() - startTime;
    return {
      success: true,
      message: `Connection successful! Response: ${completion.choices[0]?.message?.content}`,
      latencyMs,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Connection failed: ${error.message}`,
      latencyMs: 0,
    };
  }
});

// ── AI Field Suggestion ──
ipcMain.handle('ai:suggest', async (e, { fieldName, context, projectType, config }) => {
  try {
    const openai = createOpenAIClient(config);

    const completion = await openai.chat.completions.create({
      model: config?.model || 'gpt-4o',
      messages: [
        {
          role: 'system' as const,
          content: `You are a PMEGP DPR expert. Suggest a realistic value for "${fieldName}" for a ${projectType} unit. Context: ${context}. Reply with ONLY the suggested value, no explanation.`,
        },
        { role: 'user' as const, content: `Suggest value for: ${fieldName}` },
      ],
    });

    return {
      success: true,
      suggestion: completion.choices[0]?.message?.content,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
```

#### 9.7b Update `electron/preload.ts` — Add AI IPC Calls


```typescript
// ADD to the contextBridge.exposeInMainWorld in preload.ts:

  // AI operations (via Electron main process)
  aiChat: (messages: any[], dprData: any, config?: any) =>
    ipcRenderer.invoke('ai:chat', { messages, dprData, config }),
  aiTest: (config?: any) => ipcRenderer.invoke('ai:test', config),
  aiSuggest: (fieldName: string, context: string, projectType: string, config?: any) =>
    ipcRenderer.invoke('ai:suggest', { fieldName, context, projectType, config }),
```

#### 9.7c Create `src/hooks/use-electron.ts` — React Hook for Electron


```typescript
// src/hooks/use-electron.ts
'use client';

import { useCallback } from 'react';

export function useElectron() {
  const isElectron = typeof window !== 'undefined' && !!window.electronAPI;

  const minimize = useCallback(() => window.electronAPI?.minimize(), []);
  const maximize = useCallback(() => window.electronAPI?.maximize(), []);
  const close = useCallback(() => window.electronAPI?.close(), []);
  const isMaximized = useCallback(() => window.electronAPI?.isMaximized(), []);

  const saveDPR = useCallback(async (data: string) => {
    if (!isElectron) return null;
    return window.electronAPI.saveDPR(data);
  }, [isElectron]);

  const loadDPR = useCallback(async () => {
    if (!isElectron) return null;
    return window.electronAPI.loadDPR();
  }, [isElectron]);

  const exportExcel = useCallback(async (data: string) => {
    if (!isElectron) return null;
    return window.electronAPI.exportExcel(data);
  }, [isElectron]);

  const showNotification = useCallback((title: string, body: string) => {
    if (isElectron) {
      window.electronAPI.showNotification(title, body);
    }
  }, [isElectron]);

  // AI calls via Electron IPC
  const aiChat = useCallback(async (messages: any[], dprData: any, config?: any) => {
    if (!isElectron) {
      console.warn('AI chat requires Electron IPC.');
      return { success: false, error: 'AI features require Electron' };
    }
    return window.electronAPI.aiChat(messages, dprData, config);
  }, [isElectron]);

  const aiTest = useCallback(async (config?: any) => {
    if (!isElectron) {
      console.warn('AI test requires Electron IPC.');
      return { success: false, message: 'AI features require Electron', latencyMs: 0 };
    }
    return window.electronAPI.aiTest(config);
  }, [isElectron]);

  const aiSuggest = useCallback(async (fieldName: string, context: string, projectType: string, config?: any) => {
    if (!isElectron) {
      console.warn('AI suggest requires Electron IPC.');
      return { success: false, error: 'AI features require Electron' };
    }
    return window.electronAPI.aiSuggest(fieldName, context, projectType, config);
  }, [isElectron]);

  return {
    isElectron,
    minimize, maximize, close, isMaximized,
    saveDPR, loadDPR, exportExcel,
    showNotification,
    aiChat, aiTest, aiSuggest,
  };
}
```

---

## 10. 📦 Phase 0.5: PMEGP Rules Engine — `src/lib/pmegp-rules.ts`


> **CRITICAL NEW FILE**: This is the complete PMEGP scheme rules, validation, and calculation engine. All subsidy calculations, eligibility checks, and PMEGP-specific logic live here. This file MUST be created before Phase 1 types, since types import from it.

```typescript
// src/lib/pmegp-rules.ts
// COMPLETE PMEGP scheme rules, validation, and calculation engine
// Based on official KVIC DPRPACKAGE.xls and PMEGP Guidelines 2023

// ─── ENUMS ───

export const GENDER = {
  MALE: 1,
  FEMALE: 2,
  TRANSGENDER: 3,
} as const;

export const GENDER_LABELS: Record<number, string> = {
  1: 'Male',
  2: 'Female',
  3: 'Transgender',
};

export const CATEGORY = {
  SC: 1,
  ST: 2,
  OBC: 3,
  PHC: 4,
  EX_SERVICEMAN: 5,
  MINORITY: 6,
  HILL_BORDER: 7,
  ASPIRATIONAL: 8,
  GENERAL: 9,
} as const;

// Category labels with separate Excel and display variants
// excelLabel: Exact text in KVIC DPRPACKAGE.xls (preserved for export fidelity)
// displayLabel: Cleaned/normalized text for UI display
export const CATEGORY_LABELS: Record<number, string> = {
  1: 'SC (Scheduled Caste)',
  2: 'ST (Scheduled Tribe)',
  3: 'OBC (Other Backward Class)',
  4: 'PHC (Differently Abled)',
  5: 'Ex-Serviceman',
  6: 'Minority',
  7: 'Hill & Border Area',
  8: 'Aspirational Districts',
  9: 'General',
};

export interface CategoryEntry {
  code: number;
  excelLabel: string;     // Exact label in Excel (may have typos/abbreviations)
  displayLabel: string;   // Cleaned label for UI
  subsidyType: 'Special' | 'General';
}

export const CATEGORY_TABLE: CategoryEntry[] = [
  { code: 1, excelLabel: 'SC', displayLabel: 'SC (Scheduled Caste)', subsidyType: 'Special' },
  { code: 2, excelLabel: 'ST', displayLabel: 'ST (Scheduled Tribe)', subsidyType: 'Special' },
  { code: 3, excelLabel: 'OBC', displayLabel: 'OBC (Other Backward Class)', subsidyType: 'Special' },
  { code: 4, excelLabel: 'PHC', displayLabel: 'PHC (Differently Abled)', subsidyType: 'Special' },
  { code: 5, excelLabel: 'Ex-Serviceman', displayLabel: 'Ex-Serviceman', subsidyType: 'Special' },
  { code: 6, excelLabel: 'Minority', displayLabel: 'Minority', subsidyType: 'Special' },
  { code: 7, excelLabel: 'Hill Boarder Area', displayLabel: 'Hill & Border Area', subsidyType: 'Special' },
  { code: 8, excelLabel: 'Aspirational Districts', displayLabel: 'Aspirational Districts', subsidyType: 'Special' },
  { code: 9, excelLabel: 'General', displayLabel: 'General', subsidyType: 'General' },
];

// Helper: get Excel label for a category code (for export)
export function getCategoryExcelLabel(code: number): string {
  return CATEGORY_TABLE.find(c => c.code === code)?.excelLabel || 'Unknown';
}

// Helper: get display label for a category code (for UI)
export function getCategoryDisplayLabel(code: number): string {
  return CATEGORY_TABLE.find(c => c.code === code)?.displayLabel || CATEGORY_LABELS[code] || 'Unknown';
}

export const LOCATION = {
  RURAL: 1,
  URBAN: 2,
} as const;

export const LOCATION_LABELS: Record<number, string> = {
  1: 'Rural',
  2: 'Urban',
};

export const AGENCY = {
  KVIC: 1,
  KVIB: 2,
  DIC: 3,
  COIR_BOARD: 4,
} as const;

export const AGENCY_LABELS: Record<number, string> = {
  1: 'KVIC',
  2: 'KVIB',
  3: 'DIC',
  4: 'Coir Board',
};

export const SECTOR = {
  MANUFACTURING: 1,
  SERVICE: 2,
} as const;

export const SECTOR_LABELS: Record<number, string> = {
  1: 'Manufacturing',
  2: 'Service / Business',
};

export const QUALIFICATION = {
  UNDER_8TH: 1,
  EIGHTH_PASS: 2,
  TENTH_PASS: 3,
  TWELFTH_PASS: 4,
  GRADUATE: 5,
  POST_GRADUATE: 6,
  PHD: 7,
} as const;

export const QUALIFICATION_LABELS: Record<number, string> = {
  1: 'Under 8th',
  2: '8th Pass',
  3: '10th Pass',
  4: '12th Pass',
  5: 'Graduate',
  6: 'Post Graduate',
  7: 'PhD',
};

export const BUILDING_OWNERSHIP = {
  OWN: 1,
  RENTED: 2,
  LEASED: 3,
} as const;

export const BUILDING_OWNERSHIP_LABELS: Record<number, string> = {
  1: 'Own',
  2: 'Rented',
  3: 'Leased',
};

// ─── MAX PROJECT COST ───

export const MAX_PROJECT_COST = {
  FIRST_LOAN: {
    [SECTOR.MANUFACTURING]: 5000000,   // ₹50 Lakh
    [SECTOR.SERVICE]: 2000000,         // ₹20 Lakh
  },
  SECOND_LOAN: {
    [SECTOR.MANUFACTURING]: 10000000,  // ₹1 Crore
    [SECTOR.SERVICE]: 2500000,         // ₹25 Lakh
  },
} as const;

// ─── SUBSIDY CALCULATION (Exact Excel Formula Translation) ───

/**
 * Calculate subsidy rate based on Excel formula G87:
 * =IF(M64=2,IF(AND(M55=1,M70=9),15%,25%),IF(AND(M55=1,M70=9),25%,35%))
 */
export function calculateSubsidyRate(
  gender: number,   // M55: 1=Male, 2=Female, 3=Transgender
  category: number, // M70: 1-9 (see CATEGORY enum)
  location: number  // M64: 1=Rural, 2=Urban
): number {
  const isGeneralMale = gender === GENDER.MALE && category === CATEGORY.GENERAL;
  
  if (location === LOCATION.URBAN) {
    return isGeneralMale ? 0.15 : 0.25;
  } else {
    return isGeneralMale ? 0.25 : 0.35;
  }
}

/**
 * Calculate own contribution rate based on Excel formula G85:
 * =IF(AND(M55=1,M70=9),10%,5%)
 */
export function calculateOwnContributionRate(
  gender: number,
  category: number
): number {
  const isGeneralMale = gender === GENDER.MALE && category === CATEGORY.GENERAL;
  return isGeneralMale ? 0.10 : 0.05;
}

/**
 * Calculate bank finance percentage (G86 = 100% - G85)
 */
export function calculateBankFinanceRate(
  gender: number,
  category: number
): number {
  return 1 - calculateOwnContributionRate(gender, category);
}

/**
 * Check if a category is "Special" (gets enhanced subsidy)
 */
export function isSpecialCategory(category: number, gender: number): boolean {
  // Women are ALWAYS special category regardless of social category
  if (gender !== GENDER.MALE) return true;
  // General Male is the ONLY non-special category
  return category !== CATEGORY.GENERAL;
}

// ─── COMPLETE FINANCE BREAKDOWN ───

export interface FinanceBreakdown {
  projectCost: number;
  ownContributionPct: number;
  ownContributionAmt: number;
  bankFinancePct: number;
  bankLoanAmt: number;             // Full sanctioned loan (90%/95% of project cost)
  subsidyPct: number;
  subsidyAmt: number;               // Margin Money — held in account/TDR during lock-in
  netLiabilityAfterLockIn: number;   // Bank loan minus Margin Money — the amount actually repaid after 3-year lock-in + physical verification
  monthlyEMI: number;               // EMI on netLiabilityAfterLockIn
}

export function calculateFinanceBreakdown(
  projectCost: number,
  gender: number,
  category: number,
  location: number,
  interestRate: number = 0.11, // default 11%
  loanTenureYears: number = 7,
  isSecondLoan: boolean = false,  // ⭐ NEW: 2nd loan uses different subsidy rates
  isNERHill: boolean = false      // ⭐ NEW: NER & Hill states get 20% for 2nd loan
): FinanceBreakdown {
  // 2nd loan has FIXED subsidy rates regardless of gender/category/location
  const subsidyPct = isSecondLoan
    ? (isNERHill ? SECOND_LOAN_SUBSIDY.NER_HILL : SECOND_LOAN_SUBSIDY.GENERAL)
    : calculateSubsidyRate(gender, category, location);
  const ownContributionPct = calculateOwnContributionRate(gender, category);
  const bankFinancePct = calculateBankFinanceRate(gender, category);
  
  const ownContributionAmt = projectCost * ownContributionPct;
  const bankLoanAmt = projectCost * bankFinancePct;           // Full sanctioned amount (90%/95%)
  const subsidyAmt = projectCost * subsidyPct;                 // Margin Money — held in account/TDR
  const netLiabilityAfterLockIn = bankLoanAmt - subsidyAmt;    // Actual repayment after 3-yr lock-in + physical verification
  
  // EMI calculated on net liability after lock-in (the amount borrower actually repays)
  const monthlyRate = interestRate / 12;
  const totalMonths = loanTenureYears * 12;
  const monthlyEMI = netLiabilityAfterLockIn > 0
    ? (netLiabilityAfterLockIn * monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
      / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  return {
    projectCost,
    ownContributionPct,
    ownContributionAmt,
    bankFinancePct,
    bankLoanAmt,
    subsidyPct,
    subsidyAmt,
    netLiabilityAfterLockIn,
    monthlyEMI,
  };
}

// ─── 2ND LOAN CALCULATION ───

export const SECOND_LOAN_SUBSIDY = {
  GENERAL: 0.15,        // 15% for all categories
  NER_HILL: 0.20,       // 20% for NER & Hill States
} as const;

export const SECOND_LOAN_MAX_SUBSIDY = {
  [SECTOR.MANUFACTURING]: {
    GENERAL: 1500000,    // ₹15 Lakh
    NER_HILL: 2000000,   // ₹20 Lakh
  },
  [SECTOR.SERVICE]: {
    GENERAL: 375000,     // ₹3.75 Lakh
    NER_HILL: 500000,    // ₹5 Lakh
  },
} as const;

// ─── CAPACITY UTILIZATION ───

export const CAPACITY_UTILIZATION = [0.70, 0.80, 0.90, 0.90, 0.90] as const;

// ─── DEPRECIATION RATES ───

export const DEPRECIATION = {
  BUILDING: { method: 'SLN', rate: 0.05 },      // 5% Straight Line
  MACHINERY: { method: 'WDV', rate: 0.15 },      // 15% Written Down Value
  FURNITURE: { method: 'WDV', rate: 0.10 },       // 10% Written Down Value
  OTHERS: { method: 'WDV', rate: 0.15 },          // 15% WDV
} as const;

// ─── EDP TRAINING REQUIREMENTS ───

export function getEDPRequirement(projectCost: number): {
  mandatory: boolean;
  duration: string;
  days: number;
} {
  if (projectCost <= 200000) {
    return { mandatory: false, duration: 'Not Required', days: 0 };
  } else if (projectCost <= 500000) {
    return { mandatory: true, duration: '5 Working Days', days: 5 };
  } else {
    return { mandatory: true, duration: '10 Working Days', days: 10 };
  }
}

// ─── COLLATERAL RULES ───

export function getCollateralRequirement(projectCost: number): {
  collateralFree: boolean;
  cgtmseAvailable: boolean;
  cgtmseMaxCover: number;
  message: string;
} {
  if (projectCost <= 1000000) {
    return {
      collateralFree: true,
      cgtmseAvailable: true,
      cgtmseMaxCover: projectCost,
      message: 'No collateral required (RBI mandate for loans up to ₹10 Lakh)',
    };
  } else if (projectCost <= 20000000) {
    return {
      collateralFree: false,
      cgtmseAvailable: true,
      cgtmseMaxCover: 20000000, // ₹2 Crore
      message: 'CGTMSE guarantee available up to ₹2 Crore (no collateral needed with guarantee)',
    };
  } else {
    return {
      collateralFree: false,
      cgtmseAvailable: false,
      cgtmseMaxCover: 0,
      message: 'Collateral may be required by the bank',
    };
  }
}

// ─── NEGATIVE LIST ───

// ─── ACTIVITY CLASSIFICATION ENGINE ───
// Replaces simple substring matching with a proper classification system.
// Each activity has keywords to match, a status (Prohibited/Conditional/Allowed),
// and context to distinguish between similar activities.

export interface ActivityClassification {
  keywords: string[];           // Keywords that trigger this classification
  excludeKeywords?: string[];  // Keywords that EXCLUDE from this classification (overrides match)
  status: 'PROHIBITED' | 'CONDITIONAL' | 'ALLOWED';
  reason: string;
  conditions?: string;         // For CONDITIONAL items, what conditions apply
  guidelineRef?: string;       // Reference to PMEGP guideline section
}

export const ACTIVITY_CLASSIFICATIONS: ActivityClassification[] = [
  // ── PROHIBITED ──
  {
    keywords: ['meat processing', 'meat canning', 'slaughterhouse', 'slaughtered meat'],
    excludeKeywords: ['meat masala', 'meat spice', 'meat flavouring', 'meat flavoring'],
    status: 'PROHIBITED',
    reason: 'Meat processing/canning/serving of slaughtered meat — socio-religious sensitivity',
    guidelineRef: 'PMEGP Guidelines — Negative List Item 1',
  },
  {
    keywords: ['beedi', 'bidi', 'paan', 'cigar', 'cigarette'],
    status: 'PROHIBITED',
    reason: 'Beedi/Paan/Cigar/Cigarette manufacturing or sale — health hazards',
    guidelineRef: 'Negative List Item 2',
  },
  {
    keywords: ['liquor', 'bar', 'wine shop', 'wine', 'alcohol serving', 'toddy', 'beer', 'pub', 'tavern'],
    status: 'PROHIBITED',
    reason: 'Hotels/Dhabas serving liquor, toddy tapping, or any alcohol-related business — intoxicant items are prohibited',
    guidelineRef: 'Negative List Items 3 & 5',
  },
  {
    keywords: ['tobacco', 'tobacco preparation', 'tobacco manufacturing', 'gutka', 'zarda', 'khaini'],
    status: 'PROHIBITED',
    reason: 'Tobacco preparation/manufacturing as raw material — health hazards. ALL tobacco-related activities are prohibited under PMEGP.',
    guidelineRef: 'Negative List Item 4',
  },
  {
    keywords: ['polythene', 'plastic bag', 'carry bag', 'plastic carry'],
    excludeKeywords: ['recycling', 'above 75', '75 micron', '> 75'],
    status: 'PROHIBITED',
    reason: 'Polythene carry bags below 75 microns — environmental concerns',
    conditions: 'Bags >= 75 microns thickness are allowed',
    guidelineRef: 'Negative List Item 6',
  },
  {
    keywords: ['recycled plastic', 'recycled container'],
    excludeKeywords: ['non-food', 'industrial'],
    status: 'PROHIBITED',
    reason: 'Recycled plastic containers for food storage — health/environment',
    conditions: 'Recycled plastic for non-food/industrial use may be allowed',
    guidelineRef: 'Negative List Item 7',
  },
  {
    keywords: ['tea plantation', 'coffee plantation', 'rubber plantation', 'tea cultivation', 'coffee cultivation', 'rubber cultivation', 'crop cultivation'],
    excludeKeywords: ['tea processing', 'tea packaging', 'coffee processing', 'coffee roasting', 'rubber processing', 'value addition', 'manufacturing'],
    status: 'PROHIBITED',
    reason: 'Basic cultivation of crops/plantation (Tea, Coffee, Rubber) — agricultural exclusion',
    conditions: 'Value addition (processing, packaging, roasting) IS ALLOWED',
    guidelineRef: 'Negative List Item 8',
  },
  {
    keywords: ['sericulture', 'cocoon rearing'],
    excludeKeywords: ['silk processing', 'silk weaving', 'silk manufacturing', 'value addition'],
    status: 'PROHIBITED',
    reason: 'Basic sericulture (cocoon rearing) — agricultural exclusion',
    conditions: 'Off-farm/farm-linked sericulture activities & silk processing ARE ALLOWED',
    guidelineRef: 'Negative List Item 9',
  },
  {
    keywords: ['horticulture', 'floriculture'],
    excludeKeywords: ['nursery', 'processing', 'packaging', 'value addition', 'floral arrangement', 'flower shop'],
    status: 'PROHIBITED',
    reason: 'Basic horticulture/floriculture cultivation — agricultural exclusion',
    conditions: 'Off-farm activities, nurseries, flower shops, value addition ARE ALLOWED',
    guidelineRef: 'Negative List Item 10',
  },
  {
    keywords: ['animal husbandry'],
    excludeKeywords: ['dairy', 'poultry', 'aquaculture', 'fishery', 'bee', 'piggery'],
    status: 'PROHIBITED',
    reason: 'Basic animal husbandry (rearing only) — agricultural exclusion',
    conditions: 'Dairy, Poultry, Aquaculture, Bee keeping, Piggery (NER) ARE ALLOWED',
    guidelineRef: 'Negative List Item 11',
  },
  {
    keywords: ['pashmina', 'hand spinning', 'hand weaving'],
    excludeKeywords: ['power loom', 'machine', 'manufacturing'],
    status: 'PROHIBITED',
    reason: 'Pashmina Wool hand spinning/hand weaving — comes under Khadi Certification',
    guidelineRef: 'Negative List Item 13',
  },
  {
    keywords: ['rural transport', 'transport service', 'auto rickshaw', 'rickshaw'],
    excludeKeywords: ['ner', 'north east', 'andaman', 'cng', 'a&n'],
    status: 'CONDITIONAL',
    reason: 'Rural transport is generally not allowed — not village industry',
    conditions: 'Auto rickshaws: A&N Islands and NER only (CNG, Chief Secretary approval). House boats: A&N and J&K only',
    guidelineRef: 'Negative List Item 14',
  },

  // ── CONDITIONAL (ALLOWED WITH CONDITIONS) ──
  {
    keywords: ['hotel', 'dhaba', 'restaurant', 'mess', 'canteen'],
    excludeKeywords: ['liquor', 'bar', 'wine'],
    status: 'CONDITIONAL',
    reason: 'Hotels/Dhabas are allowed ONLY if they do NOT serve liquor',
    conditions: 'Non-vegetarian food WITHOUT liquor is ALLOWED',
    guidelineRef: 'Negative List Exception',
  },
  {
    keywords: ['piggery', 'pig farming', 'pig rearing'],
    status: 'CONDITIONAL',
    reason: 'Piggery is allowed ONLY in NER (North Eastern Region) states',
    conditions: 'Allowed in: Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, Sikkim only',
    guidelineRef: 'Negative List Exception',
  },

  // ── EXPLICITLY ALLOWED (to override false matches) ──
  {
    keywords: ['dairy', 'milk', 'ghee', 'butter', 'cheese', 'curd'],
    status: 'ALLOWED',
    reason: 'Dairy (cows, sheep, goats, camels, buffaloes) is explicitly ALLOWED under PMEGP',
    guidelineRef: 'Negative List Exception',
  },
  {
    keywords: ['poultry', 'chicken', 'egg', 'turkey', 'duck', 'geese'],
    status: 'ALLOWED',
    reason: 'Poultry farming is explicitly ALLOWED under PMEGP',
    guidelineRef: 'Negative List Exception',
  },
  {
    keywords: ['aquaculture', 'fishery', 'fish farming', 'fish', 'shrimp', 'prawn', 'crab'],
    status: 'ALLOWED',
    reason: 'Aquaculture is explicitly ALLOWED under PMEGP',
    guidelineRef: 'Negative List Exception',
  },
  {
    keywords: ['bee keeping', 'apiary', 'honey', 'sericulture processing', 'silk'],
    status: 'ALLOWED',
    reason: 'Bee keeping and silk processing/value addition ARE ALLOWED',
    guidelineRef: 'Negative List Exception',
  },
  {
    keywords: ['tea processing', 'tea packaging', 'tea manufacturing', 'coffee processing', 'coffee roasting', 'coffee packaging', 'rubber processing', 'rubber manufacturing'],
    status: 'ALLOWED',
    reason: 'Value addition (processing, packaging) of Tea/Coffee/Rubber IS ALLOWED — only basic cultivation is prohibited',
    guidelineRef: 'Negative List Exception',
  },
  {
    keywords: ['meat masala', 'meat spice', 'spice manufacturing', 'masala'],
    status: 'ALLOWED',
    reason: 'Meat masala/spice manufacturing IS ALLOWED — only meat processing/canning of slaughtered meat is prohibited',
    guidelineRef: 'Negative List Exception',
  },
  {
    keywords: ['nursery', 'plant nursery', 'flower shop', 'floral', 'garden center'],
    status: 'ALLOWED',
    reason: 'Nurseries and flower shops ARE ALLOWED — only basic horticulture/floriculture cultivation is prohibited',
    guidelineRef: 'Negative List Exception',
  },
];

export function isActivityAllowed(activityName: string): {
  allowed: boolean;
  status: 'ALLOWED' | 'CONDITIONAL' | 'PROHIBITED';
  warning?: string;
  classification?: ActivityClassification;
  allMatches?: ActivityClassification[];  // ⭐ NEW: all matching classifications
} {
  const name = activityName.toLowerCase().trim();
  const allMatches: ActivityClassification[] = [];
  
  // Single pass: collect ALL matching classifications
  for (const classification of ACTIVITY_CLASSIFICATIONS) {
    const matched = classification.keywords.some(kw => name.includes(kw.toLowerCase()));
    const excluded = classification.excludeKeywords?.some(kw => name.includes(kw.toLowerCase())) ?? false;
    if (matched && !excluded) {
      allMatches.push(classification);
    }
  }
  
  // If no matches, return allowed with advisory
  if (allMatches.length === 0) {
    return {
      allowed: true,
      status: 'ALLOWED',
      warning: 'This activity was not found in our database. Please verify with KVIC that it is not in the PMEGP negative list before proceeding.',
      allMatches,
    };
  }
  
  // Priority: PROHIBITED > CONDITIONAL > ALLOWED
  // If ANY match is PROHIBITED, the activity is PROHIBITED (safety-first approach)
  const prohibitedMatch = allMatches.find(c => c.status === 'PROHIBITED');
  if (prohibitedMatch) {
    return {
      allowed: false,
      status: 'PROHIBITED',
      warning: `🔴 PROHIBITED: ${prohibitedMatch.reason}${prohibitedMatch.conditions ? ` Note: ${prohibitedMatch.conditions}` : ''}`,
      classification: prohibitedMatch,
      allMatches,
    };
  }
  
  // If any match is CONDITIONAL (and none prohibited), return CONDITIONAL
  const conditionalMatch = allMatches.find(c => c.status === 'CONDITIONAL');
  if (conditionalMatch) {
    return {
      allowed: true,
      status: 'CONDITIONAL',
      warning: `⚠️ CONDITIONAL: ${conditionalMatch.reason}. Conditions: ${conditionalMatch.conditions}`,
      classification: conditionalMatch,
      allMatches,
    };
  }
  
  // Only ALLOWED matches found
  const allowedMatch = allMatches.find(c => c.status === 'ALLOWED');
  return {
    allowed: true,
    status: 'ALLOWED',
    classification: allowedMatch,
    allMatches,
  };
}

// ─── ELIGIBILITY VALIDATION ───

export interface EligibilityCheck {
  eligible: boolean;
  issues: string[];
  warnings: string[];
}

export function checkEligibility(params: {
  age: number;
  gender: number;
  category: number;
  qualification: number;
  sector: number;
  projectCost: number;
  isExistingUnit: boolean;
  hasPreviousPMEGP: boolean;
  hasPreviousGovtSubsidy: boolean;  // Subsidy from OTHER govt schemes (not PMEGP)
  activityName: string;
  noOfEmployees: number;           // For per capita investment validation
}): EligibilityCheck {
  const issues: string[] = [];
  const warnings: string[] = [];

  // Age check
  if (params.age < 18) {
    issues.push('Applicant must be at least 18 years old');
  }

  // Existing unit check — handles multiple cases
  if (params.isExistingUnit) {
    if (params.hasPreviousPMEGP) {
      // Has previous PMEGP loan → eligible for 2nd loan (upgradation)
      warnings.push('Existing PMEGP unit detected — you may be eligible for 2nd loan (upgradation). Subsidy rate: 15% (20% NER/Hill). Max project: ₹1Cr (Mfg) / ₹25L (Svc).');
      warnings.push('⚠️ 2nd loan requirements: (1) 1st loan lock-in period must be completed, (2) regular repayment of 1st loan installments, (3) physical verification completed, (4) unit must be performing well. Verify ALL conditions before applying.');
    } else if (params.hasPreviousGovtSubsidy) {
      // Had govt subsidy under OTHER schemes → NOT eligible
      issues.push('Existing unit that already availed Govt subsidy under State/Central schemes is NOT eligible for PMEGP');
    } else {
      // Existing unit without any govt subsidy → NOT eligible for 1st loan
      issues.push('PMEGP is for new units only. The only exception is 2nd loan for existing PMEGP/REGP/MUDRA units (upgradation).');
    }
  }

  // Qualification check
  const minQualification = params.sector === SECTOR.MANUFACTURING
    ? (params.projectCost > 1000000 ? QUALIFICATION.EIGHTH_PASS : 0)
    : (params.projectCost > 500000 ? QUALIFICATION.EIGHTH_PASS : 0);
  
  if (minQualification > 0 && params.qualification < minQualification) {
    issues.push(`Minimum qualification required: ${QUALIFICATION_LABELS[minQualification]} for project cost above ₹${params.sector === SECTOR.MANUFACTURING ? '10' : '5'} Lakh`);
  }

  // Project cost limit check
  const maxCost = MAX_PROJECT_COST.FIRST_LOAN[params.sector as keyof typeof MAX_PROJECT_COST.FIRST_LOAN];
  if (params.projectCost > maxCost) {
    warnings.push(`Project cost exceeds PMEGP limit of ₹${maxCost / 100000} Lakh for ${SECTOR_LABELS[params.sector]} sector. Balance amount will not receive subsidy.`);
  }

  // Negative list check
  const activityCheck = isActivityAllowed(params.activityName);
  if (!activityCheck.allowed) {
    issues.push(activityCheck.warning || 'Activity is in PMEGP negative list');
  } else if (activityCheck.status === 'CONDITIONAL') {
    warnings.push(activityCheck.warning || 'Activity has conditions');
  }

  // Per capita investment check (Common Mistake #10)
  if (params.projectCost > 0 && params.noOfEmployees > 0) {
    const perCapitaInvestment = params.projectCost / params.noOfEmployees;
    const maxPerCapitaPlain = 300000;    // ₹3 Lakh per worker (plain areas)
    const maxPerCapitaHilly = 450000;    // ₹4.5 Lakh per worker (hilly areas)
    // Note: Location info not available in params, use plain area limit as default
    if (perCapitaInvestment > maxPerCapitaHilly) {
      issues.push(`Per capita investment (₹${(perCapitaInvestment / 100000).toFixed(2)} Lakh/worker) exceeds limit of ₹4.5 Lakh (hilly) / ₹3 Lakh (plain). Reduce project cost or increase employment.`);
    } else if (perCapitaInvestment > maxPerCapitaPlain) {
      warnings.push(`Per capita investment (₹${(perCapitaInvestment / 100000).toFixed(2)} Lakh/worker) exceeds ₹3 Lakh limit for plain areas. May be OK for hilly/NE areas (limit: ₹4.5 Lakh).`);
    }
  }

  // One project per family check (Common Mistake #6)
  warnings.push('Reminder: Only ONE PMEGP project per family (self + spouse). If you or your spouse already have a PMEGP project, you are NOT eligible.');

  return {
    eligible: issues.length === 0,
    issues,
    warnings,
  };
}

// ─── REQUIRED DOCUMENTS ───

export const REQUIRED_DOCUMENTS = [
  { name: 'Aadhaar Card', mandatory: true },
  { name: 'PAN Card', mandatory: true },
  { name: 'Passport Size Photo', mandatory: true },
  { name: 'Educational Qualification Certificate', mandatory: false, note: 'Required if project >₹10L (Mfg) or >₹5L (Svc)' },
  { name: 'Caste Certificate', mandatory: false, note: 'For SC/ST/OBC claims' },
  { name: 'Special Category Certificate', mandatory: false, note: 'For PH/Ex-Serviceman/Minority' },
  { name: 'Project Report / DPR', mandatory: true },
  { name: 'Address Proof', mandatory: true },
  { name: 'Bank Account Details', mandatory: true },
  { name: 'Rural/Urban Certificate', mandatory: true },
  { name: 'Land/Building Ownership Proof', mandatory: false, note: 'If own premises' },
  { name: 'Rental Agreement', mandatory: false, note: 'If rented premises' },
] as const;
```

---

## 11. 💰 Currency Formatting — `src/lib/format-currency.ts`


```typescript
// src/lib/format-currency.ts
// Indian numbering system formatter: ₹12,50,000 (not ₹1,250,000)

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Short form: ₹50L, ₹1Cr
export function formatCurrencyShort(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 2)} L`;
  }
  return formatCurrency(amount);
}

// Format percentage
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(0)}%`;
}
```

---

## 12. 📄 Report Generator — `src/lib/report-generator.ts`


> **CRITICAL**: The PDF export pipeline requires this file. The preload API `exportPDF(html)` sends an HTML string to the main process, which uses `webContents.printToPDF()` to generate the PDF. This module converts DPR data into that print-ready HTML. Without it, the PDF export button does nothing.

```typescript
// src/lib/report-generator.ts
// Converts DPRData into a print-ready HTML string for PDF export.
// Called from renderer: window.electronAPI.exportPDF(generateDPRReportHTML(dprData))

import { formatCurrency, formatCurrencyShort, formatPercent } from './format-currency';
import type { DPRData } from './dpr-types';

export function generateDPRReportHTML(dprData: DPRData): string {
  const computed = dprData.computed || {};
  const totalBuilding = (dprData.buildingItems || []).reduce((s, b) => s + (b.amount || 0), 0);
  const totalMachinery = (dprData.machineryItems || []).reduce((s, m) => s + (m.amount || 0), 0);
  const totalCapitalExp = totalBuilding + totalMachinery
    + (dprData.otherCosts?.preliminaryCost || 0)
    + (dprData.otherCosts?.furnitureFixtures || 0)
    + (dprData.otherCosts?.contingency || 0);
  const totalWorkingCapital = (dprData.workingCapitalItems || [])
    .reduce((s, w) => s + (w.amount || 0), 0);
  const totalProjectCost = computed.projectCost || (totalCapitalExp + totalWorkingCapital);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Detailed Project Report — ${dprData.project?.projectName || 'PMEGP'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #1a1a1a; padding: 40px; line-height: 1.6; }
    h1 { font-size: 18pt; text-align: center; color: #065f46; margin-bottom: 4px; }
    h2 { font-size: 14pt; color: #065f46; border-bottom: 2px solid #065f46; margin: 20px 0 10px; padding-bottom: 4px; }
    h3 { font-size: 12pt; color: #1a1a1a; margin: 12px 0 6px; }
    .subtitle { text-align: center; font-size: 10pt; color: #666; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0 16px; font-size: 10pt; }
    th { background: #065f46; color: white; padding: 6px 10px; text-align: left; }
    td { padding: 5px 10px; border-bottom: 1px solid #ddd; }
    tr:nth-child(even) td { background: #f0fdf4; }
    .amount { text-align: right; font-variant-numeric: tabular-nums; }
    .total-row td { font-weight: bold; border-top: 2px solid #065f46; background: #ecfdf5; }
    .section-divider { page-break-before: always; }
    .cover { text-align: center; padding: 80px 0 40px; }
    .cover h1 { font-size: 24pt; margin-bottom: 12px; }
    .cover .project-name { font-size: 16pt; color: #065f46; margin: 16px 0; }
    .cover .promoter { font-size: 12pt; color: #444; }
    .glance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; margin: 12px 0; }
    .glance-item { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dotted #ccc; }
    .glance-label { font-weight: 600; }
    @media print { body { padding: 20px; } .section-divider { page-break-before: always; } }
  </style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover">
  <h1>📋 DETAILED PROJECT REPORT</h1>
  <div class="subtitle">Under Prime Minister's Employment Generation Programme (PMEGP)</div>
  <div class="project-name">${dprData.project?.projectName || '—'}</div>
  <div class="promoter">Promoter: ${dprData.applicant?.name || '—'}</div>
  <div class="promoter">Prepared by: PMEGP DPR Generator</div>
  <div class="promoter">Date: ${new Date().toLocaleDateString('en-IN')}</div>
</div>

<!-- PROJECT AT A GLANCE -->
<div class="section-divider"></div>
<h2>1. Project at a Glance</h2>
<div class="glance-grid">
  <div class="glance-item"><span class="glance-label">Name of Project</span><span>${dprData.project?.projectName || '—'}</span></div>
  <div class="glance-item"><span class="glance-label">Name of Promoter</span><span>${dprData.applicant?.name || '—'}</span></div>
  <div class="glance-item"><span class="glance-label">Sector</span><span>${dprData.project?.sector === 1 ? 'Manufacturing' : 'Service'}</span></div>
  <div class="glance-item"><span class="glance-label">Location</span><span>${dprData.project?.location === 1 ? 'Rural' : 'Urban'}</span></div>
  <div class="glance-item"><span class="glance-label">Total Project Cost</span><span>${formatCurrency(totalProjectCost)}</span></div>
  <div class="glance-item"><span class="glance-label">Own Contribution (${formatPercent(computed.ownContributionPct || 0.05)})</span><span>${formatCurrency(computed.ownContributionAmt || 0)}</span></div>
  <div class="glance-item"><span class="glance-label">Bank Loan (Sanctioned)</span><span>${formatCurrency(computed.bankLoanAmt || 0)}</span></div>
  <div class="glance-item"><span class="glance-label">Margin Money (Subsidy ${formatPercent(computed.subsidyPct || 0.25)})</span><span>${formatCurrency(computed.subsidyAmt || 0)}</span></div>
  <div class="glance-item"><span class="glance-label">Net Liability After Lock-In</span><span>${formatCurrency(computed.netLiabilityAfterLockIn || 0)}</span></div>
  ${dprData.project?.isSecondLoan ? '<div class="glance-item"><span class="glance-label">2nd Loan</span><span>Yes' + (dprData.project?.isNERHill ? ' (NER/Hill — 20% subsidy)' : ' (General — 15% subsidy)') + '</span></div>' : ''}
</div>

<!-- COST OF PROJECT -->
<h2>2. Cost of Project</h2>
<table>
  <tr><th>Particulars</th><th class="amount">Amount (₹)</th></tr>
  <tr><td>Building / Civil Works</td><td class="amount">${formatCurrency(totalBuilding)}</td></tr>
  <tr><td>Machinery & Equipment</td><td class="amount">${formatCurrency(totalMachinery)}</td></tr>
  <tr><td>Preliminary / Pre-operative Expenses</td><td class="amount">${formatCurrency(dprData.otherCosts?.preliminaryCost || 0)}</td></tr>
  <tr><td>Furniture & Fixtures</td><td class="amount">${formatCurrency(dprData.otherCosts?.furnitureFixtures || 0)}</td></tr>
  <tr><td>Contingencies</td><td class="amount">${formatCurrency(dprData.otherCosts?.contingency || 0)}</td></tr>
  <tr class="total-row"><td>Total Capital Expenditure</td><td class="amount">${formatCurrency(totalCapitalExp)}</td></tr>
  <tr><td>Working Capital</td><td class="amount">${formatCurrency(totalWorkingCapital)}</td></tr>
  <tr class="total-row"><td>TOTAL PROJECT COST</td><td class="amount">${formatCurrency(totalProjectCost)}</td></tr>
</table>

<!-- MEANS OF FINANCE -->
<h2>3. Means of Finance</h2>
<table>
  <tr><th>Source</th><th>%</th><th class="amount">Amount (₹)</th></tr>
  <tr><td>Own Contribution</td><td>${formatPercent(computed.ownContributionPct || 0.05)}</td><td class="amount">${formatCurrency(computed.ownContributionAmt || 0)}</td></tr>
  <tr><td>Bank Loan (Sanctioned)</td><td>${formatPercent(1 - (computed.ownContributionPct || 0.05))}</td><td class="amount">${formatCurrency(computed.bankLoanAmt || 0)}</td></tr>
  <tr class="total-row"><td>Total</td><td>100%</td><td class="amount">${formatCurrency(totalProjectCost)}</td></tr>
</table>
<p style="margin-top:8px;font-size:9pt;color:#666;">
  Subsidy (Margin Money): ${formatPercent(computed.subsidyPct || 0.25)} = ${formatCurrency(computed.subsidyAmt || 0)} — held in TDR during 3-year lock-in.<br>
  Net Liability After Lock-In: ${formatCurrency(computed.netLiabilityAfterLockIn || 0)} (Bank Loan − Margin Money, adjusted after lock-in + physical verification)
</p>

<!-- 5-YEAR P&L PROJECTION -->
<div class="section-divider"></div>
<h2>4. Profit & Loss Projection (5 Years)</h2>
<p style="font-size:9pt;color:#666;">Capacity Utilisation: Y1=70%, Y2=80%, Y3-5=90%</p>
<table>
  <tr><th>Particulars</th><th class="amount">Year 1</th><th class="amount">Year 2</th><th class="amount">Year 3</th><th class="amount">Year 4</th><th class="amount">Year 5</th></tr>
  <!-- Rows populated at runtime by dpr-calculations.ts outputs -->
  <tr><td colspan="6" style="text-align:center;color:#888;font-style:italic;">Populated from computed P&L data (dpr-calculations.ts)</td></tr>
</table>

<!-- KEY RATIOS -->
<h2>5. Key Financial Ratios</h2>
<table>
  <tr><th>Ratio</th><th>Value</th><th>Benchmark</th></tr>
  <tr><td>DSCR</td><td>${(computed.dscr || 0).toFixed(2)}</td><td>≥ 1.5</td></tr>
  <tr><td>ROI</td><td>${(computed.roi || 0).toFixed(2)}%</td><td>—</td></tr>
  <tr><td>Break-Even Point</td><td>${(computed.breakEven || 0).toFixed(2)}%</td><td>Lower is better</td></tr>
</table>

<!-- DISCLAIMER -->
<div class="section-divider"></div>
<div style="margin-top:24px;padding:12px;background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;font-size:9pt;">
  <strong>Disclaimer:</strong> This Detailed Project Report has been generated by PMEGP DPR Generator software for the purpose of supporting a PMEGP loan application.
  The financial projections are estimates based on the data provided by the applicant. Actual results may vary.
  Applicants are advised to verify all figures with a qualified Chartered Accountant before submission to the bank.
  The Margin Money (subsidy) is subject to approval by the Implementing Agency (KVIC/KVIB/DIC) and is held in TDR during the 3-year lock-in period.
</div>

</body>
</html>`;
}
```

> **Usage in renderer**: When the user clicks "Export PDF":
> ```typescript
> const html = generateDPRReportHTML(dprData);
> const filePath = await window.electronAPI.exportPDF(html);
> ```
>
> The HTML is sent to the main process via IPC, loaded in a hidden BrowserWindow, and converted to PDF using `webContents.printToPDF()`.

---

## 13. 🤖 Updated AI System Prompt — `src/lib/ai-system-prompt.ts`


> This replaces the old AI system prompt with a complete PMEGP-aware version. The AI assistant uses this prompt to answer questions accurately based on scheme rules and to guide DPR data collection.
>
> **Important AI interview rule**: When helping create or autofill a DPR, the AI should first ask for missing required business/DPR information. After the user answers, the AI may extract candidate values into structured `DPRData`, but the app must validate and calculate using `pmegp-rules.ts`, `dpr-calculations.ts`, and/or verified workbook formulas. AI is not the final calculation authority.

```typescript
// src/lib/ai-system-prompt.ts
// ⚠️ IMPORTANT: This prompt is DYNAMICALLY built from pmegp-rules.ts constants.
// When PMEGP rules change, update pmegp-rules.ts — this prompt will auto-update.
// Do NOT hardcode subsidy rates, max costs, or contribution percentages here.

import {
  GENDER, CATEGORY, LOCATION, SECTOR,
  calculateSubsidyRate,
  calculateOwnContributionRate,
  SECOND_LOAN_SUBSIDY,
  MAX_PROJECT_COST,
  CAPACITY_UTILIZATION,
  DEPRECIATION,
} from './pmegp-rules';
import { formatCurrencyShort } from './format-currency';

export function getDPRSystemPrompt(dprData: any): string {
  // ⭐ DYNAMIC: All rates computed from pmegp-rules.ts — single source of truth
  const subsidyGeneralMaleUrban = calculateSubsidyRate(GENDER.MALE, CATEGORY.GENERAL, LOCATION.URBAN) * 100;
  const subsidyGeneralMaleRural = calculateSubsidyRate(GENDER.MALE, CATEGORY.GENERAL, LOCATION.RURAL) * 100;
  const subsidySpecialUrban = calculateSubsidyRate(GENDER.FEMALE, CATEGORY.SC, LOCATION.URBAN) * 100;  // Any special category
  const subsidySpecialRural = calculateSubsidyRate(GENDER.FEMALE, CATEGORY.SC, LOCATION.RURAL) * 100;
  const ownContribGeneral = calculateOwnContributionRate(GENDER.MALE, CATEGORY.GENERAL) * 100;
  const ownContribSpecial = calculateOwnContributionRate(GENDER.FEMALE, CATEGORY.SC) * 100;
  const secondLoanGeneral = SECOND_LOAN_SUBSIDY.GENERAL * 100;
  const secondLoanNERHill = SECOND_LOAN_SUBSIDY.NER_HILL * 100;
  const maxMfg1st = formatCurrencyShort(MAX_PROJECT_COST.FIRST_LOAN[SECTOR.MANUFACTURING]);
  const maxSvc1st = formatCurrencyShort(MAX_PROJECT_COST.FIRST_LOAN[SECTOR.SERVICE]);
  const maxMfg2nd = formatCurrencyShort(MAX_PROJECT_COST.SECOND_LOAN[SECTOR.MANUFACTURING]);
  const maxSvc2nd = formatCurrencyShort(MAX_PROJECT_COST.SECOND_LOAN[SECTOR.SERVICE]);
  const capUtil = CAPACITY_UTILIZATION.map(r => `${(r * 100).toFixed(0)}%`).join(', ');

  return `You are "PMEGP DPR Generator AI" — an unofficial PMEGP/DPR support assistant for a Windows desktop DPR generator.

## YOUR PRIMARY DPR INTERVIEW ROLE:

When the user wants to create, autofill, review, or complete a DPR, do not jump straight to calculations. First ask for missing required DPR/business information. Convert the user's answers into candidate structured DPR data only after the required fields are clear. Always show AI-suggested values as draft values that require user confirmation before insertion.

Required question categories include:
- Project name, activity description, manufacturing/service sector, rural/urban location.
- Applicant/promoter details, gender, category, location, qualification, constitution/legal status.
- Project cost required, bank loan amount required, first loan or second loan/upgradation.
- Building owned/rented/leased, building cost or rent/lease cost.
- Machinery/equipment, furniture/fixtures, preliminary expenses, contingency, and working capital.
- Raw material, consumables, labor/wages, staff salaries, utilities, transport, marketing/admin costs.
- Sales capacity, selling price, capacity utilization, monthly/annual sales assumptions.
- Any field needed by PMEGP subsidy, own contribution, eligibility, or workbook formulas.

If required data is missing, ambiguous, or conflicts with PMEGP/workbook rules, ask a follow-up question or show a validation warning. Do not guess silently.

## YOUR KNOWLEDGE BASE:

### PMEGP Scheme Overview
- PMEGP is a credit-linked subsidy scheme for new micro-enterprises in the non-farm sector.
- PMEGP is not a direct loan: the bank sanctions finance and the government subsidy is routed through the bank.
- The app must use verified PMEGP/workbook rules for subsidy, own contribution, project limits, EDP, negative list, and workbook mapping.
- Official portal: kviconline.gov.in/pmegpeportal

### Maximum Project Cost
- Manufacturing: ${maxMfg1st} (1st loan), ${maxMfg2nd} (2nd loan/upgradation)
- Service/Business: ${maxSvc1st} (1st loan), ${maxSvc2nd} (2nd loan)
- Land cost CANNOT be included in project cost

### Subsidy Rates (Margin Money) — ⭐ DYNAMIC from pmegp-rules.ts
- General Male + Urban = ${subsidyGeneralMaleUrban.toFixed(0)}%
- General Male + Rural = ${subsidyGeneralMaleRural.toFixed(0)}%
- Special Category + Urban = ${subsidySpecialUrban.toFixed(0)}%
- Special Category + Rural = ${subsidySpecialRural.toFixed(0)}%
- Special includes: SC, ST, OBC, Women, Minorities, Ex-Servicemen, PH/Transgender, NER, Hill/Border, Aspirational Districts
- WOMEN are always Special Category regardless of social category

### Own Contribution — ⭐ DYNAMIC from pmegp-rules.ts
- General Male: ${ownContribGeneral.toFixed(0)}% of project cost
- Special Category: ${ownContribSpecial.toFixed(0)}% of project cost

### 2nd Loan (Upgradation) — ⭐ DYNAMIC from pmegp-rules.ts
- Available for existing PMEGP/REGP/MUDRA units
- Subsidy: ${secondLoanGeneral.toFixed(0)}% (${secondLoanNERHill.toFixed(0)}% for NER & Hill States)
- Max project: ${maxMfg2nd} (Mfg), ${maxSvc2nd} (Svc)

### Eligibility
- Age: 18+ years
- No income ceiling
- 8th pass required for projects >₹10L (Mfg) or >₹5L (Svc)
- Only new units (except 2nd loan for existing PMEGP/REGP/MUDRA units)
- One project per family (self + spouse)

### EDP Training
- Not required for projects up to ₹2 Lakh
- 5 working days for ₹2L-5L
- 10 working days for above ₹5L
- Must complete before Margin Money claim

### Lock-in Period
- 3 years from Margin Money claim
- Subsidy adjusted against loan after lock-in + physical verification
- If unit closes, subsidy must be returned

### Collateral
- Up to ₹10 Lakh: No collateral (RBI mandate)
- Up to ₹2 Crore: CGTMSE guarantee available

### Negative List (NOT Allowed)
- Meat/beedi/liquor/tobacco/toddy businesses
- Polythene bags < 75 microns
- Basic crop cultivation (Tea/Coffee/Rubber)
- Basic sericulture/horticulture/animal husbandry
- BUT: Dairy, Poultry, Aquaculture, value addition ARE allowed

### Financial Model Defaults — ⭐ DYNAMIC from pmegp-rules.ts
- Capacity utilization: ${capUtil}
- Depreciation: Building SLN ${(DEPRECIATION.BUILDING.rate * 100).toFixed(0)}%, Machinery WDV ${(DEPRECIATION.MACHINERY.rate * 100).toFixed(0)}%, Furniture WDV ${(DEPRECIATION.FURNITURE.rate * 100).toFixed(0)}%
- Loan repayment: Quarterly, 3-7 years
- Payback period: 5 years, Implementation: project-specific (user-provided)

### Current DPR Data:
${JSON.stringify(dprData, null, 2)}

## YOUR BEHAVIOR — BOUNDARIES AND RESPONSIBLE GUIDANCE:

### Proactive Warnings (Use when verified data indicates a risk):
1. **Women = Special Category**: If Gender=Female and category is General, explain that women are treated as Special Category in the workbook/rules. Show the applicable special-category subsidy rates and note that final eligibility should be verified.
2. **Negative List Check**: When user mentions a business activity, check against the verified negative list and warn with the reason when available.
3. **Land Cost Warning**: If any cost item mentions "land" or "plot", warn that land cost should not be included in project cost and ask the user to verify with the current workbook/official rule.
4. **Project Cost Limit Warning**: If cost exceeds ${maxMfg1st} (Mfg) or ${maxSvc1st} (Svc), warn that subsidy may apply only to the verified eligible portion.
5. **Category Mismatch Warning**: If user selects Female + General category, explain the special-category treatment before calculating subsidy.
6. **Common Mistakes Checklist**: Before export, show relevant rejection-risk checks from the verified checklist.

### Explanations (Provide only when asked or when directly relevant):
7. **How Subsidy Math Works**: Explain that PMEGP is not a direct loan: the bank sanctions the loan, the government subsidy is routed through the bank, and during lock-in the borrower remains liable for the full sanctioned amount until verified adjustment. Avoid promising approval.
8. **Scheme Comparison**: If user asks "Should I do PMEGP or MUDRA?", provide only verified, general comparison and recommend checking current official terms.
9. **Application Process**: Provide only the implementation-relevant workflow: eligibility → DPR data entry → validation → calculation → export → official portal/bank submission.
10. **Collateral/CGTMSE**: Explain only verified general guidance up to ₹10L and CGTMSE coverage up to ₹2Cr, with bank/current-rule verification required.
11. **EDP Training**: Calculate requirement based on verified project-cost thresholds and mention official EDP sources when available.
12. **Lock-in Process**: Explain the subsidy adjustment process as general guidance and mark unverified details.

### Accuracy Rules (Follow):
13. Quote subsidy rates only from `pmegp-rules.ts`, workbook-derived rule data, or verified official sources.
14. Use Indian numbering system (Lakhs/Crores) for all amounts.
15. Format currency as ₹XX,XX,XXX (Indian format).
16. Suggest realistic interest rates only as ranges/examples, not guarantees.
17. Reference 2023 revised guidelines only when verified: Transgender category, geo-tagging, 2nd loan, online EDP.
18. Be accurate and neutral — never promise subsidy, approval, or collateral-free treatment.
19. Maximum subsidy caps: Manufacturing max ₹17.5L, Service max ₹7L, subject to official verification.
20. If project cost exceeds limits, explain that excess may not receive subsidy and should be verified.`;
}
```

---

## 14. 🖥️ Dashboard View Wireframe


> The dashboard now includes PMEGP scheme info cards, eligibility checks, and negative list warnings. This replaces the simple dashboard from the original blueprint.

```
┌──────────────────────────────────────────────────────────────────┐
│  🏠 PMEGP DPR Generator — Dashboard                                    │
│                                                                    │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│  │  📊 Project Cost │  💰 Your Subsidy  │  🏦 Bank Loan    │    │
│  │  ₹0.00          │  ₹0.00 (0%)      │  ₹0.00          │    │
│  │  Max: ₹50L/₹20L │  Max: 35%        │  90-95% of cost  │    │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🇮🇳 PMEGP Scheme Quick Info                            │    │
│  │                                                          │    │
│  │  • Central Sector Scheme by Ministry of MSME            │    │
│  │  • Credit-linked subsidy: 15% to 35% of project cost    │    │
│  │  • Own contribution: 5% (Special) / 10% (General)       │    │
│  │  • Max project: ₹50L (Mfg) / ₹20L (Service)           │    │
│  │  • Lock-in period: 3 years                              │    │
│  │  • Repayment: 3-7 years                                 │    │
│  │  • Only NEW micro-enterprises in non-farm sector (except 2nd loan) │    │
│  │                                                          │    │
│  │  [📋 Check Eligibility]  [📄 View Guidelines]           │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  📝 DPR Form Progress                                    │    │
│  │                                                          │    │
│  │  ✅ Applicant Info      ⬜ Project Details               │    │
│  │  ⬜ Cost of Project     ⬜ Sales & Revenue               │    │
│  │  ⬜ Expenses            ⬜ Working Capital                │    │
│  │  ⬜ Financial Params    ⬜ Review & Submit                │    │
│  │                                                          │    │
│  │  Overall: 12% complete                                   │    │
│  │  [Continue Form →]                                       │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────┐ ┌──────────────────────────────────┐  │
│  │  ⚠️ Eligibility Check │  📋 Documents Checklist           │  │
│  │                      │                                    │  │
│  │  ✅ Age: 18+         │  ✅ Aadhaar Card                   │  │
│  │  ✅ New Unit         │  ✅ PAN Card                        │  │
│  │  ⬜ Qualification    │  ⬜ Caste Certificate               │  │
│  │  ⬜ Negative List    │  ⬜ Project Report                  │  │
│  │  ✅ Sector Limit     │  ⬜ Address Proof                   │  │
│  │                      │  ⬜ Bank Details                    │  │
│  │  [Full Check →]      │  [Download Checklist →]            │  │
│  └──────────────────────┘ └──────────────────────────────────┘  │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🚫 Activities NOT Allowed (Negative List)               │    │
│  │  • Meat/Beedi/Liquor/Tobacco businesses                 │    │
│  │  • Polythene bags < 75 microns                          │    │
│  │  • Basic crop cultivation                                │    │
│  │  • Basic animal husbandry (Dairy/Poultry ARE allowed)    │    │
│  │  [View Full List →]                                      │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 15. 📦 Phase 1: Type Definitions — `src/lib/dpr-types.ts`


> **UPDATED**: Complete type definitions matching the KVIC DPRPACKAGE.xls DataSheet structure. Re-exports enums from `pmegp-rules.ts` and defines all DPR form interfaces.

```typescript
// src/lib/dpr-types.ts
// COMPLETE type definitions matching the KVIC DPRPACKAGE.xls DataSheet structure

// ─── Enums (import from pmegp-rules.ts) ───
// Re-export all enums and labels from pmegp-rules
export { GENDER, GENDER_LABELS, CATEGORY, CATEGORY_LABELS, LOCATION, LOCATION_LABELS, AGENCY, AGENCY_LABELS, SECTOR, SECTOR_LABELS, QUALIFICATION, QUALIFICATION_LABELS, BUILDING_OWNERSHIP, BUILDING_OWNERSHIP_LABELS, } from './pmegp-rules';

// ─── DPR File Schema Versioning ───
export const DPR_SCHEMA_VERSION = 1 as const;

export interface DPRFile {
  schemaVersion: typeof DPR_SCHEMA_VERSION;
  createdAt: string;        // ISO 8601
  updatedAt: string;        // ISO 8601
  data: DPRData;
}

// ─── Schema Migration Engine ───
// When the DPR data schema changes (e.g., adding isNERHill field),
// this function upgrades older saved files to the current schema.
// Add a new case for each schema version bump.

export function migrateDPRData(data: any, fromVersion: number): DPRData {
  let migrated = { ...data };

  // Migration from v0 (legacy, no schema) → v1
  if (fromVersion < 1) {
    // v0 files didn't have isNERHill — default to false
    if (migrated.project && !('isNERHill' in migrated.project)) {
      migrated.project.isNERHill = false;
    }
    // v0 files may have used old field names — add any missing fields with defaults
    if (migrated.project && !('noOfEmployees' in migrated.project)) {
      migrated.project.noOfEmployees = 0;
    }
  }

  // Future: Migration from v1 → v2
  // if (fromVersion < 2) {
  //   // Add new fields introduced in v2
  // }

  return migrated as DPRData;
}

// ─── Applicant Information ───
export interface ApplicantInfo {
  name: string;                    // B9
  fatherSpouseName: string;        // G14 (was #REF! in Excel — we fix it)
  gender: number;                  // M55: 1=Male, 2=Female, 3=Transgender
  address: string;                 // B14
  addressLine2?: string;           // B15 — optional continuation/address line
  taluk: string;                   // D16
  district: string;                // B17
  pin: string;                     // H17
  state: string;                   // B18 (was #REF! in Excel — we fix it)
  email: string;                   // B19 (was #REF! in Excel — we fix it)
  mobile: string;                  // F19
  phone: string;                   // H21 (was #REF! in Excel — we fix it)
  qualification: number;           // M83: 1-7 index (see QUALIFICATION enum)
  technicalQualification: string;  // E22
  category: number;                // M70: 1-9 (see CATEGORY enum)
  // NOTE: M56 (socialCategory) is NOT used for subsidy calculations.
  // Only M70 (category) is used by the Excel G87 formula. M56 is for display only.
  // If you need M56 for form display, add: socialCategoryDisplay?: number;
}

// ─── Project Configuration ───
export interface ProjectConfig {
  projectName: string;             // B31
  legalStatus: string;             // B34
  sponsoringAgency: number;        // M59: 1=KVIC, 2=KVIB, 3=DIC, 4=Coir Board
  location: number;                // M64: 1=Rural, 2=Urban
  sector: number;                  // M80: 1=Manufacturing, 2=Service
  buildingOwnership: number;       // M91: 1=Own, 2=Rented, 3=Leased
  isSecondLoan: boolean;           // Whether this is 2nd loan/upgradation
  isNERHill: boolean;              // ⭐ Whether applicant is in NER/Hill state — affects 2nd loan subsidy (20% vs 15%)
  activityDescription: string;     // Free text for project description
  noOfEmployees: number;           // For per capita investment check
}

// ─── Building Details (7 line items, rows 41-47) ───
export interface BuildingItem {
  name: string;       // B41:B47
  area: number;       // F41:F47 (Area in sq.ft)
  ratePerSqFt: number;// G41:G47 (Rate per sq.ft)
  amount: number;     // H41:H47 = IF(F>=1, F*G, G)
}

// ─── Machinery Details (13 line items, rows 54-66) ───
export interface MachineryItem {
  name: string;       // B54:B66
  quantity: number;   // F54:F66
  rate: number;       // G54:G66
  amount: number;     // H54:H66 = IF(F>=1, F*G, G)
}

// ─── Other Capital Costs ───
export interface OtherCosts {
  preliminaryCost: number;    // H70 — Pre-operative expenses
  furnitureFixtures: number;  // H72 — Furniture & Fixtures
  contingency: number;        // H74 — Contingency/Miscellaneous (singular in code, "Contingencies" in display labels)
}

// ─── Working Capital Items (rows 70-74) ───
// Excel columns: Element of Working Capital | No. of Days | Amount
export type WorkingCapitalElement =
  | "Stock in Process"
  | "Finished Goods"
  | "Receivables";

export interface WorkingCapitalItem {
  element: WorkingCapitalElement;  // Exact Excel category
  noOfDays: number;                // Excel "No. of Days" column
  amount: number;                  // Excel "Amount" column
}

// ─── Sales/Revenue Details (rows 91-101) ───
export interface SalesItem {
  productName: string;       // B94:B101
  ratePerUnit: number;       // F94:F101
  quantity: number;          // G94:G101 — Quantity (no period assumption)
  quantityPeriod: "monthly" | "annual";  // Period for quantity — matches Excel layout
  amount: number;            // H94:H101 = IF(G>=1, G*F, F)
}

// ─── Raw Material Details (rows 105-115) ───
export interface RawMaterialItem {
  name: string;              // B107:B115
  unit: string;              // E107:E115
  ratePerUnit: number;       // F107:F115
  requiredUnits: number;     // G107:G115
  amount: number;            // H107:H115 = IF(G>=1, G*F, F)
}

// ─── Labor (WAGES section in Excel, rows 118-122) ───
export interface LaborItem {
  designation: string;       // B119 — Worker designation
  noOfWorkers: number;       // E119 — Number of workers
  monthlyWage: number;       // F119 — Monthly wage per worker
  totalMonths: number;       // Months worked in first year (typically 12)
  annualAmount: number;      // H119 = noOfWorkers * monthlyWage * totalMonths
}

// ─── Staff Salary (SALARY DETAILS section in Excel, rows 123-126) ───
export interface StaffSalaryItem {
  designation: string;       // B123 — Staff designation
  noOfStaff: number;         // E123 — Number of staff
  monthlySalary: number;     // F123 — Monthly salary per person
  totalMonths: number;       // Months in first year (typically 12)
  annualAmount: number;      // H123 = noOfStaff * monthlySalary * totalMonths
}

// ─── Other Expenses (exact Excel categories — all per annum) ───
// Matches the "Other Expenses" section in KVIC DPRPACKAGE.xls
export interface OtherExpenses {
  powerRequirement: number;          // Power & Fuel
  repairAndMaintenance: number;      // Repair & Maintenance
  powerAndFuel: number;              // Additional power/fuel costs
  telephoneExpenses: number;         // Telephone
  stationeryAndPostage: number;      // Stationery & Postage
  advertisementAndPublicity: number; // Advertisement & Publicity
  buildingRent: number;              // Building Rent
  miscellaneousExpenditure: number;  // Miscellaneous
}

// ─── Financial Parameters ───
export interface FinancialParams {
  interestRate: number;         // Bank interest rate (default 11%)
  loanTenureYears: number;      // 3-7 years
  implementationMonths: number | null; // Project-specific — user must enter (no default)
  paybackYears: number;         // 5 years
  capacityUtilization: number[];// [0.70, 0.80, 0.90, 0.90, 0.90]
}

// ─── Complete DPR Data ───
export interface DPRData {
  applicant: ApplicantInfo;
  project: ProjectConfig;
  buildingItems: BuildingItem[];
  machineryItems: MachineryItem[];
  otherCosts: OtherCosts;
  workingCapitalItems: WorkingCapitalItem[];
  salesItems: SalesItem[];
  rawMaterialItems: RawMaterialItem[];
  laborItems: LaborItem[];           // WAGES section — workers/daily wage
  staffSalaryItems: StaffSalaryItem[]; // SALARY DETAILS section — salaried staff
  otherExpenses: OtherExpenses;
  financialParams: FinancialParams;
  
  // Computed values (not user input)
  computed?: {
    totalBuildingCost: number;
    totalMachineryCost: number;
    totalCapitalExpenditure: number;
    totalWorkingCapital: number;
    totalProjectCost: number;
    ownContributionPct: number;
    ownContributionAmt: number;
    bankLoanAmt: number;               // Full sanctioned loan (90%/95%)
    subsidyPct: number;
    subsidyAmt: number;                 // Margin Money — held in account/TDR during lock-in
    netLiabilityAfterLockIn: number;    // Bank loan minus Margin Money — post-lock-in repayment amount
    maxProjectCostAllowed: number;
    isWithinLimit: boolean;
    eligibilityIssues: string[];
    edpTrainingRequired: boolean;
    edpTrainingDays: number;
    collateralFree: boolean;
  };
}

// ─── Report Section Types ───
export interface LoanRepaymentSchedule {
  year: number;
  quarter: number;
  openingBalance: number;
  installment: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

export interface DepreciationSchedule {
  year: number;
  buildingOpening: number;
  buildingDep: number;
  buildingClosing: number;
  machineryOpening: number;
  machineryDep: number;
  machineryClosing: number;
  furnitureOpening: number;
  furnitureDep: number;
  furnitureClosing: number;
  totalDepreciation: number;
}

export interface ProfitLossStatement {
  year: number;
  capacityUtil: number;
  sales: number;
  rawMaterials: number;
  wages: number;
  rent: number;
  electricity: number;
  insurance: number;
  maintenance: number;
  marketing: number;
  admin: number;
  otherExpenses: number;
  totalExpenses: number;
  grossProfit: number;
  depreciation: number;
  interest: number;
  netProfitBeforeTax: number;
  tax: number;
  netProfitAfterTax: number;
  taxRate: number;
  taxAssumption: 'configurable-user-input' | 'ca-confirmed' | 'provisional-estimate';
  // Tax is not hard-coded. For proprietorships, presumptive taxation, or CA-reviewed assumptions,
  // the renderer should pass the selected taxRate/taxAssumption into calculations and reports.
}

export interface BalanceSheetItem {
  year: number;
  // Assets
  fixedAssetsGross: number;
  accumulatedDepreciation: number;
  fixedAssetsNet: number;
  currentAssets: number;
  totalAssets: number;
  // Liabilities
  capital: number;
  reserves: number;
  bankLoan: number;
  currentLiabilities: number;
  totalLiabilities: number;
}

export interface CashFlowItem {
  year: number;
  netProfit: number;
  depreciation: number;
  interest: number;
  taxRate: number;
  taxAssumption: 'configurable-user-input' | 'ca-confirmed' | 'provisional-estimate';
  // Tax is not hard-coded. For proprietorships, presumptive taxation, or CA-reviewed assumptions,
  // the renderer should pass the selected taxRate/taxAssumption into calculations and reports
  loanRepayment: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
}

export interface DSCRItem {
  year: number;
  netCashAccrual: number;
  principalRepayment: number;
  interestPayment: number;
  totalDebtService: number;
  dscr: number;
}

export interface BreakEvenAnalysis {
  fixedCosts: number;
  variableCosts: number;
  sales: number;
  contribution: number;
  breakEvenPoint: number;
  breakEvenPct: number;
}

// ─── DPR Report (all computed sections) ───
export interface DPRReport {
  projectAtGlance: Record<string, any>;
  costOfProject: Record<string, any>;
  meansOfFinance: Record<string, any>;
  loanRepayment: LoanRepaymentSchedule[];
  depreciation: DepreciationSchedule[];
  profitLoss: ProfitLossStatement[];
  balanceSheet: BalanceSheetItem[];
  cashFlow: CashFlowItem[];
  dscr: DSCRItem[];
  breakEven: BreakEvenAnalysis;
}
```

---

## 16. 📦 Phase 2: Custom Titlebar — `src/components/titlebar.tsx`


This is the **most important new component** — replaces the default Windows title bar with a custom one that looks like Windows 11.

```typescript
// src/components/titlebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useElectron } from '@/hooks/use-electron';
import { Minus, Square, X, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Titlebar() {
  const { isElectron, minimize, maximize, close, isMaximized } = useElectron();
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    if (isElectron) {
      isMaximized().then(setMaximized);
      window.electronAPI?.onWindowStateChange((state) => {
        setMaximized(state === 'maximized');
      });
    }
  }, [isElectron]);

  // Hide custom titlebar if not running in Electron
  if (!isElectron) return null;

  return (
    <div className="flex items-center h-9 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 select-none"
         style={{ WebkitAppRegion: 'drag' } as any}>
      {/* App icon */}
      <div className="flex items-center gap-2 px-3">
        <img src="/dpr-logo.png" alt="DPR" className="w-5 h-5 rounded" />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          PMEGP DPR Generator
        </span>
      </div>

      {/* Spacer — draggable area */}
      <div className="flex-1" />

      {/* Windows controls */}
      <div className="flex" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <button onClick={minimize}
          className="w-11 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Minus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>
        <button onClick={maximize}
          className="w-11 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {maximized ? (
            <Copy className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          ) : (
            <Square className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          )}
        </button>
        <button onClick={close}
          className="w-11 h-9 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
          <X className="w-4 h-4 text-slate-600 dark:text-slate-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
```

**Windows 11 Snap Layouts**: The maximize button should support Windows 11 snap layouts. Electron handles this automatically when using the native window frame or when the `frame: false` + custom titlebar approach is used correctly.

---

## 17. 📦 Phase 3: App Shell — `src/components/app-shell.tsx`


Updated to include the custom titlebar:

```typescript
// App Shell layout:
// 1. Titlebar at the top (custom Windows titlebar)
// 2. pt-9 (padding-top for titlebar)
// 3. File menu in footer (Save/Load/Export)
// 4. Desktop notification support

'use client';

import { Titlebar } from './titlebar';
import { Sidebar } from './sidebar';
import { AIChatPanel } from './ai-chat-panel';
import { useUIStore } from '@/store/ui-store';
import { useElectron } from '@/hooks/use-electron';
// ... view imports

export function AppShell() {
  const { activeView } = useUIStore();
  const { isElectron } = useElectron();

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Custom Titlebar (Electron only) */}
      <Titlebar />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeView === 'dashboard' && <DashboardView />}
            {activeView === 'form' && <DPRFormView />}
            {activeView === 'ai-assistant' && <AIAssistantView />}
            {activeView === 'report' && <ReportView />}
            {activeView === 'settings' && <SettingsView />}
          </div>

          {/* AI Chat Panel (collapsible) */}
          <AIChatPanel />

          {/* Footer */}
          <footer className="h-8 flex items-center justify-between px-4 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <span>PMEGP • Government of India</span>
            <div className="flex items-center gap-3">
              {isElectron && (
                <>
                  <button className="hover:text-emerald-600">📁 Save</button>
                  <button className="hover:text-emerald-600">📂 Load</button>
                  <button className="hover:text-emerald-600">📊 Export Excel</button>
                </>
              )}
              <span>v1.0.0</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
```

---

## 18. 📦 Phase 4: Settings View — Updated for Desktop


The Settings view now includes **desktop-specific** sections:

```
┌──────────────────────────────────────────────────────┐
│  ⚙️ Settings                                         │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  🤖 AI Configuration                        │    │
│  │                                              │    │
│  │  Provider:  [Built-in ▼] / [Custom API]     │    │
│  │  API Key:       [••••••••••••] [👁️]          │    │
│  │  Base URL:      [https://api.openai.com/v1]  │    │  ← Default OpenAI endpoint
│  │  Model Name:    [gpt-4o ▼]                   │    │
│  │  ⭐ OpenAI SDK — enter your API key above to enable AI features                    │    │
│  │                                              │    │
│  │  ┌──────────────────────────────────────┐    │    │
│  │  │  🔌 Connection Test                  │    │    │
│  │  │  Status: ● Connected  Latency: 1.2s │    │    │
│  │  │  [🔄 Test Now] [✅ Auto-Test on Start]│    │    │
│  │  └──────────────────────────────────────┘    │    │
│  │                                              │    │
│  │  Auto-Validation:                            │    │
│  │  ☑ Validate on save                         │    │
│  │  ☑ Auto-test on app start                   │    │
│  │  ☑ Show status in title bar                 │    │
│  │  ☑ Warn before AI calls if disconnected     │    │
│  │                                              │    │
│  │  [Save Settings]                            │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  💾 Data & File Management                  │    │    │
│  │  [💾 Save DPR to File]  (.json)             │    │
│  │  [📂 Load DPR from File] (.json)            │    │
│  │  [📊 Export as Excel]    (.xlsx)            │    │
│  │  [📄 Export Report PDF]  (.pdf)             │    │
│  │  ─────────────────────────────              │    │
│  │  Default save folder: [C:\Users\...\DPR\]   │    │
│  │  ☑ Auto-save every 5 minutes               │    │
│  │  ☑ Create backup on save                   │    │
│  │  ─────────────────────────────              │    │
│  │  [⚠️ Reset All Data]                        │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  🖥️ Desktop Settings                       │    │    │
│  │  ☑ Minimize to system tray on close         │    │
│  │  ☑ Show desktop notifications               │    │
│  │  ☑ Start with Windows (autostart)           │    │
│  │  Window size: [Remember last] [Always max]  │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  🎨 Appearance                              │    │
│  │  Theme: [☀️ Light] [🌙 Dark] [🖥️ System]    │    │
│  │  Sidebar: [Expanded] [Collapsed] [Auto]     │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

---

## 19. 📦 Phase 5: Excel Export — `electron/excel-export.ts`


> **Canonical export approach: template-fill.** Bundle the audited `DPRPACKAGE.xls` (or a verified `.xlsx` conversion) as the export template. At export time: load the template → write verified `DataSheet` input values and line-item data → let workbook formulas calculate where valid → save as a new file. This preserves the 1,588 merged ranges, formatting, print areas, and formulas. ExcelJS from-scratch recreation is not recommended for official DPR output because it does not reproduce official workbook fidelity unless every layout/formula/format detail is separately recreated and tested.

Simplified Excel export may still be useful for non-official analysis exports, but it should not be described as equivalent to the official DPRPACKAGE workbook.

```typescript
// electron/excel-export.ts
import ExcelJS from 'exceljs';
import * as path from 'path';

export interface ExcelExportOptions {
  templatePath?: string;
}

type CodeLookup = Record<string, number>;

function toCode(value: string | number | undefined, lookup: CodeLookup): number | undefined {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return lookup[value.trim().toLowerCase()];
  return undefined;
}

function setCell(sheet: ExcelJS.Worksheet, cellAddress: string, value: unknown): void {
  const cell = sheet.getCell(cellAddress);
  if (value === undefined || value === null || value === '') {
    cell.value = null;
    return;
  }
  cell.value = value;
}

export async function exportDPRToExcel(
  dprData: any,
  filePath: string,
  options: ExcelExportOptions = {},
): Promise<void> {
  const templatePath =
    options.templatePath ||
    path.join(process.resourcesPath, 'templates', 'DPRPACKAGE.xlsx');

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'PMEGP DPR Generator';
  workbook.created = new Date();

  // ⭐ Template-fill export: preserve the audited workbook layout/formulas.
  // If the shipped source is .xls, convert it to .xlsx first with LibreOffice
  // and ship the verified .xlsx as the template.
  await workbook.xlsx.readFile(templatePath);

  // Ask Excel/LibreOffice to recalculate formulas when the exported file is opened.
  workbook.calculation = {
    fullCalcOnLoad: true,
    forceFullCalc: true,
  };

  const dataSheet = workbook.getWorksheet('DataSheet');
  const projectReport = workbook.getWorksheet('Project_Report');
  const dprFront = workbook.getWorksheet('DPR_FRONT');
  const dprPrint = workbook.getWorksheet('DPR_print');

  if (!dataSheet) throw new Error('Template sheet not found: DataSheet');
  if (!projectReport) throw new Error('Template sheet not found: Project_Report');
  if (!dprFront) throw new Error('Template sheet not found: DPR_FRONT');
  if (!dprPrint) throw new Error('Template sheet not found: DPR_print');

  const genderCodes: CodeLookup = { male: 1, female: 2, transgender: 3 };
  const agencyCodes: CodeLookup = { kvic: 1, kvib: 2, dic: 3, coir: 4, 'coir board': 4 };
  const locationCodes: CodeLookup = { rural: 1, urban: 2 };
  const categoryCodes: CodeLookup = {
    sc: 1,
    st: 2,
    obc: 3,
    phc: 4,
    exserviceman: 5,
    'ex-serviceman': 5,
    minority: 6,
    'hill border area': 7,
    'aspirational districts': 8,
    aspirational: 8,
    general: 9,
  };
  const sectorCodes: CodeLookup = { manufacturing: 1, service: 2, business: 2 };

  // ── Canonical selector inputs ──
  setCell(dataSheet, 'M55', toCode(dprData.applicant?.gender, genderCodes));
  setCell(dataSheet, 'M59', toCode(dprData.project?.sponsoringAgency, agencyCodes));
  setCell(dataSheet, 'M64', toCode(dprData.project?.location, locationCodes));
  setCell(dataSheet, 'M70', toCode(dprData.applicant?.category, categoryCodes));
  setCell(dataSheet, 'M80', toCode(dprData.project?.sector, sectorCodes));

  // ⚠️ M56 is intentionally NOT used. Workbook audit found it empty/non-canonical.

  // ── Applicant/project fields ──
  setCell(dataSheet, 'B9', dprData.applicant?.name);
  setCell(dataSheet, 'B14', dprData.applicant?.address);
  setCell(dataSheet, 'B15', dprData.applicant?.addressLine2);
  setCell(dataSheet, 'D16', dprData.applicant?.taluk);
  setCell(dataSheet, 'H17', dprData.applicant?.pin);
  setCell(dataSheet, 'B18', dprData.applicant?.state);
  setCell(dataSheet, 'B19', dprData.applicant?.email);
  setCell(dataSheet, 'F19', dprData.applicant?.mobile);
  setCell(dataSheet, 'B31', dprData.project?.projectName);
  setCell(dataSheet, 'B34', dprData.project?.legalStatus);
  setCell(dataSheet, 'E22', dprData.applicant?.technicalQualification);

  // ── #REF! recovery fields: original source refs are lost, so fill direct UI fields ──
  setCell(projectReport, 'G14', dprData.applicant?.fatherSpouseName);
  setCell(projectReport, 'J20', dprData.applicant?.state);
  setCell(projectReport, 'H21', dprData.applicant?.phone);
  setCell(projectReport, 'H22', dprData.applicant?.email);
  setCell(dprFront, 'B33', dprData.office?.preparedByName);
  setCell(dprFront, 'B35', dprData.office?.addressLine1);
  setCell(dprFront, 'B36', dprData.office?.addressLine2);
  setCell(dprFront, 'B37', dprData.office?.cityDistrict);
  setCell(dprFront, 'F37', dprData.office?.state);

  // ── Building rows ──
  const buildingStartRow = 41;
  const buildingItems = dprData.buildingItems || [];
  for (let i = 0; i < 7; i += 1) {
    const item = buildingItems[i] || {};
    const row = buildingStartRow + i;
    setCell(dataSheet, `B${row}`, item.name);
    setCell(dataSheet, `F${row}`, item.area);
    setCell(dataSheet, `G${row}`, item.ratePerSqFt);
    setCell(dataSheet, `H${row}`, item.amount);
  }

  // ── Machinery rows ──
  const machineryStartRow = 54;
  const machineryItems = dprData.machineryItems || [];
  for (let i = 0; i < 13; i += 1) {
    const item = machineryItems[i] || {};
    const row = machineryStartRow + i;
    setCell(dataSheet, `B${row}`, item.name);
    setCell(dataSheet, `F${row}`, item.quantity);
    setCell(dataSheet, `G${row}`, item.rate);
    setCell(dataSheet, `H${row}`, item.amount);
  }

  // ── Other capital costs ──
  setCell(dataSheet, 'H70', dprData.otherCosts?.preliminaryCost);
  setCell(dataSheet, 'H72', dprData.otherCosts?.furnitureFixtures);
  setCell(dataSheet, 'H74', dprData.otherCosts?.contingency);

  // ── Sales/revenue rows ──
  const salesStartRow = 94;
  const salesItems = dprData.salesItems || [];
  for (let i = 0; i < 8; i += 1) {
    const item = salesItems[i] || {};
    const row = salesStartRow + i;
    setCell(dataSheet, `B${row}`, item.productName);
    setCell(dataSheet, `F${row}`, item.ratePerUnit);
    setCell(dataSheet, `G${row}`, item.quantity);
    setCell(dataSheet, `H${row}`, item.amount);
  }

  // ── Labor rows (WAGES section) ──
  const laborStartRow = 121;
  const laborItems = dprData.laborItems || [];
  for (let i = 0; i < 7; i += 1) {
    const item = laborItems[i] || {};
    const row = laborStartRow + i;
    setCell(dataSheet, `B${row}`, item.designation);
    setCell(dataSheet, `E${row}`, item.noOfWorkers);
    setCell(dataSheet, `F${row}`, item.monthlyWage);
    setCell(dataSheet, `G${row}`, item.totalMonths);
    setCell(dataSheet, `H${row}`, item.annualAmount);
  }

  // ── Staff salary rows (SALARY DETAILS section) ──
  const staffSalaryStartRow = 134;
  const staffSalaryItems = dprData.staffSalaryItems || [];
  for (let i = 0; i < 6; i += 1) {
    const item = staffSalaryItems[i] || {};
    const row = staffSalaryStartRow + i;
    setCell(dataSheet, `B${row}`, item.designation);
    setCell(dataSheet, `E${row}`, item.noOfStaff);
    setCell(dataSheet, `F${row}`, item.monthlySalary);
    setCell(dataSheet, `G${row}`, item.totalMonths);
    setCell(dataSheet, `H${row}`, item.annualAmount);
  }

  // ── Do not overwrite canonical formulas G85/G86/G87. ──
  // Let the template formulas calculate, then verify the exported file after opening/recalculation.

  await workbook.xlsx.writeFile(filePath);
}
```

---

## 20. 🔄 Complete Build Order (Updated for Electron)


### 20.1 Phase 0: Electron Setup

1. Install dependencies: `npm install -D electron electron-builder concurrently wait-on tsup`
2. Install: `npm install exceljs openai`
3. Update `package.json` with scripts and build config
4. Create `electron-builder.yml`
5. Create `electron/main.ts`
6. Create `electron/preload.ts`
7. Create `electron/ipc-handlers.ts` (with AI handlers!)
8. Create `electron/tray.ts`
9. Create `electron/window.ts`
10. Create `build/icon.ico` from `dpr-logo.png`
11. Update `next.config.ts` with `output: 'export'`
12. Create `src/hooks/use-electron.ts`
13. **TEST**: `npm run dev:electron` — verify window opens with Next.js content

### 20.2 Phase 0.5: PMEGP Rules Engine

14. `src/lib/pmegp-rules.ts` — **⭐ CREATE THIS FIRST** (all other files import from it)
15. `src/lib/ai-system-prompt.ts` — Updated PMEGP-aware AI system prompt

### 20.3 Phase 1: Foundation

16. `src/lib/dpr-types.ts` — (imports enums from pmegp-rules.ts)
17. `src/lib/dpr-calculations.ts`
18. `src/store/dpr-store.ts`
19. `src/store/ui-store.ts`
20. `src/store/ai-store.ts`
21. `src/lib/format-currency.ts`

### 20.4 Phase 2: Desktop UI Shell

22. `src/components/titlebar.tsx` — Custom Windows titlebar
23. `src/components/app-shell.tsx` — Main layout with titlebar
24. `src/components/sidebar.tsx` — Navigation
25. `src/components/ai-chat-panel.tsx` — Collapsible chat

### 20.5 Phase 3: Views

26. `src/components/views/dashboard-view.tsx`
27. `src/components/views/dpr-form-view.tsx`
28. `src/components/views/ai-assistant-view.tsx`
29. `src/components/views/report-view.tsx`
30. `src/components/views/settings-view.tsx` — Desktop settings!

### 20.6 Phase 4: Form Sections

31-37. (Same as before — all 7 form section components)

### 20.7 Phase 5: Report Sections

38-47. (Same as before — all 10 report section components)

### 20.8 Phase 6: Wire Up

48. `src/app/page.tsx` — Render AppShell

### 20.9 Phase 7: Build & Package

49. Build Next.js: `npm run build` (creates `out/` folder)
50. Compile Electron: `npm run build:electron` (uses tsup → outputs to dist-electron/)
51. Package: `npm run build:win`
52. Output: `dist/PMEGP-DPR-Generator-Setup-1.0.0.exe` ✅

---

## 21. 🖥️ Windows-Specific Features


### 21.1 System Tray

- Minimize to tray on close (optional, configurable)
- Tray icon shows app icon
- Right-click menu: Open, New DPR, Quit
- Double-click tray icon to restore window

### 21.2 Native File Dialogs

- Save DPR data as `.json` (native Windows Save dialog)
- Load DPR data from `.json` (native Windows Open dialog)
- Export to `.xlsx` Excel file
- Export report as `.pdf`

### 21.3 Windows Notifications

- "DPR saved successfully"
- "AI connection restored"
- "Form 80% complete — keep going!"

### 21.4 Auto-Start with Windows

- Optional: Register app in Windows startup
- Configurable in Settings → Desktop

---

## 22. 💾 Auto-Save & Example Data — UX Enhancements


> These features dramatically improve the user experience for PMEGP applicants who may be first-time computer users filling a complex multi-section form.

### 22.1 Auto-Save Implementation


```typescript
// In src/store/dpr-store.ts — add auto-save timer
// The Zustand store already persists to localStorage.
// Add a 5-minute auto-save timer that also saves to the Electron file system.

interface DPRStore extends DPRData {
  // ... existing fields
  lastAutoSaved: string | null;  // ISO timestamp of last auto-save
  autoSaveEnabled: boolean;       // Default: true
}

// In the React component that uses the store:
// useEffect(() => {
//   if (!autoSaveEnabled) return;
//   const interval = setInterval(() => {
//     const state = useDPRStore.getState();
//     const json = JSON.stringify(state, null, 2);
//     // Save to Electron via IPC (no dialog — auto-saves to app data folder)
//     window.electronAPI.saveDPR(json);  // Or use a dedicated auto-save IPC channel
//     useDPRStore.setState({ lastAutoSaved: new Date().toISOString() });
//   }, 5 * 60 * 1000);  // 5 minutes
//   return () => clearInterval(interval);
// }, [autoSaveEnabled]);
```

> **Footer display**: "Auto-saved 2 min ago" — shown in the footer bar next to the Save/Load buttons.

### 22.2 Example Data Loader


> New users often don't know what values to fill. A "Load Example" button pre-fills the form with realistic PMEGP data so they can see how a complete DPR looks.

```typescript
// In src/lib/example-data.ts
// Pre-filled DPR data for a realistic Manufacturing project (Rural, SC Male)

export const EXAMPLE_DPR_MANUFACTURING: DPRData = {
  applicant: {
    name: 'Rajesh Kumar',
    fatherSpouseName: 'Suresh Kumar',
    gender: 1,                    // Male
    address: 'Village Ramnagar, Post Sundarpur',
    taluk: 'Varanasi',
    district: 'Varanasi',
    pin: '221001',
    state: 'Uttar Pradesh',
    email: 'rajesh.kumar@example.com',
    mobile: '9876543210',
    phone: '9876543210',
    qualification: 3,              // 10th Pass
    technicalQualification: 'Food Processing',
    category: 1,                  // SC
  },
  project: {
    projectName: 'Rajesh Food Processing Unit',
    legalStatus: 'Proprietorship',
    sponsoringAgency: 1,  // KVIC
    location: 1,          // Rural
    sector: 1,            // Manufacturing
    buildingOwnership: 2, // Rented
    isSecondLoan: false,
    isNERHill: false,
    activityDescription: 'Food processing and packaging unit for locally sourced grains and spices',
    noOfEmployees: 8,
  },
  buildingItems: [
    { name: 'Work Shed', area: 500, ratePerSqFt: 800, amount: 400000 },
    { name: 'Store Room', area: 200, ratePerSqFt: 700, amount: 140000 },
  ],
  machineryItems: [
    { name: 'Grinding Machine', quantity: 2, rate: 75000, amount: 150000 },
    { name: 'Packaging Machine', quantity: 1, rate: 120000, amount: 120000 },
    { name: 'Sealing Machine', quantity: 2, rate: 25000, amount: 50000 },
    { name: 'Weighing Scale', quantity: 3, rate: 8000, amount: 24000 },
  ],
  otherCosts: {
    preliminaryCost: 50000,
    furnitureFixtures: 30000,
    contingency: 36000,
  },
  workingCapitalItems: [
    { element: 'Stock in Process', noOfDays: 90, amount: 240000 },
    { element: 'Finished Goods', noOfDays: 60, amount: 75000 },
    { element: 'Receivables', noOfDays: 30, amount: 120000 },
  ],
  salesItems: [
    { productName: 'Processed Grains (5kg pack)', ratePerUnit: 150, quantity: 800, quantityPeriod: 'monthly', amount: 1440000 },
    { productName: 'Spice Mix (200g pack)', ratePerUnit: 80, quantity: 1500, quantityPeriod: 'monthly', amount: 1440000 },
  ],
  rawMaterialItems: [
    { name: 'Raw Grains', unit: 'Quintal', ratePerUnit: 2500, requiredUnits: 40, amount: 1200000 },
    { name: 'Spices', unit: 'Kg', ratePerUnit: 400, requiredUnits: 100, amount: 480000 },
    { name: 'Packaging Material', unit: 'Lot', ratePerUnit: 15000, requiredUnits: 12, amount: 180000 },
  ],
  laborItems: [
    { designation: 'Machine Operator', noOfWorkers: 2, monthlyWage: 12000, totalMonths: 12, annualAmount: 288000 },
    { designation: 'Helper', noOfWorkers: 3, monthlyWage: 8000, totalMonths: 12, annualAmount: 288000 },
  ],
  staffSalaryItems: [
    { designation: 'Supervisor', noOfStaff: 1, monthlySalary: 15000, totalMonths: 12, annualAmount: 180000 },
    { designation: 'Accountant', noOfStaff: 1, monthlySalary: 12000, totalMonths: 12, annualAmount: 144000 },
  ],
  otherExpenses: {
    powerRequirement: 60000,
    repairAndMaintenance: 20000,
    powerAndFuel: 15000,
    telephoneExpenses: 12000,
    stationeryAndPostage: 8000,
    advertisementAndPublicity: 50000,
    buildingRent: 96000,          // ₹8,000/month × 12
    miscellaneousExpenditure: 15000,
  },
  financialParams: {
    interestRate: 0.11,
    loanTenureYears: 7,
    implementationMonths: 24,  // Example value — user must provide their own; no default assumed
    paybackYears: 5,
    capacityUtilization: [0.70, 0.80, 0.90, 0.90, 0.90],
  },
  computed: {},  // Filled by dpr-calculations.ts at runtime
};

// Usage in dpr-form-view.tsx:
// <Button onClick={() => useDPRStore.setState(EXAMPLE_DPR_MANUFACTURING)}>
//   📋 Load Example Data
// </Button>
```

> **Placement**: Add a "📋 Load Example" button at the top of the DPR Form view, visible only when the form is empty (no project name entered). Once data is loaded, it disappears to prevent accidental overwrites.

---

## 23. 🧪 Testing — Unit Tests for Financial Calculations


> **For a financial application that produces loan documents, automated tests are NOT optional.** A wrong subsidy calculation or DSCR value can cause a loan rejection — the most damaging outcome for a PMEGP applicant. Tests must be added during implementation.

### 23.1 Setup


```bash
npm install -D vitest
```

### 23.2 Test Files Required


```
src/__tests__/
├── pmegp-rules.test.ts        # Subsidy rates, own contribution, eligibility, negative list
├── dpr-calculations.test.ts   # Depreciation, P&L, DSCR, BEP, EMI, balance sheet
├── validation.test.ts         # All validators (category, cost, subsidy, negative list)
└── formula-registry.test.ts   # Verify registry delegates correctly to pmegp-rules.ts
```

### 23.3 Critical Test Cases


| Module | Test Case | Expected |
|--------|-----------|----------|
| `pmegp-rules` | General Male, Urban → subsidy | 15% |
| `pmegp-rules` | SC Female, Rural → subsidy | 35% |
| `pmegp-rules` | General Male, Rural → subsidy | 25% |
| `pmegp-rules` | 2nd loan, NER/Hill → subsidy | 20% |
| `pmegp-rules` | 2nd loan, General → subsidy | 15% |
| `pmegp-rules` | General Male → own contribution | 10% |
| `pmegp-rules` | Special Category → own contribution | 5% |
| `pmegp-rules` | Women + General category → treated as Special | ✅ |
| `pmegp-rules` | Land cost → flagged | ✅ Warning |
| `pmegp-rules` | Dairy → allowed | ✅ |
| `pmegp-rules` | Liquor store → prohibited | ❌ |
| `pmegp-rules` | Per capita > ₹4.5L → error | ❌ |
| `dpr-calculations` | WDV depreciation: Machinery ₹10L, Year 1 | ₹1,50,000 |
| `dpr-calculations` | WDV depreciation: Machinery ₹10L, Year 2 | ₹1,27,500 (on ₹8.5L WDV) |
| `dpr-calculations` | SLN depreciation: Building ₹5L, any year | ₹25,000 |
| `dpr-calculations` | DSCR ≥ 1.5 → good | ✅ |
| `dpr-calculations` | DSCR < 1.5 → warning | ⚠️ |
| `formula-registry` | SUBSIDY_RATE.calculate === calculateSubsidyRate | ✅ Same reference |
| `formula-registry` | No magic numbers in registry | ✅ All delegated |

### 23.4 Run Command


```bash
npm run test        # Runs vitest
npm run test:watch  # Watch mode
```

Add to `package.json` scripts:
```json
{ "test": "vitest run", "test:watch": "vitest" }
```

---

## 24. 🚨 Critical Rules for the AI Agent


1. **This is a DESKTOP APP** — not a web app. Think native Windows.
2. **Custom titlebar** replaces default Windows chrome — must implement minimize/maximize/close
3. **`output: 'export'`** in next.config.ts means NO server-side features
4. **All AI calls go through Electron IPC** — NOT fetch() to API routes
5. **`window.electronAPI`** is the bridge — always check `isElectron` before using
6. **Excel export** uses ExcelJS in the main process — not in the browser
7. **File save/load** uses native Windows dialogs — not browser downloads
8. **App icon** must be `.ico` format for Windows (256x256)
9. **NSIS installer** creates proper Windows installer (.exe) with Start Menu shortcut
10. **Test with `npm run dev:electron`** — NOT just `npm run dev`
11. **Only `/` route** — everything is client-side via Zustand state
12. **Format all currency** as Indian: `₹12,50,000` (use `Intl.NumberFormat('en-IN')`)
13. **Persist data** via Zustand `persist` middleware + local file save
14. **OpenAI SDK** (`openai`) is ONLY used in `electron/ipc-handlers.ts` main process — user must provide their own API key via Settings

---

## 25. 🏛️ Architecture Layers — Correct Data Flow


> **MANDATORY**: All layers below must be respected. Data flows DOWN only. Export layer must NEVER contain business logic.

```
UI Layer (React components)
    ↓ user input
Zustand Store (dpr-store, ui-store, ai-store)
    ↓ raw form data
Validation Preflight
    ↓ field-level and cross-field issues before expensive calculations
PMEGP Rules Engine (src/lib/pmegp-rules.ts)
    ↓ eligibility + subsidy rules
Financial Calculation Engine (src/lib/dpr-calculations.ts)
    ↓ computed financial model
Validation Final (with computed totals and formulas)
    ↓ validation issues/warnings
Report Model (DPRData with computed fields)
    ↓ structured data only
Excel Export Engine (electron/excel-export.ts)
    ↓ reads model, writes file — NO calculations here

AI Interview & Autofill Layer (parallel, user-guided)
    ↓ asks missing required DPR/business questions
Candidate DPRData Extractor (src/lib/ai-interview/)
    ↓ candidate values, never final calculations
Validation Engine + Calculation Engine
    ↓ deterministic PMEGP/workbook-derived results
User Confirmation for Critical Draft Changes
    ↓ accepted values update DPR store
Prompt Builder (src/lib/ai/prompt-builder.ts)
    ↓ structured prompt
Knowledge Base (pmegp-rules + dpr-types + verified workbook metadata)
    ↓ context injection
Conversation Manager (src/lib/ai/conversation-manager.ts)
    ↓ token-budgeted messages

Electron IPC Layer
    ↓
File Services (save/load/export)
Notification Services
Export Services (Excel + PDF)
```

---

## 26. 🛡️ Validation Engine — `src/lib/validation/`


> Every DPR form field must be validated in two stages: preflight validation on raw form data before calculations, then final validation after totals/computed fields are available. The validation engine is a separate layer — it validates and returns issues/warnings; it does NOT compute financial results.

```
src/lib/validation/
├── index.ts                    # Re-exports all validators + runAllValidations()
├── pmegp-validator.ts          # PMEGP-specific rules (age, category, sector limits)
├── category-validator.ts       # Gender + category + location cross-checks
├── project-cost-validator.ts   # Max limits, per capita investment, land cost check
├── subsidy-validator.ts        # Subsidy rate + Margin Money validation
├── negative-list-validator.ts  # Activity classification check
└── dpr-file-validator.ts       # Schema version + data integrity on load
```

```typescript
// src/lib/validation/index.ts

export interface ValidationIssue {
  field: string;           // e.g. 'applicant.age', 'project.totalCost'
  severity: 'error' | 'warning' | 'info';
  code: AppErrorCode;      // Links to error taxonomy
  message: string;         // Human-readable
  rule: string;            // e.g. 'PMEGP_AGE_MIN', 'PROJECT_COST_MAX'
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  errors: ValidationIssue[];    // severity === 'error'
  warnings: ValidationIssue[];  // severity === 'warning'
}

export function runAllValidations(dprData: Partial<DPRData>): ValidationResult {
  // ⚠️ IMPORTANT: Validation runs in two phases.
  // - Preflight: validate raw form data before expensive calculations.
  // - Final: after totals/computed fields are merged into dprData.computed, validate project cost, subsidy, and calculation-dependent rules.
  // The per-capita investment check (validateProjectCost) requires a valid project cost,
  // which is derived from: buildingItems + machineryItems + otherCosts + workingCapitalItems.
  // If projectCost is not yet computed, pass it as dprData.computed.projectCost.
  //
  // CORRECT CALLING PATTERN:
  //   1. Run preflight validations on raw form data
  //   2. Compute totals and financial calculations
  //   3. Merge computed totals into dprData.computed
  //   4. Run final validations
  //   5. If valid, export

  const issues: ValidationIssue[] = [
    ...validatePMEGPRules(dprData),
    ...validateCategory(dprData),
    ...validateProjectCost(dprData),
    ...validateSubsidy(dprData),
    ...validateNegativeList(dprData),
  ];
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  return { isValid: errors.length === 0, issues, errors, warnings };
}
```

---

## 27. 🔌 IPC Contract — Formalized


> Every IPC channel has a defined request type, response type, and error taxonomy. No ad hoc calls.

| Channel | Request | Response | Error Codes |
|---------|---------|----------|-------------|
| `window:minimize` | `{}` | `void` | `IPC_FAILURE` |
| `window:maximize` | `{}` | `void` | `IPC_FAILURE` |
| `window:close` | `{}` | `void` | `IPC_FAILURE` |
| `window:isMaximized` | `{}` | `boolean` | `IPC_FAILURE` |
| `file:save-dpr` | `{ data: string }` | `string \| null` (filePath) | `FILE_SAVE_FAILED` |
| `file:load-dpr` | `{}` | `string \| null` (JSON) | `FILE_LOAD_FAILED` |
| `file:export-excel` | `{ data: string }` | `string \| null` (filePath) | `EXPORT_FAILED` |
| `file:export-pdf` | `{ html: string }` | `string \| null` (filePath) | `EXPORT_FAILED` |
| `notification:show` | `{ title, body }` | `void` | `IPC_FAILURE` |
| `app:version` | `{}` | `string` | `IPC_FAILURE` |
| `dialog:select-folder` | `{}` | `string \| null` | `IPC_FAILURE` |
| `ai:chat` | `{ messages, dprData, config: { apiKey?, baseURL?, model? } }` | `{ success, response }` | `AI_FAILURE` |
| `ai:test` | `{ config: { apiKey?, baseURL?, model? } }` | `{ success, message, latencyMs }` | `AI_FAILURE` |
| `ai:suggest` | `{ fieldName, context, projectType, config: { apiKey?, baseURL?, model? } }` | `{ success, suggestion, error? }` | `AI_FAILURE` |

AI interview and autofill behavior is product-layer logic: ask required DPR questions, produce candidate structured `DPRData`, validate, calculate, and request user confirmation for critical changes. The IPC channel names above are implementation details and may be renamed if the implementation keeps the old `ai:ask` naming; the important rule is that all AI calls go through Electron IPC, never renderer fetch/API routes.

---

## 28. ❌ Error Taxonomy — `src/lib/errors.ts`


> Every error in the application uses a typed error code. No untyped string messages.

```typescript
// src/lib/errors.ts

export enum AppErrorCode {
  // Validation errors (4xxx)
  VALIDATION_ERROR = 4000,
  VALIDATION_AGE_MIN = 4001,
  VALIDATION_PROJECT_COST_MAX = 4002,
  VALIDATION_NEGATIVE_LIST = 4003,
  VALIDATION_CATEGORY_MISMATCH = 4004,
  VALIDATION_LAND_COST = 4005,
  VALIDATION_PER_CAPITA = 4006,

  // File errors (5xxx)
  FILE_SAVE_FAILED = 5000,
  FILE_LOAD_FAILED = 5001,
  FILE_NOT_FOUND = 5002,
  FILE_SCHEMA_MISMATCH = 5003,

  // Export errors (6xxx)
  EXPORT_FAILED = 6000,
  EXPORT_EXCEL_FAILED = 6001,
  EXPORT_PDF_FAILED = 6002,

  // IPC errors (7xxx)
  IPC_FAILURE = 7000,
  IPC_TIMEOUT = 7001,
  IPC_NOT_AVAILABLE = 7002,

  // AI errors (8xxx)
  AI_FAILURE = 8000,
  AI_CONNECTION_FAILED = 8001,
  AI_RATE_LIMITED = 8002,
  AI_CONTEXT_TOO_LONG = 8003,

  // Calculation errors (9xxx)
  CALCULATION_FAILURE = 9000,
  CALCULATION_SUBSIDY = 9001,
  CALCULATION_DSCR = 9002,
  CALCULATION_DEPRECIATION = 9003,
}

export class AppError extends Error {
  constructor(
    public code: AppErrorCode,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}
```

---

## 29. 🧮 Financial Calculation Engine — `src/lib/dpr-calculations.ts`


> **CRITICAL**: This is the ONLY place financial calculations happen. The Excel export layer consumes computed outputs — it does NOT calculate.

```typescript
// src/lib/dpr-calculations.ts
// ALL financial calculations live here. Export layer reads computed outputs only.

export function calculateMeansOfFinance(projectCost: number, gender: number, category: number): {
  ownContributionPct: number; ownContributionAmt: number;
  bankLoanAmt: number; subsidyAmt: number; netLiabilityAfterLockIn: number;
} { /* uses pmegp-rules.ts */ }

export function calculateDepreciation(buildingCost: number, machineryCost: number, furnitureCost: number, years: number = 5): {
  building: number[];   // SLN 5%
  machinery: number[];  // WDV 15%
  furniture: number[];  // WDV 10%
  machineryWDV: number[];
  furnitureWDV: number[];
} { /* WDV reducing balance loop */ }

export function calculateProfitLoss(params: ProfitLossParams): ProfitLossStatement[] { /* 5-year P&L */ }

export function calculateLoanSchedule(principal: number, rate: number, tenureYears: number): LoanRepaymentSchedule[] { /* quarterly */ }

export function calculateDSCR(netProfit: number, depreciation: number, loanPrincipal: number, interestRate: number): number { /* >= 1.5 */ }

export function calculateBreakEven(fixedCosts: number, sales: number, variableCosts: number): number { /* BEP % */ }

export function calculateBalanceSheet(params: BalanceSheetParams): BalanceSheet[] { /* 5-year */ }

export function calculateCashFlow(params: CashFlowParams): CashFlowItem[] { /* 5-year */ }

export function calculateEMI(principal: number, annualRate: number, months: number): number { /* PMT formula */ }
```

---

## 30. 📐 Formula Governance — `src/lib/formula-registry.ts`


> Single source of truth for audited PMEGP formula metadata. **This file does NOT duplicate calculation logic** — it delegates to `pmegp-rules.ts` and `dpr-calculations.ts` for actual computation. It provides metadata (source references, thresholds, units) so that UI components and export code can look up formula properties without importing the calculation functions directly.
>
> Authority chain: `Workbook Audit → Formula Registry → Calculation Engine → Workbook Mapper/Export`. Only formulas verified by workbook audit should be registered as canonical. Canonical formulas from the workbook audit are `G85` for own contribution, `G86` for bank finance, and `G87` for subsidy rate. `L25` and `R57:R60` are not canonical and must not be codified as subsidy authority.

```typescript
// src/lib/formula-registry.ts
// Formula metadata registry — delegates ALL calculations to pmegp-rules.ts and dpr-calculations.ts
// NEVER duplicate formula logic here. Import the actual functions and wrap them.

import {
  calculateSubsidyRate,
  calculateOwnContributionRate,
  SECOND_LOAN_SUBSIDY,
  CAPACITY_UTILIZATION,
  DEPRECIATION,
  MAX_PROJECT_COST,
} from './pmegp-rules';
import {
  calculateDSCR,
  calculateBreakEven,
  calculateEMI,
  calculateDepreciation,
} from './dpr-calculations';

export const FORMULAS = {
  SUBSIDY_RATE: {
    id: 'SUBSIDY_RATE',
    name: 'PMEGP Subsidy Rate',
    source: 'DPRPACKAGE.xls Cell G87 — audited canonical subsidy formula',
    calculate: calculateSubsidyRate,  // ⭐ Delegates to pmegp-rules.ts — single source of truth
    description: 'Subsidy % based on Location + Gender + Category. G87 returns 15%/25%/25%/35%; L25 and R57:R60 are non-canonical.',
  },
  OWN_CONTRIBUTION: {
    id: 'OWN_CONTRIBUTION',
    name: 'Own Contribution Rate',
    source: 'DPRPACKAGE.xls Cell G85 — audited canonical own contribution formula',
    calculate: calculateOwnContributionRate,  // ⭐ Delegates to pmegp-rules.ts
    description: 'Own contribution % from G85: 10% for Male+General, otherwise 5%',
  },
  SECOND_LOAN_SUBSIDY_FORMULA: {
    id: 'SECOND_LOAN_SUBSIDY',
    name: '2nd Loan Subsidy Rate',
    source: 'PMEGP Revised Guidelines Dec 2023',
    calculate: (isNERHill: boolean) => isNERHill ? SECOND_LOAN_SUBSIDY.NER_HILL : SECOND_LOAN_SUBSIDY.GENERAL,  // ⭐ Delegates to pmegp-rules.ts constant
    description: '2nd loan: 15% general, 20% NER/Hill states',
  },
  DSCR: {
    id: 'DSCR',
    name: 'Debt Service Coverage Ratio',
    source: 'Standard banking formula',
    calculate: calculateDSCR,  // ⭐ Delegates to dpr-calculations.ts
    threshold: 1.5,
    description: 'Net Cash Accrual / Total Debt Service — must be ≥ 1.5',
  },
  BREAK_EVEN: {
    id: 'BREAK_EVEN',
    name: 'Break-Even Point',
    source: 'Standard financial formula',
    calculate: calculateBreakEven,  // ⭐ Delegates to dpr-calculations.ts
    description: 'Fixed Costs / (Sales - Variable Costs) × 100',
  },
  DEPRECIATION_SLN: {
    id: 'DEPRECIATION_SLN',
    name: 'Straight Line Depreciation',
    source: 'Income Tax Act',
    rate: DEPRECIATION.BUILDING.rate,  // ⭐ Reads from pmegp-rules.ts constant
    calculate: (cost: number) => cost * DEPRECIATION.BUILDING.rate,  // Delegates
    note: 'Used for Building (5%)',
  },
  DEPRECIATION_WDV: {
    id: 'DEPRECIATION_WDV',
    name: 'Written Down Value Depreciation',
    source: 'Income Tax Act',
    rates: { machinery: DEPRECIATION.MACHINERY.rate, furniture: DEPRECIATION.FURNITURE.rate },  // ⭐ Reads from pmegp-rules.ts
    calculate: calculateDepreciation,  // ⭐ Delegates to dpr-calculations.ts (handles WDV loop)
    note: 'Used for Machinery (15%) and Furniture (10%) — reducing balance',
  },
  EMI: {
    id: 'EMI',
    name: 'Equated Monthly Installment',
    source: 'PMT formula',
    calculate: calculateEMI,  // ⭐ Delegates to dpr-calculations.ts
    description: 'PMT(rate/12, months, principal)',
  },
  CAPACITY_UTILIZATION: {
    id: 'CAPACITY_UTILIZATION',
    name: 'Capacity Utilization (5-Year)',
    source: 'KVIC DPR template default',
    rates: CAPACITY_UTILIZATION,  // ⭐ Reads from pmegp-rules.ts constant
  },
} as const;

// ⚠️ CRITICAL RULE: If you add a formula here, it MUST delegate to pmegp-rules.ts or dpr-calculations.ts.
// NEVER write raw calculation logic in this file. This is a METADATA registry only.
```

---

## 31. 🤖 AI Assistant Architecture — `src/lib/ai/`


> The AI layer is structured for production use: prompt versioning, conversation management, token budgets, error recovery, and context compression. It supports the AI interview flow, but it must not become the final calculation authority.

```
src/lib/ai/
├── prompt-builder.ts          # Builds system prompt from DPR data + PMEGP knowledge
├── conversation-manager.ts    # Manages conversation history, token counting, context truncation
├── context-compressor.ts      # Compresses long DPR data into concise context for AI
├── ai-error-handler.ts        # Retry logic, rate limiting, failure recovery
└── token-budget.ts            # Token budget rules (max context, max response, truncation thresholds)

src/lib/ai-interview/
├── interview-schema.ts        # Required-question definitions for AI autofill
├── extractor.ts               # Converts AI/user answers into candidate DPRData
└── confirmation.ts            # Draft-value review and critical-field confirmation rules
```

```typescript
// src/lib/ai-interview/interview-schema.ts
// Required-question schema for AI interview and autofill

export const REQUIRED_DPR_QUESTION_GROUPS = [
  'projectBasics',
  'applicantPromoter',
  'loanSubsidyInputs',
  'premises',
  'capitalExpenditure',
  'workingCapital',
  'laborWages',
  'salesRevenue',
  'financialAssumptions',
] as const;

// src/lib/ai/prompt-builder.ts
// Version-controlled system prompt construction

export const PROMPT_VERSION = 1;

export function buildSystemPrompt(dprData: Partial<DPRData>): string {
  // Combines PMEGP knowledge base + current DPR form data into structured prompt
  // Uses token-budget to stay within limits
  // Returns version-tagged prompt for audit logging
  // Must instruct AI to ask missing required DPR questions before suggesting autofill values
}

// src/lib/ai/conversation-manager.ts
export class ConversationManager {
  private messages: ChatMessage[] = [];
  private maxTokens: number;
  private tokenBudget: TokenBudget;

  addMessage(role: string, content: string): void;
  getMessages(): ChatMessage[];              // Returns token-budgeted message list
  truncateToBudget(): void;                  // Removes oldest messages if over budget
  exportConversation(): string;              // For persistence
  importConversation(json: string): void;    // Restore from save
}

// src/lib/ai-interview/extractor.ts
export function extractCandidateDPRData(answer: string, existingData: Partial<DPRData>): Partial<DPRData> {
  // Extracts candidate structured values from natural-language answers.
  // Does not calculate subsidy, loan, DSCR, BEP, or workbook values.
  // Returns draft values that require validation and user confirmation.
}

// src/lib/ai-interview/confirmation.ts
export const CRITICAL_DPR_FIELDS = [
  'projectCost',
  'bankLoan',
  'subsidyAmt',
  'ownContributionAmt',
  'machineryItems',
  'buildingItems',
  'rawMaterialItems',
  'laborItems',
  'salesItems',
] as const;

export function requiresUserConfirmation(fieldName: string): boolean {
  return CRITICAL_DPR_FIELDS.includes(fieldName as any);
}

// src/lib/ai/ai-error-handler.ts
export class AIErrorHandler {
  static readonly MAX_RETRIES = 3;
  static readonly RETRY_DELAY_MS = 1000;

  static async withRetry<T>(fn: () => Promise<T>): Promise<T>;  // Exponential backoff
  static isRateLimited(error: unknown): boolean;
  static isContextTooLong(error: unknown): boolean;
  static handleFailure(error: unknown): AppError;               // Maps to AppErrorCode
}

// src/lib/ai/token-budget.ts
export const TOKEN_BUDGET = {
  CONTEXT_TOKEN_BUDGET: 8000,     // Total context window
  SYSTEM_PROMPT_BUDGET: 3000,     // Max tokens for system prompt
  CONVERSATION_BUDGET: 4000,      // Max tokens for conversation history
  RESPONSE_TOKEN_BUDGET: 1000,    // Max tokens for AI response
  DPR_DATA_COMPRESSED: 1500,      // Max tokens for compressed DPR data
  TRUNCATION_THRESHOLD: 0.9,      // Truncate at 90% of budget
} as const;
```

---

## 32. 📝 Audit Logging — `electron/audit-logger.ts`


> Financial software must record all significant actions for accountability. Audit logs are stored locally in `appData/logs/audit.log`.

```typescript
// electron/audit-logger.ts
import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

export enum AuditEvent {
  DPR_CREATED = 'DPR_CREATED',
  DPR_UPDATED = 'DPR_UPDATED',
  DPR_SAVED = 'DPR_SAVED',
  DPR_LOADED = 'DPR_LOADED',
  DPR_EXPORTED_EXCEL = 'DPR_EXPORTED_EXCEL',
  DPR_EXPORTED_PDF = 'DPR_EXPORTED_PDF',
  AI_USED = 'AI_USED',
  SUBSIDY_CALCULATED = 'SUBSIDY_CALCULATED',
  VALIDATION_RUN = 'VALIDATION_RUN',
  SETTINGS_CHANGED = 'SETTINGS_CHANGED',
}

interface AuditLogEntry {
  timestamp: string;        // ISO 8601
  event: AuditEvent;
  details: Record<string, unknown>;
  userId?: string;          // Future: multi-user support
}

const LOG_DIR = path.join(app.getPath('userData'), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'audit.log');

export function logAudit(event: AuditEvent, details: Record<string, unknown> = {}): void {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
  const entry: AuditLogEntry = { timestamp: new Date().toISOString(), event, details };
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n', 'utf-8');
}
```

Usage in IPC handlers:
```typescript
ipcMain.handle('file:save-dpr', async (e, data: string) => {
  // ... save logic ...
  logAudit(AuditEvent.DPR_SAVED, { filePath });
  return filePath;
});

ipcMain.handle('file:export-excel', async (e, data: string) => {
  // ... export logic ...
  logAudit(AuditEvent.DPR_EXPORTED_EXCEL, { filePath });
  return filePath;
});
```

---

## 33. 🎯 Final Deliverables


After the complete build, the agent should produce:

1. **`PMEGP-DPR-Generator-Setup-1.0.0.exe`** (~80-120MB) — Windows installer
   - NSIS installer with custom banners
   - Desktop shortcut
   - Start Menu shortcut
   - Uninstaller

2. **Source code** — Complete project with all files listed above

### 33.1 User Experience:

1. Download `PMEGP-DPR-Generator-Setup-1.0.0.exe`
2. Double-click to install
3. Desktop shortcut appears
4. Launch app → beautiful Windows 11-style window opens
5. Fill DPR form with AI assistance
6. Save/Load DPR data as .json files
7. Export complete DPR as .xlsx Excel file
8. Minimize to system tray
9. Get Windows notifications
10. Single fixed release — no auto-update (one-time distribution)
