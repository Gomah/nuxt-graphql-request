---
title: Error handling
description: ''
position: 9
category: 'Examples'
---

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
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

      const data = await this.$graphql.default.request(mutation, variables);
    },
  },
};
</script>
```
