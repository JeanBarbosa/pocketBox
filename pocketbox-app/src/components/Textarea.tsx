import { TextInput, View, TextInputProps } from "react-native"

interface TextareaProps extends TextInputProps {
  style?: object
}

export const Textarea = ({ style, ...props }: TextareaProps) => {
  return (
    <View className="border border-gray-300 rounded-md p-2">
      <TextInput
        className="text-base h-20"
        multiline
        numberOfLines={4}
        {...props}
      />
    </View>
  )
}
