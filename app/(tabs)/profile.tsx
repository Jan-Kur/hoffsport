import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <View className="bg-background-light dark:bg-background-dark justify-center items-center">
      <View className="bg-subtle w-1/2 h-1/5 justify-center items-center">
        <Text className="text-text-light dark:text-text-dark text-lg">Stwórz drużynę</Text>
        <TouchableOpacity className="bg-highlight-light dark:bg-highlight-dark justify-center items-center">
          <Text className="text-text-light dark:text-text-dark">BUTTON</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-muted w-1/2 h-1/5 justify-center items-center">
        <Text className="text-text-light dark:text-text-dark text-lg">Wyniki twojej drużyny</Text>
        <TouchableOpacity className="dark:bg-highlight-light bg-highlight-dark justify-center items-center">
          <Text className="text-text-dark dark:text-text-light">BUTTON</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) 
}