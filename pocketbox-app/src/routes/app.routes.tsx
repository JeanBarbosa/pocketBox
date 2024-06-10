import { HomeScreen } from "../screens/HomeScreen"
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import { ProductDTO } from "../dtos/productDTO"
import { ProductDetailScreen } from "../screens/ProductDetailScreen"

export type AppRoutesProps = {
  home: undefined
  productDetail: { product: ProductDTO }
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
      <Screen name="productDetail" component={ProductDetailScreen} />
    </Navigator>
  )
}
