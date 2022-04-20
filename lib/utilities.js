"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBilateralMatches = exports.getInverseSide = exports.getInverseSideName = exports.round = exports.formatCurrency = void 0;
/**
 * @param  {number} num
 * @return {string}
 */
function formatCurrency(num) {
    return `$${num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
exports.formatCurrency = formatCurrency;
const round = (num, places = 0) => Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
exports.round = round;
const getInverseSideName = (side) => (side.match(/(left)/i) ? "right" : "left");
exports.getInverseSideName = getInverseSideName;
const getInverseSide = (text) => text.replace(/(left)|(right)/i, (0, exports.getInverseSideName)(text));
exports.getInverseSide = getInverseSide;
/**
 * @param  {IDisability[]} items
 * @return {IDisability[]}
 */
function filterBilateralMatches(items) {
    const listHasMatches = (item, idx, arr) => {
        const matchingPairName = (0, exports.getInverseSide)(item.label).toLowerCase();
        return arr.some(item => item.label.toLowerCase() === matchingPairName);
    };
    const listHasNoMatches = (item, idx, arr) => {
        const matchingPairName = (0, exports.getInverseSide)(item.label).toLowerCase();
        return arr.every(item => item.label.toLowerCase() !== matchingPairName);
    };
    const onlyValues = (item, idx, arr) => item.value;
    const hasMatches = items.filter(listHasMatches).map(onlyValues);
    const noMatches = items.filter(listHasNoMatches).map(onlyValues);
    return [hasMatches, noMatches];
}
exports.filterBilateralMatches = filterBilateralMatches;
//# sourceMappingURL=utilities.js.map