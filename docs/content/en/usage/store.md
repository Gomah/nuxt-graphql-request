---
title: Store actions
description: ''
position: 4
category: 'Usage'
---

## Store actions

```ts
import { defineStore } from 'pinia';
import { gql } from 'nuxt-graphql-request/utils';
import { useNuxtApp } from 'nuxt/app';

type Planet = { id: number; name: string };

export const useMainStore = defineStore('main', {
  state: () => ({
    planets: null as Planet[] | null,
  }),
  actions: {
    async fetchAllPlanets() {
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

      const data = await useNuxtApp().$graphql.default.request(query);
      this.planets = data.allPlanets.planets;
    },
  },
});
```
