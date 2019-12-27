# 📡 GraphQL Request Module

[![npm version][npm-version-src]][npm-version-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-1a2b34.svg?style=flat-square)](https://prettier.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> Easy Minimal <a href="https://github.com/prisma-labs/graphql-request">GraphQL</a> client integration with Nuxt.js.

## Features

- Most **simple and lightweight** GraphQL client.
- Promise-based API (works with `async` / `await`).
- Typescript support.
- AST support.

## Setup

Install with yarn:

```bash
yarn add nuxt-graphql-request
```

Install with npm:

```bash
npm install nuxt-graphql-request
```

**nuxt.config.js**

```ts
module.exports = {
  modules: ['nuxt-graphql-request'],

  graphql: {
    /**
     * Your GraphQL endpoint (required)
     */
    endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',

    /**
     * Enable support for AST
     * default: false
     */
    AST: false,

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request
     */
    options: {},
  },
};
```

## Usage

### Component

**`asyncData`**

```ts
async asyncData({ $graphql, params }) {
  const query = /* GraphQL */ `
    query planets {
      allPlanets {
        planets {
          id
          name
        }
      }
    }
  `;

  const planets = await $graphql.request(query);
  return { planets };
}
```

**`methods`/`created`/`mounted`/etc**

```ts
methods: {
  async fetchSomething() {
    const query = /* GraphQL */ `
      query planets {
        allPlanets {
          planets {
            id
            name
          }
        }
      }
    `;

    const planets = await $graphql.request(query);
    this.$set(this, 'planets', planets);
  }
}
```

### Store actions (including `nuxtServerInit`)

```ts
// In store
{
  actions: {
    async fetchAllPlanets ({ commit }) {
      const query = /* GraphQL */ `
        query planets {
          allPlanets {
            planets {
              id
              name
            }
          }
        }
      `;

      const planets = await this.$graphql.request(query);
      commit('SET_PLANETS', planets)
    }
  }
}
```

### GraphQL Request Client

> <a href="https://github.com/prisma-labs/graphql-request#examples">Examples</a> from the official graphql-request library.

#### Authentication via HTTP header

In nuxt.config.ts

```ts
// nuxt.config.ts

module.exports = {
  graphql: {
    AST: false,
    endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
    options: {
      headers: {
        authorization: 'Bearer MY_TOKEN',
      },
    },
  },
};
```

Or using setHeaders / setHeader:

```ts
this.$graphql.setHeaders({ authorization: 'Bearer MY_TOKEN' });

this.$graphql.setHeader('authorization', 'Bearer MY_TOKEN');
```

#### Passing more options to fetch

In nuxt.config.ts:

```ts
// nuxt.config.ts

module.exports = {
  graphql: {
    AST: false,
    endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
    options: {
      credentials: 'include',
      mode: 'cors',
    },
  },
};
```

Or using setHeaders / setHeader:

```ts
this.$graphql.setHeaders({
  credentials: 'include',
  mode: 'cors',
});

this.$graphql.setHeader('credentials', 'include');
this.$graphql.setHeader('mode', 'cors');
```

#### Using variables

```ts
const query = /* GraphQL */ `
  query planets($first: Int) {
    allPlanets(first: $first) {
      planets {
        id
        name
      }
    }
  }
`;

const variables = { first: 10 };

const planets = await $graphql.request(query, variables);
```

#### Receiving a raw response

The `request` method will return the `data` or `errors` key from the response. If you need to access the `extensions` key you can use the `rawRequest` method:

```ts
const query = /* GraphQL */ `
  query planets($first: Int) {
    allPlanets(first: $first) {
      planets {
        id
        name
      }
    }
  }
`;

const variables = { first: 10 };

const { data, errors, extensions, headers, status } = await $graphql.rawRequest(
  endpoint,
  query,
  variables
);
console.log(JSON.stringify({ data, errors, extensions, headers, status }, undefined, 2));
```

## [FAQ](https://github.com/prisma-labs/graphql-request/blob/master/README.md#faq)

### What's the difference between `graphql-request`, Apollo and Relay?

`graphql-request` is the most minimal and simplest to use GraphQL client. It's perfect for small scripts or simple apps.

Compared to GraphQL clients like Apollo or Relay, `graphql-request` doesn't have a built-in cache and has no integrations for frontend frameworks. The goal is to keep the package and API as minimal as possible.

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## 📑 License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/dt/nuxt-graphql-request.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-graphql-request
[npm-downloads-src]: https://img.shields.io/npm/v/nuxt-graphql-request/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-graphql-request
[david-dm-src]: https://david-dm.org/gomah/nuxt-graphql-request/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/gomah/nuxt-graphql-request
