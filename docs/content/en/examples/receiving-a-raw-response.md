---
title: Receiving a raw response
description: ''
position: 10
category: 'Examples'
---

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

const { data, errors, extensions, headers, status } = await this.$graphql.rawRequest(
  endpoint,
  query,
  variables
);
console.log(JSON.stringify({ data, errors, extensions, headers, status }, undefined, 2));
```
