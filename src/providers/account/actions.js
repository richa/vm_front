import callApi from '../../utils/apiCaller'

const setCurrentUser = ({user, active_sessions}) => ({
  currentUser: user,
  active_sessions,
  errors: null
})

const setUserErrors = (errors) => ({
  errors,
  currentUser: null
})

const setResponse = (status) => ({
  status
})

const setBalance = ({ balance }) => ({
  balance
})

export const getCurrentUser = async () => {
  if (localStorage.accessToken) {
    const currentUserUrl = `current`

    const res = await callApi(currentUserUrl)
    if (res && res.statusText === 'OK') {
      return setCurrentUser({user: res.data})
    } else {
      return setUserErrors(res.errors)
    }
  }
}

export const signup = async (params) => {
  const res = await callApi(`users`, 'post', params)
  if (res && res.statusText === 'Created') {
    localStorage.setItem('accessToken', res.data.token)
    return setCurrentUser(res.data.user)
  } else {
    return setUserErrors(res.data?.errors)
  }
}

export const login = async (params) => {
  const res = await callApi(`login`, 'post', params)
  if (res && res.statusText === 'OK') {
    localStorage.setItem('accessToken', res.data.token)
    return setCurrentUser(res.data)
  } else {
    return setUserErrors(res.data?.errors || { base: "Invalid credentials." })
  }
}

export const deposit = async (params) => {
  const res = await callApi(`deposit`, 'patch', params)
  if (res && res.statusText === 'OK') {
    return setBalance(res.data)
  } else {
    return setUserErrors(res.data?.errors || { base: "Something went wrong." })
  }
}

export const resetDeposit = async () => {
  await callApi(`reset`, 'delete')
  return setResponse('ok')
}

export const logout = async (params) => {
  await callApi(`logout`, 'delete')
  localStorage.removeItem('accessToken')
  return setCurrentUser({ user: null })
}

export const logoutAll = async (params) => {
  await callApi(`logout/all`, 'delete')
  localStorage.removeItem('accessToken')
  return setCurrentUser({ user: null })
}
