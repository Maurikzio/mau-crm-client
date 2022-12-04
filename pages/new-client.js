import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const NEW_CLIENT = gql`
  mutation NewClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastname
      company
      email
      seller
    }
  }
`

// el query con el que obtenemos la lista de clientes del User/Seller
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

const NewClient = () => {
  const [message, setMessage] = useState(null)
  const [newClient] = useMutation(NEW_CLIENT, {
    // actualizamos el cache - para no hacer una consulta extra a la base de datos para obtener cliente(objeto) anadido recientemente
    update (cache, { data: { newClient } }) {
      // get the cache we wanna update
      const { getClientsBySeller } = cache.readQuery({ query: GET_USER_CLIENTS })

      // reescribimos el cache (el cache nuna se debe modificar)
      cache.writeQuery({
        query: GET_USER_CLIENTS,
        data: {
          getClientsBySeller: [...getClientsBySeller, newClient]
        }
      })
    }
  })

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      company: '',
      email: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastname: Yup.string().required('Lastname is required'),
      company: Yup.string().required('Company is required'),
      email: Yup.string().email('Email is not valid').required('Email is required')
    }),
    onSubmit: async (values) => {
      const { name, lastname, email, company, phone } = values
      try {
        await newClient({
          variables: {
            input: {
              name,
              lastname,
              company,
              email,
              phone
            }
          }
        })
        router.push('/')
      } catch (err) {
        setMessage(err.message)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
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
      <h1 className='text-2xl text-grey-800 font-light'>New Client</h1>
      {message ? showMessage() : null}
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white shadow-md px-8 py-8 mb-4' onSubmit={formik.handleSubmit}>

            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                type='text'
                name='name'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Client name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.name && formik.touched.name) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.name}</p> : null}
            </div>

            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastname'>
                Last name
              </label>
              <input
                id='lastname'
                type='text'
                name='lastname'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Client lastname'
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.lastname && formik.touched.lastname) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.lastname}</p> : null}
            </div>

            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='company'>
                Company
              </label>
              <input
                id='company'
                type='text'
                name='company'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Client company name'
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.company && formik.touched.company) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.company}</p> : null}
            </div>

            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                // type='email'
                name='email'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Client email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.email && formik.touched.email) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.email}</p> : null}
            </div>

            <div className='mb-2 pb-4 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                Phone
              </label>
              <input
                id='phone'
                type='tel'
                name='phone'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Client phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {(formik.errors.phone && formik.touched.phone) ? <p className='text-xs text-red-600 absolute bottom-0 left-0'>{formik.errors.phone}</p> : null}
            </div>

            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
              value='Register client'
            />

          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewClient
