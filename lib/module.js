const path = require('path');

function graphqlRequestModule(_moduleOptions) {
  const defaults = {
    endpoint: null,
    AST: false,
    options: {},
  };

  const { graphql = {} } = this.options;

  // Combine options
  const moduleOptions = {
    ...defaults,
    ...graphql,
    ..._moduleOptions,
  };

  if (!moduleOptions.endpoint) {
    throw new Error(`[GraphQL Request] endpoint is required.`);
  }

  // Add plugin for GraphQL Request
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'graphql-request.js',
    options: moduleOptions,
  });
}

module.exports = graphqlRequestModule;
module.exports.meta = require('../package.json');
