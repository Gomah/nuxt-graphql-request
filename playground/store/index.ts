import { defineStore } from 'pinia';
import { gql } from 'graphql-request';
import { useNuxtApp } from 'nuxt/app';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';

export const useMainStore = defineStore('main', {
  state: () => ({
    movies: null as { title: string }[] | null,
  }),
  actions: {
    async fetchAllMovies() {
      const query: TypedDocumentNode<{
        allFilms: { films: { title: string }[] };
      }> = parse(gql`
        query Movies {
          allFilms {
            films {
              title
            }
          }
        }
      `);

      const data = await useNuxtApp().$graphql.starWars.request(query);
      this.movies = data.allFilms.films;
    },
  },
});
