const resolve = require('path').resolve;

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  modules: ['../../lib/module'],
  graphql: {
    AST: false,
    endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
    options: {},
  },
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};
