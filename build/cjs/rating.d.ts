import type { IBilateral, IRating } from './types';
/**
 *
 * @param {number[]} arr
 * @return {number}
 */
export declare function calculatePercent(arr: number[]): number;
/**
 * @param  {number[]} disabilities
 * @return {IBilateral}
 * @description
 */
export declare function calculateBilateral(disabilities: number[]): IBilateral | undefined;
/**
 * @param  {number[]} percentages
 * @return {IRating}
 */
export default function calculateRating(percentages: number[]): IRating;
