const { map }  = require('./list.js');
const { merge }  = require('./map.js');
const { compose } = require('./function.js');

const exportAll = compose(merge, map(require));

module.exports = {
    exportAll
};
