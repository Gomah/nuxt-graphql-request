---
title: File Upload
description: ''
position: 11
category: 'Examples'
---

```vue
<script>
import { gql } from 'nuxt-graphql-request';

export default {
  methods: {
    handleFileUpload(file) {
      const mutation = gql`
        mutation uploadUserAvatar($userId: Int!, $file: Upload!) {
          updateUser(id: $userId, input: { avatar: $file })
        }
      `;

      const variables = { userId: 1, file };

      this.$graphql.request(mutation, variables);
    },
  },
};
</script>
```
