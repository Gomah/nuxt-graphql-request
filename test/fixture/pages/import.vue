<template>
  <div>
    <pre v-text="countries" />
  </div>
</template>

<script>
import countriesQuery from '@/graphql/query/countries.gql';

export default {
  name: 'Import',

  data: () => ({
    countries: [],
  }),

  head() {
    return {
      title: 'Countries',
    };
  },

  async asyncData({ $graphql }) {
    const variables = { currency: 'EUR' };

    const countries = await $graphql.request(countriesQuery, variables);
    return { countries };
  },
};
</script>
