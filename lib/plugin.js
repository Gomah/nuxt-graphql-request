import { GraphQLClient } from 'graphql-request';

if (<%= options.useFetchPolyfill %>) {
  require('cross-fetch/polyfill');
}

export default (ctx, inject) => {
  const clientOptions = <%= serialize(options.options) %>;
  const contextEndpoint = (ctx.$config || {}).GRAPHQL_ENDPOINT;

  const client = new GraphQLClient(contextEndpoint || '<%= options.endpoint || '' %>', clientOptions);

  // Inject the graphql client to the context as $graphql
  ctx.$graphql = client;
  inject('graphql', client);
};
