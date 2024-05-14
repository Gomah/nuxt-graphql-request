import type { Pinia } from 'pinia';
import { useMainStore } from '~/store';
import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(async ({ $pinia }) => {
  const store = useMainStore($pinia as Pinia);
  await store.fetchAllMovies();
  return {
    provide: {
      store,
    },
  };
});
