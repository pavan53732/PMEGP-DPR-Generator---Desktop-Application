import { v4 as uuidv4 } from 'uuid';

export interface DprMetadata {
  id: string;
  schemaVersion: string;
  workbookVersion: string;
  formulaVersion: string;
  projectionVersion: string;
  formulaRegistryHash: string;
  fieldRegistryHash: string;
  projectionProfileVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface Layer2Assumptions {
  capacityUtilization: number[];
  revenueGrowthRate: number;
  rawMaterialGrowthRate: number;
  salaryGrowthRate: number;
  powerOverheadsGrowthRate: number;
}

export interface DprProject {
  metadata: DprMetadata;
  layer1Data: Record<string, any>; // Strictly bound to FieldRegistry keys
  layer2Assumptions: Layer2Assumptions;
}

export class DprProjectFactory {
  public static createNew(): DprProject {
    const now = new Date().toISOString();
    return {
      metadata: {
        id: uuidv4(),
        schemaVersion: '1.0',
        workbookVersion: '1.0',
        formulaVersion: '1.0',
        projectionVersion: '1.0',
        formulaRegistryHash: 'unknown', // Set dynamically based on runtime hashes
        fieldRegistryHash: 'unknown',
        projectionProfileVersion: '2024-A',
        createdAt: now,
        updatedAt: now,
      },
      layer1Data: {},
      layer2Assumptions: {
        capacityUtilization: [60, 70, 80, 90, 100],
        revenueGrowthRate: 5,
        rawMaterialGrowthRate: 4,
        salaryGrowthRate: 5,
        powerOverheadsGrowthRate: 5,
      },
    };
  }

  public static serialize(project: DprProject): string {
    return JSON.stringify(project, null, 2);
  }

  public static deserialize(json: string): DprProject {
    const parsed = JSON.parse(json);
    // basic structural validation
    if (!parsed.metadata || !parsed.layer1Data) {
      throw new Error("Invalid DPR Project JSON structure");
    }
    return parsed as DprProject;
  }
}
