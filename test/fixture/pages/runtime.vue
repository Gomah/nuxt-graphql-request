<template>
  <div id="test">
    <h2>Countries (mergeAtRuntime)</h2>
    <ul>
      <li v-for="country in countriesMerge" :key="country.name">
        {{ country.name }}
      </li>
    </ul>
    <h2>Countries (runtimeOnly)</h2>
    <ul>
      <li v-for="country in countriesRuntimeOnly" :key="country.name">
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Index',

  head() {
    return {
      title: 'Runtime test',
    };
  },
};
</script>

<script setup lang="ts">
import { useAsyncData, useNuxtApp } from '#imports';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import { gql } from '../../../src/utils';

const { $graphql } = useNuxtApp();

const variables = { currency: 'CAD' };

const mergeAtRuntime: TypedDocumentNode<{ countries: { name: string }[] }, typeof variables> =
  parse(gql`
    query Countries($currency: String!) {
      countries(filter: { currency: { eq: $currency } }) {
        name
      }
    }
  `);

const runtimeOnly: TypedDocumentNode<{ countries: { name: string }[] }, typeof variables> = parse(
  gql`
    query Countries($currency: String!) {
      countries(filter: { currency: { eq: $currency } }) {
        name
      }
    }
  `
);

const { data: countriesMerge } = await useAsyncData('countries', async () => {
  const data = await $graphql.mergeAtRuntime.request(mergeAtRuntime, variables);
  return data.countries;
});

const { data: countriesRuntimeOnly } = await useAsyncData('countries', async () => {
  const data = await $graphql.runtimeOnly.request(runtimeOnly, variables);
  return data.countries;
});
</script>
