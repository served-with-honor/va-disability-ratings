import type { IBilateral } from "./types";
import { round } from "./utilities";

/**
 *
 * @param {number[]} arr
 * @return {number}
 */
export function calculatePercent(arr: number[]): number {
  // Still fuzy on this math but it works ¯\_(ツ)_/¯

  // Sort in descending order (largest first)
  arr.sort((a, b) => b - a);
  const final = arr.reduce((total, cur, idx) => {
    if (idx === 0) return total + cur;

    const diff = 1 - total;
    const subNum = cur * diff;
    return subNum + total;
  }, 0);
  if (final >= 1) return 1;
  if (final <= 0) return 0;
  return final;
}

/**
 * @param  {number[]} disabilities
 * @return {IBilateral}
 * @description 
 */
/*
To get the bilateral factor we take the combined rating of the veteran’s bilateral conditions and multiply it by 10%.
We take the 2.8% and add it to the combined rating of the veteran’s bilateral conditions (2.8% + 28%). This gives us a combined rating of 31% for the veteran’s bilateral conditions. The 31% is the result of rounding 30.8% to the nearest whole number.

Example: 
The combined rating of the veteran’s bilateral conditions (right foot and left knee) is 28%.
This gives the veteran a bilateral factor of 2.8%.
We take the 2.8% and add it to the combined rating of the veteran’s bilateral conditions (2.8% + 28%).
This gives us a combined rating of 31% for the veteran’s bilateral conditions.
The 31% is the result of rounding 30.8% to the nearest whole number.
*/
export function calculateBilateral(disabilities: number[])
:IBilateral | undefined {
  if (!disabilities || disabilities.length <= 1) return;

  const calculatedPercent = calculatePercent(disabilities);

  const factor = round(calculatedPercent * 0.1, 3);
  const percent = round(calculatedPercent + factor, 2);

  return { factor, percent };
}

interface IRating {
  total: number;
  rounded: number;
  bilateral?: IBilateral
}

/**
 * @param  {number[]} percentages
 * @return {IRating}
 */
export default function calculateRating(percentages: number[]): IRating {
  const percentvalue = calculatePercent(percentages);

  // Combined / total disability percent
  const total = percentvalue > 1 ? 1 : round(percentvalue, 2);
  const rounded = round(percentvalue, 1);

  return { total, rounded };
}
