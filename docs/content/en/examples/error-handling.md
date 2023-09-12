---
title: GraphQL Mutations
description: ''
position: 8
category: 'Examples'
---

```vue
<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

const fetchSomething = async () => {
  const mutation = gql`
    mutation AddMovie($title: String!, $releaseDate: Int!) {
      insert_movies_one(object: { title: $title, releaseDate: $releaseDate }) {
        title
        releaseDate
      }
    }
  `;

  const variables = {
    title: 'Inception',
    releaseDate: 2010,
  };

  const data = await $graphql.default.request(mutation, variables);
};
</script>
```
