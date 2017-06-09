const pairWith = fn => x => [x, fn(x)];

const first = tuple => tuple[0];

const second = tuple => tuple[1];

module.exports = {
    pairWith,
    first,
    second
};
