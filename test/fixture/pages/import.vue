<template>
  <div>
    <pre v-text="users" />
  </div>
</template>

<script>
import usersQuery from '@/graphql/query/users.gql';

export default {
  name: 'Import',

  data: () => ({
    users: [],
  }),

  head() {
    return {
      title: 'Users',
    };
  },

  async asyncData({ $graphql }) {
    const variables = { page: 1, limit: 5 };

    const users = await $graphql.request(usersQuery, variables);
    return { users };
  },
};
</script>
