import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { notify } from 'react-notify-toast'
import { useAccount } from '../../providers/AccountProvider'
import { signup } from '../../providers/account/actions'

export default function Signup() {
  const { loading, currentUser, setAccount } = useAccount()
  const [user, setUser] = useState({username: ''})
  const [errors, setErrors] = useState(null)

  const onSignup = async () => {
    const res = await signup({ user })

    await setAccount({
      ...res,
      loading: false,
    })

    if (res.currentUser) {
      notify.show('Account created!', 'success')
      Router.push('/products')
    } else {
      setErrors(res.errors)
    }
  }

  useEffect(() => {
    if (!loading && currentUser) Router.push('/products')
  }, [loading])

  return (
    <div className='flex flex-col gap-4 items-center justify-center max-w-2xl mx-auto py-8'>
      <h3 className='text-7xl py-8'>Signup</h3>
      <input
        className="border-0 border-b border-gray w-full py-3 focus:outline-none focus:ring-none focus:border-transparent"
        placeholder="Username"
        onChange={(e) => setUser({...user, username: e.target.value})}
        value={user.username}
      />
      {errors?.username && <div className='text-error text-sm w-full'>{errors.username}</div>}

      <input
        className="border-0 border-b border-gray w-full py-3 focus:outline-none focus:ring-none focus:border-transparent"
        placeholder="Password"
        type='password'
        onChange={(e) => setUser({...user, password: e.target.value})}
        value={user.password}
      />
      {errors?.password && <div className='text-error text-sm w-full'>{errors.password}</div>}

      <button
        className="w-full bg-secondaryDark text-white text-xl py-3 my-4 hover:bg-secondary outline-none focus:outline-none"
        type="button"
        onClick={onSignup}
      >
        Signup
      </button>

      <div className='text-base mt-4 text-archivo'>
        Already have an account? &nbsp;
        <Link href='/login'>
          <a className='text-secondary float-right border-0 border-b'>Login</a>
        </Link>
      </div>
    </div>
  )
}
