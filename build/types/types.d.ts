export interface IDisability {
    label: string;
    value: number;
}
export interface IBilateral {
    factor: number;
    percent: number;
}
interface IRate {
    '30': number;
    '40': number;
    '50': number;
    '60': number;
    '70': number;
    '80': number;
    '90': number;
    '100': number;
}
interface IRate1 extends IRate {
    '10'?: number;
    '20'?: number;
}
export interface IRates {
    veteran: IRate1;
    withspouseonly: IRate;
    withspouseandoneparent: IRate;
    withspouseandtwoparents: IRate;
    withoneparent: IRate;
    withtwoparents: IRate;
    withspouseandchild: IRate;
    withchildonly: IRate;
    withspouseoneparentandchild: IRate;
    withspousetwoparentsandchild: IRate;
    withoneparentandchild: IRate;
    withtwoparentsandchild: IRate;
    aaspouse: IRate;
    additionalchild: IRate;
    additionalchildover18: IRate;
}
export interface IFamily {
    isMarried?: boolean;
    spouseAid?: boolean;
    children?: number;
    adultChildren?: number;
    parents?: number;
}
export interface IRating {
    total: number;
    rounded: number;
    bilateral?: IBilateral;
}
export {};
