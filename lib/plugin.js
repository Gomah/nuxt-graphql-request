import { GraphQLClient } from 'graphql-request';

if (<%= options.useFetchPolyfill %>) {
  require('cross-fetch/polyfill');
}

export default (ctx, inject) => {
  const clientOptions = <%= serialize(options.options) %>;

  const client = new GraphQLClient('<%= options.endpoint %>', clientOptions);

  // Inject the graphql client to the context as $graphql
  ctx.$graphql = client;
  inject('graphql', client);
};
