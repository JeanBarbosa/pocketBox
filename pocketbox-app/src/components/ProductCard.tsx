import React from "react"
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"
import { useNavigation } from "@react-navigation/native"
import { AppRoutesStackNavigatorProps } from "../routes/app.routes"
import { ProductDTO } from "../dtos/productDTO"

export type ProductCardProps = {
  index: number
  product: ProductDTO
}

export function ProductCard({ product, index }: ProductCardProps) {
  const navigation = useNavigation<AppRoutesStackNavigatorProps>()

  return (
    <Animatable.View
      delay={index * 120}
      animation="slideInRight"
      useNativeDriver={true}
    >
      <View
        style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        className="w-72 h-70 my-5 mr-6 p-3 py-5 rounded-3xl"
      >
        <View className="flex-row justify-center">
          <Image
            source={{ uri: "https://github.com/jeanbarbosa.png" }}
            className="w-32 h-32"
          />
        </View>
        <View className="flex-1 px-3 py-2 space-y-2">
          <Text className="text-white text-xl font-medium tracking-wider">
            {product.name}
          </Text>
          <Text className="text-white">{product.description}</Text>
        </View>
        <View className="flex-row justify-between items-center px-1">
          <Text className="text-2xl font-semibold text-white">
            R${product.price}
          </Text>

          {true ? (
            <TouchableOpacity
              className="bg-white p-3 rounded-full"
              onPress={() =>
                navigation.navigate("productDetail", { ...product })
              }
            >
              <Feather name="shopping-bag" size={20} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="bg-white p-3 rounded-full">
              <Feather name="edit" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animatable.View>
  )
}
