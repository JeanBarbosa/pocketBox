import { NavigationContainer } from "@react-navigation/native"

import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"
import { useAuth } from "../hooks/useAuth"

export function Routes() {
  const { isAuthenticated } = useAuth()

  return (
    <NavigationContainer>
      {isAuthenticated() ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
