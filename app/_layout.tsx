import { Stack } from "expo-router"
import { AuthProvider } from "../contexts/authContext"
import "../global.css"

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator/>
    </AuthProvider>
  )
}

function RootNavigator() {
  let user = ""

  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      </Stack.Protected>
    </Stack>
  )
}