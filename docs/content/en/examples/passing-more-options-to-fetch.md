---
title: Passing more options to fetch
description: ''
position: 6
category: 'Examples'
---

In nuxt.config.ts:

```ts
// nuxt.config.ts

module.exports = {
  graphql: {
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
// Set a single header
this.$graphql.setHeader('credentials', 'include');
this.$graphql.setHeader('mode', 'cors');

// Override all existing headers
this.$graphql.setHeaders({
  credentials: 'include',
  mode: 'cors',
});
```
