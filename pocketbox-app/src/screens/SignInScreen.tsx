import { z } from "zod"
import { Fontisto } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Animatable from "react-native-animatable"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import { Input } from "../components/Input"
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = z.object({
  email: z
    .string({ required_error: "e-mail obrigatório" })
    .email("e-mail inválido"),
  password: z
    .string({ required_error: "senha obrigatória" })
    .min(6, "mínimo 6 caracteres"),
})

export function SignInScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { login } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signInSchema),
  })

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      const response = await api.post("/auth/login", { email, password })

      if (response.status !== 200) {
        throw new Error("Usuário ou senha inválidos")
      }

      const { data } = response
      login(data.user, data.token)
    } catch (error) {
      const title = "Não foi possível entrar. Tente novamente mais tarde."
      alert(title)
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
              <Text className="font-extrabold">Simplifique</Text> suas Compras!
            </Text>
          </View>
          <View className="mx-4 flex justify-between items-center gap-3">
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
                      onSubmitEditing={handleSubmit(handleSignIn)}
                      secureTextEntry
                      autoCapitalize="none"
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
                  onPress={handleSubmit(handleSignIn)}
                  className="flex-row justify-center items-center gap-2 bg-gray-800 p-4 px-14 rounded-2xl"
                >
                  <Text className="text-white text-xl font-semibold">
                    Entrar
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
            <View className="flex-row flex-1">
              <Animatable.View animation="slideInUp" delay={100}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("signUp")}
                  className="flex-row justify-center items-center p-4 px-14"
                >
                  <Text className="text-white text-xl font-light">
                    Criar uma conta?
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  )
}
