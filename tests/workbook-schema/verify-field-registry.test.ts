import * as fs from 'fs';
import * as XLSX from 'xlsx';

describe('FieldRegistry_FULL Coverage', () => {
  const wb = XLSX.readFile('DPRPACKAGE.xls', { cellFormula: true });
  const ws = wb.Sheets['DataSheet'];
  const registry = JSON.parse(fs.readFileSync('docs/workbook-analysis/FieldRegistry_FULL.json', 'utf8'));

  test('Every non-empty visible DataSheet cell is registered', () => {
    const ref = ws['!ref'];
    const range = XLSX.utils.decode_range(ref);
    const registeredCells = new Set(Object.values(registry).map((f: any) => f.cell));
    const unmapped: string[] = [];

    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= 10; c++) {
        const addr = XLSX.utils.encode_cell({ r, c });
        const cell = ws[addr];
        if (cell && (cell.v || cell.f) && !registeredCells.has(addr)) {
          unmapped.push(addr);
        }
      }
    }
    expect(unmapped.length).toBe(0);
  });
});
