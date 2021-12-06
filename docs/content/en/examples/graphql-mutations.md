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
      const query = gql`
        {
          Movie(title: "Inception") {
            releaseDate
            actors {
              fullname # "Cannot query field 'fullname' on type 'Actor'. Did you mean 'name'?"
            }
          }
        }
      `;

      try {
        const data = await this.$graphql.default.request(endpoint, query);
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
