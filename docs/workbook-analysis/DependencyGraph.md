# DependencyGraph.md

## DPRPACKAGE.xls — Data Flow & Dependency Graph

### Workbook Architecture Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        INPUT SHEET                                  │
│                        DataSheet                                    │
│  (Rows 5-180: user input + intermediate calculated values)          │
│  (Rows 182-268: narrative text, addresses, signatures)              │
│  (Hidden cols K-T: enumeration indices, percentages, helpers)       │
└────┬───────────────────────┬──────────────────────┬─────────────────┘
     │                       │                      │
     ▼                       ▼                      ▼
┌────────────┐    ┌──────────────────┐   ┌─────────────────────┐
│Application_│    │   DPR_print      │   │  Project_Report     │
│   form     │    │  (Print Output)  │   │  (Detailed Report   │
│ (Form Gen) │    │  Cost + Subsidy  │   │   + Financials)     │
└────────────┘    └────────┬─────────┘   └──────────┬──────────┘
                           │                        │
                           └──────────┬─────────────┘
                                      ▼
                            ┌──────────────────┐
                            │   DPR_FRONT      │
                            │  (Cover Page)    │
                            └──────────────────┘
```

### Data Flow Details

#### Flow 1: DataSheet → Application_form

**Purpose:** Generate the PMEGP Application Form (Page 1)

| DataSheet Cell | Application_form Cell | Content |
|----------------|----------------------|---------|
| M55, M70 (hidden gender/category indices) | B27-J27 checkmarks | Category selection display |
| M59 (agency index) | C7, E7, G7, J7 checkmarks | Agency preference display |
| H48 (building total) | C59 | Building cost |
| H67+H72 (machinery+furniture) | D59 | Machinery & furniture cost |
| H70+H74 (preliminary+contingency) | E59 | Preliminary & contingency |
| H76 (working capital) | F59 | Working capital |
| SUM(C59:F59) | G59 | Total project cost |
| L91:L93, M91 | B59 (INDEX) | Premises type label |

**Formula chain:**

```
DataSheet H41:H47 → H48 (SUM) → Application_form C59
DataSheet H54:H66 → H67 (SUM) → Application_form D59 (part)
DataSheet H70:H74 → H76 (SUM) → Application_form F59
```

#### Flow 2: DataSheet → DPR_print

**Purpose:** Generate the Detailed Project Report document

**Direct references from DataSheet:**

```
DataSheet B41:E41 → DPR_print B86:E86 (Building item 1 label)
DataSheet F41      → DPR_print F86       (Building item 1 rate)
DataSheet G41      → DPR_print G86       (Building item 1 qty)
DataSheet H41:I41  → DPR_print H86       (Building item 1 amount)
... (repeated for rows 42-47, 54-66, 70-76)
```

**Indirect references via Project_Report:**

```
Project_Report B9 (applicant name)  → DPR_print B3
Project_Report G9 (project name)    → DPR_print E3
Project_Report B11 (address)        → DPR_print B6
Project_Report G11 (district)       → DPR_print E6
... (other Project_Report fields)
```

**Subsidy logic chain:**

```
DataSheet M55 (gender=1=Women) ─┐
DataSheet M70 (category=9=General) ─┤
DataSheet M64 (location=2=Urban) ─┘
         │
         ▼
DataSheet G85 (own contribution %) ─────────────┐
DataSheet G87 (margin money %)       ──────────┐│
                                                ▼▼
DPR_print H119 (total project cost) ───────────┐││
                                                ▼▼▼
DPR_print F131 (subsidy cap formula) → H131 (subsidy amount)
```

#### Flow 3: DataSheet → Project_Report

**Purpose:** Generate the detailed project report with cost breakdowns

Narrative fields flow:

```
DataSheet B182 (INTRODUCTION)         → Project_Report narrative sections
DataSheet B200 (ABOUT THE PROMOTER)   → Project_Report promoter section
DataSheet B219-B224 (address fields)  → Project_Report address section
DataSheet B233 (INTRODUCTION)         → Project_Report beneficiary section (repeated)
DataSheet B250 (ABOUT THE BENEFICIARY) → Project_Report beneficiary section
```

Financial fields (all from DataSheet):

- H48 (building total)
- H67 (machinery total)
- H72 (furniture)
- H74 (contingency)
- H76 (working capital)
- H102 (sales total)
- H116 (raw materials total)
- H128 (wages total)
- H139 (salary total)
- H157, H159, H161, H163, H165, H167, H171 (overheads)
- F179 (payback period)
- F180, G180 (implementation period)

#### Flow 4: DPR_print + Project_Report → DPR_FRONT

**Purpose:** Generate the front cover page with key summary values

DPR_FRONT aggregates:

- Applicant name, project name (from Project_Report via DPR_print)
- Total project cost
- Subsidy amount
- Loan amount
- Key dates

### Major Formula Chains

#### Chain 1: Total Project Cost

```
Building items (H41:H47) → H48 (SUM) → Application_form C59
                                                         ↓
Machinery items (H54:H66) → H67 (SUM) ─┐                 ↓
Furniture (H72) ───────────────────────┤                 ↓
Preliminary (H70) ─────────────────────┤ → DPR_print H115  ↓
Contingency (H74) ─────────────────────┘        ↓          ↓
Working Capital (H76) ─────────────────────────┘          ↓
                                          DPR_print H119   ↓
                                            (Total Cost)   ↓
                                                         ↓
                                          Application_form G59
                                            (Total Project Cost)
```

#### Chain 2: Subsidy Calculation

```
M55 (Gender) ─┐
M70 (Category) ─┤ → G85 (Own Contribution %)
M64 (Location) ─┤
               ├ → G87 (Margin Money %)
               └ → R57, R58, R59 (hidden margin %)
                            ↓
DPR_print: H119 (Total Cost) × F131 (Subsidy %) → H131 (Subsidy)
```

#### Chain 3: Sales-Based Overheads

```
Sales items (H94:H101) → H102 (Total Sales)
                              ↓
H102 × F157% → H157 (Repair & Maintenance)
H102 × F159% → H159 (Power & Fuel)
H102 × F161% → H161 (Other Overhead)
... (6 more overhead items)
```

### Cycle Detection

No circular references detected. The workbook has a strict DAG (Directed Acyclic Graph) structure:

- DataSheet is the root source (all user input)
- Application_form, DPR_print, Project_Report are leaf consumers
- DPR_FRONT is a secondary consumer of DPR_print/Project_Report
- No sheet references back to an upstream consumer

### Fragility Map

| Path | Fragility | Reason |
|------|-----------|--------|
| DataSheet H column → DPR_print H column | HIGH | Direct cell references — row reordering breaks everything |
| Hidden M column → visible checkboxes | MEDIUM | INDEX-based, fragile if enumeration rows shift |
| DataSheet narrative rows → Project_Report | MEDIUM | Direct cell references — narrative text at fixed row numbers |
| DPR_print B94 (#REF!) | BROKEN | Deleted precedent — must be repaired |
