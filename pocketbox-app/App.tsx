import { StatusBar } from "react-native"
import { Routes } from "./src/routes"
import "./src/styles/global.css"

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  )
}
