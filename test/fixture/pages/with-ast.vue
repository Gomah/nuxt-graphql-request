<template>
  <div>
    <pre v-text="countries" />
  </div>
</template>

<script>
import { gql } from 'graphql-request';

export default {
  name: 'WithAST',

  data: () => ({
    countries: [],
  }),

  head() {
    return {
      title: 'Countries',
    };
  },

  async asyncData({ app }) {
    const countriesQuery = gql`
      query Countries($currency: String!) {
        countries(filter: { currency: { eq: $currency } }) {
          code
          name
          currency
        }
      }
    `;

    const variables = { currency: 'EUR' };

    const countries = await app.$graphql.request(countriesQuery, variables);
    return { countries };
  },
};
</script>
