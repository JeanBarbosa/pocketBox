import "./src/styles/global.css"
import { Routes } from "./src/routes"
import { AuthProvider } from "./src/contexts/AuthContext"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
