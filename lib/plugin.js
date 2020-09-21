import { GraphQLClient } from 'graphql-request';

export default (ctx, inject) => {
  const clientOptions = <%= serialize(options.options) %>;

  if (<%= options.useFetchPolyfill %>) {
    require('cross-fetch/polyfill');
  }

  const client = new GraphQLClient('<%= options.endpoint %>', clientOptions);

  // Inject the graphql client to the context as $graphql
  ctx.$graphql = client;
  inject('graphql', client);
};
