---
title: Using GraphQL Document variables
description: ''
position: 7
category: 'Examples'
---

```vue
<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

const fetchSomething = async () => {
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

  const planets = await this.$graphql.default.request(query, variables);
};
</script>
```
