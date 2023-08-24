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
  name: 'Index',

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
import { parse } from 'graphql';
import { gql } from '../../../src/utils';

const { $graphql } = useNuxtApp();

const variables = { currency: 'EUR' };

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
