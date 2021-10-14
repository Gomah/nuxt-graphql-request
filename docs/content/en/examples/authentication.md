---
title: Authentication via HTTP header
description: ''
position: 5
category: 'Examples'
---

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

### Incrementally setting headers

If you want to set headers after the GraphQLClient has been initialised, you can use the `setHeader()` or `setHeaders()` functions.

```ts
// Set a single header
this.$graphql.default.setHeaders({ authorization: 'Bearer MY_TOKEN' });

// Override all existing headers
this.$graphql.default.setHeader('authorization', 'Bearer MY_TOKEN');
```

### Set endpoint

If you want to change the endpoint after the GraphQLClient has been initialised, you can use the `setEndpoint()` function.

```ts
this.$graphql.default.setEndpoint(newEndpoint);
```

### passing-headers-in-each-request

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
