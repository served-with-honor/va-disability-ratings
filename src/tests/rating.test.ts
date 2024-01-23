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
  test('Under 0', () => expect(() => calculateRating([-20])).toThrow('Invalid ratings'));
  test('Over 100', () => expect(() => calculateRating([200])).toThrow('Invalid ratings'));
  test('Empty', () => expect(calculateRating([])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Zeros', () => expect(calculateRating([0, 0, 0])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Rounding Up', () => expect(calculateRating([90, 50])).toStrictEqual({ rounded: 100, total: 95 }));
  test('Rounding Down', () => expect(calculateRating([90, 30])).toStrictEqual({ rounded: 90, total: 93 }));
  test('123', () => expect(calculateRating([40, 30])).toEqual({ rounded: 60, total: 58 }));
});

export { };
