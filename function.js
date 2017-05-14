const { iif } = require('./logic.js');

const arity = fn => fn.length;

const ary = arity;

const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

const apply = fn => (...args) => fn.bind(null, ...args);

const call = fn => fn.call(null);

const curry = fn => (...args) => compose(iif(arity)(curry)(call), apply(fn))(...args);

const flip = fn => b => a => fn(a)(b);

module.exports = {
    arity,
    ary,
    compose,
    apply,
    call,
    curry,
    flip
};
