const path = require('path');
const ALLOW_GQL_FILES = ['.graphql', '.gql'];

function graphqlRequestModule(_moduleOptions) {
  const defaults = {
    endpoint: null,
    includeNodeModules: false,
    useFetchPolyfill: true,
    options: {},
  };

  const { graphql = {} } = this.options;

  // Combine options
  const moduleOptions = {
    ...defaults,
    ...graphql,
    ..._moduleOptions,
  };

  if (
    !moduleOptions.endpoint
    && !this.options.publicRuntimeConfig.GRAPHQL_ENDPOINT
    && !this.options.privateRuntimeConfig.GRAPHQL_ENDPOINT
  ) {
    throw new Error(`[GraphQL Request] endpoint is required.`);
  }

  // Add plugin for GraphQL Request
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'graphql-request.js',
    options: moduleOptions,
  });

  // Add graphql loader
  this.extendBuild((config) => {
    const { resolve } = config;

    const hasGqlExt = resolve.extensions.some((ext) => ALLOW_GQL_FILES.includes(ext));

    if (!hasGqlExt) {
      resolve.extensions = [...resolve.extensions, ...ALLOW_GQL_FILES];
    }

    const { rules } = config.module;

    const hasGqlLoader = rules.some((rule) => rule.use === 'graphql-tag/loader');

    if (!hasGqlLoader) {
      const gqlRules = {
        test: /\.(graphql|gql)$/,
        use: 'graphql-tag/loader',
      };

      if (!moduleOptions.includeNodeModules) {
        gqlRules.exclude = /(node_modules)/;
      }

      rules.push(gqlRules);
    }
  });
}

module.exports = graphqlRequestModule;
module.exports.meta = require('../package.json');
