const id = x => x;

const ftrue = _ => true;

const ffalse = _ => false;

const iif = pr => t => f => x => pr(x) ? t(x) : f(x);

const not = fn => x => !fn(x);

const and = pra => prb => x => pra(x) && prb(x);

const or = pra => prb => x => pra(x) || prb(x);

const xor = pra => prb => and(or(pra)(prb))(not(and(pra)(prb)));

const equals = x => y => x === y;

module.exports = {
    id,
    ftrue,
    ffalse,
    iif,
    not,
    and,
    or,
    xor,
    equals
};
