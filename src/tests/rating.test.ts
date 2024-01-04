import { describe, expect, test } from '@jest/globals';
import calculateRating, { calculatePercent, calculateBilateral } from '../rating';

describe('Calculate Percent', () => {
  test('', () => expect(calculatePercent([0.4, 0.3])).toEqual(0.58));
});

describe('Calculate Bilaterals', () => {
  test('Simple', () => {
    expect(calculateBilateral([30, 20])).toEqual({ factor: 4.4, percent: 48 });
  });
  test('Muliple', () => {
    expect(calculateBilateral([10, 10, 10])).toEqual({ factor: 2.7, percent: 30 });
  });
});

describe('Calculate Rating', () => {
  test('Rounding Up', () => expect(calculateRating([90, 50])).toStrictEqual({ rounded: 100, total: 95 }));
  test('Rounding Down', () => expect(calculateRating([90, 30])).toStrictEqual({ rounded: 90, total: 93 }));
});

export { };
