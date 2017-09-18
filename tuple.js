const pairWith = fn => x => [x, fn(x)];

const first = tuple => tuple[0];

const second = tuple => tuple[1];

const mapFirst = fn => ([first, second]) => ([fn(first), second]);

const mapSecond = fn => ([first, second]) => ([first, fn(second)]);

module.exports = {
    pairWith,
    first,
    second,
    mapFirst,
    mapSecond
};
