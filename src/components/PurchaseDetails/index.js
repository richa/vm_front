import { ALLOWED_DEPOSIT_VALUES } from '../../utils/constants'

export default function PurchaseDetails({ purchase }) {
  if (!purchase.balance) return null

  return (
    <div className='w-1/2'>
      <h3 className='text-xl lg:text-2xl font-bold leading-none'>User Balance</h3>
      <div className='bg-grayLight p-10 pt-4 text-lg flex flex-col justify-center my-8'>
        {purchase.amount && <>
          <div className='py-1 mx-4'>
            <span className='py-1'>Total Amount paid : </span>
            <span className='order-last text-black'> {purchase.amount} cents</span>
          </div>
          <div className='py-1 mx-4'>
            <span className=''>Product Quantity left : </span>
            <span className='order-last text-black'> {purchase.product?.amount_available}</span>
          </div>
        </>}
        <div className='py-1 mx-4'>
          <span className='font-bold'>Total Balance : </span>
          <span className='order-last text-black'> {purchase.balance?.total} cents</span>
        </div>
        <div className='grid grid-cols-2'>
          {ALLOWED_DEPOSIT_VALUES.map((coin) => (
            <div className='py-1 mx-4'>
              <span className=''>Coins in {coin}: </span>
              <span className='order-last text-black'> {purchase.balance && purchase.balance[coin]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
