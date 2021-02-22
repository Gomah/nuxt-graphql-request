import type { GraphQLClient } from 'graphql-request';

declare module 'vuex/types/index' {
  interface Store<S> {
    $graphql: {
      [client: string]: GraphQLClient;
    };
  }
}
