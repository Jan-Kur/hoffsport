import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScheduleFilters from "../../components/scheduleFilters";

type Match = {
  id: string
  team1: string
  team2: string
  score1: number
  score2: number
  timestamp: Date
  stage: string
  place: string
  status: string
  league: string
}

type Break = {
  id: string
  time: string
  matches: Match[]
}

export default function Schedule() {
  const matches: Break[] = [
    {
      id: "123",
      time: "11:45",
      matches: [
        { 
          id: "456",
          team1: "Bratas in Asharatas twojej starej hej hej hej",
          team2: "Pushtroyers",
          score1: 25,
          score2: 13,
          timestamp: new Date("2025-11-10T11:45:00"),
          stage: "Finał",
          place: "Sektor 1",
          status: "completed",
          league: "999"
        },
        {
          id: "1111",
          team1: "Prawdziwki",
          team2: "Pushtroyers",
          score1: 25,
          score2: 13,
          timestamp: new Date("2025-11-10T11:45:00"),
          stage: "Półfinał",
          place: "Sektor 2",
          status: "completed",
          league: "999"
        }
      ]
    },
    { 
      id: "789",
      time: "12:50",
      matches: [
        {
          id: "2222",
          team1: "Lebubu",
          team2: "Ser Faraona",
          score1: 25,
          score2: 13,
          timestamp: new Date("2025-11-10T12:50:00"),
          stage: "Półfinał",
          place: "Sektor 1",
          status: "live",
          league: "999"
        }
      ]
    }
  ]

  return (
    <SafeAreaView className="bg-light dark:bg-dark items-center flex-1 flex-col px-4 py-2">

      <ScheduleFilters/>

      <View className="w-full flex-1">
        <FlashList
          data={matches}
          renderItem={renderItem}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={separator}
          keyExtractor={item => item.id}
        />
      </View>
      
    </SafeAreaView>
  )
}

const renderItem: ListRenderItem<Break> = ({item}) => {
  const matches = item.matches.map(match => (
    <View key={match.id} className="bg-gray-2 dark:bg-gray-7 rounded-xl w-full h-fit flex-col">
      <View className="flex-row px-4 justify-between items-center border-b-gray-4 dark:border-b-gray-5 border-b-[1px] py-1">
        <Text className="text-gray-5 dark:text-gray-3 text-base font-medium w-2/5 text-left">{match.stage}</Text>

        {isLive(match.timestamp) && 
        <Image source={require("../../assets/images/live.png")} style={{height: 24, width: 24}}/>
        }

        <Text className="text-gray-5 dark:text-gray-3 text-base font-medium w-2/5 text-right">{match.place}</Text>
      </View>
      
      <View className="flex-row justify-between items-center px-4 h-14">
        <Text className={`${match.score1 > match.score2 ? "text-main-light" : "text-gray-8 dark:text-gray-1" } font-semibold text-lg text-left text-ellipsis w-1/3`}>{match.team1}</Text>

        <Text className="text-gray-8 dark:text-gray-1 text-lg font-semibold">{match.score1} - {match.score2}</Text>

        <Text className={`${match.score2 > match.score1 ? "text-main-light" : "text-gray-8 dark:text-gray-1" } font-semibold text-lg text-right text-ellipsis w-1/3`}>{match.team2}</Text>
      </View>
    </View>
  ))

  return (
    <View className="p-3 gap-4 rounded-xl bg-gray-1 dark:bg-gray-8 flex-col items-start">

    <Text className="text-lg text-dark dark:text-white font-bold">{item.time}</Text>
      
    {matches}
      
    </View>
  )
}

const separator = ({trailingItem, leadingItem}) => {
  return (
    <View className="h-4"></View>
  )
}

function isLive(date: Date) {
  const end = new Date(date.getTime());
  end.setMinutes(end.getMinutes() + 20);

  return date.getTime() <= Date.now() && end.getTime() >= Date.now();
}