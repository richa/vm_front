import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { notify } from 'react-notify-toast'
import { useAccount } from '../../providers/AccountProvider'
import { login } from '../../providers/account/actions'

export default function Login() {
  const { loading, currentUser, setAccount, logoutAllReq } = useAccount()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasActiveSessions, setHasActiveSessions] = useState(false)
  const [errors, setErrors] = useState(null)

  const onLogin = async () => {
    const res = await login({username, password })
    const { currentUser, active_sessions } = res

    await setAccount({
      currentUser,
      loading: false,
    })

    const userActiveSessions = parseInt(active_sessions) > 1
    await setHasActiveSessions(userActiveSessions)

    if (userActiveSessions) {
      notify.show('There is already an active session using your account.', 'error')
      return false
    } else {
      if (currentUser) {
        notify.show('Logged in successfully!', 'success')
        Router.push('/products')
      } else {
        setErrors(res.errors)
      }
    }
  }

  const onLogoutAll = async () => {
    logoutAllReq()
    Router.push('/')
  }

  useEffect(() => {
    if (!loading && currentUser) Router.push('/products')
  }, [loading])

  return (
    <div className='flex flex-col gap-4 items-center justify-center max-w-2xl mx-auto py-8'>
      {hasActiveSessions && <div className=''>
        <p className='text-secondary'>
          There are more than one active sessions or this user. Terminate all the active sessions.<br/>
          <span onClick={onLogoutAll} className='underline font-bold cursor-pointer'>Click here</span> to logout from all sessions.
        </p>
      </div>}
      <h3 className='text-7xl py-8'>Login</h3>
      <input
        className="border-0 border-b border-gray w-full py-3 focus:outline-none focus:ring-none focus:border-transparent"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <input
        className="border-0 border-b border-gray w-full py-3 focus:outline-none focus:ring-none focus:border-transparent"
        placeholder="Password"
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      {errors && <div className='text-error text-sm mt-2 text-left w-full'>{errors.base}</div>}

      <button
        className="w-full bg-secondaryDark text-white text-xl py-3 my-4 hover:bg-secondary outline-none focus:outline-none"
        type="button"
        onClick={onLogin}
      >
        Login
      </button>

      <div className='text-base mt-4 text-archivo'>
        Don't have an account? &nbsp;
        <Link href='/signup'>
          <a className='text-secondary float-right border-0 border-b'>Sign up</a>
        </Link>
      </div>
    </div>
  )
}
