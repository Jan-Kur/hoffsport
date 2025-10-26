import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <SafeAreaView className="bg-bg-light dark:bg-bg-dark flex-1 px-5 pt-5">
      {/*<TouchableOpacity className="bg-transparent w-full border-2 border-weak-light dark:border-weak-dark py-2">
      </TouchableOpacity>*/}
      <View className="flex-col gap-3">
        <View className="flex-col items-start gap-2">
          <Text className="text-weak-dark dark:text-subtle text-lg font-semibold">Email szkolny</Text>
          <TextInput
          className="bg-transparent rounded-xl border-2 border-weak-light dark:border-weak-dark text-weak-dark dark:text-subtle text-lg font-semibold p-2 w-full"
          value={email}
          onChangeText={setEmail}
          placeholder="Wpisz swój email"
          placeholderTextColor="#404040"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          />
        </View>
        <View className="flex-col items-start gap-2 ">
          <Text className="text-weak-dark dark:text-subtle text-lg font-semibold">Hasło</Text>
          <View className="relative w-full h-fit">
            <TextInput
            className="bg-transparent rounded-xl border-2 border-weak-light dark:border-weak-dark text-weak-dark dark:text-subtle text-lg font-semibold p-2 w-full"
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
            <TouchableOpacity className="absolute top-[9px] right-3" onPress={() => setShowPassword(!showPassword)}>
              <Text className="text-lg">{showPassword ? '👀' : '🙈'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
        className="bg-main-light w-full py-2 rounded-xl mt-2"
        
        >
          <Text className="text-xl text-weak-dark text-center font-bold">Zarejestruj się</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}