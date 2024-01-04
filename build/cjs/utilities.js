"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBilateralMatches = exports.getInverseSide = exports.getInverseSideName = exports.round = exports.formatCurrency = void 0;
/**
 * @param  {number} num
 * @return {string}
 */
function formatCurrency(num) {
    return "$".concat(num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}
exports.formatCurrency = formatCurrency;
var round = function (num, places) {
    if (places === void 0) { places = 0; }
    return (Math.round(num * Math.pow(10, places)) / Math.pow(10, places));
};
exports.round = round;
var getInverseSideName = function (side) { return ((side.match(/(left)/i) ? 'right' : 'left')); };
exports.getInverseSideName = getInverseSideName;
var getInverseSide = function (text) { return (text.replace(/(left)|(right)/i, (0, exports.getInverseSideName)(text))); };
exports.getInverseSide = getInverseSide;
/**
 * @param  {IDisability[]} items
 * @return {IDisability[]}
 */
function filterBilateralMatches(items) {
    var listHasMatches = function (item, idx, arr) {
        var matchingPairName = (0, exports.getInverseSide)(item.label).toLowerCase();
        return arr.some(function (item2) { return item2.label.toLowerCase() === matchingPairName; });
    };
    var listHasNoMatches = function (item, idx, arr) {
        var matchingPairName = (0, exports.getInverseSide)(item.label).toLowerCase();
        return arr.every(function (item2) { return item2.label.toLowerCase() !== matchingPairName; });
    };
    var onlyValues = function (item) { return item.value; };
    var hasMatches = items.filter(listHasMatches).map(onlyValues);
    var noMatches = items.filter(listHasNoMatches).map(onlyValues);
    return [hasMatches, noMatches];
}
exports.filterBilateralMatches = filterBilateralMatches;
