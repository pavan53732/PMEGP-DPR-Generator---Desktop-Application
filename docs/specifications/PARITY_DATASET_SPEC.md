# Parity Dataset Specification

To test the `CalculationValidator` and Layer 1 Parity Engine, the system requires a definitive dataset of outputs matching the legacy Excel workbook. 

This document tracks the canonical scenarios.

## Dataset Structure

Each scenario represents a distinct permutation of project inputs, accompanied by the golden values expected from the workbook output.

### Required Fields for Golden Record
- `scenarioId` (e.g., `SCN_001`)
- `description`
- `inputs`: Full map of required inputs (`FieldRegistry_FULL.json` mapping).
- `expectedOutputs`: 
  - `subsidyAmount`
  - `marginMoneyAmount`
  - `termLoanAmount`
  - `workingCapitalLimit`

---

## Canonical Scenarios (To Be Defined)

### SCN_001: Standard Manufacturing, Rural, General Category
- **Inputs:** Activity: Mfg, Area: Rural, Category: General, Project Cost: 25,00,000
- **Expected Margin:** 10%
- **Expected Subsidy:** 25%

### SCN_002: Standard Manufacturing, Urban, Special Category
- **Inputs:** Activity: Mfg, Area: Urban, Category: Special, Project Cost: 25,00,000
- **Expected Margin:** 5%
- **Expected Subsidy:** 25%

### SCN_003: Standard Service, Rural, Special Category
- **Inputs:** Activity: Service, Area: Rural, Category: Special, Project Cost: 10,00,000
- **Expected Margin:** 5%
- **Expected Subsidy:** 35%

*(Further scenarios SCN_004 to SCN_100 will be added post-Phase 2, exploring permutations of high project costs requiring maximum cap triggers, different working capital cycles, and rounding quirks).*
