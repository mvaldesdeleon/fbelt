const { iif, not, and } = require('./logic.js');
const { isArray, len, filter, map, zip, zipWith, odds, evens, pairs, mapify } = require('./list.js');
const { isObject, keys, mapO, mapAny, listify } = require('./map.js');
const { compose, apply, call, curry, flip } = require('./function.js');
const { isPromise, resolve, all, allO, allAny, traverse } = require('./promise.js');

module.exports = {
    iif, not, and,
    isArray, len, filter, map, zip, zipWith, odds, evens, pairs, mapify,
    isObject, keys, mapO, mapAny, listify,
    compose, apply, call, curry, flip,
    isPromise, resolve, all, allO, allAny, traverse
};
