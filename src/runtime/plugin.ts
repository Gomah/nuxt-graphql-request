import { defineNuxtPlugin } from '#app';
import { GraphQLClient } from 'graphql-request';
import { mergeAll } from 'ramda';
import type { ModuleOptions } from '../module';
import { entries } from '../utils';
import { options as baseOptions } from '#build/graphql.options.mjs';

export default defineNuxtPlugin(async (nuxtApp) => {
  if (baseOptions.useFetchPolyfill) {
    globalThis.fetch = (await import('cross-fetch')).fetch;
  }

  const runtimeOptions = nuxtApp.$config.public.graphql;
  const runtimeClients: typeof runtimeOptions.clients & Partial<ModuleOptions['clients']> =
    runtimeOptions?.clients;

  const graphClients = {} as Record<keyof typeof baseOptions.clients, GraphQLClient> &
    Record<keyof typeof runtimeClients, GraphQLClient>;

  // process non-runtime clients
  for (const [clientName, clientConfig] of entries(baseOptions.clients)) {
    const runtimeConfig = runtimeClients?.[clientName];
    const mergedConfig = mergeAll([
      baseOptions,
      clientConfig,
      runtimeConfig ?? {},
    ]) as typeof baseOptions & typeof clientConfig & NonNullable<typeof runtimeConfig>;

    graphClients[clientName] = new GraphQLClient(mergedConfig.endpoint, mergedConfig.options);
  }

  // process clients only defined at runtime
  for (const [clientName, clientConfig] of entries(runtimeClients)) {
    if (clientName in graphClients) continue;
    const mergedConfig = mergeAll([baseOptions, clientConfig ?? {}]) as typeof baseOptions &
      typeof clientConfig;

    graphClients[clientName] = new GraphQLClient(mergedConfig.endpoint, mergedConfig.options);
  }

  return {
    provide: {
      graphql: graphClients,
    },
  };
});
