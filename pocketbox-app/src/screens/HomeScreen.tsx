import { Feather } from "@expo/vector-icons"
import { Header } from "../components/Header"
import { Profile } from "../components/Profile"
import * as Animatable from "react-native-animatable"
import { ProductCard } from "../components/ProductCard"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from "react"
import { useFetchProducts } from "../hooks/useFetchProducts"
import { SafeAreaView } from "react-native-safe-area-context"
import { AppRoutesStackNavigatorProps } from "../routes/app.routes"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
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
import { categories, CategoryType } from "../utils/categories"
import { useAuth } from "../hooks/useAuth"

export function HomeScreen() {
  const navigation = useNavigation<AppRoutesStackNavigatorProps>()
  const [activeCategory, setActiveCategory] = useState(categories[0].value)
  const { fetchProducts, products, loading, error } = useFetchProducts()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { user, logout } = useAuth()

  const handleBootomsheetOpen = () => {
    bottomSheetRef.current?.expand()
  }

  const handleBootomsheetClose = () => {
    bottomSheetRef.current?.snapToIndex(0)
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchProducts()
    })

    return unsubscribe
  }, [navigation])

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
          blurRadius={60}
          className="absolute w-full h-full"
          source={require("../assets/bg.png")}
        />
        <SafeAreaView className="flex-1">
          <Header handleBootomsheetOpen={handleBootomsheetOpen} />
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
                onChangeText={() => console.log("digitando...")}
                onSubmitEditing={() => {
                  console.log("enviando...")
                }}
                secureTextEntry
                returnKeyType="send"
              />
            </View>
            <TouchableOpacity
              className="bg-white rounded-2xl p-4"
              onPress={() => navigation.navigate("edit")}
            >
              <Feather name="plus" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView
            className="my-6 py-3 max-h-20"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {categories.map((category, index) => {
              let isActive = category.value === activeCategory
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
                    onPress={() => setActiveCategory(category.value)}
                  >
                    <Text
                      className={`text-white text-base tracking-widest ${textClass}`}
                    >
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              )
            })}
          </ScrollView>
          <ScrollView
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
        <Profile
          ref={bottomSheetRef}
          user={user}
          logout={logout}
          onClose={handleBootomsheetClose}
        />
      </View>
    </ScrollView>
  )
}
