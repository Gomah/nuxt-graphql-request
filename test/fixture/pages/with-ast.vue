<template>
  <div>
    <pre v-text="planets" />
  </div>
</template>

<script>
import { print } from 'graphql/language/printer';
import gql from 'graphql-tag';

export default {
  name: 'WithAST',

  data: () => ({
    planets: [],
  }),

  head() {
    return {
      title: 'Star Wars',
    };
  },

  async asyncData({ app }) {
    const planetsQuery = gql`
      query {
        allPlanets {
          planets {
            id
            name
          }
        }
      }
    `;

    const planets = await app.$graphql.request(planetsQuery, {});

    return { planets };
  },
};
</script>
