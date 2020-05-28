<template>
  <div>
    <pre v-text="pokemons" />
  </div>
</template>

<script>
import { print } from 'graphql/language/printer';
import gql from 'graphql-tag';

export default {
  name: 'WithAST',

  data: () => ({
    pokemons: [],
  }),

  head() {
    return {
      title: 'Pokemons',
    };
  },

  async asyncData({ app }) {
    const pokemonsQuery = gql`
      query pokemons($first: Int!) {
        pokemons(first: $first) {
          id
          name
        }
      }
    `;

    const pokemons = await app.$graphql.request(pokemonsQuery, { first: 10 });
    return { pokemons };
  },
};
</script>
