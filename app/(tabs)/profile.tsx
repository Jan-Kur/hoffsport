import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/authContext";

export default function Profile() {
  const {signOut} = useContext(AuthContext)

  return (
    <SafeAreaView className="bg-bg-light dark:bg-bg-dark justify-center items-center flex-1">
      <TouchableOpacity
      onPress={() => signOut()}
      className="bg-black dark:bg-white self-center"
      >
        <Text className="text-white dark:text-black">SIGN OUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  ) 
}