import FieldRegistry from '../../assets/schema/FieldRegistry_FULL.json';
import EnumRegistry from '../../assets/schema/EnumRegistry.json';

export interface FieldDefinition {
  sheet: string;
  cell: string;
  row: number;
  col: number;
  group: string;
  value: string | number | null;
  formula: string | null;
  isInput: boolean;
  isCalculated: boolean;
  dataType: string;
  uiStep: number | null;
  logicalParent: string | null;
  isEnum: boolean;
  enumName: string | null;
}

export interface EnumDefinition {
  description: string;
  sourceColumn: string;
  labelColumn: string;
  uiComponent: string;
  values: Record<string, string>;
  pmegpRule: string;
}

export class SchemaService {
  private static fields: Record<string, FieldDefinition> = FieldRegistry as unknown as Record<string, FieldDefinition>;
  private static enums: Record<string, EnumDefinition> = EnumRegistry as unknown as Record<string, EnumDefinition>;

  /**
   * Get the full field registry map
   */
  public static getAllFields(): Record<string, FieldDefinition> {
    return this.fields;
  }

  /**
   * Get a specific field definition by its key
   */
  public static getField(fieldKey: string): FieldDefinition | undefined {
    return this.fields[fieldKey];
  }

  /**
   * Get all unique sections available in the schema
   */
  public static getSections(): string[] {
    const sections = new Set<string>();
    Object.values(this.fields).forEach((field) => {
      if (field.group) sections.add(field.group);
    });
    return Array.from(sections);
  }

  /**
   * Get all fields belonging to a specific section (group)
   */
  public static getFieldsBySection(groupName: string): Record<string, FieldDefinition> {
    const sectionFields: Record<string, FieldDefinition> = {};
    for (const [key, field] of Object.entries(this.fields)) {
      if (field.group === groupName) {
        sectionFields[key] = field;
      }
    }
    return sectionFields;
  }

  /**
   * Get enum definition by name
   */
  public static getEnumDefinition(enumName: string): EnumDefinition | undefined {
    return this.enums[enumName];
  }
}
