import { describe, expect, test } from '@jest/globals';
import calculatePayment, { getPaymentAmountForChildren, getRateAmount } from '../payment';

describe('Get Rate Amount', () => {
  test('Past rates', () => expect(getRateAmount('veteran', 30, 2020)).toBe(435.69));
});

describe('Get Payment Amount for Children', () => {
  test('Past year', () => expect(getPaymentAmountForChildren(60, 2, 0, 2020)).toBe(51));
  test('Past year with adult children', () => expect(getPaymentAmountForChildren(60, 1, 1, 2020)).toBe(166));
});

describe('Get Payment Amount', () => {
  test('Past year', () => expect(calculatePayment(60, undefined, 2020)).toBe(1131.68));
  test('Past year with family', () => expect(calculatePayment(60, { isMarried: true }, 2020)).toBe(1234.68));
});

export { };
