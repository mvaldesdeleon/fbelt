const test = require('tape');
const sinon = require('sinon');

// functions to test
const { id, ftrue, ffalse, iif, not, and, or, xor } = require('../logic.js');

test('id', t => {
    const xs = [null, undefined, -Infinity, 'hello', new Date(), {a: 1}, [1,2,3], true, 1.23];

    t.deepEqual(xs, xs.map(id));

    t.end();
});

test('ftrue', t => {
    const xs = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, [1,2,3], true, 1.23];

    xs.map(ftrue).map(t.true);

    t.end();
});

test('ffalse', t => {
    const xs = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, [1,2,3], true, 1.23];

    xs.map(ffalse).map(t.false);

    t.end();
});

test('iif', t => {
    t.equal(typeof iif(id)(id)(id), 'function');

    const prt = sinon.spy(ftrue);
    const prf = sinon.spy(ffalse);
    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const iift = iif(prt)(ft)(ff);
    const iiff = iif(prf)(ft)(ff);

    const x = {};

    t.true(iift(x));
    t.true(prt.calledOnce);
    t.true(prt.calledWith(x));
    t.true(ft.calledOnce);
    t.true(ft.calledWith(x));
    t.true(ff.notCalled);

    ft.reset();
    ff.reset();

    t.false(iiff(x));
    t.true(prf.calledOnce);
    t.true(prf.calledWith(x));
    t.true(ft.notCalled);
    t.true(ff.calledOnce);
    t.true(ff.calledWith(x));

    t.end();
});

test('not', t => {
    t.equal(typeof not(id), 'function');

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const nott = not(ft);
    const notf = not(ff);

    const x = {};

    t.false(nott(x));
    t.true(ft.calledOnce);
    t.true(ft.calledWith(x));

    t.true(notf(x));
    t.true(ff.calledOnce);
    t.true(ff.calledWith(x));

    t.end();
});

test('and', t => {
    t.equal(typeof and(id)(id), 'function');

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const andtt = and(ft)(ft);
    const andtf = and(ft)(ff);
    const andft = and(ff)(ft);
    const andff = and(ff)(ff);

    const x = {};

    t.true(andtt(x));
    t.false(andtf(x));
    t.false(andft(x));
    t.false(andff(x));

    t.true(ft.called);
    t.true(ft.alwaysCalledWith(x));
    t.true(ff.called);
    t.true(ff.alwaysCalledWith(x));

    t.end();
});

test('or', t => {
    t.equal(typeof or(id)(id), 'function');

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const ortt = or(ft)(ft);
    const ortf = or(ft)(ff);
    const orft = or(ff)(ft);
    const orff = or(ff)(ff);

    const x = {};

    t.true(ortt(x));
    t.true(ortf(x));
    t.true(orft(x));
    t.false(orff(x));

    t.true(ft.called);
    t.true(ft.alwaysCalledWith(x));
    t.true(ff.called);
    t.true(ff.alwaysCalledWith(x));

    t.end();
});

test('xor', t => {
    t.equal(typeof xor(id)(id), 'function');

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const xortt = xor(ft)(ft);
    const xortf = xor(ft)(ff);
    const xorft = xor(ff)(ft);
    const xorff = xor(ff)(ff);

    const x = {};

    t.false(xortt(x));
    t.true(xorft(x));
    t.true(xorft(x));
    t.false(xorff(x));

    t.true(ft.called);
    t.true(ft.alwaysCalledWith(x));
    t.true(ff.called);
    t.true(ff.alwaysCalledWith(x));

    t.end();
});
