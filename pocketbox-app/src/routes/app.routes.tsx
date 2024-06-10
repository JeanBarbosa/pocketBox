import { HomeScreen } from "../screens/HomeScreen"
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"

type AppRoutesProps = {
  home: undefined
}

export type AppRoutesStackNavigatorProps =
  NativeStackNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesProps>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={HomeScreen} />
    </Navigator>
  )
}
