import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      id
      name
      lastname
      email
    }
  }
`

const Header = () => {
  const { data, loading } = useQuery(GET_USER_INFO)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (loading) return 'Loading....'

  if (!data?.getUserInfo) {
    router.push('/login')
    return null
  }

  const { name, lastname } = data.getUserInfo

  return (
    <div className='flex justify-between gap-2'>
      <p>Hola {name} {lastname}</p>
      <button
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white'
        type='button'
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  )
}

export default Header
