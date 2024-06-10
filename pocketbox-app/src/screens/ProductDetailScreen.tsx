import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { AppRoutesProps } from "../routes/app.routes"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

// type Props = NativeStackScreenProps<AppRoutesProps, "home", "productDetail">

export function ProductDetailScreen({ route, navigation }: any) {
  const item = route.params

  if (!item) {
    return
  }

  console.log(item)

  return (
    <View className="flex-1 bg-white">
      <Image
        blurRadius={50}
        className="h-96 w-full absolute "
        source={require("../assets/bg.png")}
        style={{
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      />
      <SafeAreaView className="flex-1">
        <View className="flex-row justify-between mx-4 items-center">
          <TouchableOpacity
            className="bg-white p-3 rounded-2xl shadow"
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={24} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white p-3 rounded-2xl shadow">
            <Feather name="edit" size={24} />
          </TouchableOpacity>
        </View>

        <View className="flex justify-center items-center">
          <Image
            source={{ uri: "https://github.com/jeanbarbosa.png" }}
            className="h-48 w-48 rounded-2xl"
          />

          <Text className="text-3xl font-bold text-gray-800">{item.name}</Text>
          <Text className="text-3xl font-bold text-gray-800">
            R${item.price}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}
