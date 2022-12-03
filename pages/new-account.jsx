import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'

const NEW_ACCOUNT_QUERY = gql`
  mutation NewUser($input: UserInput) {
    newUser(input: $input) {
      name
      lastname
      createdWhen
      id
      email
    }
  }
`

/*
  private page it will be used for users only
*/
export default function NewAccount () {
  const [message, setMessage] = useState(null)
  const [newUser] = useMutation(NEW_ACCOUNT_QUERY)

  const router = useRouter()

  // form validation
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Email is not valid').required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
    }),
    onSubmit: async (values) => {
      const { name, lastname, email, password } = values
      try {
        // data es la respuesta del servidor y sera la respuesta que en nuestro cso pusimos en NEW_ACCOUNT_QUERY
        const { data } = await newUser({
          variables: {
            input: {
              name,
              lastname,
              email,
              password
            }
          }
        })
        setMessage(`Successfully created account for ${data.newUser.name}!`)
        setTimeout(() => {
          setMessage(null)

          // redirect to login
          router.push('/login')
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
      <h1 className='text-center text-2xl text-white font-light'>Create New Account</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.name && formik.touched.name) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.name}</p> : null}
            </div>
            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastname'>
                Last Name
              </label>
              <input
                type='text'
                id='lastname'
                name='lastname'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Last name'
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.lastname && formik.touched.lastname) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.lastname}</p> : null}
            </div>
            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                name='email'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.email && formik.touched.email) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.email}</p> : null}
            </div>

            <div className='pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                name='password'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Password'
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
              value='Create account'
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}
