import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"

// type Props = NativeStackScreenProps<AppRoutesProps, "home", "productDetail">

export function ProductDetailScreen({ route, navigation }: any) {
  const item = route.params

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

          <Text className="text-3xl text-white">{item.name}</Text>
        </View>
        <View className="flex-row justify-center items-center mt-12">
          <View className="flex-row justify-between items-center bg-gray-100 rounded-2xl space-x-3">
            <TouchableOpacity className="bg-white rounded-2xl border-2 border-gray-200 p-3">
              <Feather name="minus" size={20} color="black" />
            </TouchableOpacity>
            <Text className="text-xl mx-3 text-black">1</Text>
            <TouchableOpacity className="bg-white rounded-2xl border-2 border-gray-200 p-3">
              <Feather name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-between items-center mx-4 h-20 overflow-hidden">
          <Animatable.View
            delay={180}
            animation="slideInDown"
            className="flex items-center space-y-2"
          >
            <Feather name="heart" size={24} color="black" />
            <Text>Favoritar</Text>
          </Animatable.View>

          <Animatable.View
            delay={280}
            animation="slideInDown"
            className="flex items-center space-y-2"
          >
            <Feather name="heart" size={24} color="black" />
            <Text>{item.category}</Text>
          </Animatable.View>

          <Animatable.View
            delay={380}
            animation="slideInDown"
            className="flex items-center space-y-2"
          >
            <Feather name="calendar" size={24} color="black" />
            <Text>{new Date().toLocaleDateString()}</Text>
          </Animatable.View>

          <Animatable.View
            delay={480}
            animation="slideInDown"
            className="flex items-center space-y-2"
          >
            <Feather name="trash" size={24} color="black" />
            <Text>Apagar</Text>
          </Animatable.View>
        </View>
        <View className="mt-6 mx-4 space-y-2 h-60">
          <Animatable.Text
            animation="slideInUp"
            className="text-3xl font-semibold text-gray-800"
          >
            Descrição
          </Animatable.Text>
          <Animatable.Text
            delay={100}
            animation="slideInUp"
            className="text-gray-600 tracking-wider"
          >
            {item.description}
          </Animatable.Text>
        </View>
        <View className="mx-4 flex-row justify-between items-center">
          <Animatable.Text
            animation="slideInLeft"
            className="text-3xl font-semibold text-gray-800"
          >
            R$ {item.price}
          </Animatable.Text>
          <Animatable.View animation="slideInRight">
            <TouchableOpacity className="flex-row justify-center items-center gap-2 bg-gray-800 p-4 px-14 rounded-2xl">
              <Feather name="shopping-bag" size={24} color="white" />
              <Text className="text-white text-xl font-semibold">Comprar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </SafeAreaView>
    </View>
  )
}
