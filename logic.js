const id = x => x;

const always = x => _ => x;

const ftrue = always(true);

const ffalse = always(false);

const iif = pr => t => f => x => pr(x) ? t(x) : f(x);

const not = fn => x => !fn(x);

const and = pra => prb => x => pra(x) && prb(x);

const or = pra => prb => x => pra(x) || prb(x);

const xor = pra => prb => and(or(pra)(prb))(not(and(pra)(prb)));

const equals = x => y => x === y;

const vnot = not(id);

const vand = pr => x => y => pr(x) && pr(y);

const vor = pr => x => y => pr(x) || pr(y);

const vxor = pr => x => and(vor(pr)(x))(not(vand(pr)(x)));

module.exports = {
    id,
    always,
    ftrue,
    ffalse,
    iif,
    not,
    and,
    or,
    xor,
    equals,
    vnot,
    vand,
    vor,
    vxor
};
