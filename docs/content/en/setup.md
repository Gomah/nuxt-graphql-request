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
     * Your GraphQL endpoint
     */
    endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {},

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
    GRAPHQL_ENDPOINT: '<your endpoint>',
  },
};
```
