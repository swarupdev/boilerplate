import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = (ctx: any) =>
  new ApolloClient({
    // uri: process.env.GRAPHQL_SERVER as string,
    // uri: process.env.NEXT_PUBLIC_API_URL,
    uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
    credentials: "include",
    headers: {
      cookie: ctx?.req?.headers?.cookie,
      // (typeof window === 'undefined'
      //   ? ctx?.req?.headers.cookie
      //   : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            doesEmailExist: {},
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(client);
