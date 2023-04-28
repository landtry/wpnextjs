import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'http://wpnextjs.local/graphql',
  cache: new InMemoryCache(),
})
