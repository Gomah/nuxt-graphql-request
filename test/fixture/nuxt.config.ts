import rollupGraphql from '@rollup/plugin-graphql';

export default defineNuxtConfig({
  modules: ['../../src/module'],
  graphql: {
    clients: {
      countries: {
        endpoint: 'https://countries.trevorblades.com/',
      },
      starWars: {
        endpoint: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      },
    },
    options: {},
  },
  vite: {
    plugins: [rollupGraphql()],
  },
});
