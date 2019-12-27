import { NuxtGraphQLInstance } from '.';

declare module 'vuex/types/index' {
  interface Store<S> {
    $graphql: NuxtGraphQLInstance;
  }
}
