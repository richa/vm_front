import Link from 'next/link'
import Notifications from 'react-notify-toast'

import Header from '../components/Header'
import AccountProvider from '../providers/AccountProvider'
import '../styles/globals.css'

const footerLinks = [
  { name: 'Browse Products', href: '/products' },
  { name: 'Terms of Use', href: '/terms' },
  { name: 'Privacy Policy', href: '/policy' },
  { name: 'Contact', href: '/contact' }
]

function MyApp({ Component, pageProps }) {
  return (
    <AccountProvider>
      <Header />
      <Notifications />
      <main className='max-w-screen-2xl mx-auto pb-10 px-10 2xl:px-0'>
        <div className='min-h-screen-7/10'>
          <Component {...pageProps} />
        </div>
      </main>
      <footer className='flex flex-col justify-center items-center py-8 bg-grayLight py-12'>
        <div className='flex gap-x-3 lg:gap-x-10 text-base'>
          {footerLinks.map(({ name, href }) => {
            return <Link key={name} href={href}><a className='uppercase text-secondary border-0 border-b border-white hover:border-b-4 hover:border-primary text-xs lg:text-base'>{name}</a></Link>
          })}
        </div>
        <div className='gap-x-10 text-xs'>
          © 2022 VendingMachine
        </div>
      </footer>
    </AccountProvider>
  )
}

export default MyApp
