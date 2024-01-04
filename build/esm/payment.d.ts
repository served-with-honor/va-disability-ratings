import { IFamily } from './types';
/**
 * @param  {{isMarried: boolean, hasChildren: boolean, parents: number}} family
 * @return  {string}
 */
export declare function getRateType({ isMarried, hasChildren, parents, }?: {
    isMarried?: boolean | undefined;
    hasChildren?: boolean | undefined;
    parents?: number | undefined;
}): "veteran" | "withspouseonly" | "withspouseandoneparent" | "withspouseandtwoparents" | "withoneparent" | "withtwoparents" | "withspouseandchild" | "withchildonly" | "withspouseoneparentandchild" | "withspousetwoparentsandchild" | "withoneparentandchild" | "withtwoparentsandchild";
/**
 * @param  {string} cat
 * @param  {number} percent
 * @param  {number} year?
 * @return {number}
 */
export declare function getRateAmount(category: string, percent: number, year?: number): number;
/**
 * @param  {number} rating
 * @param  {number} children
 * @param  {number} adultChildren
 * @return {number}
 */
export declare function getPaymentAmountForChildren(rating: number, children: number, adultChildren: number, year?: number): number;
/**
 * @param  {number} rating
 * @param  {IFamily} family
 * @return {number}
 */
export default function calculatePayment(rating: number, family?: IFamily, year?: number): number;
