import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScheduleFilters from "../../components/scheduleFilters";

export default function Schedule() {
  const matches = ["match1", "match2"]

  return (
    <SafeAreaView className="bg-light dark:bg-dark items-center flex-1 flex-col px-4 py-2">

      <ScheduleFilters/>

      <FlashList 
      data={matches}
      renderItem={renderItem}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={separator}
      />

    </SafeAreaView>
  )
}

function renderItem (item) {
  return (
    <Text>{item}</Text>
  )
}

function separator() {
  return (
    <View></View>
  )
}