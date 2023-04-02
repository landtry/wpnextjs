import '@/styles/tailwind.css'
import 'focus-visible'

import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/services/apollo'

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
