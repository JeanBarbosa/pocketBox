import { Fontisto, Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Animatable from "react-native-animatable"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { api } from "../services/api"
import { Input } from "../components/Input"

type FormDataProps = {
  firstName: string
  email: string
  password: string
}

const signUpSchema = z.object({
  firstName: z
    .string({ required_error: "Nome obrigatório" })
    .min(3, "mínimo 3 caracteres"),
  email: z
    .string({ required_error: "e-mail obrigatório" })
    .email("e-mail inválido"),
  password: z
    .string({ required_error: "senha obrigatória" })
    .min(6, "mínimo 6 caracteres"),
})

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signUpSchema),
  })

  async function handleSignUp({ firstName, email, password }: FormDataProps) {
    try {
      console.log(firstName, email, password)
      const response = await api.post("/auth/register", {
        firstName,
        email,
        password,
      })

      if (response.status !== 201) {
        const { data } = response
        throw new Error(data.message)
      }

      alert("Conta criada com sucesso!")
      navigation.navigate("signIn")
    } catch (error) {
      if (Array.isArray(error)) {
        alert(error.join("\n"))
      }
      alert("Erro ao criar conta. Tente novamente mais tarde.")
    }
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
          <View className="pt-10 my-12 space-y-2">
            <Text className="mx-4 text-5xl font-medium text-gray-800">
              Cadastre
            </Text>
            <Text className="mx-4 text-5xl font-medium text-gray-800">
              <Text className="font-extrabold">Simplifique</Text> seu Controle!
            </Text>
          </View>
          <View className="mx-4 flex justify-between items-center gap-3">
            <Animatable.View animation="slideInUp">
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange } }) => (
                  <Input hasError={!!errors.firstName}>
                    <Feather name="user" size={28} color="gray" />
                    <Input.Field placeholder="Nome" onChangeText={onChange} />
                  </Input>
                )}
              />
            </Animatable.View>
            <Animatable.View animation="slideInUp">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange } }) => (
                  <Input hasError={!!errors.email}>
                    <Fontisto name="email" size={28} color="gray" />
                    <Input.Field
                      placeholder="e-mail"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={onChange}
                    />
                  </Input>
                )}
              />
            </Animatable.View>
            <Animatable.View animation="slideInUp">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange } }) => (
                  <Input hasError={!!errors.password}>
                    <Fontisto name="unlocked" size={28} color="gray" />
                    <Input.Field
                      onSubmitEditing={handleSubmit(handleSignUp)}
                      secureTextEntry
                      returnKeyType="send"
                      placeholder="Senha"
                      onChangeText={onChange}
                    />
                  </Input>
                )}
              />
            </Animatable.View>
            <View className="flex-row flex-1 mt-4">
              <Animatable.View
                animation="slideInUp"
                delay={100}
                className="flex-1"
              >
                <TouchableOpacity
                  onPress={handleSubmit(handleSignUp)}
                  className="flex-row justify-center items-center gap-2 bg-gray-800 p-4 px-14 rounded-2xl"
                >
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
