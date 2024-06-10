import create from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persist } from "zustand/middleware"

interface AuthState {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export interface User {
  id: number
  firstName: string
  email: string
}

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user: User, token: string) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      //@ts-ignore
      isAuthenticated: () => !!set((state) => state.token),
    }),
    {
      name: "auth", // Nome da chave no AsyncStorage
      getStorage: () => AsyncStorage,
    }
  )
)

export default useAuthStore
