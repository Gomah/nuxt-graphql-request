---
title: File Upload
description: ''
position: 11
category: 'Examples'
---

```vue
<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

const handleFileUpload = (file) => {
  const mutation = gql`
    mutation uploadUserAvatar($userId: Int!, $file: Upload!) {
      updateUser(id: $userId, input: { avatar: $file })
    }
  `;

  const variables = { userId: 1, file };

  $graphql.default.request(mutation, variables);
};
</script>
```
