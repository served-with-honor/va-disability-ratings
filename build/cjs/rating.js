"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBilateral = exports.calculatePercent = void 0;
var utilities_1 = require("./utilities");
/**
 *
 * @param {number[]} arr
 * @return {number}
 */
function calculatePercent(arr) {
    // Still fuzy on this math but it works ¯\_(ツ)_/¯
    // Sort in descending order (largest first)
    arr.sort(function (a, b) { return b - a; });
    var final = arr.reduce(function (total, cur, idx) {
        if (idx === 0)
            return total + cur;
        var diff = 1 - total;
        var subNum = cur * diff;
        return subNum + total;
    }, 0);
    if (final >= 1)
        return 1;
    if (final <= 0)
        return 0;
    return Math.round(final * 100) / 100;
}
exports.calculatePercent = calculatePercent;
/**
 * @param  {number[]} disabilities
 * @return {IBilateral}
 * @description
 */
/*
To get the bilateral factor we take the combined rating of the veteran’s bilateral conditions
and multiply it by 10%. We take the 2.8% and add it to the combined rating of the veteran’s
bilateral conditions (2.8% + 28%). This gives us a combined rating of 31% for the veteran’s
bilateral conditions. The 31% is the result of rounding 30.8% to the nearest whole number.

Example:
The combined rating of the veteran’s bilateral conditions (right foot and left knee) is 28%.
This gives the veteran a bilateral factor of 2.8%.
We take the 2.8% and add it to the combined rating of the veteran’s bilateral conditions
(2.8% + 28%).
This gives us a combined rating of 31% for the veteran’s bilateral conditions.
The 31% is the result of rounding 30.8% to the nearest whole number.
*/
function calculateBilateral(disabilities) {
    if (!disabilities || disabilities.length <= 1)
        return undefined;
    var percentagesDecimals = disabilities.map(function (percent) { return percent / 100; });
    var calculatedPercent = calculatePercent(percentagesDecimals);
    var factorDecimal = (0, utilities_1.round)(calculatedPercent * 0.1, 3);
    var percentDecimal = (0, utilities_1.round)(calculatedPercent + factorDecimal, 2);
    var factor = (0, utilities_1.round)(factorDecimal * 100, 1);
    var percent = (0, utilities_1.round)(percentDecimal * 100);
    return { factor: factor, percent: percent };
}
exports.calculateBilateral = calculateBilateral;
/**
 * @param  {number[]} percentages
 * @return {IRating}
 */
function calculateRating(percentages) {
    var percentagesDecimals = percentages.map(function (percent) { return percent / 100; });
    var percentvalue = calculatePercent(percentagesDecimals);
    // Combined / total disability percent
    var total = percentvalue > 1 ? 100 : (0, utilities_1.round)(percentvalue, 2) * 100;
    var rounded = (0, utilities_1.round)(percentvalue, 1) * 100;
    return { total: total, rounded: rounded };
}
exports.default = calculateRating;
