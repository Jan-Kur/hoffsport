import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useContext } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext, AuthProvider } from "../contexts/authContext";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AuthProvider>
          <RootNavigator/>
        </AuthProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

function RootNavigator() {
  const {user, loading} = useContext(AuthContext)

  if (!loading) {
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
}