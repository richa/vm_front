import Link from 'next/link'
import Router from 'next/router'
import { useAccount } from '../../providers/AccountProvider'

const headerLinks = [
  { name: 'Login', href: '/login' },
  { name: 'Signup', href: '/signup' }
]

const buyerLinks = [
  { name: 'Browse Products', href: '/products' },
]

const sellerLinks = [
  { name: 'My Products', href: '/products/list' },
]

export default function Header() {
  const { currentUser, logoutReq } = useAccount()

  const onLogout = () => {
    logoutReq()
    Router.push('/')
  }

  return (
    <header className='shadow'>
      <div className='max-w-screen-2xl mx-auto px-10 2xl:px-0 flex justify-between items-center py-8'>
        <Link href='/'>
          <img src='/images/logo.png' className='w-16 cursor-pointer' />
        </Link>
        <div className='order-last flex gap-x-10 text-lg'>
          {!currentUser && headerLinks.map(({ name, href }) => {
            return <Link key={name} href={href}><a className='text-secondary border-0 border-b border-white hover:border-b-4 hover:border-primary'>{name}</a></Link>
          })}

          {currentUser && buyerLinks.map(({ name, href }) => {
            return <Link key={name} href={href}><a className='text-secondary border-0 border-b border-white hover:border-b-4 hover:border-primary'>{name}</a></Link>
          })}

          {currentUser && !currentUser?.seller &&
            <Link href='/account'><a className='text-secondary border-0 border-b border-white hover:border-b-4 hover:border-primary'>Account</a></Link>
          }

          {currentUser?.seller && sellerLinks.map(({ name, href }) => {
            return <Link key={name} href={href}><a className='text-secondary border-0 border-b border-white hover:border-b-4 hover:border-primary'>{name}</a></Link>
          })}

          {currentUser && <Link href='javascript:void(0)'><a onClick={onLogout} className='text-secondary border-0 border-b border-white hover:border-b-4 hover:border-primary'>Logout</a></Link>}
        </div>
      </div>
    </header>
  )
}
