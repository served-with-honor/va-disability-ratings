import type { IDisability } from './types.js';
/**
 * @param  {number} num
 * @return {string}
 */
export declare function formatCurrency(num: number): string;
export declare const round: (num: number, places?: number) => number;
export declare const getInverseSideName: (side: string) => string;
export declare const getInverseSide: (text: string) => string;
/**
 * @param  {IDisability[]} items
 * @return {IDisability[]}
 */
export declare function filterBilateralMatches(items: Array<IDisability>): [number[], number[]];
export declare const isValidRating: (rating: number) => boolean;
