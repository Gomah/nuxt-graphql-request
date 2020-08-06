<template>
  <div>
    <pre v-text="pokemons" />
  </div>
</template>

<script>
import pokemonsQuery from '@/graphql/query/pokemons.gql';

export default {
  name: 'Import',

  data: () => ({
    pokemons: [],
  }),

  head() {
    return {
      title: 'Pokemons',
    };
  },

  async asyncData({ $graphql }) {
    const variables = { first: 10 };

    const pokemons = await $graphql.request(pokemonsQuery, variables);
    return { pokemons };
  },
};
</script>
