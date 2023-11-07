<template>
  <div>
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
    <h2>Star wars movies (store)</h2>
    <ul>
      <li v-for="movie in $nuxt.$store.movies" :key="movie.title">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Index',

  head() {
    return {
      title: 'Countries + Movies',
    };
  },
};
</script>

<script setup lang="ts">
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { gql } from 'graphql-request';
import { useAsyncData, useNuxtApp } from '#imports';

const { $graphql } = useNuxtApp();

const variables = { currency: 'USD' };

const countriesQuery: TypedDocumentNode<{ countries: { name: string }[] }, typeof variables> =
  parse(gql`
    query Countries($currency: String!) {
      countries(filter: { currency: { eq: $currency } }) {
        name
      }
    }
  `);

const starWarsQuery: TypedDocumentNode<{ allFilms: { films: { title: string }[] } }> = parse(gql`
  query Movies {
    allFilms {
      films {
        title
      }
    }
  }
`);

const { data: countries } = await useAsyncData('countries', async () => {
  const data = await $graphql.countries.request(countriesQuery, variables);
  return data.countries;
});

const { data: movies } = await useAsyncData('movies', async () => {
  const data = await $graphql.starWars.request(starWarsQuery);
  return data.allFilms.films;
});
</script>
