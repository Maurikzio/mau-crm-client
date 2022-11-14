import Head from 'next/head'
import Sidebar from './Sidebar'

export default function Layout ({ children }) {
  return (
    <>
      <Head>
        <title>CRM</title>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css' integrity='sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==' crossOrigin='anonymous' referrerpolicy='no-referrer' />
      </Head>

      <div className='min-h-screen'>
        <div className='flex min-h-screen'>
          <Sidebar />
          <main className='p-5 sm:w-2/3 xl:w-4/5 sm:min-h-screen'>
            {children}
          </main>
        </div>
      </div>

    </>
  )
}
