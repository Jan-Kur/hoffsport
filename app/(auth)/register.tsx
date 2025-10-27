import { Link } from "expo-router";
import { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/authContext";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const {signUp} = useContext(AuthContext)

  return (
    <SafeAreaView className="bg-bg-light dark:bg-bg-dark flex-1 px-5 pt-5">
      <View className="flex-col gap-3">
        <View className="flex-col items-start gap-1">
          <Text className="text-weak-dark dark:text-subtle text-lg font-semibold">Email szkolny</Text>
          <TextInput
          className="bg-transparent rounded-xl border-2 border-weak-light dark:border-weak-dark text-weak-dark dark:text-subtle text-lg font-semibold p-3 w-full"
          value={email}
          onChangeText={setEmail}
          placeholder="Wpisz swój email"
          placeholderTextColor="#404040"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          />
        </View>
        <View className="flex-col items-start gap-1 ">
          <Text className="text-weak-dark dark:text-subtle text-lg font-semibold">Hasło</Text>
          <View className="relative w-full h-fit">
            <TextInput
            className="bg-transparent rounded-xl border-2 border-weak-light dark:border-weak-dark text-weak-dark dark:text-subtle text-lg font-semibold p-3 w-full"
            value={password}
            onChangeText={setPassword}
            placeholder="Wpisz hasło"
            placeholderTextColor="#404040"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            autoComplete="current-password"
            />
            <TouchableOpacity className="absolute top-[12px] right-3" onPress={() => setShowPassword(!showPassword)}>
              <Text className="text-lg">{showPassword ? '👀' : '🙈'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
        onPress={async () => {
          setErrorMessage("")

          if (!validateEmail(email)) {
            setErrorMessage("Użyj maila szkolnego")
            return
          }

          const { error } = await signUp(email, password)
          if (error) {
            setErrorMessage(error.message)
          }
        }}
        className="bg-main-light w-full py-2 rounded-xl mt-3"
        >
          <Text className="text-2xl text-weak-dark text-center font-bold">Zarejestruj się</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1 self-center">
          <Text className="text-base text-weak-dark dark:text-subtle font-semibold">Masz już konto?</Text>
          <Link href={"/(auth)/signIn"} className="text-base text-main-dark dark:text-main-light font-semibold">Zaloguj się</Link>
        </View>
        <Text className="mt-4 text-base text-red-400">{errorMessage}</Text>
      </View>
    </SafeAreaView>
  )
}

function validateEmail(email: string) {
  const allowedDomains = ["uczen.hoffmanowa.pl", "hoffmanowa.pl"]

  let enteredDomain = email.split("@")

  if (!allowedDomains.includes(enteredDomain[1])) {
    return false
  } else {
    return true
  }
}