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
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"
import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Textarea } from "../components/Textarea"
import useProductStore from "../storage/productStore"
import { categories } from "../utils/categories"

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
  price: z.string({ required_error: "preço obrigatória" }),
  category: z.string({ required_error: "Categoria obrigatória" }),
  description: z.string({ required_error: "Descrição obrigatória" }),
})

export function EditScreen({ route }: any) {
  const navigation = useNavigation<AppRoutesStackNavigatorProps>()
  const { addProduct, updateProduct } = useProductStore()
  const product = route.params
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(productSchema),
    defaultValues: !!product
      ? {
          name: product.name,
          price: product.price.toString(),
          category: product.category,
          description: product.description,
        }
      : {},
  })

  async function handleSave({
    name,
    price,
    category,
    description,
  }: FormDataProps) {
    try {
      if (!product) {
        await addProduct({
          id: "",
          userId: "",
          image: "https://github.com/jeanbarbosa.png",
          name,
          price: parseInt(price),
          category,
          description,
        })

        Alert.alert("Sucesso", "Produto salvo com sucesso!", [
          {
            text: "Home",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
          {
            text: "Novo Produto",
            onPress: () => {
              reset()
            },
          },
        ])
      } else {
        await updateProduct({
          ...product,
          image: "https://github.com/jeanbarbosa.png",
          name,
          price: parseInt(price),
          category,
          description,
        })

        Alert.alert("Sucesso", "Produto salvo com sucesso!", [
          {
            text: "Home",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
        ])
      }
    } catch (error) {
      console.log(error)
    }
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
              {!!product ? "Editar" : "Adicionar"} Produto
            </Text>
          </View>
          <View className="mx-4 flex justify-between items-center gap-3">
            <Animatable.View animation="slideInUp">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input hasError={!!errors.name}>
                    <Feather name="tag" size={20} color="gray" />
                    <Input.Field
                      placeholder="Nome"
                      value={value}
                      onChangeText={onChange}
                    />
                  </Input>
                )}
              />
            </Animatable.View>
            <Animatable.View animation="slideInUp">
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <Input hasError={!!errors.name}>
                    <MaterialIcons name="attach-money" size={20} color="gray" />
                    <Input.Field
                      value={value}
                      keyboardType="numeric"
                      placeholder="Preço"
                      onChangeText={onChange}
                    />
                  </Input>
                )}
              />
            </Animatable.View>
            <Animatable.View
              animation="slideInUp"
              className="flex-row flex-1 p-2 bg-white rounded-2xl items-center w-full"
            >
              <Feather name="search" size={20} color="gray" />
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange } }) => (
                  <Select
                    name="category"
                    control={control}
                    options={categories}
                    label="Selecione uma categoria"
                  />
                )}
              />
            </Animatable.View>
            <Animatable.View
              animation="slideInUp"
              className="flex w-full p-4 bg-white rounded-2xl"
            >
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Textarea
                    placeholder="Descrição"
                    maxLength={200}
                    defaultValue={value}
                    onChangeText={onChange}
                  />
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
                  onPress={handleSubmit(handleSave)}
                  className="flex-row justify-center items-center gap-2 bg-gray-800 p-4 px-14 rounded-2xl"
                >
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
