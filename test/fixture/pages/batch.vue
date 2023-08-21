<template>
  <div id="test">
    <h2>Countries using EUR</h2>
    <ul>
      <li v-for="country in batch.eur" :key="country.name">
        {{ country.name }}
      </li>
    </ul>
    <h2>Countries using AUD</h2>
    <ul>
      <li v-for="country in batch.aud" :key="country.name">
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Batch',

  head() {
    return {
      title: 'Batch / Countries',
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
      name
    }
  }
`;

const { data: batch } = await useAsyncData('countries', async () => {
  const [{ data: eur }, { data: aud }] = await $graphql.countries.batchRequests([
    { document: countriesQuery, variables: { currency: 'EUR' } },
    { document: countriesQuery, variables: { currency: 'AUD' } },
  ]);

  return {
    eur: eur.countries,
    aud: aud.countries,
  };
});
</script>
