import { round, isValidRating } from './utilities.js';
/**
 * Calculate disability percentage
 * @function calculatePercent
 * @param {number[]} ratings - Array of disability ratings
 * @return {number} - Combined disability percentage
 */
export function calculatePercent(ratings) {
    // Still fuzy on this math but it works ¯\_(ツ)_/¯
    // Sort in descending order (largest first)
    ratings.sort(function (a, b) { return b - a; });
    var final = ratings.reduce(function (total, cur, idx) {
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
/**
 * Calculate bilateral factor and percentage
 * @function calculateBilateral
 * @param  {number[]} disabilities - Array of disability ratings
 * @return {IBilateral} - Bilateral factor and percentage
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
export function calculateBilateral(disabilities) {
    if (!disabilities.every(isValidRating))
        throw new Error('Invalid ratings');
    if (disabilities.length <= 1)
        throw new Error('Insufficient ratings');
    var percentagesDecimals = disabilities.map(function (percent) { return percent / 100; });
    var calculatedPercent = calculatePercent(percentagesDecimals);
    var factorDecimal = round(calculatedPercent * 0.1, 3);
    var percentDecimal = round(calculatedPercent + factorDecimal, 2);
    var factor = round(factorDecimal * 100, 1);
    var percent = round(percentDecimal * 100);
    return { factor: factor, percent: percent };
}
/**
 * Calculate total and rounded rating
 * @function calculateRating
 * @param  {number[]} percentages - Array of disability percentages
 * @return {IRating} - Total and rounded rating percentage as whole numbers
 * @example
 * calculateRating([20, 30]);
 * // returns { total: 44, rounded: 40 }
 */
export default function calculateRating(percentages) {
    var percentagesDecimals = percentages.map(function (percent) { return percent / 100; });
    var percentvalue = calculatePercent(percentagesDecimals);
    // Combined / total disability percent
    var total = percentvalue > 1 ? 100 : round(percentvalue * 100);
    var rounded = round(percentvalue, 1) * 100;
    return { total: total, rounded: rounded };
}
