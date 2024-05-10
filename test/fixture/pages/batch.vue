<template>
  <div id="test">
    <h2>Characters, Page 1</h2>

    <ul>
      <li v-for="character in batch.first" :key="character.name">
        {{ character.name }}
      </li>
    </ul>
    <h2>Characters, Page 2</h2>
    <ul>
      <li v-for="character in batch.last" :key="character.name">
        {{ character.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Batch',

  head() {
    return {
      title: 'Batch / Rick & Morty Characters',
    };
  },
};
</script>

<script setup>
import { useAsyncData, useNuxtApp } from '#imports';
import { gql } from '../../../src/utils';

const { $graphql } = useNuxtApp();

const rickandMortyCharactersQuery = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      results {
        name
      }
    }
  }
`;

const { data: batch } = await useAsyncData('starships', async () => {
    const [{ data: first }, { data: last }] = await $graphql.rickAndMorty.batchRequests([
    { document: rickandMortyCharactersQuery, variables: { page: 1 } },
    { document: rickandMortyCharactersQuery, variables: { page: 2 } },
    ]);

  return {
    first: first.characters.results,
    last: last.characters.results,
  };
});
</script>
