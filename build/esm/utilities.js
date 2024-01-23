/**
 * @param  {number} num
 * @return {string}
 */
export function formatCurrency(num) {
    return "$".concat(num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}
export var round = function (num, places) {
    if (places === void 0) { places = 0; }
    return (Math.round(num * Math.pow(10, places)) / Math.pow(10, places));
};
export var getInverseSideName = function (side) { return ((side.match(/(left)/i) ? 'right' : 'left')); };
export var getInverseSide = function (text) { return (text.replace(/(left)|(right)/i, getInverseSideName(text))); };
/**
 * @param  {IDisability[]} items
 * @return {IDisability[]}
 */
export function filterBilateralMatches(items) {
    var listHasMatches = function (item, idx, arr) {
        var matchingPairName = getInverseSide(item.label).toLowerCase();
        return arr.some(function (_a) {
            var label = _a.label;
            return label.toLowerCase() === matchingPairName;
        });
    };
    var listHasNoMatches = function (item, idx, arr) {
        var matchingPairName = getInverseSide(item.label).toLowerCase();
        return arr.every(function (item2) { return item2.label.toLowerCase() !== matchingPairName; });
    };
    var onlyValues = function (item) { return item.value; };
    var hasMatches = items.filter(listHasMatches).map(onlyValues);
    var noMatches = items.filter(listHasNoMatches).map(onlyValues);
    return [hasMatches, noMatches];
}
export var isValidRating = function (rating) { return (rating <= 100 && rating >= 0 && rating % 10 === 0); };
