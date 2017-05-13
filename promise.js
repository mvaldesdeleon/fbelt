const { iif, and, not } = require('./logic.js');
const { isArray, mapify } = require('./list.js');
const { isObject, listify, mapAny } = require('./map.js');
const { compose } = require('./function.js');

const isPromise = x => x instanceof Promise;

const resolve = Promise.resolve.bind(Promise);

const all = Promise.all.bind(Promise);

const allO = map => all(listify(map)).then(mapify);

const allAny = iif(isArray)(all)(allO);

const isTraversable = and(isObject)(not(isPromise));

const traverse = x => isTraversable(x) ? compose(allAny, mapAny(traverse))(x) : resolve(x);

module.exports = {
    isPromise,
    resolve,
    all,
    allO,
    allAny,
    traverse
};
