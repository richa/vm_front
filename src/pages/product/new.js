import ProductForm from '../../components/ProductForm'
import ProductsProvider from '../../providers/ProductsProvider'

export default function Products() {
  return <ProductsProvider>
    <ProductForm />
  </ProductsProvider>
}
