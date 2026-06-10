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
      
      const validation = this.validateStructure(wb, ws);
      if (validation.status === WorkbookCompatStatus.BLOCKED) {
        return {
          status: validation.status,
          message: validation.message,
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
        status: validation.status,
        message: validation.status === WorkbookCompatStatus.WARN ? 'Imported with warnings (Minor structural diffs detected)' : 'Import successful',
        dataPayload: payload,
        fingerprint: validation.fingerprint,
      };

    } catch (err: any) {
      return {
        status: WorkbookCompatStatus.BLOCKED,
        message: `Error importing workbook: ${err.message}`,
      };
    }
  }

  private static validateStructure(wb: XLSX.WorkBook, ws: XLSX.WorkSheet): { status: WorkbookCompatStatus, message: string, fingerprint?: string } {
    // 1. Verify sheet names and count
    const requiredSheets = ['DataSheet', 'DPR_print', 'Project_Report', 'Application_form'];
    for (const sheetName of requiredSheets) {
      if (!wb.SheetNames.includes(sheetName)) {
        return { status: WorkbookCompatStatus.BLOCKED, message: `Missing required sheet: ${sheetName}` };
      }
    }
    
    if (wb.SheetNames.length < 5) {
       return { status: WorkbookCompatStatus.BLOCKED, message: 'Invalid sheet count. Expected at least 5 sheets.' };
    }

    // 2. Verify Workbook Version & Fingerprint (Heuristic)
    const b8 = ws['B8']?.v;
    if (!String(b8).includes('Name of the Applicant')) {
      return { status: WorkbookCompatStatus.BLOCKED, message: 'Structural mismatch: Expected Applicant Name at B8.' };
    }

    // 3. Verify Required Ranges & Formula Signatures
    // E.g. Check if Total Project Cost formula exists in DataSheet!H53
    const h53 = ws['H53'];
    if (!h53 || !h53.f) {
      return { status: WorkbookCompatStatus.WARN, message: 'Warning: Missing standard formula signature for Project Cost. Import allowed but flagged.', fingerprint: 'UNKNOWN_HASH_WARNING' };
    }

    // Known structural fingerprint hash logic would be computed here
    const fingerprint = 'HASH_VALID_PMEGP_V1';

    return { status: WorkbookCompatStatus.SUPPORTED, message: 'Valid structure', fingerprint };
  }
}
