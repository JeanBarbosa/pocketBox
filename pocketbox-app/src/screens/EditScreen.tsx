import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AppRoutesStackNavigatorProps } from "../routes/app.routes"
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { Input } from "../components/Input"
import { Select } from "../components/Select"

type FormDataProps = {
  name: string
  price: string
  category: string
  quantity: string
  description: string
}

const productSchema = z.object({
  name: z
    .string({ required_error: "Nome obrigatório" })
    .min(3, "mínimo 3 caracteres"),
  price: z.number({ required_error: "preço obrigatória" }),
  category: z.string({ required_error: "Categoria obrigatória" }),
  description: z.string({ required_error: "Descrição obrigatória" }),
})

export function EditScreen() {
  const navigation = useNavigation<AppRoutesStackNavigatorProps>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(productSchema),
  })

  async function handleEdit({
    name,
    price,
    category,
    description,
  }: FormDataProps) {
    console.log(name, price, category, description)
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
          <View className="flex-row justify-between mx-4 items-center">
            <TouchableOpacity
              className="bg-white p-3 rounded-2xl shadow"
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={24} />
            </TouchableOpacity>
          </View>
          <View className="my-10 space-y-2">
            <Text className="mx-4 text-5xl font-medium text-gray-800">
              Novo Produto
            </Text>
          </View>
          <View className="mx-4 flex justify-between items-center gap-3">
            <Animatable.View animation="slideInUp">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange } }) => (
                  <Input hasError={!!errors.name}>
                    <Feather name="tag" size={28} color="gray" />
                    <Input.Field placeholder="Nome" onChangeText={onChange} />
                  </Input>
                )}
              />
            </Animatable.View>
            <View className="flex-row flex-1 p-4 bg-white rounded-2xl">
              <MaterialIcons name="attach-money" size={28} color="gray" />
              <TextInput
                placeholder="Preço"
                className="flex-1 ml-2 text-gray-800"
                onSubmitEditing={() => {
                  console.log("entrei")
                }}
                secureTextEntry
                returnKeyType="send"
              />
            </View>
            <View className="flex-row flex-1 p-2 bg-white rounded-2xl items-center w-full">
              <Feather name="search" size={28} color="gray" />
              <Select
                name="category"
                control={control}
                options={[
                  { label: "Alimentos e Bebidas", value: "alimentos-bebidas" },
                  {
                    label: "Eletrodomésticos e Eletrônicos",
                    value: "eletrodomesticos-eletronicos",
                  },
                  {
                    label: "Vestuário e Acessórios",
                    value: "vestuario-acessorios",
                  },
                  { label: "Saúde e Beleza", value: "saude-beleza" },
                  { label: "Móveis e Decoração", value: "moveis-decoracao" },
                  { label: "Automotivo", value: "automotivo" },
                  { label: "Brinquedos e Jogos", value: "brinquedos-jogos" },
                  { label: "Esportes e Lazer", value: "esportes-lazer" },
                  {
                    label: "Ferramentas e Materiais de Construção",
                    value: "ferramentas-materiais-construcao",
                  },
                  { label: "Livros e Papelaria", value: "livros-papelaria" },
                  { label: "Outros", value: "outros" },
                ]}
                label="Selecione uma categoria"
              />
            </View>
            <View className="flex-row flex-1 p-4 bg-white rounded-2xl">
              <Feather name="info" size={28} color="gray" />
              <TextInput
                placeholder="Descrição"
                className="flex-1 ml-2 text-gray-800"
                onSubmitEditing={() => {
                  console.log("entrei")
                }}
                secureTextEntry
                returnKeyType="send"
              />
            </View>
            <View className="flex-row flex-1 mt-4">
              <Animatable.View
                animation="slideInUp"
                delay={100}
                className="flex-1"
              >
                <TouchableOpacity className="flex-row justify-center items-center gap-2 bg-gray-800 p-4 px-14 rounded-2xl">
                  <Text className="text-white text-xl font-semibold">
                    Salvar
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
