import * as XLSX from 'xlsx';
import { SchemaService } from '../schema/SchemaService';

export enum WorkbookCompatStatus {
  SUPPORTED = 'SUPPORTED',
  WARN = 'WARN',
  BLOCKED = 'BLOCKED',
}

export interface WorkbookImportResult {
  status: WorkbookCompatStatus;
  message: string;
  dataPayload?: Record<string, any>;
  fingerprint?: string;
}

export class WorkbookReader {
  /**
   * Reads a DPRPACKAGE.xls file from a given path (Node.js/Electron context)
   * or ArrayBuffer (Browser context) and extracts the canonical data payload.
   */
  public static async importWorkbook(fileData: any): Promise<WorkbookImportResult> {
    try {
      // Read the workbook depending on input type (path or buffer)
      let wb: XLSX.WorkBook;
      if (typeof fileData === 'string') {
        wb = XLSX.readFile(fileData, { cellFormula: true });
      } else {
        wb = XLSX.read(fileData, { type: 'buffer', cellFormula: true });
      }

      if (!wb.Sheets['DataSheet']) {
        return {
          status: WorkbookCompatStatus.BLOCKED,
          message: 'Invalid Workbook: DataSheet not found. This is not a PMEGP DPR template.',
        };
      }

      const ws = wb.Sheets['DataSheet'];
      
      // Determine compatibility status (mock fingerprint check for now)
      // In a real scenario, hash the formula structures.
      const status = this.determineCompatibility(ws);
      if (status === WorkbookCompatStatus.BLOCKED) {
        return {
          status,
          message: 'Unsupported Workbook Version: The structural fingerprint of this workbook is entirely unknown.',
        };
      }

      // Extract payload based strictly on the Field Registry
      const fields = SchemaService.getAllFields();
      const payload: Record<string, any> = {};

      for (const [key, definition] of Object.entries(fields)) {
        // Skip calculated fields during import, or extract them for parity validation later
        if (definition.isCalculated) continue;

        const cell = ws[definition.cell];
        if (cell && cell.v !== undefined && cell.v !== null) {
          payload[key] = cell.v;
        }
      }

      return {
        status,
        message: status === WorkbookCompatStatus.WARN ? 'Imported with warnings (Minor diffs detected)' : 'Import successful',
        dataPayload: payload,
      };

    } catch (err: any) {
      return {
        status: WorkbookCompatStatus.BLOCKED,
        message: `Error importing workbook: ${err.message}`,
      };
    }
  }

  private static determineCompatibility(ws: XLSX.WorkSheet): WorkbookCompatStatus {
    // Phase 1: Only official DPRPACKAGE.xls templates are supported.
    // In the future, this will cross-reference `workbook_fingerprints` DB table.
    
    // Simple heuristic: check if expected labels exist
    const b8 = ws['B8']?.v;
    if (String(b8).includes('Name of the Applicant')) {
      return WorkbookCompatStatus.SUPPORTED;
    }
    
    return WorkbookCompatStatus.BLOCKED;
  }
}
