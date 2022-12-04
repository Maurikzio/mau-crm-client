import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

const GET_USER_CLIENTS = gql`
  query GetClientsBySeller {
    getClientsBySeller {
      id
      name
      lastname
      company
      email
      phone
      seller
    }
  }
`

export default function Home () {
  const { data, loading } = useQuery(GET_USER_CLIENTS)
  const router = useRouter()

  if (loading) return 'Loading....'

  if (!data?.getClientsBySeller) {
    router.push('/login')
    return null
  }

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-grey-800 font-light'>Clients</h1>
        <Link
          href='/new-client'
          className='bg-blue-800 px-5 py-2 inline-block mt-3 text-white rounded text-sm hover:bg-gray-800 uppercase font-bold'
        >New Client
        </Link>
        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Name</th>
              <th className='w-1/5 py-2'>Company</th>
              <th className='w-1/5 py-2'>Email</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {data.getClientsBySeller.map(client => (
              <tr key={client.id}>
                <td className='border px-4 py-2'>{client.name} {client.lastname}</td>
                <td className='border px-4 py-2'>{client.company}</td>
                <td className='border px-4 py-2'>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}
