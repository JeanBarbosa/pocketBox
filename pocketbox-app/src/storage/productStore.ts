import { create } from "zustand"
import { api } from "../services/api"
import { ProductDTO } from "../dtos/productDTO"

interface ProductState {
  products: ProductDTO[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get("/products")

      if (response.status !== 200) {
        throw new Error("Erro ao buscar produtos")
      }
      const products = response.data
      set({ products, loading: false })
    } catch (error: any) {
      if (Array.isArray(error)) {
        set({ error: error.join("\n"), loading: false })
      }
      set({ error: "Erro ao buscar produtos", loading: false })
    }
  },
}))

export default useProductStore
