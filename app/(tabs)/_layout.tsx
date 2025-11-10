import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="schedule" screenOptions={{
      headerShown: false, 
      tabBarShowLabel: false,
      tabBarInactiveTintColor: "hsl(188, 90%, 20%)",
      tabBarActiveTintColor: "hsl(188, 90%, 30%)",
    }}>
      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({color}) => <MaterialCommunityIcons name="account" size={30} color={color} />
      }}/>
      <Tabs.Screen name="schedule" options={{
        tabBarIcon: ({color}) => <MaterialCommunityIcons name="calendar-month" size={30} color={color} />
      }}/>
      <Tabs.Screen name="table" options={{
        tabBarIcon: ({color}) => <MaterialCommunityIcons name="table" size={30} color={color} />
      }}/>
    </Tabs>
  )
}