<template>
  <div>
    <pre v-text="users" />
  </div>
</template>

<script>
export default {
  name: 'Index',

  data: () => ({
    users: [],
  }),

  head() {
    return {
      title: 'Users',
    };
  },

  async asyncData({ $graphql }) {
    const usersQuery = /* GraphQL */ `
      query users($page: Int!, $limit: Int!) {
        users(page: $page, limit: $limit) {
          id
          firstname
          age
        }
      }
    `;

    const variables = { page: 1, limit: 5 };

    const users = await $graphql.request(usersQuery, variables);
    return { users };
  },
};
</script>
