import { IFamily } from './types.js';
/**
 * Get rate type for a given family
 * @function getRateType
 * @param  {Object} family
 * @param  {boolean} [family.isMarried] - Is the veteran married?
 * @param {boolean} [family.hasChildren] - Does the veteran have children?
 * @param {number} [family.parents] - Number of dependent parents
 * @return  {string} - Rate type
 */
export declare function getRateType({ isMarried, hasChildren, parents, }?: {
    isMarried?: boolean | undefined;
    hasChildren?: boolean | undefined;
    parents?: number | undefined;
}): "veteran" | "withspouseonly" | "withspouseandoneparent" | "withspouseandtwoparents" | "withoneparent" | "withtwoparents" | "withspouseandchild" | "withchildonly" | "withspouseoneparentandchild" | "withspousetwoparentsandchild" | "withoneparentandchild" | "withtwoparentsandchild";
/**
 * Get rate amount for a given category and percentage
 * @function getRateAmount
 * @param  {string} category - Rate category
 * @param  {number} percent - Rating percentage as a whole number, e.g. 30
 * @param  {number} [year]
 * @return {number}
 */
export declare function getRateAmount(category: string, percent: number, year?: number): number;
/**
 * Calculate payment amount for children
 * @function getPaymentAmountForChildren
 * @param  {number} rating - Rating percentage as a whole number, e.g. 30
 * @param  {number} children - Number of minor children
 * @param  {number} adultChildren - Number of adult children
 * @return {number} - Additional payment dollar amount
 */
export declare function getPaymentAmountForChildren(rating: number, children: number, adultChildren: number, year?: number): number;
/**
 * Calculate payment amount based on rating, family, and year
 * @function calculatePayment
 * @param  {number} rating - Rating percentage as a whole number, e.g. 30
 * @param  {Object} [family]
 * @param  {boolean} [family.isMarried] - Is the veteran married?
 * @param {boolean} [family.spouseAid] - Does the spouse require aid & attendance (A/A)
 * @param {number} [family.children] - Number of minor children
 * @param {number} [family.adultChildren] - Number of adult children
 * @param {number} [family.parents] - Number of dependent parents
 * @param  {number} [year]
 * @return {number} - Payment dollar amount
 * @example
 * calculatePayment(30, { isMarried: true, children: 2 }, 2024);
 * // returns 663.31
 */
export default function calculatePayment(rating: number, family?: IFamily, year?: number): number;
