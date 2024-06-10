import React from "react"
import { Image, View } from "react-native"
import { Feather } from "@expo/vector-icons"

export function Header() {
  return (
    <View className="flex-row justify-between items-center mx-4">
      <View>
        <Feather
          name="list"
          size={25}
          color="black"
          className="bg-white shadow-md rounded-2xl p-3"
        />
      </View>
      <View
        className="rounded-2xl"
        style={{ backgroundColor: "rgba(255,255,255,0.7)", padding: 3 }}
      >
        <Image
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          source={{ uri: "https://github.com/jeanbarbosa.png" }}
          className="h-12 w-12 rounded-2xl"
        />
      </View>
    </View>
  )
}
