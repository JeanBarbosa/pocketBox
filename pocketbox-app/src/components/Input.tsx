import { TextInput, View, TextInputProps } from "react-native"

type InputProps = {
  children: React.ReactNode
  hasError: boolean
}

function Input({ hasError, children }: InputProps) {
  return (
    <View
      className={`w-full flex-row p-4 gap-3 bg-white rounded-2xl ${
        hasError ? "border-2 border-red-500" : ""
      }`}
    >
      {children}
    </View>
  )
}

function Field({ ...props }: TextInputProps) {
  return <TextInput className="flex-1 ml-2 text-gray-800 " {...props} />
}

Input.Field = Field

export { Input }
