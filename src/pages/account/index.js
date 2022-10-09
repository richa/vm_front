import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { notify } from 'react-notify-toast'
import PurchaseDetails from '../../components/PurchaseDetails'
import { useAccount } from '../../providers/AccountProvider'
import { deposit, resetDeposit } from '../../providers/account/actions'

export default function Account() {
  const router = useRouter()
  const { loading, currentUser } = useAccount()
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState(null)
  const [errors, setErrors] = useState({})

  if (!loading && !currentUser) Router.push('/login')

  const onDeposit = async () => {
    const res = await deposit({ amount })
    if (res.balance) {
      setBalance(res.balance)
      setErrors({})
      notify.show('Amount deposited!', 'success')
    } else {
      setErrors(res.errors)
    }
  }

  const onResetDeposit = async () => {
    const res = await resetDeposit()
    if (res.status) {
      setBalance({ total : 0 })
      setErrors({})
      notify.show('Deposit reset successfully!', 'success')
    } else {
      notify.show(res.errors?.base || 'Something went wrong!', 'error')
    }
  }

  return (
    <>
      <div className='flex justify-between pt-4 items-center'>
        <Link href='/products'><a className='text-sm lg:text-base uppercase text-archivo font-bold text-primary border-0 border-b border-white hover:border-b-4 hover:border-primary tracking-widest'>{'< Back'}</a></Link>
      </div>
      <div className='flex justify-between pb-4 items-center'>
        <h1 className='text-5xl lg:text-semi font-bold leading-none py-8'>{currentUser?.username}</h1>
      </div>
      <div className='flex justify-center gap-x-4 py-4'>
        <div className='w-1/2'>
          <h3 className='text-xl lg:text-2xl font-bold leading-none'>Details</h3>
          <div className='h-52 bg-grayLight p-10 pt-4 text-lg flex flex-col justify-center items-center my-8'>
            <div className='py-2'>
              <span className='uppercase'>Username : </span>
              <span className='order-last text-black'> {currentUser?.username}</span>
            </div>
            <div className='py-2'>
              <span className='uppercase'>Role : </span>
              <span className='order-last text-black'> {currentUser?.role}</span>
            </div>
          </div>
        </div>
        <PurchaseDetails purchase={{ balance }} />
      </div>

      <div className='flex bg-grayLight py-4'>
        <div className='flex justify-start items-start w-full max-w-4xl mx-auto'>
          <div className='w-full p-10 pt-4 text-lg flex flex-col justify-between my-8'>
            <h3 className='text-xl lg:text-2xl font-bold leading-none py-2'>Add Deposit</h3>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-bold tracking-wider text-archivo'>
              <div className='py-2'>
                <span className='uppercase block'>Deposit</span>
                <input
                  type='text'
                  className='border border-gray p-2 mt-1 focus:outline-none w-full'
                  onChange={(e) => setAmount(e.target.value)}
                />

                {errors?.base && <div className='text-error text-sm mt-2 text-left w-full'>{errors.base}</div>}
              </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 items-center'>
              <button
                className="bg-secondaryDark text-white text-xl px-12 py-3 my-4 hover:bg-secondary outline-none focus:outline-none uppercase"
                type="button"
                onClick={onDeposit}
              >
                Deposit
              </button>
              <span>&nbsp;</span>
              <button
                className="bg-primary text-grayDark text-xl px-12 py-3 my-4 hover:bg-primaryDark outline-none focus:outline-none uppercase"
                type="button"
                onClick={onResetDeposit}
              >
                Reset Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
