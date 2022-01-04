---
title: Setup
description: 'Easy Minimal GraphQL client integration with Nuxt.js.'
position: 2
category: 'Guide'
---

## Install

Install with yarn:

```bash
yarn add nuxt-graphql-request graphql --dev
```

Install with npm:

```bash
npm install nuxt-graphql-request graphql --save-dev
```

## **nuxt.config.js**

```ts
module.exports = {
  buildModules: ['nuxt-graphql-request'],

  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        /**
         * The client endpoint url
         */
        endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
        /**
         * Per-client options overrides
         * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
         */
        options: {},
      },
      secondClient: {
        // ...client config
      },
      // ...your other clients
    },

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {
      method: 'get', // Default to `POST`
    },

    /**
     * Optional
     * default: true (this includes cross-fetch/polyfill before creating the graphql client)
     */
    useFetchPolyfill: true,

    /**
     * Optional
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },
};
```

## Runtime Config

If you need to supply your endpoint at runtime, rather than build time, you can use the [Runtime Config](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config) to provide this value:

**nuxt.config.js**

```ts
module.exports = {
  publicRuntimeConfig: {
    graphql: {
      clients: {
        default: {
          endpoint: '<client endpoint>',
        },
        secondClient: {
          endpoint: '<client endpoint>',
        },
        // ...more clients
      },
    },
  },
};
```

## TypeScript

`nuxt-shopify` offers type definitions. Just add an entry in `tsconfig.json`.

<code-group>
  <code-block label="Nuxt 2.9+" active>

```json{}[tsconfig.json]
{
  "compilerOptions": {
    "types": ["@nuxt/types", "nuxt-graphql-request"]
  }
}
```

  </code-block>
  <code-block label="Nuxt < 2.9">

```json{}[tsconfig.json]
{
  "compilerOptions": {
    "types": ["@nuxt/vue-app", "nuxt-graphql-request"]
  }
}
```

  </code-block>

</code-group>
