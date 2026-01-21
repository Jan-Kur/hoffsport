import { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/authContext";

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [grade, setGrade] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const {sendMagicLink} = useContext(AuthContext)

  const colorScheme = useColorScheme()

  return (
    <SafeAreaView className="bg-light dark:bg-dark flex-1 px-5 pt-5">
      <View className="flex-col gap-4 mt-6">
        <View className="flex-col items-start gap-1">
          <Text className="text-gray-6 dark:text-gray-4 text-base font-semibold">Email szkolny</Text>
          <TextInput
          className="bg-transparent rounded-xl border-2 border-gray-4 dark:border-gray-6 text-gray-5 dark:text-gray-4 text-base font-semibold p-3 w-full"
          value={email}
          onChangeText={setEmail}
          placeholder="Wpisz swój email"
          placeholderTextColor={colorScheme === "dark" ? "hsl(188, 3%, 60%)" : "hsl(188, 3%, 20%)"}
          selectionColor={colorScheme === "light" ? "hsl(188, 90%, 20%)": "hsl(188, 90%, 30%)"}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          />
        </View>
        <View className="flex-col items-start gap-1">
          <Text className="text-gray-6 dark:text-gray-4 text-base font-semibold">Imię i nazwisko</Text>
          <TextInput
          className="bg-transparent rounded-xl border-2 border-gray-4 dark:border-gray-6 text-gray-5 dark:text-gray-4 text-base font-semibold p-3 w-full"
          value={name}
          onChangeText={setName}
          placeholder="Wpisz swoje imię i nazwisko"
          placeholderTextColor={colorScheme === "dark" ? "hsl(188, 3%, 60%)" : "hsl(188, 3%, 20%)"}
          selectionColor={colorScheme === "light" ? "hsl(188, 90%, 20%)": "hsl(188, 90%, 30%)"}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          />
        </View>
        <View className="flex-col items-start gap-1">
          <Text className="text-gray-6 dark:text-gray-4 text-base font-semibold">Klasa</Text>
          <TextInput
          className="bg-transparent rounded-xl border-2 border-gray-4 dark:border-gray-6 text-gray-5 dark:text-gray-4 text-base font-semibold p-3 w-full"
          value={grade}
          onChangeText={setGrade}
          placeholder="Wpisz swoją klasę"
          placeholderTextColor={colorScheme === "dark" ? "hsl(188, 3%, 60%)" : "hsl(188, 3%, 20%)"}
          selectionColor={colorScheme === "light" ? "hsl(188, 90%, 20%)": "hsl(188, 90%, 30%)"}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          />
        </View>
        <TouchableOpacity
        onPress={async () => { 
          if (!email.endsWith("hoffmanowa.pl")) {
            setErrorMessage("Podaj swój email szkolny")
          } else if (!name && !grade) {
            setErrorMessage("Podaj swoje prawdziwe imię i nazwisko oraz klasę")
          } else if (!name) {
            setErrorMessage("Podaj swoje prawdziwe imię i nazwisko")
          } else if (!grade) {
            setErrorMessage("Podaj swoją klasę")
          } else {
            setErrorMessage("")
            const { error } = await sendMagicLink(email, capitalizeFullName(name), grade.trim().toLowerCase())
            if (error) {
              setErrorMessage(error.message)
            }
          }    
        }}
        className="bg-main w-full py-[10] rounded-xl mt-2"
        >
          <Text className="text-lg text-light text-center font-semibold">Zaloguj się</Text>
        </TouchableOpacity>
        <Text className="-mt-1 text-xs font-medium text-gray-5 dark:text-gray-4">Wpisanie nieprawdziwego imienia i nazwiska lub klasy może grozić zakazem udziału w ligach</Text>
        <Text className="mt-4 text-sm font-medium text-error">{errorMessage}</Text>
      </View>
    </SafeAreaView>
  )
}

function capitalizeFullName(full_name: string) {
  return full_name
    .trim()
    .split(/\s+/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}