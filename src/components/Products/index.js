import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { notify } from 'react-notify-toast'
import ProductGridList from '../ProductGridList'
import { useAccount } from '../../providers/AccountProvider'
import { useProducts } from '../../providers/ProductsProvider'

export default function Products() {
  const { loading, currentUser } = useAccount()
  const { products, errors, setProducts } = useProducts()

  useEffect(() => {
    if (!loading && !currentUser) Router.push('/login')

    if (errors?.base) {
      notify.show(errors.base, 'error')
      Router.push('/')
      return
    }
  }, [errors])

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 justify-between py-8'>
        <div>
          <p className='text-sm lg:text-base uppercase text-archivo font-bold text-grayDark tracking-widest'>Browse Products</p>
          <h1 className='text-5xl lg:text-semi font-bold leading-none py-8'>Products</h1>
        </div>
      </div>
      <div className='flex justify-end'>
        {(currentUser?.seller) && <Link href='/product/new'>
          <a className='p-3 border border-primary bg-primary text-black text-sm hover:bg-primaryDark outline-none focus:outline-none uppercase'>
          + Add New
        </a></Link>}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-24 text-start justify-center py-8'>
        {products.map((product, index) => {
          return <ProductGridList {...product} key={product.id} />
        })}
      </div>
    </>
  )
}
