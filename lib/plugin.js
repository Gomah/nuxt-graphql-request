import { GraphQLClient } from 'graphql-request';
import merge from 'lodash/merge';

if (<%= options.useFetchPolyfill %>) {
  require('cross-fetch/polyfill');
}

export default (ctx, inject) => {
  const baseOptions = <%= serialize(options) %>;
  const clients = <%= serialize(Object.keys(options.clients)) %>;

  const graphClients = Object.entries(baseOptions.clients)
    .map(([clientName, config]) => {
      const runtimeConfig = (
        ctx.$config
        && ctx.$config.graphql
        && ctx.$config.graphql.clients
        && ctx.$config.graphql.clients[clientName]
      ) || {};

      const clientConfig = merge({
        options: baseOptions.options,
      }, config, runtimeConfig);

      return [clientName, new GraphQLClient(clientConfig.endpoint, clientConfig.options)];
    }).reduce((clients, [name, client]) => ({
      ...clients,
      [name]: client,
    }), {});

  ctx.$graphql = graphClients;
  inject('graphql', graphClients);
};
