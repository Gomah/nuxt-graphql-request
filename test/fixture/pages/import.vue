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
import countriesQuery from '@/graphql/query/countries.gql';
import starWarsQuery from '@/graphql/query/movies.gql';

export default {
  name: 'Import',

  data: () => ({
    countries: [],
    movies: [],
  }),

  head() {
    return {
      title: 'Countries + Movies',
    };
  },

  async asyncData({ $graphql }) {
    const variables = { currency: 'EUR' };

    const countries = await $graphql.countries.request(countriesQuery, variables);
    const movies = await $graphql.starWars.request(starWarsQuery);

    return {
      countries: countries.countries,
      movies: movies.allFilms.films,
    };
  },
};
</script>
