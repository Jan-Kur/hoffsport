import { Link } from "expo-router";
import { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/authContext";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const {signInWithEmail} = useContext(AuthContext)

  const colorScheme = useColorScheme()
  const placeholderColor = colorScheme === "dark" ? "hsl(188, 3%, 60%)" : "hsl(188, 3%, 20%)"

  return (
    <SafeAreaView className="bg-light dark:bg-dark flex-1 px-5 pt-5">
      <View className="flex-col gap-3">
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
        <View className="flex-col items-start gap-1 ">
          <Text className="text-gray-6 dark:text-gray-4 text-base font-semibold">Hasło</Text>
          <View className="relative w-full h-fit">
            <TextInput
            className="bg-transparent rounded-xl border-2 border-gray-4 dark:border-gray-6 text-gray-6 dark:text-gray-4 text-base font-semibold p-3 w-full"
            value={password}
            onChangeText={setPassword}
            placeholder="Wpisz hasło"
            placeholderTextColor={placeholderColor}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            autoComplete="current-password"
            />
            <TouchableOpacity className="absolute top-1 right-3 p-2" onPress={() => setShowPassword(!showPassword)}>
              <Text className="text-lg">{showPassword ? '👀' : '🙈'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
        onPress={async () => {
          setErrorMessage("")
          const { error } = await signInWithEmail(email, password)
          if (error) {
            setErrorMessage(error.message)
          }
        }}
        className="bg-main w-full py-[10] rounded-xl mt-2"
        >
          <Text className="text-lg text-light text-center font-semibold">Zaloguj się</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1 self-center -mt-1">
          <Text className="text-base text-gray-6 dark:text-gray-4 font-semibold">Nie masz jeszcze konta?</Text>
          <Link href={"/(auth)/register"} className="text-base text-main dark:text-main-light font-semibold">Zarejestruj się</Link>
        </View>
        <Text className="mt-4 text-base text-error">{errorMessage}</Text>
      </View>
    </SafeAreaView>
  )
}