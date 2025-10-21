import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="team" options={{title: "Drużyna"}}/>
      <Tabs.Screen name="index" options={{title: "Terminarz"}}/>
    </Tabs>
  )
}