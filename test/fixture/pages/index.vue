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
export default {
  name: 'Index',

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
    const countriesQuery = /* GraphQL */ `
      query Countries($currency: String!) {
        countries(filter: { currency: { eq: $currency } }) {
          name
        }
      }
    `;
    const starWarsQuery = /* GraphQL */ `
      query Movies {
        allFilms {
          films {
            title
          }
        }
      }
    `;

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
