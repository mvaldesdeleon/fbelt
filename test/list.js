const test = require('tape');
const sinon = require('sinon');

const { id, ftrue, ffalse } = require('../logic.js');
// functions to test
const { isArray, len, filter, map, zip, zipWith, odds, evens, pairs, mapify } = require('../list.js');

test('isArray', t => {
    const xs = [[], [1,2,3], new Array(10)];
    const ys = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, true, 1.23];

    xs.map(isArray).map(t.true);
    ys.map(isArray).map(t.false);

    t.end();
});

test('len', t => {
    const xs = [[], [1,2,3], new Array(10)];

    t.deepEqual([0, 3, 10], xs.map(len));

    t.end();
});

test('filter', t => {
    t.equal(typeof filter(id), 'function');

    const xs = [null, undefined, -Infinity, 'hello', new Date(), {a: 1}, [1,2,3], true, 1.23];

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const filtert = filter(ft);
    const filterf = filter(ff);

    t.deepEqual(xs, filtert(xs));
    t.deepEqual([], filterf(xs));
    t.equal(ft.callCount, len(xs));
    xs.map((x, i) => ft.getCall(i).calledWith(x)).map(t.true);
    t.equal(ff.callCount, len(xs));
    xs.map((x, i) => ff.getCall(i).calledWith(x)).map(t.true);

    t.end();
});

test('map', t => {
    t.equal(typeof map(id), 'function');

    const xs = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, [1,2,3], true, 1.23];

    const ft = sinon.spy(ftrue);

    const mapt = map(ft);

    mapt(xs).map(t.true);
    t.equal(ft.callCount, len(xs));
    xs.map((x, i) => ft.getCall(i).calledWith(x)).map(t.true);

    t.end();
});

test('zip', t => {
    const xs = ['a', 'b', 'c', 'd', 'e'];
    const ys = [1, 2, 3, 4, 5];

    t.deepEqual([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]], zip(xs)(ys));

    t.end();
});

test('zipWith', t => {
    t.equal(typeof zipWith(id)(id), 'function');

    const xs = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, [1,2,3], true, 1.23];

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const zipWithtf = zipWith(map(ft))(map(ff));

    zipWithtf(xs).map(tf => t.deepEqual([true, false], tf));
    t.equal(ft.callCount, len(xs));
    xs.map((x, i) => ft.getCall(i).calledWith(x)).map(t.true);
    t.equal(ff.callCount, len(xs));
    xs.map((x, i) => ff.getCall(i).calledWith(x)).map(t.true);

    t.end();
});

test('evens', t => {
    const xs = ['a', 1, 'b', 2, 'c', 3, 'd', 4, 'e', 5];

    t.deepEqual([1, 2, 3, 4, 5], evens(xs));
    t.end();
});

test('odds', t => {
    const xs = ['a', 1, 'b', 2, 'c', 3, 'd', 4, 'e', 5];

    t.deepEqual(['a', 'b', 'c', 'd', 'e'], odds(xs));
    t.end();
});

test('pairs', t => {
    const xs = ['a', 1, 'b', 2, 'c', 3, 'd', 4, 'e', 5];

    t.deepEqual([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]], pairs(xs));
    t.end();
});

test('mapify', t => {
    const xs = ['a', 1, 'b', 2, 'c', 3, 'd', 4, 'e', 5];

    t.deepEqual({a: 1, b: 2, c: 3, d: 4, e: 5}, mapify(xs));
    t.end();
});
