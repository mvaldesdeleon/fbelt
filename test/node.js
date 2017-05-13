const test = require('tape');
const sinon = require('sinon');

// functions to test
const { exportAll } = require('../node.js');

test('exportAll', t => {
    t.deepEqual({a: 1, b: 2, c: 3}, exportAll(['./test/mock/a.js', './test/mock/b.js', './test/mock/c.js']));

    t.end();
});
