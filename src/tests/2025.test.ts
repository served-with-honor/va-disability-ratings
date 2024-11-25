import { describe, expect, test } from '@jest/globals';
import calculatePayment, { getRateAmount, getPaymentAmountForChildren } from '../payment';

describe('2025 Rates', () => {
  test('1', () => expect(getRateAmount('veteran', 70, 2025)).toBe(1759.19));
});

describe('2024 Additional Payments', () => {
  test('10% - 2 Children', () => expect(getPaymentAmountForChildren(10, 2, 0)).toBe(0));
  test('30% - Spouse with AA', () => expect(getRateAmount('aaspouse', 30, 2025)).toBe(58.43));
});

describe('2025 Payments', () => {
  test('Babies Everywhere!', () => expect(calculatePayment(30, { children: 900 }, 2025)).toBe(29149.66));
  test('1', () => expect(calculatePayment(30, { isMarried: true }, 2025)).toBe(600.97));
  test('2', () => expect(calculatePayment(70, { children: 6 }, 2025)).toBe(2227.61));
});

export { };
