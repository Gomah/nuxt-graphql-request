<template>
  <div>
    <pre v-text="planets" />
  </div>
</template>

<script>
import { print } from 'graphql/language/printer';

export default {
  name: 'Index',

  data: () => ({
    planets: [],
  }),

  head() {
    return {
      title: 'Star Wars',
    };
  },

  async asyncData({ $graphql }) {
    const planetsQuery = /* GraphQL */ `
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

    const planets = await $graphql.request(planetsQuery, variables);
    return { planets };
  },
};
</script>
