import React, { useRef } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"

type HeaderProps = {
  handleBootomsheetOpen: () => void
}

export function Header({ handleBootomsheetOpen }: HeaderProps) {
  return (
    <View className="flex-row-reverse justify-between items-center mt-2 mx-4">
      <TouchableOpacity
        onPress={handleBootomsheetOpen}
        className="rounded-2xl"
        style={{ backgroundColor: "#fff", padding: 2 }}
      >
        <Image
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          source={{ uri: "https://github.com/jeanbarbosa.png" }}
          className="h-12 w-12 rounded-2xl"
        />
      </TouchableOpacity>
    </View>
  )
}
