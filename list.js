const { id, not } = require('./logic.js');
const { compose, callWith } = require('./function.js');

const isArray = x => x instanceof Array;

const len = xs => xs.length;

const filter = fn => xs => xs.filter(fn);

const map = fn => array => array.map(fn);

const mapC = (...fns) => array => array.map(compose(...fns));

const zip = xs => ys => map((y, i) => [xs[i], y])(ys);

const zipWith = fx => fy => list => zip(fx(list))(fy(list));

const odds = filter((_, i) => !(i % 2));

const evens = filter((_, i) => i % 2);

const pairs = zipWith(odds)(evens);

const mapify = list => pairs(list).reduce((map, [key, value]) => Object.assign(map, {[key]: value}), {});

const all = pr => xs => xs.reduce((v, x) => v && pr(x), true);
//        = pr => xs => equals(len(xs))(len(filter(pr)(xs)))

const none = pr => xs => xs.reduce((v, x) => v && !pr(x), true);
//         = pr => xs => equals(0)(len(filter(pr)(xs)))

const any = pr => compose(not(id), none(pr));

const uniqBy = fn => xs => (seen => xs.reduce((uniq, x) => (key => key && !seen[key] ? (seen[key] = true, uniq.concat(x)) : uniq)(fn(x)) , []))({});

const ap = fns => x => map(callWith(x))(fns);
//            = flip(compose(map, callWith))

const mapply = fns => xs => xs.reduce((xs, x, i) => xs.concat(fns[i](x)), []);

const find = pr => xs => xs.find(pr);

const toArray = xs => isArray(xs) ? xs : [];

const cons = x => xs => [x, ...xs];

const push = x => xs => [...xs, x];

const contains = x => xs => xs.includes(x);

module.exports = {
    isArray,
    len,
    filter,
    map,
    mapC,
    zip,
    zipWith,
    odds,
    evens,
    pairs,
    mapify,
    all,
    none,
    any,
    uniqBy,
    ap,
    mapply,
    find,
    toArray,
    cons,
    push,
    contains
};
