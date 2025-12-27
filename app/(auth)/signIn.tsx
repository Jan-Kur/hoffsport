import { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/authContext";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const {sendMagicLink} = useContext(AuthContext)

  const colorScheme = useColorScheme()
  const placeholderColor = colorScheme === "dark" ? "hsl(188, 3%, 60%)" : "hsl(188, 3%, 20%)"

  return (
    <SafeAreaView className="bg-light dark:bg-dark flex-1 px-5 pt-5">
      <View className="flex-col gap-3 mt-6">
        <View className="flex-col items-start gap-1">
          <Text className="text-gray-6 dark:text-gray-4 text-base font-semibold">Email szkolny</Text>
          <TextInput
          className="bg-transparent rounded-xl border-2 border-gray-4 dark:border-gray-6 text-gray-6 dark:text-gray-4 text-base font-semibold p-3 w-full"
          value={email}
          onChangeText={setEmail}
          placeholder="Wpisz swój email"
          placeholderTextColor={placeholderColor}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          />
        </View>
        <TouchableOpacity
        onPress={async () => {
          setErrorMessage("")
          const { error } = await sendMagicLink(email)
          if (error) {
            setErrorMessage(error.message)
          }
        }}
        className="bg-main w-full py-[10] rounded-xl mt-2"
        >
          <Text className="text-lg text-light text-center font-semibold">Zaloguj się</Text>
        </TouchableOpacity>
        <Text className="mt-4 text-base text-error">{errorMessage}</Text>
      </View>
    </SafeAreaView>
  )
}