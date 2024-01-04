"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var rating_1 = require("../rating");
(0, globals_1.describe)('Calculate Percent', function () {
    (0, globals_1.test)('', function () { return (0, globals_1.expect)((0, rating_1.calculatePercent)([0.4, 0.3])).toEqual(0.58); });
});
(0, globals_1.describe)('Calculate Bilaterals', function () {
    (0, globals_1.test)('Simple', function () {
        (0, globals_1.expect)((0, rating_1.calculateBilateral)([30, 20])).toEqual({ factor: 4.4, percent: 48 });
    });
    (0, globals_1.test)('Muliple', function () {
        (0, globals_1.expect)((0, rating_1.calculateBilateral)([10, 10, 10])).toEqual({ factor: 2.7, percent: 30 });
    });
});
(0, globals_1.describe)('Calculate Rating', function () {
    (0, globals_1.test)('Rounding Up', function () { return (0, globals_1.expect)((0, rating_1.default)([90, 50])).toStrictEqual({ rounded: 100, total: 95 }); });
    (0, globals_1.test)('Rounding Down', function () { return (0, globals_1.expect)((0, rating_1.default)([90, 30])).toStrictEqual({ rounded: 90, total: 93 }); });
});
