import { Stack } from "expo-router"
import "../global.css"

export default function RootLayout() {
  return (
    <RootNavigator/>
  )
}

function RootNavigator() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  )
}