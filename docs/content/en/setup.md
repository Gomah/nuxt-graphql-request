---
title: Setup
description: 'Easy Minimal GraphQL client integration with Nuxt.js.'
position: 2
category: 'Guide'
---

## Install

<code-group>
  <code-block label="nuxi" active>

```bash
npx nuxi@latest module add graphql-request
```

  </code-block>


</code-group>

For Nuxt2, use nuxt-graphql-request v6:

```bash
yarn add nuxt-graphql-request@v6 graphql --dev
```

## **nuxt.config.ts**

```ts
export default defineNuxtConfig({
  modules: ['nuxt-graphql-request'],

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
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },
});
```

## Runtime Config

If you need to supply your endpoint at runtime, rather than build time, you can use the [Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config) to provide this value:

```ts{}[nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
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
  },
});
```

## TypeScript

Type definitions should work out-of-the-box. You should already have Typescript set up to [extend Nuxt's auto-generated config](https://nuxt.com/docs/guide/directory-structure/tsconfig). If not, you can start here:

```json{}[tsconfig.json]
{
  "extends": "./.nuxt/tsconfig.json"
}
```
