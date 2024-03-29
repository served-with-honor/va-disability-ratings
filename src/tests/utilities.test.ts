import { describe, expect, test } from '@jest/globals';
import {
  round,
  getInverseSide,
  getInverseSideName,
  filterBilateralMatches,
  isValidRating,
} from '../utilities';

describe('Round', () => {
  test('Rounding Up 2 places', () => expect(round(123.456, 2)).toBe(123.46));
  test('Rounding no places', () => expect(round(123.456, 0)).toBe(123));
  test('Rounding no places - no 2nd argument', () => expect(round(123.456)).toBe(123));
});

describe('Inverse Side', () => {
  test('left to right', () => expect(getInverseSideName('left')).toBe('right'));
  test('Left to right', () => expect(getInverseSideName('Left')).toBe('right'));
  test('right to left', () => expect(getInverseSideName('right')).toBe('left'));
  test('Right to left', () => expect(getInverseSideName('Right')).toBe('left'));
  test('Leg left to right', () => expect(getInverseSide('left leg')).toBe('right leg'));
  test('foot Left to right', () => expect(getInverseSide('Left foot')).toBe('right foot'));
  test('arm right to left', () => expect(getInverseSide('right arm')).toBe('left arm'));
  test('leg Right to left', () => expect(getInverseSide('Right Leg')).toBe('left Leg'));
});

describe('Bilaterals', () => {
  test('No matches', () => {
    const items = [{ label: 'Left Leg', value: 20 }, { label: 'Left Arm', value: 40 }];
    const expectValue = filterBilateralMatches(items);
    const value = [[], [20, 40]];
    expect(expectValue).toStrictEqual(value);
  });
  test('1 matching pair', () => {
    const items = [{ label: 'Left Leg', value: 20 }, { label: 'Right Leg', value: 40 }];
    const expectValue = filterBilateralMatches(items);
    const value = [[20, 40], []];
    expect(expectValue).toStrictEqual(value);
  });
  test('2 matching items and some no matches', () => {
    const items = [{ label: 'Left Arm', value: 20 }, { label: 'Left Leg', value: 20 }, { label: 'Right Leg', value: 40 }];
    const expectValue = filterBilateralMatches(items);
    const value = [[20, 40], [20]];
    expect(expectValue).toStrictEqual(value);
  });
  test('3 matching items', () => {
    const items = [{ label: 'Left Leg', value: 20 }, { label: 'Right Leg', value: 40 }, { label: 'Righ Leg', value: 20 }];
    const expectValue = filterBilateralMatches(items);
    const value = [[20, 40, 20], []];
    expect(expectValue).toStrictEqual(value);
  });
});

describe('Valid Rating', () => {
  test('Valid', () => expect(isValidRating(20)).toBe(true));
  test('Over 100', () => expect(isValidRating(200)).toBe(false));
  test('Under 0', () => expect(isValidRating(-20)).toBe(false));
  test('Not multiple of 10', () => expect(isValidRating(12)).toBe(false));
});

export { };
