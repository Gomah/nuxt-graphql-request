import {
  addPlugin,
  addTemplate,
  addTypeTemplate,
  addVitePlugin,
  addWebpackPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import type { GraphQLClient } from 'graphql-request';
import rollupGraphql from '@rollup/plugin-graphql';
import { type UnpluginOptions, createUnplugin } from 'unplugin';

export type ClientConfig = {
  endpoint: string;
  options?: GraphQLClient['requestConfig'];
};

export interface ModuleOptions {
  clients?: {
    [key: string]: ClientConfig;
  };
  options?: GraphQLClient['requestConfig'];
  includeNodeModules?: boolean;
  useFetchPolyfill?: boolean;
}

export interface ModulePublicRuntimeConfig {
  graphql?: Pick<ModuleOptions, 'clients'>;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-graphql-request',
    configKey: 'graphql',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    includeNodeModules: false,
    useFetchPolyfill: false,
    options: {},
    clients: {},
  },
  setup(options) {
    const resolver = createResolver(import.meta.url);

    addTemplate({
      filename: 'graphql.options.mjs',
      write: true,
      getContents: () => `
          export const options = ${JSON.stringify(options, undefined, 2)}
        `,
    });

    // Make TS accept gql file imports
    addTypeTemplate({
      filename: 'types/gql-file-import.d.ts',
      getContents:
        () => `// see: https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations
declare module '*.gql';
declare module '*.graphql';
declare module '*.graphqls';`,
    });

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'));

    const rollupPlugin = rollupGraphql({
      exclude: options.includeNodeModules ? null : /node_modules/,
    });
    const webpackPlugin = createUnplugin(() => rollupPlugin as UnpluginOptions).webpack;

    // Add bundler plugins for graphql file imports
    addVitePlugin(rollupPlugin);
    addWebpackPlugin(webpackPlugin);
  },
});
