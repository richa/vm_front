import Products from '../../components/Products'
import ProductsProvider from '../../providers/ProductsProvider'

export default function ProductsList() {
  return <ProductsProvider>
    <Products />
  </ProductsProvider>
}
