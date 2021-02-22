---
title: Components
description: ''
position: 3
category: 'Usage'
---

## `asyncData`

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

## `methods`/`created`/`mounted`/etc

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
