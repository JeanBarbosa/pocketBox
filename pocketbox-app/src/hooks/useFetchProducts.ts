import useProductStore from "../storage/productStore"

export const useFetchProducts = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const products = useProductStore((state) => state.products)
  const loading = useProductStore((state) => state.loading)
  const error = useProductStore((state) => state.error)

  return { fetchProducts, products, loading, error }
}
