import vaRates from './rates/index';
import { IFamily, IRates } from './types';
/**
 * Get rate type for a given family
 * @function getRateType
 * @param  {Object} family
 * @param  {boolean} [family.isMarried] - Is the veteran married?
 * @param {boolean} [family.hasChildren] - Does the veteran have children?
 * @param {number} [family.parents] - Number of dependent parents
 * @return  {string} - Rate type
 */
export function getRateType({
  isMarried = false,
  hasChildren = false,
  parents = 0,
} = {}) {
  if (!hasChildren && !isMarried && !parents) return 'veteran';
  if (!hasChildren && isMarried && !parents) return 'withspouseonly';
  if (!hasChildren && isMarried && parents === 1) return 'withspouseandoneparent';
  if (!hasChildren && isMarried && parents === 2) return 'withspouseandtwoparents';
  if (!hasChildren && !isMarried && parents === 1) return 'withoneparent';
  if (!hasChildren && !isMarried && parents === 2) return 'withtwoparents';
  if (hasChildren && isMarried && !parents) return 'withspouseandchild';
  if (hasChildren && !isMarried && !parents) return 'withchildonly';
  if (hasChildren && isMarried && parents === 1) return 'withspouseoneparentandchild';
  if (hasChildren && isMarried && parents === 2) return 'withspousetwoparentsandchild';
  if (hasChildren && !isMarried && parents === 1) return 'withoneparentandchild';
  if (hasChildren && !isMarried && parents === 2) return 'withtwoparentsandchild';
  return 'veteran';
}

/**
 * Get rate amount for a given category and percentage
 * @function getRateAmount
 * @param  {string} category - Rate category
 * @param  {number} percent - Rating percentage as a whole number, e.g. 30
 * @param  {number} [year]
 * @return {number}
 */
export function getRateAmount(category: string, percent: number, year?: number): number {
  const rates: IRates = year ? vaRates[year.toString()] : vaRates.latest;
  if (!rates || !(category in rates) || !(percent in rates[category])) return 0;
  const categoryRates = rates[category];
  const rateAmount = categoryRates[percent.toString()];
  if (!rateAmount) return 0;
  return parseFloat(rateAmount.toString());
}

/**
 * Calculate payment amount for children
 * @function getPaymentAmountForChildren
 * @param  {number} rating - Rating percentage as a whole number, e.g. 30
 * @param  {number} children - Number of minor children
 * @param  {number} adultChildren - Number of adult children
 * @return {number} - Additional payment dollar amount
 */
export function getPaymentAmountForChildren(
  rating: number,
  children: number,
  adultChildren: number,
  year?: number,
) {
  if (!rating || (children <= 1 && !adultChildren)) return 0;
  let amount = 0;
  if (children > 1) {
    amount += (children - 1) * getRateAmount('additionalchild', rating, year);
  }
  if (adultChildren > 0) {
    amount += adultChildren * getRateAmount('additionalchildover18', rating, year);
  }
  return amount;
}

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
export default function calculatePayment(
  rating: number,
  family: IFamily = {},
  year?: number,
) : number {
  if (!rating) return 0;

  const {
    children = 0,
    isMarried = false,
    spouseAid = false,
    adultChildren = 0,
    parents = 0,
  } = family;

  const hasMinorChildren = children > 0;

  const rateType = rating >= 30
    ? getRateType({ isMarried, hasChildren: hasMinorChildren, parents })
    : 'veteran';

  const baseRatePayment = getRateAmount(rateType, rating, year);
  const spouseAidPayment = isMarried && spouseAid ? getRateAmount('aaspouse', rating, year) : 0;
  const additionalChildrenPayment = (
    getPaymentAmountForChildren(rating, children, adultChildren, year)
  );

  const paymentAmount = baseRatePayment + additionalChildrenPayment + spouseAidPayment;

  return paymentAmount > 0 ? paymentAmount : 0;
}
