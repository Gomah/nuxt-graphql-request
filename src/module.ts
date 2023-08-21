import {
  addPlugin,
  addTemplate,
  createResolver,
  defineNuxtModule,
  extendWebpackConfig,
} from '@nuxt/kit';
import type { RuleSetRule } from 'webpack';
import type { GraphQLClient } from 'graphql-request';

const ALLOW_GQL_FILES = ['.graphql', '.gql'];

export interface ModuleOptions {
  clients: {
    [key: string]: {
      endpoint: string;
      options?: GraphQLClient['requestConfig'];
    };
  };
  options: GraphQLClient['requestConfig'];
  includeNodeModules?: boolean;
  useFetchPolyfill?: boolean;
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
    useFetchPolyfill: true,
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

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'));

    extendWebpackConfig((config) => {
      const { module = {}, resolve = {} } = config;

      const hasGqlExt = resolve.extensions?.some((ext) => ALLOW_GQL_FILES.includes(ext));

      if (!hasGqlExt) {
        resolve.extensions = [...(resolve.extensions || []), ...ALLOW_GQL_FILES];
      }

      const { rules = [] } = module;

      const hasGqlLoader = rules.some(
        (rule) => typeof rule === 'object' && rule?.use === 'graphql-tag/loader'
      );

      if (!hasGqlLoader) {
        const gqlRules: RuleSetRule = {
          test: /\.(graphql|gql)$/,
          use: 'graphql-tag/loader',
        };

        if (!options.includeNodeModules) {
          gqlRules.exclude = /(node_modules)/;
        }

        rules.push(gqlRules);
      }
    });
  },
});
