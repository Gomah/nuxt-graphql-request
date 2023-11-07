import { defineNuxtPlugin } from '#imports';
import type { Pinia } from 'pinia';
import { useMainStore } from '~/store';

export default defineNuxtPlugin(async ({ $pinia }) => {
  const store = useMainStore($pinia as Pinia);
  await store.fetchAllMovies();
  return {
    provide: {
      store,
    },
  };
});
