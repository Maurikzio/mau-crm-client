import React from 'react'
import { useQuery, gql } from '@apollo/client'

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

  if (loading) return 'Loading....'

  const { name, lastname } = data.getUserInfo

  return (
    <div className='flex justify-between gap-2'>
      <p>Hola {name} {lastname}</p>
      <button type='button'>
        Logout
      </button>
    </div>
  )
}

export default Header
