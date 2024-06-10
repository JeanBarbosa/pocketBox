import React, { createContext, useContext, useEffect, ReactNode } from "react"
import useAuthStore, { User } from "../storage/authStore"

interface AuthContextProps {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthStore() as AuthContextProps

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await auth.isAuthenticated()
      if (!isAuthenticated) {
        auth.logout()
      }
    }

    checkAuth()
  }, [auth])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
