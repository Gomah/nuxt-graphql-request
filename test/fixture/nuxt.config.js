const resolve = require('path').resolve;

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  modules: ['../../lib/module'],
  graphql: {
    endpoint: 'https://fakeql.com/graphql/71e21b32b0b1b8e5661f9a117183be66',
    options: {},
  },
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};
