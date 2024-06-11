import { create } from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persist, createJSONStorage } from "zustand/middleware"

interface AuthState {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export interface User {
  id: string
  firstName: string
  email: string
}

const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth", // Nome da chave no AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useAuthStore
