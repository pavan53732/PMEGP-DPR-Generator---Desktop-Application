# DPR File Format Specification

The application uses the `.dpr` file format for portable saving, sharing, and importing of projects. The file is a strictly typed JSON document.

## JSON Structure

```json
{
  "formatVersion": "1.0",
  "metadata": {
    "createdAt": "2026-06-10T00:00:00Z",
    "updatedAt": "2026-06-10T00:00:00Z",
    "createdBy": "PMEGP DPR Pro v1.0.0",
    "workbookVersion": "DPRPACKAGE.xls (v2023)",
    "schemaVersion": "1.0.0",
    "formulaVersion": "1.0.0",
    "projectionVersion": "1.0.0",
    "projectionProfileVersion": "1.0.0",
    "fieldRegistryHash": "abc123def456",
    "formulaRegistryHash": "xyz987uvw654"
  },
  "project": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "applicantDetails": { ... },
    "businessDetails": { ... },
    "locationDetails": { ... }
  },
  "finance": {
    "costOfProject": { ... },
    "meansOfFinance": { ... },
    "workingCapital": { ... },
    "termLoan": { ... }
  },
  "layer2Assumptions": {
    "capacityUtilization": [60, 70, 80, 90, 100],
    "revenueGrowthRate": 5,
    "salaryGrowthRate": 5
  },
  "audit": {
    "events": [
      {
        "timestamp": "2026-06-10T00:00:00Z",
        "action": "PROJECT_CREATED",
        "user": "System"
      }
    ]
  }
}
```

## Guarantees
- The `.dpr` file contains everything needed to perfectly recreate a DPR session without requiring the original database.
- It is self-validating using JSON Schema matching `schemaVersion`.
