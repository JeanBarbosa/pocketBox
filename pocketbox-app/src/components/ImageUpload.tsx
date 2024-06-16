import { StatusBar } from "expo-status-bar"
import { useState, useEffect } from "react"
import { Feather } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { listFiles, uploadToFirebase } from "../services/firebase"
import { ProductDTO } from "../dtos/productDTO"
import useProductStore from "../storage/productStore"
import {
  Text,
  View,
  Button,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native"
import { useAuth } from "../hooks/useAuth"

type ImageUploadProps = {
  product: ProductDTO
}

type ImageListProps = {
  files: any
  onSelected: (files: any) => void
}

export function ImagesList({ files, onSelected }: ImageListProps) {
  const columns = 3

  const Item = ({ name }: any) => {
    const uri = `https://firebasestorage.googleapis.com/v0/b/pocketbox-82799.appspot.com/o/images%2F${name.replace(
      "images/",
      ""
    )}?alt=media`

    return (
      <Pressable
        className="flex-row p-2"
        onPress={() => onSelected(uri)}
        key={name}
      >
        <Image
          className="w-32 h-32 border-2 border-slate-500 rounded-2xl"
          source={{
            uri,
          }}
        />
        {/* <Text className="text-lg">{name.replace("images/", "")}</Text> */}
      </Pressable>
    )
  }

  function createRows(data: any, columns: number) {
    const rows = Math.floor(data.length / columns)
    let lastRowElements = data.length - rows * columns
    while (lastRowElements !== columns) {
      data.push({
        key: `empty-${lastRowElements}`,
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true,
      })
      lastRowElements += 1
    }
    return data
  }

  return (
    <FlatList
      style={{ width: "100%" }}
      numColumns={columns}
      data={createRows(files, columns)}
      renderItem={({ item }) => <Item key={item.name} name={item.name} />}
      keyExtractor={(item) => item.name}
    />
  )
}

export function ImageUpload({ product }: ImageUploadProps) {
  const [image, setImage] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [permission, requestPermission] = ImagePicker.useCameraPermissions()
  const [files, setFiles] = useState<any>([])
  const { updateProduct } = useProductStore()
  const { user } = useAuth()

  useEffect(() => {
    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        return { name: value.fullPath }
      })

      setFiles(files)
    })
  }, [])

  const handleUpdateProduct = async (uri: string) => {
    setImage(uri)
    await updateProduct({
      ...product,
      image: uri,
    })

    setModalVisible(false)
  }
  /**
   *
   */
  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.4,
      })

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0]
        const fileName = uri.split("/").pop()
        const uploadResp = await uploadToFirebase(uri, fileName!, (v: any) =>
          console.log(v)
        )

        setImage(uploadResp.downloadUrl)

        listFiles().then((listResp) => {
          const files = listResp.map((value) => {
            return { name: value.fullPath }
          })

          setFiles(files)
        })
      }
    } catch (e: any) {
      Alert.alert("Error Uploading Image " + e.message)
    }
  }

  // permission check
  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View className="flex justify-center items-center">
        <Text>Permissão não concedida - {permission?.status}</Text>
        <StatusBar style="auto" />
        <Button
          title="Solicitar permissão"
          onPress={requestPermission}
        ></Button>
      </View>
    )
  }
  return (
    <View className="flex justify-end items-end">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View className="bg-white flex-1 pt-4">
          <View className="flex-row justify-start mx-4 items-center">
            <TouchableOpacity
              className="bg-gray-800 p-3 rounded-2xl shadow"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Feather name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            <Text className=" flex-1 text-center text-lg font-extrabold">
              Images disponíveis
            </Text>
          </View>
          <View className="flex-1 justify-center items-center mt-4">
            <ImagesList
              files={files}
              onSelected={(uri) => handleUpdateProduct(uri)}
            />
            <TouchableOpacity
              className="mb-4 w-32 h-32 bg-gray-800 p-2 gap-2 rounded-full items-center justify-center"
              onPress={takePhoto}
            >
              <Text className="text-white font-bold ">Tire uma foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {user?.id === product.userId ? (
        <Pressable
          className="z-10 -mb-10 bg-blue-400 p-3 rounded-full shadow w-14 h-14 items-center justify-center"
          onPress={() => setModalVisible(true)}
        >
          <Feather name="camera" size={24} />
        </Pressable>
      ) : (
        <></>
      )}

      {product.image || !!image ? (
        <Image
          source={{ uri: !!image ? image : product.image }}
          className="h-48 w-48 rounded-2xl"
        />
      ) : (
        <Image
          source={require("../assets/default.jpg")}
          className="h-48 w-48 rounded-2xl"
        />
      )}
    </View>
  )
}
