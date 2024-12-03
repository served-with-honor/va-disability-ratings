import { round, isValidRating } from './utilities.js';
/**
 * Calculate disability percentage
 * @function calculateCombinedRating
 * @param {number[]} ratings - Array of disability ratings
 * @return {number} - Combined disability percentage
 */
export function calculateCombinedRating(ratings) {
    if (ratings.length === 0)
        return 0;
    // Sort in descending order (largest first)
    ratings.sort(function (a, b) { return b - a; });
    if (ratings[0] <= 0)
        return 0;
    if (ratings[0] >= 100)
        return 100;
    // Start with the largest rating (e.g., back injury at 30%). Subtract it from 100%.
    // 100% – 30% = 70% remaining.
    // Subtract the next rating (e.g., knee injury at 20%) from what’s left.
    // 20% of 70% = 14%
    // 70% – 14% = 56% remaining.
    // Subtract the last rating (e.g., tinnitus at 10%) from the new total.
    // 10% of 56% = 5.6%
    // 56% – 5.6% = 50.4%.
    // Round to the nearest 10 for the combined rating.
    // 50.4% rounds to 50%.
    // Lastly, subtract the result from 100 to get the final combined rating.
    var final = 100 - ratings.reduce(function (remaining, num) {
        // Ignore invalid ratings
        if (num <= 0 || num >= 100)
            return remaining;
        return remaining - Math.round((remaining * num) / 100);
    }, 100);
    return final;
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
    var calculatedPercent = calculateCombinedRating(disabilities);
    var factor = round(calculatedPercent * 0.1, 1);
    var percent = round(calculatedPercent + factor, 0);
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
    var percentvalue = calculateCombinedRating(percentages);
    // Combined / total disability percent
    var total = percentvalue > 100 ? 100 : percentvalue;
    var rounded = Math.round(percentvalue / 10) * 10;
    return { total: total, rounded: rounded };
}
