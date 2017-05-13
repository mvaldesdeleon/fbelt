const { iif } = require('./logic.js');
const { len } = require('./list.js');

const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

const call = fn => fn.call(null);

const curry = fn => (...args) => iif(len)(curry)(call)(fn.bind(null, ...args));

const flip = fn => b => a => fn(a, b);

module.exports = {
    compose,
    call,
    curry,
    flip
};
