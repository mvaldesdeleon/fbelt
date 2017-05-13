const test = require('tape');
const sinon = require('sinon');

// functions to test
const { id, ftrue, ffalse, iif, not, and, or, xor } = require('../logic.js');

test('id', t => {
    const xs = [null, undefined, -Infinity, 'hello', new Date(), {a: 1}, [1,2,3], true];

    t.deepEqual(xs, xs.map(id));
    t.end();
});

test('ftrue', t => {
    const xs = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, [1,2,3], true];

    xs.map(ftrue).map(t.true);
    t.end();
});

test('ffalse', t => {
    const xs = [null, undefined, -Infinity, NaN, 'hello', new Date(), {a: 1}, [1,2,3], true];

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
    t.true(prt.calledWithExactly(x));
    t.true(ft.calledOnce);
    t.true(ft.calledWithExactly(x));
    t.true(ff.notCalled);

    ft.reset();
    ff.reset();

    t.false(iiff(x));
    t.true(prf.calledOnce);
    t.true(prf.calledWithExactly(x));
    t.true(ft.notCalled);
    t.true(ff.calledOnce);
    t.true(ff.calledWithExactly(x));

    t.end();
});

test('not', t => {
    t.equal(typeof not(id), 'function');

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const fnt = not(ft);
    const fnf = not(ff);

    const x = {};

    t.false(fnt(x));
    t.true(ft.calledOnce);
    t.true(ft.calledWithExactly(x));

    t.true(fnf(x));
    t.true(ff.calledOnce);
    t.true(ff.calledWithExactly(x));

    t.end();
});

test('and', t => {
    t.equal(typeof and(id)(id), 'function');

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const ftt = and(ft)(ft);
    const ftf = and(ft)(ff);
    const fft = and(ff)(ft);
    const fff = and(ff)(ff);

    const x = {};

    t.true(ftt(x));
    t.false(ftf(x));
    t.false(fft(x));
    t.false(fff(x));

    t.true(ft.called);
    t.true(ft.alwaysCalledWithExactly(x));
    t.true(ff.called);
    t.true(ff.alwaysCalledWithExactly(x));

    t.end();
});

test('or', t => {
    t.equal(typeof or(id)(id), 'function');

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const ftt = or(ft)(ft);
    const ftf = or(ft)(ff);
    const fft = or(ff)(ft);
    const fff = or(ff)(ff);

    const x = {};

    t.true(ftt(x));
    t.true(ftf(x));
    t.true(fft(x));
    t.false(fff(x));

    t.true(ft.called);
    t.true(ft.alwaysCalledWithExactly(x));
    t.true(ff.called);
    t.true(ff.alwaysCalledWithExactly(x));

    t.end();
});

test('xor', t => {
    t.equal(typeof xor(id)(id), 'function');

    const ft = sinon.spy(ftrue);
    const ff = sinon.spy(ffalse);

    const ftt = xor(ft)(ft);
    const ftf = xor(ft)(ff);
    const fft = xor(ff)(ft);
    const fff = xor(ff)(ff);

    const x = {};

    t.false(ftt(x));
    t.true(ftf(x));
    t.true(fft(x));
    t.false(fff(x));

    t.true(ft.called);
    t.true(ft.alwaysCalledWithExactly(x));
    t.true(ff.called);
    t.true(ff.alwaysCalledWithExactly(x));

    t.end();
});
