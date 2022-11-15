import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/'
  // link: new HttpLink({
  //   fetch
  // })
})

export default client
