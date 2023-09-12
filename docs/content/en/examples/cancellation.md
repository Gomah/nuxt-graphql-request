---
title: Cancellation
description: ''
position: 13
category: 'Examples'
---

It is possible to cancel a request using an `AbortController` signal.

```vue
<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

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

  const abortController = new AbortController();

  const planets = await $graphql.default.request({
    document: query,
    signal: abortController.signal,
  });

  abortController.abort();
};
</script>
```

In Node environment, AbortController is supported since version v14.17.0. For Node.js v12 you can use [abort-controller](https://github.com/mysticatea/abort-controller) polyfill.

```ts
import 'abort-controller/polyfill';

const abortController = new AbortController();
```
