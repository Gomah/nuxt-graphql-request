---
title: Batch Queries
description: ''
position: 5
category: 'Examples'
---

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    async fetchSomething() {
      const query1 = /* GraphQL */ `
        query ($id: ID!) {
          capsule(id: $id) {
            id
            landings
          }
        }
      `;

      const variables1 = {
        id: 'C105',
      };

      const query2 = /* GraphQL */ `
        {
          rockets(limit: 10) {
            active
          }
        }
      `;

      const query3 = /* GraphQL */ `
        query ($id: ID!) {
          core(id: $id) {
            id
            block
            original_launch
          }
        }
      `;

      const variables3 = {
        id: 'B1015',
      };

      try {
        const data = await this.$graphql.default.batchRequests([
          { document: query1, variables: variables1 },
          { document: query2 },
          { document: query3, variables: variables3 },
        ]);

        console.log(JSON.stringify(data, undefined, 2));
      } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        process.exit(1);
      }
    },
  },
};
</script>
```
