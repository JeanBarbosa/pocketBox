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
  const { user, token, login, logout, isAuthenticated } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      if (!(await isAuthenticated())) {
        //logout()
      }
    }

    checkAuth()
  }, [isAuthenticated, logout])

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
