import { Text, View } from "react-native";

export default function TimeTable() {
  return (
    <View className="bg-background-light dark:bg-background-dark justify-center items-center flex-1">
      <View className="bg-subtle w-1/2 h-1/5 justify-center items-center">
        <Text className="text-text-light dark:text-text-dark text-lg">Jestem meczem :)</Text>
      </View>
      <View className="bg-muted w-1/2 h-1/5 justify-center items-center">
        <Text className="text-text-light dark:text-text-dark text-lg">Jestem meczem :)</Text>
      </View>
    </View>
  )
}