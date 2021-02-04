import Vue from 'vue';
import './vuex';
import type { GraphQLClient } from 'graphql-request';
import type { Variables, GraphQLError } from 'graphql-request/dist/types';
import type { ASTNode } from 'graphql';

interface NuxtGraphQLInstance extends GraphQLClient {
  rawRequest<T extends any>(
    query: string | ASTNode,
    variables?: Variables
  ): Promise<{
    data?: T;
    extensions?: any;
    headers: Headers;
    status: number;
    errors?: GraphQLError[];
  }>;
  request<T extends any>(query: string | ASTNode, variables?: Variables): Promise<T>;
}

declare module '@nuxt/vue-app' {
  interface Context {
    $graphql: NuxtGraphQLInstance;
  }

  interface NuxtAppOptions {
    $graphql: NuxtGraphQLInstance;
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $graphql: NuxtGraphQLInstance;
  }

  interface NuxtAppOptions {
    $graphql: NuxtGraphQLInstance;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $graphql: NuxtGraphQLInstance;
  }
}

declare module 'vuex' {
  interface Store<S> {
    $graphql: NuxtGraphQLInstance;
  }
}
