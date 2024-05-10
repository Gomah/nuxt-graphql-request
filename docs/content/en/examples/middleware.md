---
title: Middleware
description: ''
position: 14
category: 'Examples'
---

It's possible to use a middleware to pre-process any request or handle raw response.

Request & response middleware example (set actual auth token to each request & log request trace id if error caused):

```ts
function requestMiddleware(request: RequestInit) {
  const token = getToken();
  return {
    ...request,
    headers: { ...request.headers, 'x-auth-token': token },
  };
}

function responseMiddleware(response: Response<unknown>) {
  if (response.errors) {
    const traceId = response.headers.get('x-b3-traceid') || 'unknown';
    console.error(
      `[${traceId}] Request error:
        status ${response.status}
        details: ${response.errors}`
    );
  }
}

export default defineNuxtConfig({
  modules: ['nuxt-graphql-request'],

  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        /**
         * The client endpoint url
         */
        endpoint: 'https://swapi-graphql.netlify.com/.netlify/functions/index',
        /**
         * Per-client options overrides
         * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
         */
        options: {
          requestMiddleware: requestMiddleware,
          responseMiddleware: responseMiddleware,
        },
      },

      // ...your other clients
    },

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {
      method: 'get', // Default to `POST`
    },


    /**
     * Optional
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },
});
```
