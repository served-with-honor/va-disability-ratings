"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentAmountForChildren = exports.getRateAmount = exports.getRateType = void 0;
const rates_1 = __importDefault(require("./rates"));
/**
 * @param  {{isMarried: boolean, hasChildren: boolean, parents: number}} family
 * @return  {string}
 */
function getRateType({ isMarried = false, hasChildren = false, parents = 0, } = {}) {
    if (!hasChildren && !isMarried && !parents)
        return "veteran";
    if (!hasChildren && isMarried && !parents)
        return "withspouseonly";
    if (!hasChildren && isMarried && parents === 1)
        return "withspouseandoneparent";
    if (!hasChildren && isMarried && parents === 2)
        return "withspouseandtwoparents";
    if (!hasChildren && !isMarried && parents === 1)
        return "withoneparent";
    if (!hasChildren && !isMarried && parents === 2)
        return "withtwoparents";
    if (hasChildren && isMarried && !parents)
        return "withspouseandchild";
    if (hasChildren && !isMarried && !parents)
        return "withchildonly";
    if (hasChildren && isMarried && parents === 1)
        return "withspouseoneparentandchild";
    if (hasChildren && isMarried && parents === 2)
        return "withspousetwoparentsandchild";
    if (hasChildren && !isMarried && parents === 1)
        return "withoneparentandchild";
    if (hasChildren && !isMarried && parents === 2)
        return "withtwoparentsandchild";
    return "veteran";
}
exports.getRateType = getRateType;
/**
 * @param  {string} cat
 * @param  {number} percent
 * @param  {number} year?
 * @return {number}
 */
function getRateAmount(cat, percent, year) {
    const blah = year ? rates_1.default[year.toString()] : rates_1.default.latest; // TODO - fix this
    if (!(cat in blah) || !(percent in blah[cat]))
        return 0;
    const categoryRates = blah[cat];
    const rateAmount = categoryRates[percent.toString()];
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
    let amount = 0;
    if (children > 1) {
        amount += (children - 1) * getRateAmount("additionalchild", rating, year);
    }
    if (adultChildren > 0) {
        amount += adultChildren * getRateAmount("additionalchildover18", rating, year);
    }
    return amount;
}
exports.getPaymentAmountForChildren = getPaymentAmountForChildren;
/**
 * @param  {number} rating
 * @param  {IFamily} family
 * @return {number}
 */
function calculatePayment(rating, family = {}, year) {
    if (!rating)
        return 0;
    const { children = 0, isMarried = false, spouseAid = false, adultChildren = 0, parents = 0, } = family;
    const hasMinorChildren = children > 0;
    const rateType = rating >= 30
        ? getRateType({ isMarried, hasChildren: hasMinorChildren, parents })
        : "veteran";
    const baseRatePayment = getRateAmount(rateType, rating, year);
    const spouseAidPayment = isMarried && spouseAid ? getRateAmount("aaspouse", rating, year) : 0;
    const additionalChildrenPayment = getPaymentAmountForChildren(rating, children, adultChildren, year);
    const paymentAmount = baseRatePayment + additionalChildrenPayment + spouseAidPayment;
    return paymentAmount > 0 ? paymentAmount : 0;
}
exports.default = calculatePayment;
//# sourceMappingURL=payment.js.map