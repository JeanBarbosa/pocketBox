import { EditScreen } from "../screens/EditScreen"
import { ProductDTO } from "../dtos/productDTO"
import { HomeScreen } from "../screens/HomeScreen"
import { ProductDetailScreen } from "../screens/ProductDetailScreen"
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"

export type AppRoutesProps = {
  home: undefined
  productDetail: ProductDTO
  edit: ProductDTO | undefined
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
      <Screen name="edit" component={EditScreen} />
    </Navigator>
  )
}
