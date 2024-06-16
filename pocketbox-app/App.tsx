import "./src/styles/global.css"
import { Routes } from "./src/routes"
import { AuthProvider } from "./src/contexts/AuthContext"
import { StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import * as ImagePicker from "expo-image-picker"

export default function App() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions()

  // permission check
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    requestPermission()
  }

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
