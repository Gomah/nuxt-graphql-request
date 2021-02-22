---
title: Using GraphQL Document variables
description: ''
position: 7
category: 'Examples'
---

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
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
    },
  },
};
</script>
```
