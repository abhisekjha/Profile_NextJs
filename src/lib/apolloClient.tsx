'use client';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: "https://indexer.bigdevenergy.link/9e37ca4/v1/graphql",
    cache: new InMemoryCache(),
});