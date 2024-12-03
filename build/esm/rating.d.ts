import type { IBilateral, IRating } from './types.js';
/**
 * Calculate disability percentage
 * @function calculateCombinedRating
 * @param {number[]} ratings - Array of disability ratings
 * @return {number} - Combined disability percentage
 */
export declare function calculateCombinedRating(ratings: number[]): number;
/**
 * Calculate bilateral factor and percentage
 * @function calculateBilateral
 * @param  {number[]} disabilities - Array of disability ratings
 * @return {IBilateral} - Bilateral factor and percentage
 * @description
 */
export declare function calculateBilateral(disabilities: number[]): IBilateral | undefined;
/**
 * Calculate total and rounded rating
 * @function calculateRating
 * @param  {number[]} percentages - Array of disability percentages
 * @return {IRating} - Total and rounded rating percentage as whole numbers
 * @example
 * calculateRating([20, 30]);
 * // returns { total: 44, rounded: 40 }
 */
export default function calculateRating(percentages: number[]): IRating;
