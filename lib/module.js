const path = require('path');
const ALLOW_GQL_FILES = ['.graphql', '.gql'];
const { rawRequest, gql, request, GraphQLClient } = require('graphql-request');

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
module.exports.gql = gql;
module.exports.rawRequest = rawRequest;
module.exports.request = request;
module.exports.GraphQLClient = GraphQLClient;
