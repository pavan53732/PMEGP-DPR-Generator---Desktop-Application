# HiddenStructureReport.md

## DPRPACKAGE.xls — Hidden Structures Inventory

### Overview

The workbook contains extensive hidden structures:

- **Hidden columns** in DataSheet (cols K-T) containing helper/dropdown enumeration data
- **Hidden rows** in DataSheet containing financial helper parameters and narrative text areas
- **Hidden rows** in Application_form (tail rows for additional form data)
- **Hidden columns** in DPR_print (cols K-CY — legacy 256-col format, mostly empty)
- **Hidden rows** in Project_Report (rows 417-425)
- **Hidden columns** in DPR_FRONT (cols J-CY — legacy 256-col format)

---

### 1. DataSheet Hidden Rows

**Total hidden rows: 67**

#### Block 1: Address fields (Rows 14-19)

These rows contain address-related labels and data cells that are populated indirectly via formula references. Hidden to compress the visible input section.

#### Block 2: Qualification helper (Rows 21-23)

Contains qualification dropdown labels and the INDEX formula (B23 = `INDEX(DataSheet!L83:L89,DataSheet!M83)`) that pulls selected qualification text.

#### Block 3: Land row (Row 48)

`B48:E48` — a hidden building detail input row. Contains land-related cost entries not shown in compact UI.

#### Block 4: Financial parameters (Rows 179-198)

Hidden parameter zone containing:

- Row 179: Pay back period (F179=5 years)
- Row 180: Project Implementation Period (F180=2 months, G180=12)
- Rows 182-198: Narrative text blocks (INTRODUCTION, ABOUT THE PROMOTER, etc.) used for DPR report generation

#### Block 5: Narrative text and signatures (Rows 200-228+)

Large narrative text area including:

- ABOUT THE PROMOTER section header
- Office Address, District, Khadi & V.I. Commission fields
- Taluk/Block, State fields
- Name & Signature Incharge section
- INTRODUCTION section (duplicated for beneficiary)
- ABOUT THE BENEFICIARY section

---

### 2. DataSheet Hidden Columns (K-T, columns 11-20)

These are the **most important hidden structures** in the workbook. They contain:

| Column | Content | Purpose |
|--------|---------|---------|
| K (11) | Helper data | Intermediate calculations |
| L (12) | Enumeration labels | Dropdown choice labels (e.g., Male/Female, SC/ST/OBC, etc.) |
| M (13) | Enumeration indices | Numeric selection indices (1, 2, 3...) for IF/INDEX formulas |
| N (14) | Helper zone | Additional calculation helpers |
| O (15) | Helper zone | Additional calculation helpers |
| P (16) | Selection flags | Binary flags (e.g., P61=1 for DIC) |
| Q (17) | Subsidy percentage helpers | Labels and computed percentages |
| R (18) | Margin money % helpers | Computed margin money percentages |
| S (19) | Helper zone | Additional calculations |
| T (20) | Helper zone | Additional calculations |

**Key hidden cell contents in columns L-R:**

| Cell | Value | Role |
|------|-------|------|
| L55-M55 | Male / 1 | Gender selection |
| L56 | Female | Gender selection |
| L57 | Transgender | Gender selection |
| L59-M59 | KVIC / 1 | Agency preference selection |
| L60 | KVIB | Agency preference |
| L61 | DIC | Agency preference |
| L62 | COIR Board | Agency preference |
| L64-M64 | Rural / 1 | Location type selection |
| L65 | Urban | Location type |
| L67-M67 | No / 1 | Existing unit flag |
| L68 | Yes | Existing unit flag |
| L70-M70 | SC / 1 | Category selection |
| L71 | ST | Category |
| L72 | OBC | Category |
| L73 | PHC | Category |
| L74 | Ex-Serviceman | Category |
| L75 | Minority | Category |
| L76 | Hill Boarder Area | Category |
| L77 | Aspirational Districts | Category |
| L78 | General | Category |
| L80-M80 | Manufacturing / 1 | Business type selection |
| L81 | Service | Business type |
| L83-M83 | Under 8th / 4 | Education qualification |
| L84 | 8th Pass | Education |
| L85 | 10th Pass | Education |
| L86 | 12th Pass | Education |
| L87 | Graduate | Education |
| L88 | Post Graduate | Education |
| L89 | PhD | Education |
| L91-M91 | Own / 2 | Premises type |
| L92 | Rented | Premises type |
| L93 | Leased | Premises type |
| Q55 | 0.35 | Subsidy percentage |
| R57 | 35 | Margin money % |
| R58 | 25 | Margin money % |
| R59 | 25 | Margin money % |
| R60 | 0 | Margin money % |

---

### 3. Application_form Hidden Rows

**Rows 78-88** (11 rows hidden):
These appear to be continuation rows for the Application Form — possibly additional form fields or form footer/signature areas that are not printed in the standard layout.

---

### 4. DPR_print Hidden Columns

**Columns K-CY** (245 columns hidden, index 11-255):
This is standard legacy Excel behavior — DPR_print was created with the full 256-column worksheet width. Only columns A-J contain meaningful data. The remaining columns are unused but not deleted.

---

### 5. Project_Report Hidden Rows

**Rows 417-425** (9 rows hidden):
These appear to be calculation footers, summary rows, or print control rows at the bottom of the Project_Report sheet.

---

### 6. DPR_FRONT Hidden Columns

**Columns J-CY** (248 columns hidden):
Same legacy Excel behavior as DPR_print — only columns A-I are used. The remaining columns are unused.

---

### Why Hidden Structures Matter

1. **Enumeration values in hidden columns L-M** drive all selection logic (agency, category, education, location, etc.)
2. **Hidden financial parameters** (payback period, implementation period) are critical for DSCR and loan calculations
3. **Hidden narrative rows** store long-form text that feeds into the DPR_print and Project_Report narratives
4. **Hidden R column percentages** (R57, R58, R59, R60) compute margin money percentages based on category/business type logic

The application MUST replicate or reference these hidden values when reconstructing workbook behavior.
