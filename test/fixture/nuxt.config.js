const resolve = require('path').resolve;

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  modules: ['../../lib/module'],
  graphql: {
    endpoint: 'https://fakeql.com/graphql/e893c14bbdb41e38063e5aab5c67f7de',
    options: {},
  },
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};
