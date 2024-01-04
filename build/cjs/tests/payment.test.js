"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var payment_1 = require("../payment");
(0, globals_1.describe)('Get Rate Type', function () {
    (0, globals_1.test)('Should return `veteran` by default', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)()).toBe('veteran');
    });
    (0, globals_1.test)('Should return `withspouseonly` when married, no children, no dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ isMarried: true })).toBe('withspouseonly');
    });
    (0, globals_1.test)('Should return `withspouseanddependentparent` when married, no children, 1 dependant parent', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ isMarried: true, parents: 1 })).toBe('withspouseandoneparent');
    });
    (0, globals_1.test)('Should return `withspouseandtwoparents` when married, no children, 2 dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ isMarried: true, parents: 2 })).toBe('withspouseandtwoparents');
    });
    (0, globals_1.test)('Should return `withoneparent` when not married, no children, 1 dependant parent', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ parents: 1 })).toBe('withoneparent');
    });
    (0, globals_1.test)('Should return `withtwoparents` when not married, no children, 2 dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ parents: 2 })).toBe('withtwoparents');
    });
    (0, globals_1.test)('Should return `withspouseandchild` when married, with children, no dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ hasChildren: true, isMarried: true })).toBe('withspouseandchild');
    });
    (0, globals_1.test)('Should return `withhchildonly` when not married, with children, no dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ hasChildren: true })).toBe('withchildonly');
    });
    (0, globals_1.test)('Should return `withspouseoneparentandchild` when married, with children, 1 dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ hasChildren: true, isMarried: true, parents: 1 })).toBe('withspouseoneparentandchild');
    });
    (0, globals_1.test)('Should return `withspousetwoparentsandchild` when married, with children, 2 dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ hasChildren: true, isMarried: true, parents: 2 })).toBe('withspousetwoparentsandchild');
    });
    (0, globals_1.test)('Should return `withoneparentandchild` when not married, with children, 1 dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ hasChildren: true, parents: 1 })).toBe('withoneparentandchild');
    });
    (0, globals_1.test)('Should return `withtwoparentsandchild` when not married, with children, 2 dependant parents', function () {
        (0, globals_1.expect)((0, payment_1.getRateType)({ hasChildren: true, parents: 2 })).toBe('withtwoparentsandchild');
    });
});
(0, globals_1.describe)('Get Rate Amount', function () {
    (0, globals_1.test)('Past rates', function () { return (0, globals_1.expect)((0, payment_1.getRateAmount)('veteran', 30, 2020)).toBe(435.69); });
});
(0, globals_1.describe)('Get Payment Amount for Children', function () {
    (0, globals_1.test)('Past year', function () { return (0, globals_1.expect)((0, payment_1.getPaymentAmountForChildren)(60, 2, 0, 2020)).toBe(51); });
    (0, globals_1.test)('Past year with adult children', function () { return (0, globals_1.expect)((0, payment_1.getPaymentAmountForChildren)(60, 1, 1, 2020)).toBe(166); });
});
(0, globals_1.describe)('Get Payment Amount', function () {
    (0, globals_1.test)('Past year', function () { return (0, globals_1.expect)((0, payment_1.default)(60, undefined, 2020)).toBe(1131.68); });
    (0, globals_1.test)('Past year with family', function () { return (0, globals_1.expect)((0, payment_1.default)(60, { isMarried: true }, 2020)).toBe(1234.68); });
});
