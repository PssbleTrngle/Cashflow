const { merge } = require('lodash');
const custom = require('./webpack.config')

module.exports = function override(config) {
    const merged = merge(config, custom);
    console.log(merged);
    return merged;
}