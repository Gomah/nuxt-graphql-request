import { GraphQLClient } from 'graphql-request';
import { mergeAll } from 'ramda'

if (<%= options.useFetchPolyfill %>) {
  require('cross-fetch/polyfill');
}

export default (ctx, inject) => {
  const baseOptions = <%= serialize(options) %>;

  const graphClients = Object.entries(baseOptions.clients)
    .reduce((clients, [clientName, config]) => {
      const runtimeConfig = (
        ctx.$config
        && ctx.$config.graphql
        && ctx.$config.graphql.clients
        && ctx.$config.graphql.clients[clientName]
      ) || {};

      const clientConfig = mergeAll([baseOptions, config, runtimeConfig])

      return {
        ...clients,
        [clientName]: new GraphQLClient(clientConfig.endpoint, clientConfig.options),
      };
    }, {});

  ctx.$graphql = graphClients;
  inject('graphql', graphClients);
};
