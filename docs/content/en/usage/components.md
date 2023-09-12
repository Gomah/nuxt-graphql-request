---
title: Components
description: ''
position: 3
category: 'Usage'
---

## `useAsyncData`

```vue
<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

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

const { data: planets } = await useAsyncData('planets', async () => {
  const data = await $graphql.default.request(query);
  return data.allPlanets.planets;
});
</script>
```

## User-defined functions

```vue
<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

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

const planets = ref([])

const fetchPlanets = () => {
  const data = await $graphql.default.request(query);
  planets.value = data.allPlanets.planets;
}
</script>
```
