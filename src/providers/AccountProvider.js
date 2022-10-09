import { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { logoutAll, getCurrentUser } from './account/actions'

const AccountContext = createContext([])
const useAccount = () => useContext(AccountContext)

const AccountProvider = ({ children }) => {
  const router = useRouter()
  const [state, setState] = useState({
    loading: true,
    currentUser: null,
    errors: null,
  })
  const { loading, currentUser } = state

  const setAccount = (providerState) => {
    setState({
      ...state,
      ...providerState,
    })
  }

  const logoutReq = async () => {
    const res = await logout()

    setState({
      ...state,
      ...res,
      loading: false,
    })
  }

  const logoutAllReq = async () => {
    const res = await logoutAll()

    setState({
      ...state,
      ...res,
      loading: false,
    })
  }

  useEffect(() => {
    const token = localStorage.accessToken

    const init = async () => {
      let res = { currentUser: state.currentUser }

      if (token && !state.currentUser) {
        res = await getCurrentUser()
      }

      await setState({
        ...state,
        ...res,
        loading: false,
      })
    }

    init()
  }, [router])

  return (
    <AccountContext.Provider
      value={{
        ...state,
        setAccount,
        logoutReq,
        logoutAllReq,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

AccountProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default AccountProvider
export { useAccount }
