import { forwardRef } from "react"
import BottomSheet from "@gorhom/bottom-sheet"
import { FontAwesome } from "@expo/vector-icons"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { User } from "../storage/authStore"

type MenuProps = {
  user: User | null
  logout: () => void
  onClose: () => void
}

export const Profile = forwardRef<BottomSheet, MenuProps>(
  ({ onClose, user, logout }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={0}
        snapPoints={[0.01, 300]}
        backgroundStyle={{ backgroundColor: "rgb(31,41,55)" }}
        handleComponent={() => null}
      >
        <View className="flex-1 items-center p-6">
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-white"></Text>
            <FontAwesome
              name="close"
              onPress={onClose}
              size={24}
              color="white"
            />
          </View>
          <View className="flex justify-center items-center">
            <TouchableOpacity
              onPress={() => {}}
              className="rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.7)", padding: 3 }}
            >
              <Image
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                source={{ uri: "https://github.com/jeanbarbosa.png" }}
                className="h-16 w-16 rounded-2xl"
              />
            </TouchableOpacity>
            <Text className="text-white mt-4 text-3xl font-extrabold ">
              {user?.firstName}
            </Text>
            <Text className="text-white mt-2 text-3xl font-extrabold ">
              {user?.email}
            </Text>
          </View>
          <View className="flex justify-center items-center w-full mt-8">
            <TouchableOpacity onPress={() => logout()}>
              <Text className="text-red-500 font-bold">Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    )
  }
)
