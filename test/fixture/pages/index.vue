<template>
  <div>
    <pre v-text="pokemons" />
  </div>
</template>

<script>
import { print } from 'graphql/language/printer';

export default {
  name: 'Index',

  data: () => ({
    pokemons: [],
  }),

  head() {
    return {
      title: 'Pokemons',
    };
  },

  async asyncData({ $graphql }) {
    const pokemonsQuery = /* GraphQL */ `
      query pokemons($first: Int!) {
        pokemons(first: $first) {
          id
          name
        }
      }
    `;

    const variables = { first: 10 };

    const pokemons = await $graphql.request(pokemonsQuery, variables);
    return { pokemons };
  },
};
</script>
