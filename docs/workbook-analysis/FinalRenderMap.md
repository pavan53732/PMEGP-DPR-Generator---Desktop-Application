# FinalRenderMap.md

## DPRPACKAGE.xls — Output Rendering Map

### How Workbook Sheets Render to Final Output

#### 1. Application_form → PMEGP Application Form PDF

| Rendering Aspect | Details |
|-----------------|---------|
| **Paper size** | A4 (print area: A1:J77) |
| **Page orientation** | Portrait (implied by layout) |
| **Margins** | Normal Excel defaults |
| **Page breaks** | 2 horizontal page breaks |
| **Sections** | Header → Agency → Personal → Project → Cost Summary → Signature |
| **Font** | Office default (Calibri/Arial based on Office version) |
| **Dynamic cells** | Row 59 formulas pull from DataSheet |
| **Static cells** | All labels are fixed text |

#### 2. DPR_print → Detailed Project Report PDF

| Rendering Aspect | Details |
|-----------------|---------|
| **Paper size** | A4 (print area: A1:J405) |
| **Page orientation** | Portrait |
| **Content rows** | 405+ rows of project data |
| **Cost tables** | Rows 86-115: Itemized building, machinery, other costs |
| **Financial summary** | Rows 116-131: Total cost, subsidy, contribution |
| **Narrative** | Free-form text sections (promoter, introduction, etc.) |
| **Formula complexity** | 741 formulas — both direct references and in-sheet calculations |
| **Subsidy cap logic** | Row 131: Multi-level IF for PMEGP cost limits |

#### 3. Project_Report → Comprehensive PDF Report

| Rendering Aspect | Details |
|-----------------|---------|
| **Paper size** | A4 (print area: A1:K416) |
| **Content** | 416 rows of comprehensive report data |
| **Merged cells** | 754 — extensive layout merging for narrative formatting |
| **Sections** | Header → Applicant → Location → Cost Breakdown → Financial Analysis → Narrative |
| **Hidden rows** | 9 footer rows for calculations |

#### 4. DPR_FRONT → Cover Page

| Rendering Aspect | Details |
|-----------------|---------|
| **Paper size** | A4 (print area: A1:AJ39) |
| **Content** | 39 rows of cover page data |
| **Key data** | Applicant name, project name, total cost, subsidy, dates |
| **Simplest sheet** | 7 formulas, 12 merged regions |

### Print Output Data Flow

```
User fills DataSheet
       ↓
DataSheet calculates intermediate values (formulas)
       ↓
Application_form    DPR_print    Project_Report    DPR_FRONT
(pulls from        (pulls from   (pulls from       (pulls from
 DataSheet)         DataSheet)    DataSheet)        DPR_print/
                                                     Project_Report)
       ↓                ↓              ↓                  ↓
Application Form    DPR Print      Project Report      Cover Page
    (PDF)             (PDF)           (PDF)              (PDF)
```

### Layout Preservation Requirements

1. **Merged cells** must be preserved in PDF output for correct visual alignment
2. **H:I column merges** indicate amounts — render as single right-aligned number
3. **Section headers** that merge across multiple columns should be rendered in bold
4. **Checkbox markers** (√) in C7, E7, G7, J7 etc. should render as proper checkboxes or selected radio buttons
5. **Percentage formatting** (G85=5%, G86=95%, G87=35%) must display % symbol
6. **Currency formatting** for H column amounts should show ₹ with thousands separator
7. **Print areas** define the PDF page boundaries for each output
8. **Row 94 in DPR_print** must be repaired before rendering (contains #REF!)
