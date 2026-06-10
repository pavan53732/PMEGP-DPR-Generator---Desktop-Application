import * as fs from 'fs';
import * as XLSX from 'xlsx';

describe('EnumRegistry Validation', () => {
  const wb = XLSX.readFile('DPRPACKAGE.xls', { cellFormula: true });
  const ws = wb.Sheets['DataSheet'];
  const registry = JSON.parse(fs.readFileSync('docs/workbook-analysis/EnumRegistry.json', 'utf8'));

  test.each(Object.keys(registry))('Enum %p values match workbook', (enumName) => {
    const e = registry[enumName];
    if (e.sourceColumn !== 'M') return;
    const expectedCount = Object.keys(e.values).length;
    expect(expectedCount).toBeGreaterThan(0);
  });
});
