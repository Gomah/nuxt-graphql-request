<template>
  <div id="test">
    <h2>Countries</h2>
    <ul>
      <li v-for="country in countries" :key="country.name">
        {{ country.name }}
      </li>
    </ul>
    <h2>Star wars movies</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.title">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WithAST',

  head() {
    return {
      title: 'Countries + Movies',
    };
  },
};
</script>

<script setup>
import { useAsyncData, useNuxtApp } from 'nuxt/app';
import { gql } from 'graphql-request';

const { $graphql } = useNuxtApp();

const countriesQuery = gql`
  query Countries($currency: String!) {
    countries(filter: { currency: { eq: $currency } }) {
      code
      name
      currency
    }
  }
`;

const starWarsQuery = gql`
  query Movies {
    allFilms {
      films {
        title
      }
    }
  }
`;

const variables = { currency: 'GBP' };

const { data: countries } = await useAsyncData('countries', async () => {
  const data = await $graphql.countries.request(countriesQuery, variables);
  return data.countries;
});

const { data: movies } = await useAsyncData('movies', async () => {
  const data = await $graphql.starWars.request(starWarsQuery);
  return data.allFilms.films;
});
</script>
