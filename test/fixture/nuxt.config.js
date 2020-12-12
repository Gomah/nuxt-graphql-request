const resolve = require('path').resolve;

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  modules: ['../../lib/module'],
  graphql: {
    endpoint: 'https://fakeql.com/graphql/53f4cad2a689cc14f5d23416069a705c',
    options: {},
  },
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};
