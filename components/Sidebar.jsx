import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar () {
  const router = useRouter()

  console.log(router.pathname)
  return (
    <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
      <div>
        <p className='text-white text-2xl font-bold'>CRM Clients</p>
      </div>
      <nav className='mt-5 list-none text-white flex flex-col gap-2'>
        <li className={router.pathname === '/' ? 'bg-blue-800 p-3' : 'p-3'}>
          <Link href='/'>Clients</Link>
        </li>
        <li className={router.pathname === '/orders' ? 'bg-blue-800 p-3' : 'p-3'}>
          <Link href='/orders'>Orders</Link>
        </li>
        <li className={router.pathname === '/products' ? 'bg-blue-800 p-3' : 'p-3'}>
          <Link href='/products'>Products</Link>
        </li>
      </nav>
    </aside>
  )
}
