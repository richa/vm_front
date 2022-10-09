import Link from 'next/link'
import { useProducts } from '../../providers/ProductsProvider'

export default function ProductGrid(product) {
  const { setProducts } = useProducts()
  const { id, name, cost, amount_available } = product

  return (
    <Link href={`/product/${id}`}>
      <div className='flex flex-col bg-white items-center shadow-lg cursor-pointer' onClick={() => setProducts({ current: product })}>
        <div className='h-24 lg:h-36 flex items-center justify-center overflow-hidden text-2xl'>
          {name}
        </div>
        <div className='bg-grayLight p-6 w-full'>
          <div className='flex justify-between py-4 text-xl text-st'>
            <span className='text-grayDark'>{amount_available} Left</span>
            <span>Cost : {cost} cents</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
