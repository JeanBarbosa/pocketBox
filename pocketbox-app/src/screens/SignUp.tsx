import { Fontisto, Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Animatable from "react-native-animatable"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native"

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

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
          <View className="pt-10 my-12 space-y-2">
            <Text className="mx-4 text-5xl font-medium text-gray-800">
              Cadastre
            </Text>
            <Text className="mx-4 text-5xl font-medium text-gray-800">
              <Text className="font-extrabold">Simplifique</Text> seu Controle!
            </Text>
          </View>
          <View className="mx-4 flex justify-between items-center gap-3">
            <Animatable.View
              animation="slideInUp"
              className="flex-row flex-1 p-4 bg-white rounded-2xl"
            >
              <Feather name="user" size={28} color="gray" />
              <TextInput
                placeholder="Seu Nome"
                className="flex-1 ml-2 text-gray-800"
              />
            </Animatable.View>
            <Animatable.View
              animation="slideInUp"
              className="flex-row flex-1 p-4 bg-white rounded-2xl"
            >
              <Fontisto name="email" size={28} color="gray" />
              <TextInput
                placeholder="email"
                className="flex-1 ml-2 text-gray-800"
              />
            </Animatable.View>
            <Animatable.View
              animation="slideInUp"
              className="flex-row flex-1 p-4 bg-white rounded-2xl"
            >
              <Fontisto name="unlocked" size={28} color="gray" />
              <TextInput
                secureTextEntry
                placeholder="Senha"
                className="flex-1 ml-2 text-gray-800"
              />
            </Animatable.View>
            <View className="flex-row flex-1 mt-4">
              <Animatable.View
                animation="slideInUp"
                delay={100}
                className="flex-1"
              >
                <TouchableOpacity className="flex-row justify-center items-center gap-2 bg-gray-800 p-4 px-14 rounded-2xl">
                  <Text className="text-white text-xl font-semibold">
                    Criar Conta
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
            <View className="flex-row flex-1">
              <Animatable.View animation="slideInUp" delay={100}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="flex-row justify-center items-center p-4 px-14"
                >
                  <Text className="text-white text-xl font-light">Início</Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  )
}
