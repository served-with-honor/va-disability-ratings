import type { IBilateral, IRating } from './types';
import { round, isValidRating } from './utilities';

/**
 * Calculate disability percentage
 * @function calculatePercent
 * @param {number[]} ratings - Array of disability ratings
 * @return {number} - Combined disability percentage
 */
export function calculatePercent(ratings: number[]): number {
  // Still fuzy on this math but it works ¯\_(ツ)_/¯

  // Sort in descending order (largest first)
  ratings.sort((a, b) => b - a);
  const final = 100 - ratings.reduce((remaining, num) => {
    // Ignore invalid ratings
    if (num <= 0 || num >= 100) return remaining;

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
export function calculateBilateral(disabilities : number[]) : IBilateral | undefined {
  if (!disabilities.every(isValidRating)) throw new Error('Invalid ratings');
  if (disabilities.length <= 1) throw new Error('Insufficient ratings');

  const calculatedPercent = calculatePercent(disabilities);

  const factor = round(calculatedPercent * 0.1, 1);
  const percent = round(calculatedPercent + factor, 0);

  return { factor, percent };
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
export default function calculateRating(percentages: number[]): IRating {
  const percentvalue = calculatePercent(percentages);

  // Combined / total disability percent
  const total = percentvalue > 100 ? 100 : percentvalue;
  const rounded = Math.round(percentvalue / 10) * 10;

  return { total, rounded };
}
