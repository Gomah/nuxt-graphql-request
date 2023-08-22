import rollupGraphql from '@rollup/plugin-graphql';

export default defineNuxtConfig({
  modules: ['../src/module'],
  graphql: {
    clients: {
      countries: {
        endpoint: 'https://countries.trevorblades.com/',
      },
      starWars: {
        endpoint: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      },
      mergeAtRuntime: {
        endpoint: 'https://example.com',
      },
    },
    options: {},
  },
  devtools: { enabled: true },
  vite: {
    plugins: [rollupGraphql()],
  },
  runtimeConfig: {
    public: {
      graphql: {
        clients: {
          mergeAtRuntime: {
            endpoint: 'https://countries.trevorblades.com/',
          },
          runtimeOnly: {
            endpoint: 'https://countries.trevorblades.com/',
          },
        },
      },
    },
  },
});
