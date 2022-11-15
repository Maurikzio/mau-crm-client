import Layout from '../components/Layout'

/*
  private page it will be used for users only
*/
export default function NewAccount () {
  return (
    <Layout>
      <h1 className='text-center text-2xl text-white font-light'>Create New Account</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='email'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Name'
              />
            </div>
            <div className='mb-4'>
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
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                name='email'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-700'
                autoComplete='off'
                placeholder='Email'
              />
            </div>

            <div>
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
              />
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
