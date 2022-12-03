import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

const authMiddleware = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ?? ''
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink])
  // link: httpLin,
  // uri: 'http://localhost:4000/'
  // link: new HttpLink({
  //   fetch
  // })
})

export default client
