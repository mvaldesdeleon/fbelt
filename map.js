const { iif } = require('./logic.js');
const { isArray, map } = require('./list.js');

const isObject = x => typeof x === 'object';

const keys = Object.keys.bind(Object);

const merge = maps => Object.assign(...[{}, ...maps]);

const mapO = fn => map => keys(map).reduce((newMap, key) => Object.assign(newMap, {[key]: fn(map[key])}), {});

const mapAny = fn => iif(isArray)(map(fn))(mapO(fn));

const listify = map => keys(map).reduce((list, key) => list.concat(key, map[key]), []);

module.exports = {
    isObject,
    keys,
    merge,
    mapO,
    mapAny,
    listify
};
