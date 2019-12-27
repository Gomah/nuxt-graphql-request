import { GraphQLClient } from 'graphql-request';
export default (ctx, inject) => {
  const clientOptions = <%= serialize(options.options) %>;
  const client = new GraphQLClient('<%= options.endpoint %>', clientOptions);
  const graphql = Object.create(client);

  <% if (options.AST) { %>
    const { print } = require('graphql/language/printer');
    Object.assign(graphql, {
      request: (query, variables = {}) => client.request(print(query), variables),
      rawRequest: (query, variables = {}) => client.rawRequest(print(query), variables),
    });
    <% } %>

  // Inject the graphql client to the context as $graphql
  ctx.$graphql = graphql;
  inject('graphql', graphql);
};
