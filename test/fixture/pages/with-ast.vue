<template>
  <div>
    <pre v-text="users" />
  </div>
</template>

<script>
import { gql } from 'graphql-request';

export default {
  name: 'WithAST',

  data: () => ({
    users: [],
  }),

  head() {
    return {
      title: 'Users',
    };
  },

  async asyncData({ app }) {
    const usersQuery = gql`
      query users($page: Int!, $limit: Int!) {
        users(page: $page, limit: $limit) {
          id
          firstname
          age
        }
      }
    `;

    const variables = { page: 1, limit: 5 };

    const users = await app.$graphql.request(usersQuery, variables);
    return { users };
  },
};
</script>
