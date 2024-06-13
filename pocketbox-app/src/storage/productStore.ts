import { create } from "zustand"
import { api } from "../services/api"
import { ProductDTO } from "../dtos/productDTO"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "./authStore"

interface ProductState {
  products: ProductDTO[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  addProduct: (product: ProductDTO) => Promise<void>
  updateProduct: (product: ProductDTO) => Promise<void>
  deleteProduct: (productId: string) => Promise<void>
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

  addProduct: async (product: Omit<ProductDTO, "id" | "userId">) => {
    set({ loading: true, error: null })
    try {
      const token = useAuthStore.getState().token
      const savedProduct = await api.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (savedProduct.status !== 201) {
        throw new Error("Erro ao salvar o produto")
      }

      const products = savedProduct.data

      set((state) => ({
        products: [...state.products, products],
        loading: false,
      }))
    } catch (error: any) {
      if (Array.isArray(error)) {
        set({ error: error.join("\n"), loading: false })
      }
      set({ error: "Erro ao buscar produtos", loading: false })
    }
  },
  updateProduct: async (product: ProductDTO) => {
    set({ loading: true, error: null })
    try {
      const token = useAuthStore.getState().token
      const updatedData = await api.put(`/products/${product.id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (updatedData.status !== 201) {
        throw new Error("Erro ao salvar o produto")
      }

      const productUpdated = updatedData.data

      set((state) => ({
        products: state.products.map((product) =>
          product.id === productUpdated.id
            ? { ...product, ...productUpdated }
            : product
        ),
        loading: false,
      }))
    } catch (error: any) {
      if (Array.isArray(error)) {
        set({ error: error.join("\n"), loading: false })
      }
      set({ error: "Erro ao atualizar o produto", loading: false })
    }
  },

  deleteProduct: async (productId: string) => {
    set({ loading: true, error: null })
    try {
      const token = useAuthStore.getState().token
      await api.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
        loading: false,
      }))
    } catch (error: any) {
      if (Array.isArray(error)) {
        set({ error: error.join("\n"), loading: false })
      }
      set({ error: "Erro a apagar o produto", loading: false })
    }
  },
}))

export default useProductStore
