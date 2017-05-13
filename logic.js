const iif = pr => t => f => x => pr(x) ? t(x) : f(x);

const not = fn => x => !fn(x);

const and = pra => prb => x => pra(x) && prb(x);

module.exports = {
    iif,
    not,
    and
};
