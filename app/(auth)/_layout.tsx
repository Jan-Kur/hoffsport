import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack initialRouteName='register' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn" />
      <Stack.Screen name="register" />
    </Stack>
  );
}