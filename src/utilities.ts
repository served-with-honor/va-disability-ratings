import type { IDisability } from './types';

/**
 * @param  {number} num
 * @return {string}
 */
export function formatCurrency(num: number): string {
  return `$${num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export const round = (num: number, places = 0): number => (
  Math.round(num * 10 ** places) / 10 ** places
);

export const getInverseSideName = (side: string): string => (
  (side.match(/(left)/i) ? 'right' : 'left')
);

export const getInverseSide = (text: string): string => (
  text.replace(/(left)|(right)/i, getInverseSideName(text))
);

/**
 * @param  {IDisability[]} items
 * @return {IDisability[]}
 */
export function filterBilateralMatches(items: Array<IDisability>) : [number[], number[]] {
  const listHasMatches = (item: IDisability, idx: number, arr: IDisability[]): boolean => {
    const matchingPairName = getInverseSide(item.label).toLowerCase();
    return arr.some(({ label }) => label.toLowerCase() === matchingPairName);
  };
  const listHasNoMatches = (item: IDisability, idx: number, arr: IDisability[]): boolean => {
    const matchingPairName = getInverseSide(item.label).toLowerCase();
    return arr.every((item2) => item2.label.toLowerCase() !== matchingPairName);
  };
  const onlyValues = (item: IDisability): number => item.value;

  const hasMatches = items.filter(listHasMatches).map(onlyValues);
  const noMatches = items.filter(listHasNoMatches).map(onlyValues);

  return [hasMatches, noMatches];
}
