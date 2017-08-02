const { iif, id, isUndefined } = require('./logic.js');
const { isArray, map, ap } = require('./list.js');
const { callWith } = require('./function.js');

const isObject = x => typeof x === 'object' && x;

const isPlainObject = x => typeof x === 'object' && x !== null && x == '[object Object]';

const keys = Object.keys.bind(Object);

const merge = maps => Object.assign(...[{}, ...maps]);

const mapO = fn => map => keys(map).reduce((newMap, key) => Object.assign(newMap, {[key]: fn(map[key])}), {});

const mapAny = fn => iif(isArray)(map(fn))(mapO(fn));

const mapplyO = fnmap => map => Object.keys(map).reduce((newMap, key) => Object.assign(newMap, {[key]: (fnmap[key] ? fnmap[key] : id)(map[key])}), {});

const listify = map => keys(map).reduce((list, key) => list.concat(key, map[key]), []);

const apO = fnm => x => mapO(callWith(x))(fnm);

const apAny = fnsm => iif(isArray)(ap(fnsm))(apO(fnsm));

const remap = remap => map => Object.keys(map).reduce((newMap, key) => Object.assign(newMap, {[remap[key] ? remap[key] : key]: map[key]}), {});

const remove = fnmap => map => Object.keys(map).reduce((newMap, key) => Object.assign(newMap, fnmap[key] && fnmap[key](map[key]) ? {} : {[key]: map[key]}), {});

const pick = props => map => props.reduce((newMap, prop) => isUndefined(map[prop]) ? newMap : Object.assign(newMap, {[prop]: map[prop]}), {});

const get = prop => map => map[prop];

module.exports = {
    isObject,
    isPlainObject,
    keys,
    merge,
    mapO,
    mapplyO,
    mapAny,
    listify,
    apO,
    apAny,
    remap,
    remove,
    pick,
    get
};
