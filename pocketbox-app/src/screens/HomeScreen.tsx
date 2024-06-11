import React, { useEffect, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Animatable from "react-native-animatable"
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native"
import { ProductCard } from "../components/ProductCard"
import { Header } from "../components/Header"
import { useFetchProducts } from "../hooks/useFetchProducts"

export function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Smartphones")
  const { fetchProducts, products, loading, error } = useFetchProducts()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const categories = [
    "Smartphones",
    "Laptops",
    "Javascript",
    "Typescript",
    "Vscode",
    "Chrome",
  ]

  if (!products) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
        <Button title="Retry" onPress={fetchProducts} />
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 relative">
        <Image
          blurRadius={50}
          className="absolute w-full h-full"
          source={require("../assets/bg.png")}
        />
        <SafeAreaView className="flex-1">
          <Header />
          <View className="my-10 space-y-2">
            <Text className="mx-4 text-5xl font-medium text-gray-800">
              Cadastre
            </Text>
            <Text className="mx-4 text-5xl font-medium text-gray-800">
              <Text className="font-extrabold">Simplifique</Text> seu Controle!
            </Text>
          </View>
          <View className="mx-4 flex-row justify-between items-center gap-3">
            <View className="flex-row flex-1 p-4 bg-white rounded-2xl">
              <Feather name="search" size={28} color="gray" />
              <TextInput
                placeholder="Encontre o que deseja..."
                className="flex-1 ml-2 text-gray-800"
                onSubmitEditing={() => {
                  console.log("entrei")
                }}
                secureTextEntry
                returnKeyType="send"
              />
            </View>
            <TouchableOpacity
              className="bg-white rounded-2xl p-4"
              onPress={() => console.log("entrei")}
            >
              <Feather name="plus" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView
            className="my-6 py-6 max-h-20"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {categories.map((category, index) => {
              let isActive = category === activeCategory
              let textClass = isActive ? "font-bold" : ""

              return (
                <Animatable.View
                  delay={index * 120}
                  animation="slideInDown"
                  useNativeDriver={true}
                  key={index}
                >
                  <TouchableOpacity
                    key={index}
                    className="mr-9"
                    onPress={() => setActiveCategory(category)}
                  >
                    <Text
                      className={`text-white text-base tracking-widest ${textClass}`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              )
            })}
          </ScrollView>
          <ScrollView
            className="px-4"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              height: "100%",
              paddingHorizontal: 20,
            }}
          >
            {products
              //.filter((item) => item.category === activeCategory)
              .map((item, index) => {
                return (
                  <ProductCard key={item.id} product={item} index={index} />
                )
              })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </ScrollView>
  )
}
