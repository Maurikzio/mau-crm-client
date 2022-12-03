import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($input: AuthInput) {
    authenticateUser(input: $input) {
      token
  }
}
`

export default function Login () {
  const [message, setMessage] = useState(null)
  // mutation to login, useMutation nos retorna la function.
  const [authenticateUser] = useMutation(AUTHENTICATE_USER)

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email is not valid').required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
    }),
    onSubmit: async (values) => {
      const { email, password } = values

      try {
        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password
            }
          }
        })
        // save in localstorage
        const { token } = data.authenticateUser
        localStorage.setItem('token', token)
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } catch (err) {
        setMessage(err.message)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    }
  })

  const showMessage = () => {
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <Layout>
      {message ? showMessage() : null}
      <h1 className='text-center text-2xl text-white font-light'>Login</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                name='email'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='User email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.email && formik.touched.email) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.email}</p> : null}
            </div>

            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                name='password'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='User password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.password && formik.touched.password) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.password}</p> : null}
            </div>

            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
              value='Login'
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}
