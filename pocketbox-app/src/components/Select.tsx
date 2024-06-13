import React, { useState } from "react"
import { useController, Control } from "react-hook-form"
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native"

interface Option {
  label: string
  value: string
}

interface SelectProps {
  name: string
  control: Control<any>
  options: Option[]
  label: string
}

export const Select: React.FC<SelectProps> = ({
  name,
  control,
  options,
  label,
}) => {
  const { field } = useController({
    name,
    control,
  })

  const [modalVisible, setModalVisible] = useState(false)

  const handleSelect = (value: string) => {
    field.onChange(value)
    setModalVisible(false)
  }

  return (
    <View className="flex-1">
      <TouchableOpacity className="p-3" onPress={() => setModalVisible(true)}>
        <Text>{field.value || "Selecione a categoria"}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="flex-1 justify-center"
        >
          <View style={styles.modalContainer}>
            <Text className="text-xl font-bold text-black">
              Selecionar Categoria
            </Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b-2 border-gray-300"
                  onPress={() => handleSelect(item.value)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              className="flex justify-center mt-2 p-3 bg-gray-800 items-center"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-bold">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
})
