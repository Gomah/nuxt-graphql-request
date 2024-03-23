---
title: Authentication via HTTP header
description: ''
position: 5
category: 'Examples'
---

```ts{}[nuxt.config.ts]
export default defineNuxtConfig({
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
});
```

### Incrementally setting headers

If you want to set headers after the GraphQLClient has been initialised, you can use the `setHeader()` or `setHeaders()` functions.

```ts
const { $graphql } = useNuxtApp();

// Override all existing headers
$graphql.default.setHeaders({ authorization: 'Bearer MY_TOKEN' });

// Set a single header
$graphql.default.setHeader('authorization', 'Bearer MY_TOKEN');
```

### Set endpoint

If you want to change the endpoint after the GraphQLClient has been initialised, you can use the `setEndpoint()` function.

```ts
const { $graphql } = useNuxtApp();

$graphql.default.setEndpoint(newEndpoint);
```

### passing-headers-in-each-request

It is possible to pass custom headers for each request. `request()` and `rawRequest()` accept a header object as the third parameter

```vue
<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

const requestHeaders = {
  authorization: 'Bearer MY_TOKEN',
};

const planets = ref();

const fetchSomething = async () => {
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
  const data = await $graphql.default.request(query, {}, requestHeaders);
  planets.value = data.allPlanets.planets;
};
</script>
```
