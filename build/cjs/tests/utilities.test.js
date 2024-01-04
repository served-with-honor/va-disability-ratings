"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var utilities_1 = require("../utilities");
(0, globals_1.describe)('Round', function () {
    (0, globals_1.test)('Rounding Up 2 places', function () { return (0, globals_1.expect)((0, utilities_1.round)(123.456, 2)).toBe(123.46); });
    (0, globals_1.test)('Rounding no places', function () { return (0, globals_1.expect)((0, utilities_1.round)(123.456)).toBe(123); });
    (0, globals_1.test)('Rounding no places123', function () { return (0, globals_1.expect)((0, utilities_1.round)(0.7896, 3)).toBe(0.79); });
});
(0, globals_1.describe)('Inverse Side', function () {
    (0, globals_1.test)('left to right', function () { return (0, globals_1.expect)((0, utilities_1.getInverseSideName)('left')).toBe('right'); });
    (0, globals_1.test)('Left to right', function () { return (0, globals_1.expect)((0, utilities_1.getInverseSideName)('Left')).toBe('right'); });
    (0, globals_1.test)('right to left', function () { return (0, globals_1.expect)((0, utilities_1.getInverseSideName)('right')).toBe('left'); });
    (0, globals_1.test)('Right to left', function () { return (0, globals_1.expect)((0, utilities_1.getInverseSideName)('Right')).toBe('left'); });
    (0, globals_1.test)('leg left to right', function () { return (0, globals_1.expect)((0, utilities_1.getInverseSide)('left leg')).toBe('right leg'); });
    (0, globals_1.test)('foot Left to right', function () { return (0, globals_1.expect)((0, utilities_1.getInverseSide)('Left foot')).toBe('right foot'); });
    (0, globals_1.test)('arm right to left', function () { return (0, globals_1.expect)((0, utilities_1.getInverseSide)('right arm')).toBe('left arm'); });
    (0, globals_1.test)('leg Right to left', function () { return (0, globals_1.expect)((0, utilities_1.getInverseSide)('Right Leg')).toBe('left Leg'); });
});
(0, globals_1.describe)('Bilaterals', function () {
    (0, globals_1.test)('No matches', function () {
        var items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Left Arm', value: 0.4 }];
        var expectValue = (0, utilities_1.filterBilateralMatches)(items);
        var value = [[], [0.2, 0.4]];
        (0, globals_1.expect)(expectValue).toStrictEqual(value);
    });
    (0, globals_1.test)('1 matching pair', function () {
        var items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }];
        var expectValue = (0, utilities_1.filterBilateralMatches)(items);
        var value = [[0.2, 0.4], []];
        (0, globals_1.expect)(expectValue).toStrictEqual(value);
    });
    (0, globals_1.test)('2 matching items and some no matches', function () {
        var items = [{ label: 'Left Arm', value: 0.2 }, { label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }];
        var expectValue = (0, utilities_1.filterBilateralMatches)(items);
        var value = [[0.2, 0.4], [0.2]];
        (0, globals_1.expect)(expectValue).toStrictEqual(value);
    });
    (0, globals_1.test)('3 matching items', function () {
        var items = [{ label: 'Left Leg', value: 0.2 }, { label: 'Right Leg', value: 0.4 }, { label: 'Righ Leg', value: 0.2 }];
        var expectValue = (0, utilities_1.filterBilateralMatches)(items);
        var value = [[0.2, 0.4, 0.2], []];
        (0, globals_1.expect)(expectValue).toStrictEqual(value);
    });
});
