---
title: Store actions
description: ''
position: 4
category: 'Usage'
---

## Store actions (including `nuxtServerInit`)

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
