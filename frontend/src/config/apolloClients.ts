import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
  },
  query: {
    fetchPolicy: "no-cache",
  },
};

export const apolloClientClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPH_URL,
  cache: new InMemoryCache(),
  defaultOptions,
});
