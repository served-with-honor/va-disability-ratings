import { describe, expect, test } from '@jest/globals';
import calculateRating, { calculateCombinedRating, calculateBilateral } from '../rating';

describe('Calculate Specific Percent', () => {
  test('1', () => expect(calculateCombinedRating([40, 30])).toEqual(58));
  test('2', () => expect(calculateCombinedRating([30, 20, 10])).toEqual(50));
  test('3', () => expect(calculateCombinedRating([40, 30])).toEqual(58));
  test('4', () => expect(calculateCombinedRating([50, 30, 10, 10, 10])).toEqual(75));
});

describe('Calculate Percent Exceptions', () => {
  test('Under Zero', () => expect(calculateCombinedRating([-1])).toEqual(0));
  test('With Under Zero', () => expect(calculateCombinedRating([20, -1])).toEqual(20));
  test('Zero', () => expect(calculateCombinedRating([0])).toEqual(0));
  test('100', () => expect(calculateCombinedRating([1])).toEqual(1));
  test('Over 100', () => expect(calculateCombinedRating([1.2])).toEqual(1));
});

describe('Calculate Bilaterals', () => {
  test('Empty', () => expect(() => calculateBilateral([])).toThrow('Insufficient ratings'));
  test('Only 1 item', () => expect(() => calculateBilateral([10])).toThrow('Insufficient ratings'));
  test('Zero', () => expect(calculateBilateral([0, 0])).toEqual({ factor: 0, percent: 0 }));
  test('Simple', () => expect(calculateBilateral([30, 20])).toEqual({ factor: 4.4, percent: 48 }));
  test('Muliple', () => expect(calculateBilateral([10, 10, 10])).toEqual({ factor: 2.7, percent: 30 }));
  test('Order Agnostic', () => expect(calculateBilateral([30, 10, 70])).toStrictEqual(calculateBilateral([10, 70, 30])));
});

describe('Calculate Rating Exceptions', () => {
  test('Equal Zero', () => expect(calculateRating([0])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Under Zero', () => expect(calculateRating([-20])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Multiple Zeros', () => expect(calculateRating([0, 0, 0])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Equal 100', () => expect(calculateRating([100])).toStrictEqual({ rounded: 100, total: 100 }));
  test('Over 100', () => expect(calculateRating([200])).toStrictEqual({ rounded: 100, total: 100 }));
  test('Empty', () => expect(calculateRating([])).toStrictEqual({ rounded: 0, total: 0 }));
  test('Rounding Up', () => expect(calculateRating([90, 50])).toStrictEqual({ rounded: 100, total: 95 }));
  test('Rounding Down', () => expect(calculateRating([90, 30])).toStrictEqual({ rounded: 90, total: 93 }));
  test('Order Agnostic', () => expect(calculateRating([30, 10, 70])).toStrictEqual(calculateRating([10, 70, 30])));
});

describe('Calculate Specific Ratings', () => {
  test('1', () => expect(calculateRating([40, 30])).toEqual({ rounded: 60, total: 58 }));
  test('2', () => expect(calculateRating([10, 30, 70])).toEqual({ rounded: 80, total: 81 }));
  test('3', () => expect(calculateRating([10, 10, 10, 30, 50])).toEqual({ rounded: 80, total: 75 }));
  test('4', () => expect(calculateRating([70, 50, 30, 20, 10])).toEqual({ rounded: 90, total: 93 }));
  test('5', () => expect(calculateRating([40, 40, 30, 20, 20])).toEqual({ rounded: 80, total: 84 }));
  test('6', () => expect(calculateRating([60, 30, 20, 20])).toEqual({ rounded: 80, total: 82 }));
  test('7', () => expect(calculateRating([30, 30, 20, 10, 10])).toEqual({ rounded: 70, total: 69 }));
  test('8', () => expect(calculateRating([20, 10, 10])).toEqual({ rounded: 40, total: 35 }));
  test('9', () => expect(calculateRating([40, 40, 20])).toEqual({ rounded: 70, total: 71 }));
  test('10', () => expect(calculateRating([30, 10, 10])).toEqual({ rounded: 40, total: 43 }));
});

describe('Calculate Rating - Single Value', () => {
  test('10', () => expect(calculateRating([10])).toEqual({ rounded: 10, total: 10 }));
  test('20', () => expect(calculateRating([20])).toEqual({ rounded: 20, total: 20 }));
  test('30', () => expect(calculateRating([30])).toEqual({ rounded: 30, total: 30 }));
  test('40', () => expect(calculateRating([40])).toEqual({ rounded: 40, total: 40 }));
  test('50', () => expect(calculateRating([50])).toEqual({ rounded: 50, total: 50 }));
  test('60', () => expect(calculateRating([60])).toEqual({ rounded: 60, total: 60 }));
  test('70', () => expect(calculateRating([70])).toEqual({ rounded: 70, total: 70 }));
  test('80', () => expect(calculateRating([80])).toEqual({ rounded: 80, total: 80 }));
  test('90', () => expect(calculateRating([90])).toEqual({ rounded: 90, total: 90 }));
});

describe('Calculate Rating - Two Values', () => {
  test('10, 10', () => expect(calculateRating([10, 10])).toEqual({ rounded: 20, total: 19 }));
  test('10, 20', () => expect(calculateRating([10, 20])).toEqual({ rounded: 30, total: 28 }));
  test('10, 30', () => expect(calculateRating([10, 30])).toEqual({ rounded: 40, total: 37 }));
  test('10, 40', () => expect(calculateRating([10, 40])).toEqual({ rounded: 50, total: 46 }));
  test('10, 50', () => expect(calculateRating([10, 50])).toEqual({ rounded: 60, total: 55 }));
  test('10, 60', () => expect(calculateRating([10, 60])).toEqual({ rounded: 60, total: 64 }));
  test('10, 70', () => expect(calculateRating([10, 70])).toEqual({ rounded: 70, total: 73 }));
  test('10, 80', () => expect(calculateRating([10, 80])).toEqual({ rounded: 80, total: 82 }));
  test('10, 90', () => expect(calculateRating([10, 90])).toEqual({ rounded: 90, total: 91 }));
  test('20, 20', () => expect(calculateRating([20, 20])).toEqual({ rounded: 40, total: 36 }));
  test('20, 30', () => expect(calculateRating([20, 30])).toEqual({ rounded: 40, total: 44 }));
  test('20, 40', () => expect(calculateRating([20, 40])).toEqual({ rounded: 50, total: 52 }));
  test('20, 50', () => expect(calculateRating([20, 50])).toEqual({ rounded: 60, total: 60 }));
  test('20, 60', () => expect(calculateRating([20, 60])).toEqual({ rounded: 70, total: 68 }));
  test('20, 70', () => expect(calculateRating([20, 70])).toEqual({ rounded: 80, total: 76 }));
  test('20, 80', () => expect(calculateRating([20, 80])).toEqual({ rounded: 80, total: 84 }));
  test('20, 90', () => expect(calculateRating([20, 90])).toEqual({ rounded: 90, total: 92 }));
  test('30, 30', () => expect(calculateRating([30, 30])).toEqual({ rounded: 50, total: 51 }));
  test('30, 40', () => expect(calculateRating([30, 40])).toEqual({ rounded: 60, total: 58 }));
  test('30, 50', () => expect(calculateRating([30, 50])).toEqual({ rounded: 70, total: 65 }));
  test('30, 60', () => expect(calculateRating([30, 60])).toEqual({ rounded: 70, total: 72 }));
  test('30, 70', () => expect(calculateRating([30, 70])).toEqual({ rounded: 80, total: 79 }));
  test('30, 80', () => expect(calculateRating([30, 80])).toEqual({ rounded: 90, total: 86 }));
  test('30, 90', () => expect(calculateRating([30, 90])).toEqual({ rounded: 90, total: 93 }));
  test('40, 40', () => expect(calculateRating([40, 40])).toEqual({ rounded: 60, total: 64 }));
  test('40, 50', () => expect(calculateRating([40, 50])).toEqual({ rounded: 70, total: 70 }));
  test('40, 60', () => expect(calculateRating([40, 60])).toEqual({ rounded: 80, total: 76 }));
  test('40, 70', () => expect(calculateRating([40, 70])).toEqual({ rounded: 80, total: 82 }));
  test('40, 80', () => expect(calculateRating([40, 80])).toEqual({ rounded: 90, total: 88 }));
  test('40, 90', () => expect(calculateRating([40, 90])).toEqual({ rounded: 90, total: 94 }));
  test('50, 50', () => expect(calculateRating([50, 50])).toEqual({ rounded: 80, total: 75 }));
  test('50, 60', () => expect(calculateRating([50, 60])).toEqual({ rounded: 80, total: 80 }));
  test('50, 70', () => expect(calculateRating([50, 70])).toEqual({ rounded: 90, total: 85 }));
  test('50, 80', () => expect(calculateRating([50, 80])).toEqual({ rounded: 90, total: 90 }));
  test('50, 90', () => expect(calculateRating([50, 90])).toEqual({ rounded: 100, total: 95 }));
  test('60, 70', () => expect(calculateRating([60, 70])).toEqual({ rounded: 90, total: 88 }));
  test('60, 60', () => expect(calculateRating([60, 60])).toEqual({ rounded: 80, total: 84 }));
  test('60, 80', () => expect(calculateRating([60, 80])).toEqual({ rounded: 90, total: 92 }));
  test('60, 90', () => expect(calculateRating([60, 90])).toEqual({ rounded: 100, total: 96 }));
  test('70, 70', () => expect(calculateRating([70, 70])).toEqual({ rounded: 90, total: 91 }));
  test('70, 80', () => expect(calculateRating([70, 80])).toEqual({ rounded: 90, total: 94 }));
  test('70, 90', () => expect(calculateRating([70, 90])).toEqual({ rounded: 100, total: 97 }));
  test('80, 80', () => expect(calculateRating([80, 80])).toEqual({ rounded: 100, total: 96 }));
  test('80, 90', () => expect(calculateRating([80, 90])).toEqual({ rounded: 100, total: 98 }));
  test('90, 90', () => expect(calculateRating([90, 90])).toEqual({ rounded: 100, total: 99 }));
});

describe('Calculate Rating - Sequntial Ranges', () => {
  // Skipping any single or double values as they are covered in the previous tests
  test('10 - 30', () => expect(calculateRating([10, 20, 30])).toEqual({ rounded: 50, total: 50 }));
  test('10 - 40', () => expect(calculateRating([10, 20, 30, 40])).toEqual({ rounded: 70, total: 69 }));
  test('10 - 50', () => expect(calculateRating([10, 20, 30, 40, 50])).toEqual({ rounded: 90, total: 85 }));
  test('10 - 60', () => expect(calculateRating([10, 20, 30, 40, 50, 60])).toEqual({ rounded: 100, total: 95 }));
  test('10 - 70', () => expect(calculateRating([10, 20, 30, 40, 50, 60, 70])).toEqual({ rounded: 100, total: 98 }));
  test('10 - 80', () => expect(calculateRating([10, 20, 30, 40, 50, 60, 70, 80])).toEqual({ rounded: 100, total: 99 }));
  test('10 - 90', () => expect(calculateRating([10, 20, 30, 40, 50, 60, 70, 80, 90])).toEqual({ rounded: 100, total: 100 }));

  test('20 - 40', () => expect(calculateRating([20, 30, 40])).toEqual({ rounded: 70, total: 66 }));
  test('20 - 50', () => expect(calculateRating([20, 30, 40, 50])).toEqual({ rounded: 80, total: 83 }));
  test('20 - 60', () => expect(calculateRating([20, 30, 40, 50, 60])).toEqual({ rounded: 90, total: 94 }));
  test('20 - 70', () => expect(calculateRating([20, 30, 40, 50, 60, 70])).toEqual({ rounded: 100, total: 98 }));
  test('20 - 80', () => expect(calculateRating([20, 30, 40, 50, 60, 70, 80])).toEqual({ rounded: 100, total: 99 }));
  test('20 - 90', () => expect(calculateRating([20, 30, 40, 50, 60, 70, 80, 90])).toEqual({ rounded: 100, total: 100 }));

  test('30 - 50', () => expect(calculateRating([30, 40, 50])).toEqual({ rounded: 80, total: 79 }));
  test('30 - 60', () => expect(calculateRating([30, 40, 50, 60])).toEqual({ rounded: 90, total: 92 }));
  test('30 - 70', () => expect(calculateRating([30, 40, 50, 60, 70])).toEqual({ rounded: 100, total: 97 }));
  test('30 - 80', () => expect(calculateRating([30, 40, 50, 60, 70, 80])).toEqual({ rounded: 100, total: 99 }));
  test('30 - 90', () => expect(calculateRating([30, 40, 50, 60, 70, 80, 90])).toEqual({ rounded: 100, total: 100 }));

  test('40 - 60', () => expect(calculateRating([40, 50, 60])).toEqual({ rounded: 90, total: 88 }));
  test('40 - 70', () => expect(calculateRating([40, 50, 60, 70])).toEqual({ rounded: 100, total: 96 }));
  test('40 - 80', () => expect(calculateRating([40, 50, 60, 70, 80])).toEqual({ rounded: 100, total: 99 }));
  test('40 - 90', () => expect(calculateRating([40, 50, 60, 70, 80, 90])).toEqual({ rounded: 100, total: 100 }));

  test('50 - 70', () => expect(calculateRating([50, 60, 70])).toEqual({ rounded: 90, total: 94 }));
  test('50 - 80', () => expect(calculateRating([50, 60, 70, 80])).toEqual({ rounded: 100, total: 99 }));
  test('50 - 90', () => expect(calculateRating([50, 60, 70, 80, 90])).toEqual({ rounded: 100, total: 100 }));

  test('60 -80', () => expect(calculateRating([60, 70, 80])).toEqual({ rounded: 100, total: 98 }));
  test('60 -90', () => expect(calculateRating([60, 70, 80, 90])).toEqual({ rounded: 100, total: 100 }));

  test('70 - 90', () => expect(calculateRating([70, 80, 90])).toEqual({ rounded: 100, total: 99 }));
});

describe('Calculate Rating - Same Values', () => {
  // Skipping any single or double values as they are covered in the previous tests

  // Some tests do not have as many instances of a number because the total rating
  // is already 100 by a certain point

  test('10 - 3x', () => expect(calculateRating([10, 10, 10])).toEqual({ rounded: 30, total: 27 }));
  test('10 - 4x', () => expect(calculateRating([10, 10, 10, 10])).toEqual({ rounded: 30, total: 34 }));
  test('10 - 5x', () => expect(calculateRating([10, 10, 10, 10, 10])).toEqual({ rounded: 40, total: 41 }));
  test('10 - 6x', () => expect(calculateRating([10, 10, 10, 10, 10, 10])).toEqual({ rounded: 50, total: 47 }));
  test('10 - 7x', () => expect(calculateRating([10, 10, 10, 10, 10, 10, 10])).toEqual({ rounded: 50, total: 52 }));
  test('10 - 8x', () => expect(calculateRating([10, 10, 10, 10, 10, 10, 10, 10])).toEqual({ rounded: 60, total: 57 }));
  test('10 - 9x', () => expect(calculateRating([10, 10, 10, 10, 10, 10, 10, 10, 10])).toEqual({ rounded: 60, total: 61 }));
  test('10 - 10x', () => expect(calculateRating([10, 10, 10, 10, 10, 10, 10, 10, 10, 10])).toEqual({ rounded: 70, total: 65 }));

  test('20 - 3x', () => expect(calculateRating([20, 20, 20])).toEqual({ rounded: 50, total: 49 }));
  test('20 - 4x', () => expect(calculateRating([20, 20, 20, 20])).toEqual({ rounded: 60, total: 59 }));
  test('20 - 5x', () => expect(calculateRating([20, 20, 20, 20, 20])).toEqual({ rounded: 70, total: 67 }));
  test('20 - 6x', () => expect(calculateRating([20, 20, 20, 20, 20, 20])).toEqual({ rounded: 70, total: 74 }));
  test('20 - 7x', () => expect(calculateRating([20, 20, 20, 20, 20, 20, 20])).toEqual({ rounded: 80, total: 79 }));
  test('20 - 8x', () => expect(calculateRating([20, 20, 20, 20, 20, 20, 20, 20])).toEqual({ rounded: 80, total: 83 }));
  test('20 - 9x', () => expect(calculateRating([20, 20, 20, 20, 20, 20, 20, 20, 20])).toEqual({ rounded: 90, total: 86 }));
  test('20 - 10x', () => expect(calculateRating([20, 20, 20, 20, 20, 20, 20, 20, 20, 20])).toEqual({ rounded: 90, total: 89 }));

  test('30 - 3x', () => expect(calculateRating([30, 30, 30])).toEqual({ rounded: 70, total: 66 }));
  test('30 - 4x', () => expect(calculateRating([30, 30, 30, 30])).toEqual({ rounded: 80, total: 76 }));
  test('30 - 5x', () => expect(calculateRating([30, 30, 30, 30, 30])).toEqual({ rounded: 80, total: 83 }));
  test('30 - 6x', () => expect(calculateRating([30, 30, 30, 30, 30, 30])).toEqual({ rounded: 90, total: 88 }));
  test('30 - 7x', () => expect(calculateRating([30, 30, 30, 30, 30, 30, 30])).toEqual({ rounded: 90, total: 92 }));
  test('30 - 8x', () => expect(calculateRating([30, 30, 30, 30, 30, 30, 30, 30])).toEqual({ rounded: 90, total: 94 }));
  test('30 - 9x', () => expect(calculateRating([30, 30, 30, 30, 30, 30, 30, 30, 30])).toEqual({ rounded: 100, total: 96 }));
  test('30 - 10x', () => expect(calculateRating([30, 30, 30, 30, 30, 30, 30, 30, 30, 30])).toEqual({ rounded: 100, total: 97 }));

  test('40 - 3x', () => expect(calculateRating([40, 40, 40])).toEqual({ rounded: 80, total: 78 }));
  test('40 - 4x', () => expect(calculateRating([40, 40, 40, 40])).toEqual({ rounded: 90, total: 87 }));
  test('40 - 5x', () => expect(calculateRating([40, 40, 40, 40, 40])).toEqual({ rounded: 90, total: 92 }));
  test('40 - 6x', () => expect(calculateRating([40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 95 }));
  test('40 - 7x', () => expect(calculateRating([40, 40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 97 }));
  test('40 - 8x', () => expect(calculateRating([40, 40, 40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 98 }));
  test('40 - 9x', () => expect(calculateRating([40, 40, 40, 40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 99 }));
  test('40 - 10x', () => expect(calculateRating([40, 40, 40, 40, 40, 40, 40, 40, 40, 40])).toEqual({ rounded: 100, total: 99 }));

  test('50 - 3x', () => expect(calculateRating([50, 50, 50])).toEqual({ rounded: 90, total: 88 }));
  test('50 - 4x', () => expect(calculateRating([50, 50, 50, 50])).toEqual({ rounded: 90, total: 94 }));
  test('50 - 5x', () => expect(calculateRating([50, 50, 50, 50, 50])).toEqual({ rounded: 100, total: 97 }));
  test('50 - 6x', () => expect(calculateRating([50, 50, 50, 50, 50, 50])).toEqual({ rounded: 100, total: 99 }));
  test('50 - 7x', () => expect(calculateRating([50, 50, 50, 50, 50, 50, 50])).toEqual({ rounded: 100, total: 100 }));

  test('60 - 3x', () => expect(calculateRating([60, 60, 60])).toEqual({ rounded: 90, total: 94 }));
  test('60 - 4x', () => expect(calculateRating([60, 60, 60, 60])).toEqual({ rounded: 100, total: 98 }));
  test('60 - 5x', () => expect(calculateRating([60, 60, 60, 60, 60])).toEqual({ rounded: 100, total: 99 }));
  test('60 - 6x', () => expect(calculateRating([60, 60, 60, 60, 60, 60])).toEqual({ rounded: 100, total: 100 }));

  test('70 - 3x', () => expect(calculateRating([70, 70, 70])).toEqual({ rounded: 100, total: 97 }));
  test('70 - 4x', () => expect(calculateRating([70, 70, 70, 70])).toEqual({ rounded: 100, total: 99 }));
  test('70 - 5x', () => expect(calculateRating([70, 70, 70, 70, 70])).toEqual({ rounded: 100, total: 100 }));

  test('80 - 3x', () => expect(calculateRating([80, 80, 80])).toEqual({ rounded: 100, total: 99 }));
  test('80 - 4x', () => expect(calculateRating([80, 80, 80, 80])).toEqual({ rounded: 100, total: 100 }));

  test('90 - 3x', () => expect(calculateRating([90, 90, 90])).toEqual({ rounded: 100, total: 100 }));
});

export { };
