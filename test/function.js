const test = require('tape');
const sinon = require('sinon');

const { ftrue } = require('../logic.js');
// functions to test
const { arity, compose, apply, call, curry, flip } = require('../function.js');

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

test('compose', t => {
    t.end();
});

test('apply', t => {
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
