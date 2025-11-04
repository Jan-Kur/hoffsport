import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="index" screenOptions={{headerShown: false}}>
      <Tabs.Screen name="profile" options={{title: "Profil"}}/>
      <Tabs.Screen name="index" options={{title: "Terminarz"}}/>
    </Tabs>
  )
}