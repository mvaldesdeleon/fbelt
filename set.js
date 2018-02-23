const asArray = set => Array.from(set.values());

const union = sa => sb => asArray(sb).reduce((sb, a) => sb.add(a), sa);

module.exports = {
    asArray,
    union
};