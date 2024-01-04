import { describe, expect, test } from '@jest/globals';
import { round, getInverseSide, getInverseSideName, filterBilateralMatches, } from '../utilities';
describe('Round', function () {
    test('Rounding Up 2 places', function () { return expect(round(123.456, 2)).toBe(123.46); });
    test('Rounding no places', function () { return expect(round(123.456)).toBe(123); });
    test('Rounding no places123', function () { return expect(round(0.7896, 3)).toBe(0.79); });
});
describe('Inverse Side', function () {
    test('left to right', function () { return expect(getInverseSideName('left')).toBe('right'); });
    test('Left to right', function () { return expect(getInverseSideName('Left')).toBe('right'); });
    test('right to left', function () { return expect(getInverseSideName('right')).toBe('left'); });
    test('Right to left', function () { return expect(getInverseSideName('Right')).toBe('left'); });
    test('leg left to right', function () { return expect(getInverseSide('left leg')).toBe('right leg'); });
    test('foot Left to right', function () { return expect(getInverseSide('Left foot')).toBe('right foot'); });
    test('arm right to left', function () { return expect(getInverseSide('right arm')).toBe('left arm'); });
    test('leg Right to left', function () { return expect(getInverseSide('Right Leg')).toBe('left Leg'); });
});
describe('Bilaterals', function () {
    test('No matches', function () {
        var items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Left Arm', value: 0.4 }];
        var expectValue = filterBilateralMatches(items);
        var value = [[], [0.2, 0.4]];
        expect(expectValue).toStrictEqual(value);
    });
    test('1 matching pair', function () {
        var items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }];
        var expectValue = filterBilateralMatches(items);
        var value = [[0.2, 0.4], []];
        expect(expectValue).toStrictEqual(value);
    });
    test('2 matching items and some no matches', function () {
        var items = [{ label: 'Left Arm', value: 0.2 }, { label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }];
        var expectValue = filterBilateralMatches(items);
        var value = [[0.2, 0.4], [0.2]];
        expect(expectValue).toStrictEqual(value);
    });
    test('3 matching items', function () {
        var items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }, { label: 'Righ Leg', value: 0.2 }];
        var expectValue = filterBilateralMatches(items);
        var value = [[0.2, 0.4, 0.2], []];
        expect(expectValue).toStrictEqual(value);
    });
});
