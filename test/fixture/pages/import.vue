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

<script lang="ts">
export default {
  name: 'Import',

  head() {
    return {
      title: 'Countries + Movies',
    };
  },
};
</script>

<script setup lang="ts">
import { useAsyncData, useNuxtApp } from 'nuxt/app';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

import countriesQuery from '../graphql/query/countries.gql';
import starWarsQuery from '../graphql/query/movies.gql';

const { $graphql } = useNuxtApp();

const variables = { currency: 'USD' };

const typedCountriesQuery: TypedDocumentNode<{ countries: { name: string }[] }, typeof variables> =
  countriesQuery;

const typedStarWarsQuery: TypedDocumentNode<{ allFilms: { films: { title: string }[] } }> =
  starWarsQuery;

const { data: countries } = await useAsyncData('countries', async () => {
  const data = await $graphql.countries.request(typedCountriesQuery, variables);
  return data.countries;
});

const { data: movies } = await useAsyncData('movies', async () => {
  const data = await $graphql.starWars.request(typedStarWarsQuery);
  return data.allFilms.films;
});
</script>
