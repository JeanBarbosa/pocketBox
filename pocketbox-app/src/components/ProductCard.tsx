import React from "react"
import { useAuth } from "../hooks/useAuth"
import { Feather } from "@expo/vector-icons"
import { ProductDTO } from "../dtos/productDTO"
import * as Animatable from "react-native-animatable"
import { useNavigation } from "@react-navigation/native"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { AppRoutesStackNavigatorProps } from "../routes/app.routes"

export type ProductCardProps = {
  index: number
  product: ProductDTO
}

export function ProductCard({ product, index }: ProductCardProps) {
  const navigation = useNavigation<AppRoutesStackNavigatorProps>()
  const { user } = useAuth()

  return (
    <Animatable.View
      delay={index * 120}
      animation="slideInRight"
      useNativeDriver={true}
    >
      <View
        style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        className="w-72 h-96 my-5 mr-6 p-3 py-5 rounded-3xl"
      >
        <View className="flex-row justify-center">
          <Image source={{ uri: product.image }} className="w-32 h-32" />
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

          {user?.id !== product.userId ? (
            <TouchableOpacity
              className="bg-white p-3 rounded-full"
              onPress={() =>
                navigation.navigate("productDetail", { ...product })
              }
            >
              <Feather name="shopping-bag" size={20} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("productDetail", { ...product })
              }
              className="bg-white p-3 rounded-full"
            >
              <Feather name="eye" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animatable.View>
  )
}
