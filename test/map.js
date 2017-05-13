const test = require('tape');
const sinon = require('sinon');

const { id, ftrue } = require('../logic.js');
const { len } = require('../list.js');
// functions to test
const { isObject, keys, merge, mapO, mapAny, listify } = require('../map.js');

test('isObject', t => {
    const xs = [{}, {a: 1}, new Object(), new Date(), [], [1, 2, 3], new Array(10)];
    const ys = [null, undefined, -Infinity, NaN, 'hello', true, 1.23];

    xs.map(isObject).map(t.true);
    ys.map(isObject).map(t.false);

    t.end();
});

test('keys', t => {
    const x = {a: 1, b: 2, c: 3, d: 4, e: 5};

    t.deepEqual(['a', 'b', 'c', 'd', 'e'], keys(x));
    t.end();
});

test('merge', t => {
    const xs = [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}];

    t.deepEqual({a: 1, b: 2, c: 3, d: 4, e: 5}, merge(xs));
    t.end();
});

test('mapO', t => {
    t.equal(typeof mapO(id), 'function');

    const x = {a: 1, b: 2, c: 3, d: 4, e: 5};

    const ft = sinon.spy(ftrue);

    const mapOt = mapO(ft);

    t.deepEqual({a: true, b: true, c: true, d: true, e: true}, mapOt(x));
    t.equal(ft.callCount, len(keys(x)));
    keys(x).map((k, i) => ft.getCall(i).calledWith(x[k])).map(t.true);

    t.end();
});

test('mapAny', t => {
    t.equal(typeof mapAny(id), 'function');

    const xs = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, [1,2,3], true, 1.23];
    const x = {a: 1, b: 2, c: 3, d: 4, e: 5};

    const ft = sinon.spy(ftrue);

    const mapAnyt = mapAny(ft);

    mapAnyt(xs).map(t.true);
    t.equal(ft.callCount, len(xs));
    xs.map((x, i) => ft.getCall(i).calledWith(x)).map(t.true);

    ft.reset();

    t.deepEqual({a: true, b: true, c: true, d: true, e: true}, mapAnyt(x));
    t.equal(ft.callCount, len(keys(x)));
    keys(x).map((k, i) => ft.getCall(i).calledWith(x[k])).map(t.true);

    t.end();
});

test('listify', t => {
    const x = {a: 1, b: 2, c: 3, d: 4, e: 5};

    t.deepEqual(['a', 1, 'b', 2, 'c', 3, 'd', 4, 'e', 5], listify(x));
    t.end();
});
