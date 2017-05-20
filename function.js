const { iif } = require('./logic.js');

const arity = fn => fn.length;

const ary = arity;

const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

const apply = fn => (...args) => fn.bind(null, ...args);

const call = fn => fn.call(null);

const callWith = (...args) => fn => fn.call(null, ...args);

const effect = fn => x => (fn(x), x);

const curry = fn => (...args) => compose(iif(arity)(curry)(call), apply(fn))(...args);

const uncurry = fn => (...args) => args.reduce((fn, arg) => fn(arg), fn);

const flip = fn => b => a => fn(a)(b);

module.exports = {
    arity,
    ary,
    compose,
    apply,
    call,
    callWith,
    effect,
    curry,
    uncurry,
    flip
};
