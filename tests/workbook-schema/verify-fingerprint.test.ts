import * as crypto from 'crypto';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

describe('Workbook Fingerprint Verification', () => {
  const wb = XLSX.readFile('DPRPACKAGE.xls', { cellFormula: true });
  const fingerprint = JSON.parse(fs.readFileSync('docs/workbook-analysis/WorkbookFingerprint.json', 'utf8'));

  function hashJson(obj: any): string {
    return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex').substring(0, 16);
  }

  test.each(fingerprint.sheets ? Object.keys(fingerprint.sheets) : [])('Sheet %p formula hash matches', (sheetName) => {
    const ws = wb.Sheets[sheetName];
    if (!ws) return;
    const formulas: string[] = [];
    Object.keys(ws).filter(k => k[0] !== '!').forEach(key => {
      const cell = ws[key];
      if (cell.f) formulas.push(key + '=' + cell.f);
    });
    formulas.sort();
    const computedHash = hashJson(formulas);
    expect(computedHash).toBe(fingerprint.sheets[sheetName].formulaHash);
  });
});
