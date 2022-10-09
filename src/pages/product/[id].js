import ProductDetails from '../../components/ProductDetails'
import ProductsProvider from '../../providers/ProductsProvider'

export default function Product() {
  return <ProductsProvider>
    <ProductDetails />
  </ProductsProvider>
}
