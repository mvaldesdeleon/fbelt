const test = require('tape');
const sinon = require('sinon');

const { id } = require('../logic.js');
// functions to test
const { isPromise, resolve, reject, all, allO, allAny, traverse } = require('../promise.js');

test('isPromise', t => {
    const xs = [Promise.resolve(), Promise.reject(), new Promise(id)];
    const ys = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, [1,2,3], true, 1.23];

    xs.map(isPromise).map(t.true);
    ys.map(isPromise).map(t.false);

    t.end();

    // the test is over, catch that rejected promise
    xs[1].catch(id);
});

test('resolve', t => {
    const x = {};

    const r = resolve(x);

    t.true(isPromise(r));
    r.then(px => {
        t.deepEqual(x, px);
        t.end();
    });
});

test('reject', t => {
    const x = {};

    const r = reject(x);

    t.true(isPromise(r));
    r.catch(err => {
        t.deepEqual(x, err);
        t.end();
    });
});

test('all', t => {
    const xs = [1, resolve(2), resolve(3)];

    const a = all(xs);

    t.true(isPromise(a));
    a.then(pxs => {
        t.deepEqual([1, 2, 3], pxs);
        t.end();
    });
});

test('allO', t => {
    const x = {a: 1, b: resolve(2), c: resolve(3)};

    const a = allO(x);

    t.true(isPromise(a));
    a.then(px => {
        t.deepEqual({a: 1, b: 2, c: 3}, px);
        t.end();
    });
});

test('allAny', t => {
    const xs = [1, resolve(2), resolve(3)];
    const x = {a: 1, b: resolve(2), c: resolve(3)};

    const axs = allAny(xs);
    const ax = allAny(x);

    t.true(isPromise(axs));
    const bxs = axs.then(pxs => t.deepEqual([1, 2, 3], pxs));

    t.true(isPromise(ax));
    const bx = ax.then(px => t.deepEqual({a: 1, b: 2, c: 3}, px));

    all([bxs, bx]).then(_ => t.end());
});

test('traverse', t => {
    const x = {
        name: resolve('john'),
        cats: [{color: 'white'}, {color: resolve('black')}],
        numbers: [1, 13, resolve(42)]
    };
    const y = {
        name: resolve('john'),
        cats: [{color: 'white'}, {color: resolve('black')}],
        numbers: [reject('boom'), 13, resolve(42)]
    };

    const a = traverse(x);
    const b = traverse(y);

    t.true(isPromise(a));
    t.true(isPromise(b));

    const aa = a.then(px => {
        t.deepEqual({
            name: 'john',
            cats: [{color: 'white'}, {color: 'black'}],
            numbers: [1, 13, 42]
        }, px);
    });

    const bb = b.catch(err => t.equal('boom', err));

    all([aa, bb]).then(_ => t.end());
});
