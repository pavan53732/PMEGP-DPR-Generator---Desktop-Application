import * as fs from 'fs';
import * as XLSX from 'xlsx';

describe('Critical Formula Verification', () => {
  const wb = XLSX.readFile('DPRPACKAGE.xls', { cellFormula: true });
  const ws = wb.Sheets['DataSheet'];

  test('G85 formula is correct', () => {
    const cell = ws['G85'];
    expect(cell.f).toBe('IF(AND(M55=1,M70=9),10%,5%)');
  });

  test('G86 formula is complement of G85', () => {
    const cell = ws['G86'];
    expect(cell.f).toBe('100%-G85');
  });

  test('Total building cost formula', () => {
    const cell = ws['H48'];
    expect(cell.f).toBe('SUM(H41:H47)');
  });

  test('Total machinery cost formula', () => {
    const cell = ws['H67'];
    expect(cell.f).toBe('SUM(H54:H66)');
  });

  test('Working capital formula', () => {
    const cell = ws['H76'];
    expect(cell.f).toBe('SUM(H70:I74)');
  });
});
