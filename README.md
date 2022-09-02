[![nuxt-graphql-request](https://nuxt-graphql-request.vercel.app/preview.png)](https://nuxt-graphql-request.vercel.app)

# 📡 GraphQL Request Module

![ci](https://github.com/gomah/nuxt-graphql-request/workflows/CI/badge.svg)
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
- GraphQL Loader support.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

Install with yarn:

```bash
yarn add nuxt-graphql-request graphql --dev
```

Install with npm:

```bash
npm install nuxt-graphql-request graphql --save-dev
```

**nuxt.config.js**

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

### Runtime Config

If you need to supply your endpoints at runtime, rather than build time, you can use the [Runtime Config](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config) to provide your values:

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

## Usage

### Component

**`asyncData`**

```ts
import { gql } from 'nuxt-graphql-request';

export default {
  async asyncData({ $graphql, params }) {
    const query = gql`
      query planets {
        allPlanets {
          planets {
            id
            name
          }
        }
      }
    `;

    const planets = await $graphql.default.request(query);
    return { planets };
  },
};
```

**`methods`/`created`/`mounted`/etc**

```ts
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
      const query = gql`
        query planets {
          allPlanets {
            planets {
              id
              name
            }
          }
        }
      `;

      const planets = await this.$graphql.default.request(query);
      this.$set(this, 'planets', planets);
    },
  },
};
```

### Store actions (including `nuxtServerInit`)

```ts
import { gql } from 'nuxt-graphql-request';

// In store
export default {
  actions: {
    async fetchAllPlanets({ commit }) {
      const query = gql`
        query planets {
          allPlanets {
            planets {
              id
              name
            }
          }
        }
      `;

      const planets = await this.$graphql.default.request(query);
      commit('SET_PLANETS', planets);
    },
  },
};
```

### GraphQL Request Client

> <a href="https://github.com/prisma-labs/graphql-request#examples">Examples</a> from the official graphql-request library.

#### Authentication via HTTP header

In nuxt.config.ts

```ts
// nuxt.config.ts

module.exports = {
  graphql: {
    clients: {
      default: {
        endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
        options: {
          headers: {
            authorization: 'Bearer MY_TOKEN',
          },
        },
      },
    },
  },
};
```

##### Incrementally setting headers

If you want to set headers after the GraphQLClient has been initialised, you can use the `setHeader()` or `setHeaders()` functions.

```ts
// Set a single header
this.$graphql.default.setHeaders({ authorization: 'Bearer MY_TOKEN' });

// Override all existing headers
this.$graphql.default.setHeader('authorization', 'Bearer MY_TOKEN');
```

##### Set endpoint

If you want to change the endpoint after the GraphQLClient has been initialised, you can use the `setEndpoint()` function.

```ts
this.$graphql.default.setEndpoint(newEndpoint);
```

##### passing-headers-in-each-request

It is possible to pass custom headers for each request. `request()` and `rawRequest()` accept a header object as the third parameter

```vue
<script>
const requestHeaders = {
  authorization: 'Bearer MY_TOKEN',
};

export default {
  methods: {
    async fetchSomething() {
      const query = gql`
        query planets {
          allPlanets {
            planets {
              id
              name
            }
          }
        }
      `;

      // Overrides the clients headers with the passed values
      const planets = await this.$graphql.default.request(query, {}, requestHeaders);
      this.$set(this, 'planets', planets);
    },
  },
};
</script>
```

#### Passing more options to `fetch`

In nuxt.config.ts:

```ts
// nuxt.config.ts

module.exports = {
  graphql: {
    clients: {
      default: {
        endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
        options: {
          credentials: 'include',
          mode: 'cors',
        },
      },
    },
  },
};
```

Or using setHeaders / setHeader:

```ts
// Set a single header
this.$graphql.default.setHeader('credentials', 'include');
this.$graphql.default.setHeader('mode', 'cors');

// Override all existing headers
this.$graphql.default.setHeaders({
  credentials: 'include',
  mode: 'cors',
});
```

#### Using GraphQL Document variables

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
      const query = gql`
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

      const planets = await this.$graphql.default.request(query, variables);
    },
  },
};
</script>
```

#### Error handling

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
      const query = gql`
        {
          Movie(title: "Inception") {
            releaseDate
            actors {
              fullname # "Cannot query field 'fullname' on type 'Actor'. Did you mean 'name'?"
            }
          }
        }
      `;

      try {
        const data = await this.$graphql.default.request(endpoint, query);
        console.log(JSON.stringify(data, undefined, 2));
      } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        process.exit(1);
      }
    },
  },
};
</script>
```

#### GraphQL Mutations

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
      const mutation = gql`
        mutation AddMovie($title: String!, $releaseDate: Int!) {
          insert_movies_one(object: { title: $title, releaseDate: $releaseDate }) {
            title
            releaseDate
          }
        }
      `;

      const variables = {
        title: 'Inception',
        releaseDate: 2010,
      };

      const data = await this.$graphql.default.request(mutation, variables);
    },
  },
};
</script>
```

#### Receiving a raw response

The `request` method will return the `data` or `errors` key from the response. If you need to access the `extensions` key you can use the `rawRequest` method:

```ts
import { gql } from 'nuxt-graphql-request';

const query = gql`
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

const { data, errors, extensions, headers, status } = await this.$graphql.default.rawRequest(
  endpoint,
  query,
  variables
);
console.log(JSON.stringify({ data, errors, extensions, headers, status }, undefined, 2));
```

#### File Upload

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    handleFileUpload(file) {
      const mutation = gql`
        mutation uploadUserAvatar($userId: Int!, $file: Upload!) {
          updateUser(id: $userId, input: { avatar: $file })
        }
      `;

      const variables = { userId: 1, file };

      this.$graphql.default.request(mutation, variables);
    },
  },
};
</script>
```

#### Batch queries

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
      const query1 = /* GraphQL */ `
        query ($id: ID!) {
          capsule(id: $id) {
            id
            landings
          }
        }
      `;

      const variables1 = {
        id: 'C105',
      };

      const query2 = /* GraphQL */ `
        {
          rockets(limit: 10) {
            active
          }
        }
      `;

      const query3 = /* GraphQL */ `
        query ($id: ID!) {
          core(id: $id) {
            id
            block
            original_launch
          }
        }
      `;

      const variables3 = {
        id: 'B1015',
      };

      try {
        const data = await this.$graphql.default.batchRequests([
          { document: query1, variables: variables1 },
          { document: query2 },
          { document: query3, variables: variables3 },
        ]);

        console.log(JSON.stringify(data, undefined, 2));
      } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        process.exit(1);
      }
    },
  },
};
</script>
```

#### Cancellation

It is possible to cancel a request using an `AbortController` signal.

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
      const query = gql`
        query planets {
          allPlanets {
            planets {
              id
              name
            }
          }
        }
      `;

      const abortController = new AbortController();

      const planets = await this.$graphql.default.request({
        document: query,
        signal: abortController.signal,
      });

      abortController.abort();
    },
  },
};
</script>
```

In Node environment, AbortController is supported since version v14.17.0. For Node.js v12 you can use [abort-controller](https://github.com/mysticatea/abort-controller) polyfill.

```ts
import 'abort-controller/polyfill';

const abortController = new AbortController();
```

#### Middleware

It's possible to use a middleware to pre-process any request or handle raw response.

Request & response middleware example (set actual auth token to each request & log request trace id if error caused):

```ts

function requestMiddleware(request: RequestInit) {
  const token = getToken()
  return {
    ...request,
    headers: { ...request.headers, 'x-auth-token': token },
  }
}

function responseMiddleware(response: Response<unknown>) {
  if (response.errors) {
    const traceId = response.headers.get('x-b3-traceid') || 'unknown'
    console.error(
      `[${traceId}] Request error:
        status ${response.status}
        details: ${response.errors}`
    )
  }
}

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
        options: {
          requestMiddleware: requestMiddleware,
          responseMiddleware: responseMiddleware,
        },
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

## [FAQ](https://github.com/prisma-labs/graphql-request/blob/master/README.md#faq)

#### Why use `nuxt-graphql-request` over `@nuxtjs/apollo`?

Don't get me wrong, Apollo Client is great and well maintained by the vue / nuxt community, I used Apollo Client for 18months before switching to graphql-request.

However, as I am obsessed with performances, Apollo Client doesn't work for me at all:

- I don't need another state management as the Vue ecosystem is enough (Vuex & Persisted data).
- I don't need an extra ~120kb parsed in my app for fetching my data.
- I don't need subscriptions as I use pusher.com, there are also alternatives for a WS client: [http://github.com/lunchboxer/graphql-subscriptions-client](http://github.com/lunchboxer/graphql-subscriptions-client)

#### Why do I have to install `graphql`?

`graphql-request` uses a TypeScript type from the `graphql` package such that if you are using TypeScript to build your project and you are using `graphql-request` but don't have `graphql` installed TypeScript build will fail. Details [here](https://github.com/prisma-labs/graphql-request/pull/183#discussion_r464453076). If you are a JS user then you do not technically need to install `graphql`. However, if you use an IDE that picks up TS types even for JS (like VSCode) then it's still in your interest to install `graphql` so that you can benefit from enhanced type safety during development.

#### Do I need to wrap my GraphQL documents inside the `gql` template exported by `graphql-request`?

No. It is there for convenience so that you can get the tooling support like prettier formatting and IDE syntax highlighting. You can use `gql` from `graphql-tag` if you need it for some reason too.

### What's the difference between `graphql-request`, Apollo and Relay?

`graphql-request` is the most minimal and simplest to use GraphQL client. It's perfect for small scripts or simple apps.

Compared to GraphQL clients like Apollo or Relay, `graphql-request` doesn't have a built-in cache and has no integrations for frontend frameworks. The goal is to keep the package and API as minimal as possible.

### Does nuxt-graphql-request support mutations?

Sure, you can perform any GraphQL queries & mutations as before 👍

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## Roadmap

- [ ] Support [WebSocket client](https://github.com/lunchboxer/graphql-subscriptions-client)?
- [ ] Generate [Typed Graphql-request client](https://graphql-code-generator.com/docs/plugins/typescript-graphql-request)

## 📑 License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/dt/nuxt-graphql-request.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-graphql-request
[npm-downloads-src]: https://img.shields.io/npm/v/nuxt-graphql-request/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-graphql-request
[david-dm-src]: https://david-dm.org/gomah/nuxt-graphql-request/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/gomah/nuxt-graphql-request
