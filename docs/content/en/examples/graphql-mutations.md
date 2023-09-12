---
title: Error handling
description: ''
position: 9
category: 'Examples'
---

```vue
<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

const fetchSomething = async () => {
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
    const data = await $graphql.default.request(query);
    console.log(JSON.stringify(data, undefined, 2));
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    process.exit(1);
  }
};
</script>
```
