const resolve = require('path').resolve;

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  modules: ['../../lib/module'],
  graphql: {
    clients: {
      countries: {
        endpoint: 'https://countries.trevorblades.com/'
      },
      starWars: {
        endpoint: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      },
    },
    options: {},
  },
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};
