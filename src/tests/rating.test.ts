import { describe, expect, test } from '@jest/globals';
import calculateRating, { calculatePercent, calculateBilateral } from '../rating';

describe('Calculate Percent', () => {
  test('', () => expect(calculatePercent([0.4, 0.3])).toEqual(0.58));
});

describe('Calculate Bilaterals', () => {
  test('Empty', () => expect(() => calculateBilateral([])).toThrow('Insufficient ratings'));
  test('Only 1 item', () => expect(() => calculateBilateral([10])).toThrow('Insufficient ratings'));
  test('Zero', () => expect(calculateBilateral([0, 0])).toEqual({ factor: 0, percent: 0 }));
  test('Simple', () => expect(calculateBilateral([30, 20])).toEqual({ factor: 4.4, percent: 48 }));
  test('Muliple', () => expect(calculateBilateral([10, 10, 10])).toEqual({ factor: 2.7, percent: 30 }));
});

describe('Calculate Rating', () => {
  test('Under 0', () => expect(calculateRating([-20])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Over 100', () => expect(calculateRating([200])).toStrictEqual({ rounded: 100, total: 100 }));
  test('Empty', () => expect(calculateRating([])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Zeros', () => expect(calculateRating([0, 0, 0])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Rounding Up', () => expect(calculateRating([90, 50])).toStrictEqual({ rounded: 100, total: 95 }));
  test('Rounding Down', () => expect(calculateRating([90, 30])).toStrictEqual({ rounded: 90, total: 93 }));
  test('123', () => expect(calculateRating([40, 30])).toEqual({ rounded: 60, total: 58 }));
});

describe('Calculate Rating Ranges', () => {
  test('b-1', () => expect(calculateRating([10, 20])).toEqual({ rounded: 30, total: 28 }));
  test('b-2', () => expect(calculateRating([10, 20, 30])).toEqual({ rounded: 50, total: 50 }));
  test('b-3', () => expect(calculateRating([10, 20, 30, 40])).toEqual({ rounded: 70, total: 69 }));
  test('b-4', () => expect(calculateRating([10, 20, 30, 40])).toEqual({ rounded: 90, total: 85 }));
  test('b-5', () => expect(calculateRating([10, 20, 30, 40, 50, 60])).toEqual({ rounded: 100, total: 95 }));
  test('b-6', () => expect(calculateRating([10, 20, 30, 40, 50, 60, 70])).toEqual({ rounded: 100, total: 98 }));
  test('b-7', () => expect(calculateRating([10, 20, 30, 40, 50, 60, 70, 80])).toEqual({ rounded: 100, total: 99 }));
  test('b-8', () => expect(calculateRating([10, 20, 30, 40, 50, 60, 70, 80, 90])).toEqual({ rounded: 100, total: 99 }));

  test('10-1', () => expect(calculateRating([10])).toEqual({ rounded: 10, total: 10 }));
  test('10-2', () => expect(calculateRating([10, 10])).toEqual({ rounded: 20, total: 19 }));
  test('10-3', () => expect(calculateRating([10, 10, 10])).toEqual({ rounded: 30, total: 27 }));
  test('10-4', () => expect(calculateRating([10, 10, 10, 10])).toEqual({ rounded: 30, total: 34 }));
  test('10-5', () => expect(calculateRating([10, 10, 10, 10, 10])).toEqual({ rounded: 40, total: 41 }));
  test('10-6', () => expect(calculateRating([10, 10, 10, 10, 10, 10])).toEqual({ rounded: 50, total: 47 }));
  test('10-7', () => expect(calculateRating([10, 10, 10, 10, 10, 10, 10])).toEqual({ rounded: 50, total: 52 }));
  test('10-8', () => expect(calculateRating([10, 10, 10, 10, 10, 10, 10, 10])).toEqual({ rounded: 60, total: 57 }));
  test('10-9', () => expect(calculateRating([10, 10, 10, 10, 10, 10, 10, 10, 10])).toEqual({ rounded: 60, total: 61 }));
  test('10-10', () => expect(calculateRating([10, 10, 10, 10, 10, 10, 10, 10, 10, 10])).toEqual({ rounded: 70, total: 65 }));

  test('20-1', () => expect(calculateRating([20])).toEqual({ rounded: 20, total: 20 }));
  test('20-2', () => expect(calculateRating([20, 20])).toEqual({ rounded: 40, total: 36 }));
  test('20-3', () => expect(calculateRating([20, 20, 20])).toEqual({ rounded: 50, total: 49 }));
  test('20-4', () => expect(calculateRating([20, 20, 20, 20])).toEqual({ rounded: 60, total: 59 }));
  test('20-5', () => expect(calculateRating([20, 20, 20, 20, 20])).toEqual({ rounded: 70, total: 67 }));
  test('20-6', () => expect(calculateRating([20, 20, 20, 20, 20, 20])).toEqual({ rounded: 70, total: 74 }));
  test('20-7', () => expect(calculateRating([20, 20, 20, 20, 20, 20, 20])).toEqual({ rounded: 80, total: 79 }));
  test('20-8', () => expect(calculateRating([20, 20, 20, 20, 20, 20, 20, 20])).toEqual({ rounded: 80, total: 83 }));
  test('20-9', () => expect(calculateRating([20, 20, 20, 20, 20, 20, 20, 20, 20])).toEqual({ rounded: 90, total: 86 }));
  test('20-10', () => expect(calculateRating([20, 20, 20, 20, 20, 20, 20, 20, 20, 20])).toEqual({ rounded: 90, total: 89 }));

  test('30-1', () => expect(calculateRating([30])).toEqual({ rounded: 30, total: 30 }));
  test('30-2', () => expect(calculateRating([30, 30])).toEqual({ rounded: 50, total: 51 }));
  test('30-3', () => expect(calculateRating([30, 30, 30])).toEqual({ rounded: 70, total: 66 }));
  test('30-4', () => expect(calculateRating([30, 30, 30, 30])).toEqual({ rounded: 80, total: 76 }));
  test('30-5', () => expect(calculateRating([30, 30, 30, 30, 30])).toEqual({ rounded: 80, total: 83 }));
  test('30-6', () => expect(calculateRating([30, 30, 30, 30, 30, 30])).toEqual({ rounded: 90, total: 88 }));
  test('30-7', () => expect(calculateRating([30, 30, 30, 30, 30, 30, 30])).toEqual({ rounded: 90, total: 92 }));
  test('30-8', () => expect(calculateRating([30, 30, 30, 30, 30, 30, 30, 30])).toEqual({ rounded: 90, total: 94 }));
  test('30-9', () => expect(calculateRating([30, 30, 30, 30, 30, 30, 30, 30, 30])).toEqual({ rounded: 100, total: 96 }));
  test('30-10', () => expect(calculateRating([30, 30, 30, 30, 30, 30, 30, 30, 30, 30])).toEqual({ rounded: 100, total: 97 }));

  test('40-1', () => expect(calculateRating([40])).toEqual({ rounded: 40, total: 40 }));
  test('40-2', () => expect(calculateRating([40, 40])).toEqual({ rounded: 60, total: 64 }));
  test('40-3', () => expect(calculateRating([40, 40, 40])).toEqual({ rounded: 80, total: 78 }));
  test('40-4', () => expect(calculateRating([40, 40, 40, 40])).toEqual({ rounded: 90, total: 87 }));
  test('40-5', () => expect(calculateRating([40, 40, 40, 40, 40])).toEqual({ rounded: 90, total: 92 }));
  test('40-6', () => expect(calculateRating([40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 95 }));
  test('40-7', () => expect(calculateRating([40, 40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 97 }));
  test('40-8', () => expect(calculateRating([40, 40, 40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 98 }));
  test('40-9', () => expect(calculateRating([40, 40, 40, 40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 99 }));
  test('40-10', () => expect(calculateRating([40, 40, 40, 40, 40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 99 }));
});

export { };
