import "./src/styles/global.css"
import { Routes } from "./src/routes"
import { StatusBar } from "react-native"
import { AuthProvider } from "./src/contexts/AuthContext"

export default function App() {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </AuthProvider>
  )
}
