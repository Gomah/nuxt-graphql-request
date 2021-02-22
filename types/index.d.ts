import Vue from 'vue';
import './vuex';
import type { GraphQLClient } from 'graphql-request';

declare module '@nuxt/vue-app' {
  interface Context {
    $graphql: {
      [client: string]: GraphQLClient;
    };
  }

  interface NuxtAppOptions {
   $graphql: {
      [client: string]: GraphQLClient;
    };
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
   $graphql: {
      [client: string]: GraphQLClient;
    };
  }

  interface NuxtAppOptions {
   $graphql: {
      [client: string]: GraphQLClient;
    };
  }
}

declare module 'vue/types/vue' {
  interface Vue {
   $graphql: {
      [client: string]: GraphQLClient;
    };
  }
}

declare module 'vuex' {
  interface Store<S> {
   $graphql: {
      [client: string]: GraphQLClient;
    };
  }
}
