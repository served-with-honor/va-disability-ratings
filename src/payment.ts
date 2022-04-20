import vaRates from "./rates";

interface IFamily {
  isMarried?: boolean;
  spouseAid?: boolean;
  children?: number;
  adultChildren?: number;
  parents?: number;
}

/**
 * @param  {{isMarried: boolean, hasChildren: boolean, parents: number}} family
 * @return  {string}
 */
export function getRateType({
  isMarried = false,
  hasChildren = false,
  parents = 0,
} = {}) {
  if (!hasChildren && !isMarried && !parents) return "veteran";
  if (!hasChildren && isMarried && !parents) return "withspouseonly";
  if (!hasChildren && isMarried && parents === 1) return "withspouseandoneparent";
  if (!hasChildren && isMarried && parents === 2) return "withspouseandtwoparents";
  if (!hasChildren && !isMarried && parents === 1) return "withoneparent";
  if (!hasChildren && !isMarried && parents === 2) return "withtwoparents";
  if (hasChildren && isMarried && !parents) return "withspouseandchild";
  if (hasChildren && !isMarried && !parents) return "withchildonly";
  if (hasChildren && isMarried && parents === 1) return "withspouseoneparentandchild";
  if (hasChildren && isMarried && parents === 2) return "withspousetwoparentsandchild";
  if (hasChildren && !isMarried && parents === 1) return "withoneparentandchild";
  if (hasChildren && !isMarried && parents === 2) return "withtwoparentsandchild";
  return "veteran";
}

/**
 * @param  {string} cat
 * @param  {number} percent
 * @param  {number} year?
 * @return {number}
 */
export function getRateAmount(cat: string, percent: number, year?: number): number {
  const blah: any = year ? vaRates[year.toString()] : vaRates.latest; // TODO - fix this
  if (!(cat in blah) || !(percent in blah[cat])) return 0;
  const categoryRates = blah[cat];
  const rateAmount = categoryRates[percent.toString()];
  if (!rateAmount) return 0;
  return parseFloat(rateAmount.toString());
}

/**
 * @param  {number} rating
 * @param  {number} children
 * @param  {number} adultChildren
 * @return {number}
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
    amount += (children - 1) * getRateAmount("additionalchild", rating, year);
  }
  if (adultChildren > 0) {
    amount += adultChildren * getRateAmount("additionalchildover18", rating, year);
  }
  return amount;
}

/**
 * @param  {number} rating
 * @param  {IFamily} family
 * @return {number}
 */
export default function calculatePayment(rating: number, family: IFamily = {}, year? :number): number {
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
    : "veteran";

  const baseRatePayment = getRateAmount(rateType, rating, year);
  const spouseAidPayment = isMarried && spouseAid ? getRateAmount("aaspouse", rating, year) : 0;
  const additionalChildrenPayment = getPaymentAmountForChildren(rating, children, adultChildren, year);

  const paymentAmount = baseRatePayment + additionalChildrenPayment + spouseAidPayment;

  return paymentAmount > 0 ? paymentAmount : 0;
}
