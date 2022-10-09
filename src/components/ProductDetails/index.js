import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { notify } from 'react-notify-toast'
import PurchaseDetails from '../PurchaseDetails'
import { useAccount } from '../../providers/AccountProvider'
import { useProducts } from '../../providers/ProductsProvider'
import { getProduct, updateProduct, deleteProduct, buyProduct } from '../../providers/products/actions'

export default function ProductDetails() {
  const router = useRouter()
  const { loading, currentUser } = useAccount()
  const { current, setProducts } = useProducts()

  const [product, setProduct] = useState({})
  const [purchase, setPurchase] = useState({})
  const [quantity, setQuantity] = useState(0)
  const [errors, setErrors] = useState(null)

  const {
    name, cost, amount_available, seller
  } = current || {}

  if (!loading && !currentUser) Router.push('/login')

  const canAccessForm = currentUser?.seller && currentUser?.id === current?.seller?.id

  useEffect(() => {
    if (current) {
      setProduct(current)
    }
  }, [current])

  const onUpdate = async () => {
    const res = await updateProduct({ product })
    if (res.current) {
      setErrors(null)
      notify.show('Product updated successfully!', 'success')

      await setProducts({
        ...res
      })
    } else {
      setErrors(res.errors)
    }
  }

  const  onDelete = async () => {
    const res = await deleteProduct(product.id)
    if (res.status) {
      setErrors(null)
      notify.show('Product deleted successfully!', 'success')

      Router.push('/products')
    } else {
      notify.show(res.errors?.base || 'Something went wrong!', 'error')
    }
  }

  const onBuyProduct = async () => {
    const res = await buyProduct({
      product_id: product.id,
      quantity: quantity
    })

    if (res.balance) {
      setErrors(null)
      notify.show('Product purchased successfully!', 'success')

      await setPurchase({
        ...res
      })
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
        <h1 className='text-5xl lg:text-semi font-bold leading-none py-8'>{name}</h1>

      </div>
      <div className='flex justify-center gap-x-4 py-4'>
        <div className='w-1/2'>
          <h3 className='text-xl lg:text-2xl font-bold leading-none'>Details</h3>
          <div className='h-52 bg-grayLight p-10 pt-4 text-lg flex flex-col justify-center items-center my-8'>
            <div className='py-2'>
              <span className='uppercase'>Cost : </span>
              <span className='order-last text-black'> {cost} cents</span>
            </div>
            <div className='py-2'>
              <span className='uppercase'>Amount available : </span>
              <span className='order-last text-black'> {purchase.product?.amount_available || amount_available}</span>
            </div>
          </div>
        </div>

        <div className='w-1/2'>
          <h3 className='text-xl lg:text-2xl font-bold leading-none'>Contact</h3>
          <div className='h-52 bg-grayLight p-10 pt-4 text-lg flex flex-col justify-center items-center my-8'>
            <h3 className='py-4 text-2xl'>{seller?.username}</h3>
            <span className='text-archivo uppercase text-gray text-bold text-sm tracking-wider'>Verified Seller</span>
          </div>
        </div>
      </div>

      {canAccessForm &&
        <div className='flex bg-grayLight py-4'>
          <div className='flex justify-start items-start w-full max-w-4xl mx-auto'>
            <div className='w-full p-10 pt-4 text-lg flex flex-col justify-between my-8'>
              <h3 className='text-xl lg:text-2xl font-bold leading-none py-2'>Update Details</h3>
              <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-bold tracking-wider text-archivo'>
                <div className='py-2'>
                  <span className='uppercase block'>Name</span>
                  <input
                    type='text'
                    className='border border-gray p-2 mt-1 focus:outline-none w-full'
                    value={product.name || ''}
                    onChange={(e) => setProduct({...product, name: e.target.value})}
                  />

                  {errors?.name && <div className='text-error text-sm mt-2 text-left w-full'>{errors.name}</div>}
                </div>
                <div className='py-2'>
                  <span className='uppercase block'>Cost</span>
                  <input
                    type='text'
                    className='border border-gray p-2 mt-1 focus:outline-none w-full'
                    value={product.cost || ''}
                    onChange={(e) =>
                      setProduct({...product, cost: e.target.value})}
                    />
                  {errors?.cost && <div className='text-error text-sm mt-2 text-left w-full'>{errors.cost}</div>}
                </div>
                <div className='py-2'>
                  <span className='uppercase block'>Amount Available</span>
                  <input
                    type='text'
                    className='border border-gray p-2 mt-1 focus:outline-none w-full'
                    value={product.amount_available || ''}
                    onChange={(e) => setProduct({...product, amount_available: e.target.value})}
                  />
                  {errors?.amount_available && <div className='text-error text-sm mt-2 text-left w-full'>{errors.amount_available}</div>}
                </div>
              </div>
              <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 items-center'>
                <button
                  className="bg-secondaryDark text-white text-xl px-12 py-3 my-4 hover:bg-secondary outline-none focus:outline-none uppercase"
                  type="button"
                  onClick={onUpdate}
                >
                  Update
                </button>
                <span>&nbsp;</span>
                <button
                  className="bg-primary text-grayDark text-xl px-12 py-3 my-4 hover:bg-primaryDark outline-none focus:outline-none uppercase"
                  type="button"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {!currentUser?.seller && <div className='flex justify-center gap-x-4'>
        <div className='w-1/2'>
          <h3 className='text-xl lg:text-2xl font-bold leading-none'>Purchase Product</h3>
          <div className='bg-grayLight p-10 pt-4 text-lg flex flex-col justify-center my-8'>
            <div className='py-2'>
              <span className='uppercase block'>Quantity</span>
              <input
                type='text'
                className='border border-gray p-2 mt-1 focus:outline-none w-full'
                value={quantity || ''}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <div className='text-error text-sm mt-2 text-left w-full'>
                {errors?.quantity}
                {errors?.base}
                {errors?.user}
                {errors?.product}
              </div>
            </div>
            <button
              className="bg-secondaryDark text-white text-xl px-12 py-3 my-4 hover:bg-secondary outline-none focus:outline-none uppercase"
              type="button"
              onClick={onBuyProduct}
            >
              Buy Product
            </button>
          </div>
        </div>
        <PurchaseDetails purchase={purchase}/>
      </div>}
    </>
  )
}
