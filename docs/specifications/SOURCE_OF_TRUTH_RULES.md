# Source of Truth Rules

To guarantee long-term stability and perfect parity with the official government PMEGP macro workbooks, the application must strictly adhere to the following Hierarchy of Truth.

## The Hierarchy of Truth

```text
Level 1: The Workbook (DPRPACKAGE.xls)
  ↓
Level 2: The Field Registry (FieldRegistry_FULL.json)
  ↓
Level 3: The Canonical Schema (SchemaService / Types)
  ↓
Level 4: The Domain Model (Data Stores / SQLite)
  ↓
Level 5: The User Interface (React / Wizard)
```

## Core Tenets

1. **The Workbook is King (Level 1)**
   Any discrepancy between the application's output and the official workbook's output is an application bug. The workbook's math and logic (including quirks and edge cases) must be perfectly replicated in Layer 1.

2. **Schema-Driven Development (Level 3 > Level 5)**
   The UI may **never** manually define, introduce, or map a data field that does not exist in the Canonical Schema. If a field is needed in the UI, it must first be added to the Schema.

3. **No Phantom State**
   All financial inputs must reside in the centralized Domain Model. Components may not hold isolated state that affects financial calculations without pushing it back up to the Domain Model.

4. **Immutable Versions**
   When `DPRPACKAGE_v2.xls` is released, a new Schema Version must be derived. The old schema must be preserved to support loading legacy `.dpr` files.

5. **Layer Strictness**
   - **Layer 1 (Parity Engine):** Must only use the logic found in the original workbook.
   - **Layer 2 (Pro Engine):** May introduce new accounting logic (DSCR, ROI), but must explicitly tag these outputs as "Pro" and must never overwrite Layer 1 base costs.
