---
title: Passing more options to fetch
description: ''
position: 6
category: 'Examples'
---

```ts{}[nuxt.config.ts]
export default defineNuxtConfig({
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
});
```

Or using setHeaders / setHeader:

```ts
const { $graphql } = useNuxtApp();

// Set a single header
$graphql.default.setHeader('credentials', 'include');
$graphql.default.setHeader('mode', 'cors');

// Override all existing headers
$graphql.default.setHeaders({
  credentials: 'include',
  mode: 'cors',
});
```
