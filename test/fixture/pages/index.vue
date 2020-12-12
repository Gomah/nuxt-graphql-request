<template>
  <div>
    <pre v-text="countries" />
  </div>
</template>

<script>
export default {
  name: 'Index',

  data: () => ({
    countries: [],
  }),

  head() {
    return {
      title: 'Countries',
    };
  },

  async asyncData({ $graphql }) {
    const countriesQuery = /* GraphQL */ `
      query Countries($currency: String!) {
        countries(filter: { currency: { eq: $currency } }) {
          code
          name
          currency
        }
      }
    `;

    const variables = { currency: 'EUR' };

    const countries = await $graphql.request(countriesQuery, variables);
    return { countries };
  },
};
</script>
