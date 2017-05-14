const { id, not } = require('./logic.js');
const { compose } = require('./function.js');

const isArray = x => x instanceof Array;

const len = xs => xs.length;

const filter = fn => xs => xs.filter(fn);

const map = fn => array => array.map(fn);

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

module.exports = {
    isArray,
    len,
    filter,
    map,
    zip,
    zipWith,
    odds,
    evens,
    pairs,
    mapify,
    all,
    none,
    any
};
