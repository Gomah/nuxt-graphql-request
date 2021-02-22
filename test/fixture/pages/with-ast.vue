<template>
  <div>
    <h2>Countries</h2>
    <ul>
      <li v-for="country in countries">
        {{ country.name }}
      </li>
    </ul>
    <h2>Star wars movies</h2>
    <ul>
      <li v-for="movie in movies">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { gql } from '../../../lib/module';

export default {
  name: 'WithAST',

  data: () => ({
    countries: [],
    movies: [],
  }),

  head() {
    return {
      title: 'Countries + Movies',
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

    const countries = await app.$graphql.countries.request(countriesQuery, variables);

    const starWarsQuery = gql`
      query Movies {
        allFilms {
          films {
            title
          }
        }
      }
    `;

    const movies = await app.$graphql.starWars.request(starWarsQuery);

    return {
      countries: countries.countries,
      movies: movies.allFilms.films,
    };
  },
};
</script>
