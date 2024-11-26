import currency from 'currency.js';
import vaRates from './rates';
import { isValidRating } from './utilities';
/**
 * Get rate type for a given family
 * @function getRateType
 * @param  {Object} family
 * @param  {boolean} [family.isMarried] - Is the veteran married?
 * @param {boolean} [family.hasChildren] - Does the veteran have children?
 * @param {number} [family.parents] - Number of dependent parents
 * @return  {string} - Rate type
 */
export function getRateType(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.isMarried, isMarried = _c === void 0 ? false : _c, _d = _b.hasChildren, hasChildren = _d === void 0 ? false : _d, _e = _b.parents, parents = _e === void 0 ? 0 : _e;
    if (!hasChildren && !isMarried && !parents)
        return 'veteran';
    if (!hasChildren && isMarried && !parents)
        return 'withspouseonly';
    if (!hasChildren && isMarried && parents === 1)
        return 'withspouseandoneparent';
    if (!hasChildren && isMarried && parents === 2)
        return 'withspouseandtwoparents';
    if (!hasChildren && !isMarried && parents === 1)
        return 'withoneparent';
    if (!hasChildren && !isMarried && parents === 2)
        return 'withtwoparents';
    if (hasChildren && isMarried && !parents)
        return 'withspouseandchild';
    if (hasChildren && !isMarried && !parents)
        return 'withchildonly';
    if (hasChildren && isMarried && parents === 1)
        return 'withspouseoneparentandchild';
    if (hasChildren && isMarried && parents === 2)
        return 'withspousetwoparentsandchild';
    if (hasChildren && !isMarried && parents === 1)
        return 'withoneparentandchild';
    if (hasChildren && !isMarried && parents === 2)
        return 'withtwoparentsandchild';
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
export function getRateAmount(category, percent, year) {
    var rates = year ? vaRates[year.toString()] : vaRates.latest;
    if (!rates)
        throw new Error('Invalid year');
    if (!(category in rates))
        throw new Error('Invalid category');
    if (!isValidRating(percent) || !(percent in rates[category]))
        throw new Error('Invalid percent');
    var categoryRates = rates[category];
    var rateAmount = categoryRates[percent.toString()];
    if (!rateAmount)
        return currency(0).value;
    return currency(rateAmount).value;
}
/**
 * Calculate payment amount for children
 * @function getPaymentAmountForChildren
 * @param  {number} rating - Rating percentage as a whole number, e.g. 30
 * @param  {number} children - Number of minor children
 * @param  {number} adultChildren - Number of adult children
 * @return {number} - Additional payment dollar amount
 */
export function getPaymentAmountForChildren(rating, children, adultChildren, year) {
    var payment = currency(0);
    if (!isValidRating(rating))
        throw new Error('Invalid rating');
    if (rating < 30 || (children <= 1 && !adultChildren))
        return payment.value;
    var doStuff = function (label, count) {
        var rate = currency(getRateAmount(label, rating, year));
        var amount = rate.multiply(count);
        payment = currency(payment).add(amount);
    };
    if (children > 1)
        doStuff('additionalchild', children - 1);
    if (adultChildren > 0)
        doStuff('additionalchildover18', adultChildren);
    return payment.value;
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
export default function calculatePayment(rating, family, year) {
    if (family === void 0) { family = {}; }
    if (!rating)
        return currency(0).value;
    var _a = family.children, children = _a === void 0 ? 0 : _a, _b = family.isMarried, isMarried = _b === void 0 ? false : _b, _c = family.spouseAid, spouseAid = _c === void 0 ? false : _c, _d = family.adultChildren, adultChildren = _d === void 0 ? 0 : _d, _e = family.parents, parents = _e === void 0 ? 0 : _e;
    var hasMinorChildren = children > 0;
    var rateType = rating >= 30
        ? getRateType({ isMarried: isMarried, hasChildren: hasMinorChildren, parents: parents })
        : 'veteran';
    var baseRatePayment = getRateAmount(rateType, rating, year);
    var spouseAidPayment = isMarried && spouseAid ? getRateAmount('aaspouse', rating, year) : 0;
    var additionalChildrenPayment = children || adultChildren ? (getPaymentAmountForChildren(rating, children, adultChildren, year)) : 0;
    var paymentAmount = currency(baseRatePayment)
        .add(additionalChildrenPayment)
        .add(spouseAidPayment);
    return paymentAmount.value;
}
