import callApi from '../../utils/apiCaller'

const setProductsList = (products) => ({
  products,
  errors: null
})

const setProduct = (current) => ({
  current,
  errors: null
})

const setErrors = (errors) => ({
  errors
})

const setStatus = (status) => ({
  status,
  errors: null
})

const setPurchase = ({ amount, balance, product }) => ({
  amount,
  balance,
  product
})

export const getProduct = async (id) => {
  const productUrl = `products/${id}`

  const res = await callApi(productUrl)
  if (res && res.statusText === 'OK') {
    return setProduct(res.data)

  } else {
    return setErrors(res.data?.errors)
  }
}

export const createProduct = async (product) => {
  const productUrl = `products`

  const res = await callApi(productUrl, 'post', { product })
  if (res && res.statusText === 'Created') {
    return setProduct(res.data)
  } else {
    return setErrors(res.data?.errors)
  }
}

export const updateProduct = async ({ product }) => {
  const productUrl = `products/${product.id}`

  const res = await callApi(productUrl, 'put', { product })
  if (res && res.statusText === 'OK') {
    return setProduct(res.data)
  } else {
    return setErrors(res.data?.errors)
  }
}

export const deleteProduct = async (id) => {
  const productUrl = `products/${id}`

  const res = await callApi(productUrl, 'delete')
  if (res && res.statusText === 'OK') {
    return setStatus(true)
  } else {
    return setErrors(res.data?.errors)
  }
}

export const getProducts = async (queryString=null) => {
  const productsUrl = queryString || `products`

  const res = await callApi(productsUrl)
  if (res && res.statusText === 'OK') {
    return setProductsList(res.data)
  } else {
    return setErrors(res.data?.errors)
  }
}

export const buyProduct = async (params) => {
  const res = await callApi(`buy`, 'post', params)
  if (res && res.statusText === 'Created') {
    return setPurchase(res.data)
  } else {
    return setErrors(res.data?.errors || { base: "Something went wrong." })
  }
}
