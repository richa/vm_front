import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { notify } from 'react-notify-toast'
import { useAccount } from '../../providers/AccountProvider'
import { useProducts } from '../../providers/ProductsProvider'
import { createProduct } from '../../providers/products/actions'

export default function NewProduct() {
  const router = useRouter()
  const { loading, currentUser } = useAccount()
  const { setProducts } = useProducts()

  const [product, setProduct] = useState({name: ''})
  const [errors, setErrors] = useState(null)

  if (!loading && !currentUser) Router.push('/login')

  const  onCreate = async () => {
    const res = await createProduct(product)

    if (res.current) {
      setErrors(null)
      notify.show('Product created successfully!', 'success')

      await setProducts({
        current: res.current
      })

      Router.push(`/product/${res.current.id}`)
    } else {
      setErrors(res.errors)
    }
  }

  return (
    <>
      <div className='flex justify-between pt-4 items-center'>
        <Link href='/products'><a className='text-sm lg:text-base uppercase text-archivo font-bold text-primary border-0 border-b border-white hover:border-b-4 hover:border-primary tracking-widest'>{'< Back'}</a></Link>
      </div>
      <div className='flex justify-between pb-4 items-center'>
        <h1 className='text-5xl lg:text-semi font-bold leading-none py-8'>New Product</h1>
      </div>
      <div className='flex bg-grayLight py-4'>
        <div className='flex justify-start items-start w-full max-w-4xl mx-auto'>
          <div className='w-full text-lg flex flex-col justify-between my-4'>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-bold tracking-wider text-archivo'>
              <div className='py-2'>
                <span className='uppercase block'>Name</span>
                <input type='text' className='border border-gray p-1 focus:outline-none w-full' value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} />
                {errors?.name && <div className='text-error text-sm mt-2 text-left w-full'>{errors.name}</div>}
              </div>
              <div className='py-2'>
                <span className='uppercase block'>Cost</span>
                <input type='text' className='border border-gray p-1 focus:outline-none w-full' value={product.cost} onChange={(e) => setProduct({...product, cost: e.target.value})} />
                {errors?.cost && <div className='text-error text-sm mt-2 text-left w-full'>{errors.cost}</div>}
              </div>
              <div className='py-2'>
                <span className='uppercase block'>Amount Available</span>
                <input type='text' className='border border-gray p-1 focus:outline-none w-full' value={product.amount_available} onChange={(e) => setProduct({...product, amount_available: e.target.value})} />
                {errors?.amount_available && <div className='text-error text-sm mt-2 text-left w-full'>{errors.amount_available}</div>}
              </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 items-center'>
              <button
                className="bg-secondaryDark text-white text-xl px-12 py-3 my-4 hover:bg-secondary outline-none focus:outline-none uppercase"
                type="button"
                onClick={onCreate}
              >
                Create
              </button>
              <span>&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
