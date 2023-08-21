import { defineNuxtPlugin } from '#app';
import { GraphQLClient } from 'graphql-request';
import { mergeAll } from 'ramda';
import type { ModuleOptions } from '../module';
import { options as baseOptions } from '#build/graphql.options.mjs';

/**
 * Object.entries with better type inference
 * @see https://github.com/3x071c/lsg-remix/blob/d1f9317b09edd815487617e2e70f749f9ebe99d0/app/lib/util/entries.ts
 */
const entries = <O extends Record<string, unknown>>(
  obj: O
): {
  readonly [K in keyof O]: [K, O[K]];
}[keyof O][] => {
  return Object.entries(obj) as {
    [K in keyof O]: [K, O[K]];
  }[keyof O][];
};

export default defineNuxtPlugin(async (nuxtApp) => {
  if (baseOptions.useFetchPolyfill) {
    globalThis.fetch = (await import('cross-fetch')).fetch;
  }

  const graphClients = {} as Record<keyof typeof baseOptions.clients, GraphQLClient>;

  for (const [clientName, clientConfig] of entries(baseOptions.clients)) {
    const runtimeOptions = nuxtApp.$config.graphql as ModuleOptions | undefined;
    const runtimeClientConfig = runtimeOptions?.clients?.[clientName];
    const mergedConfig = mergeAll([
      baseOptions,
      clientConfig,
      runtimeClientConfig ?? {},
    ]) as typeof baseOptions & typeof clientConfig & NonNullable<typeof runtimeClientConfig>;

    graphClients[clientName] = new GraphQLClient(mergedConfig.endpoint, mergedConfig.options);
  }

  return {
    provide: {
      graphql: graphClients,
    },
  };
});
