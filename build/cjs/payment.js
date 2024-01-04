"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentAmountForChildren = exports.getRateAmount = exports.getRateType = void 0;
var index_1 = require("./rates/index");
/**
 * @param  {{isMarried: boolean, hasChildren: boolean, parents: number}} family
 * @return  {string}
 */
function getRateType(_a) {
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
exports.getRateType = getRateType;
/**
 * @param  {string} cat
 * @param  {number} percent
 * @param  {number} year?
 * @return {number}
 */
function getRateAmount(category, percent, year) {
    var rates = year ? index_1.default[year.toString()] : index_1.default.latest;
    if (!rates || !(category in rates) || !(percent in rates[category]))
        return 0;
    var categoryRates = rates[category];
    var rateAmount = categoryRates[percent.toString()];
    if (!rateAmount)
        return 0;
    return parseFloat(rateAmount.toString());
}
exports.getRateAmount = getRateAmount;
/**
 * @param  {number} rating
 * @param  {number} children
 * @param  {number} adultChildren
 * @return {number}
 */
function getPaymentAmountForChildren(rating, children, adultChildren, year) {
    if (!rating || (children <= 1 && !adultChildren))
        return 0;
    var amount = 0;
    if (children > 1) {
        amount += (children - 1) * getRateAmount('additionalchild', rating, year);
    }
    if (adultChildren > 0) {
        amount += adultChildren * getRateAmount('additionalchildover18', rating, year);
    }
    return amount;
}
exports.getPaymentAmountForChildren = getPaymentAmountForChildren;
/**
 * @param  {number} rating
 * @param  {IFamily} family
 * @return {number}
 */
function calculatePayment(rating, family, year) {
    if (family === void 0) { family = {}; }
    if (!rating)
        return 0;
    var _a = family.children, children = _a === void 0 ? 0 : _a, _b = family.isMarried, isMarried = _b === void 0 ? false : _b, _c = family.spouseAid, spouseAid = _c === void 0 ? false : _c, _d = family.adultChildren, adultChildren = _d === void 0 ? 0 : _d, _e = family.parents, parents = _e === void 0 ? 0 : _e;
    var hasMinorChildren = children > 0;
    var rateType = rating >= 30
        ? getRateType({ isMarried: isMarried, hasChildren: hasMinorChildren, parents: parents })
        : 'veteran';
    var baseRatePayment = getRateAmount(rateType, rating, year);
    var spouseAidPayment = isMarried && spouseAid ? getRateAmount('aaspouse', rating, year) : 0;
    var additionalChildrenPayment = (getPaymentAmountForChildren(rating, children, adultChildren, year));
    var paymentAmount = baseRatePayment + additionalChildrenPayment + spouseAidPayment;
    return paymentAmount > 0 ? paymentAmount : 0;
}
exports.default = calculatePayment;
