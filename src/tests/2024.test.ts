import { describe, expect, test } from '@jest/globals';
import calculatePayment, { getRateAmount, getPaymentAmountForChildren } from '../payment';

describe('2024 Rates', () => {
  test('1', () => expect(getRateAmount('veteran', 70, 2024)).toBe(1716.28));
});

describe('2024 Additional Payments', () => {
  test('10% - 2 Children', () => expect(getPaymentAmountForChildren(10, 2, 0)).toBe(0));
  test('30% - Spouse with AA', () => expect(getRateAmount('aaspouse', 30)).toBe(57.00));
});

describe('2024 Payments', () => {
  test('Babies Everywhere!', () => expect(calculatePayment(30, { children: 900 })).toBe(28434.31));
  test('1', () => expect(calculatePayment(30, { isMarried: true })).toBe(586.31));
  test('2', () => expect(calculatePayment(70, { children: 6 })).toBe(2173.28));
});

export { };
