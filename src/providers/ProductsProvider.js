import { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { getProducts, getProduct } from './products/actions'

const defaultState = {
  loading: true,
  current: null,
  products: [],
  errors: null,
}

const ProductsContext = createContext(defaultState)
const useProducts = () => useContext(ProductsContext)

const ProductsProvider = ({ children }) => {
  const router = useRouter()
  const [state, setState] = useState(defaultState)
  const { loading } = state

  const setProducts = (providerState) => {
    setState({
      ...state,
      ...providerState,
    })
  }

  useEffect(() => {
    const init = async () => {
      const token = localStorage.accessToken
      let res = { products: state.products }

      if (token) {
        if (router.pathname === '/product/[id]') {
          const { id } = router.query

          if (id) {
            res = await getProduct(id)
          }
        } else {
          res = await getProducts(router.asPath)
        }
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
    <ProductsContext.Provider
      value={{
        ...state,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

ProductsProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default ProductsProvider
export { useProducts }
