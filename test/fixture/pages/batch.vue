<template>
  <div>
    <h2>Countries using EUR</h2>
    <ul>
      <li v-for="country in eur">
        {{ country.name }}
      </li>
    </ul>
    <h2>Countries using AUD</h2>
    <ul>
      <li v-for="country in aud">
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Batch',

  data: () => ({
    eur: [],
    aud: [],
  }),

  head() {
    return {
      title: 'Batch / Countries',
    };
  },

  async asyncData({ $graphql }) {
    const countriesQuery = /* GraphQL */ `
      query Countries($currency: String!) {
        countries(filter: { currency: { eq: $currency } }) {
          name
        }
      }
    `;

    const [{ data: eur }, { data: aud }] = await $graphql.countries.batchRequests([
      { document: countriesQuery, variables: { currency: 'EUR' } },
      { document: countriesQuery, variables: { currency: 'AUD' } },
    ]);

    return {
      eur: eur.countries,
      aud: aud.countries,
    };
  },
};
</script>
