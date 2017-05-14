const test = require('tape');
const sinon = require('sinon');

const { ftrue } = require('../logic.js');
// functions to test
const { arity, ary, compose, apply, call, curry, flip } = require('../function.js');

test('arity', t => {
    const f0 = () => void 0;
    const f1 = (a) => void 0;
    const f2 = (a, b) => void 0;
    const f3 = (a, b, c) => void 0;

    t.equal(0, arity(f0));
    t.equal(1, arity(f1));
    t.equal(2, arity(f2));
    t.equal(3, arity(f3));

    t.end();
});

test('ary', t => {
    const f0 = () => void 0;
    const f1 = (a) => void 0;
    const f2 = (a, b) => void 0;
    const f3 = (a, b, c) => void 0;

    t.equal(0, ary(f0));
    t.equal(1, ary(f1));
    t.equal(2, ary(f2));
    t.equal(3, ary(f3));

    t.end();
});

test('compose', t => {
    const inc = x => ++x;

    const a = sinon.spy(inc);
    const b = sinon.spy(inc);
    const c = sinon.spy(inc);
    const d = sinon.spy(inc);
    const e = sinon.spy(inc);

    const f = compose(e, d, c, b, a);

    t.equal(5, f(0));
    t.true(a.calledOnce);
    t.true(a.calledWith(0));
    t.true(a.calledImmediatelyBefore(b));
    t.true(b.calledOnce);
    t.true(b.calledWith(1));
    t.true(b.calledImmediatelyBefore(c));
    t.true(c.calledOnce);
    t.true(c.calledWith(2));
    t.true(c.calledImmediatelyBefore(d));
    t.true(d.calledOnce);
    t.true(d.calledWith(3));
    t.true(d.calledImmediatelyBefore(e));
    t.true(e.calledOnce);
    t.true(e.calledWith(4));

    t.end();
});

test('apply', t => {
    const f = sinon.spy(ftrue);
    const f3 = (a, b, c) => f(a, b, c);

    const applyf = apply(f3);

    const f2 = applyf(0);
    const f1 = applyf(0, 1);
    const f0 = applyf(0, 1, 2);

    t.true(f.notCalled);

    t.true(f2(1, 2));
    t.true(f.calledOnce);
    t.true(f.calledWith(0, 1, 2));

    f.reset();

    t.true(f1(2));
    t.true(f.calledOnce);
    t.true(f.calledWith(0, 1, 2));

    f.reset();

    t.true(f0());
    t.true(f.calledOnce);
    t.true(f.calledWith(0, 1, 2));

    t.end();
});

test('call', t => {
    const f = sinon.spy(ftrue);

    t.true(call(f));
    t.true(f.calledOnce);
    t.true(f.calledWith());

    t.end();
});

test('curry', t => {
    const f = sinon.spy(ftrue);
    const f3 = (a, b, c) => f(a, b, c);

    const curryf = curry(f3);
    const f1 = curryf(0)(1);

    t.true(f.notCalled);

    t.true(f1(2));
    t.true(f.calledOnce);
    t.true(f.calledWith(0, 1, 2));

    t.end();
});

test('flip', t => {
    const fi = sinon.spy(ftrue);
    const fo = sinon.spy(_ => fi);

    const f = flip(fo);

    t.true(f(true)(false));
    t.true(fo.calledOnce);
    t.true(fo.calledWith(false));
    t.true(fi.calledOnce);
    t.true(fi.calledWith(true));

    t.end();
});
