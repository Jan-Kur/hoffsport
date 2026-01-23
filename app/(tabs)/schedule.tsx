import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Filters from "../../components/scheduleFilters";
import { AdvancedFilters, Break, Filter, fetchMatches } from '../../utils/matches';
import { formatDate, formatTime, isLive, isSameDay } from "../../utils/time";

export default function Schedule() {
  const [matches, setMatches] = useState<Break[]>([])
  const [filter, setFilter] = useState<Filter>("today")
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({})

  const flashlistRef = useRef<any>(null)

  useEffect(() => {
    fetchMatches(filter, advancedFilters, setMatches)

    if (matches.length > 0) {
      if (filter === "past") {
        setTimeout(() => {
          flashlistRef.current?.scrollToEnd({ animated: true });
        }, 0)
      } else {
        setTimeout(() => {
          flashlistRef.current?.scrollToOffset({ offset: 0, animated: true });
        }, 0)
      }
    }
  }, [filter, advancedFilters])

  function DateHeader({date}: {date: Date}) {
    return (
      <Text className="text-gray-8 dark:text-gray-1 text-2xl font-bold text-left mb-2">{formatDate(date)}</Text>
    )
  }

  function Separator({leadingItem, trailingItem} : {
    leadingItem: Break,
    trailingItem: Break,
  }) {
    let show = isSameDay(leadingItem.date, trailingItem.date) ? false : true

    return (
      <>
        <View className="h-4"></View>
        {show && <DateHeader date={trailingItem.date}/>}
      </>
    )
  }

  return (
    <SafeAreaView className="bg-light dark:bg-dark items-center flex-1 flex-col px-4 py-2 gap-4">

      <Filters filter={filter} setFilter={setFilter} advFilters={advancedFilters} setAdvFilters={setAdvancedFilters}/>

      <View className="w-full flex-1 -mb-10">
        <FlashList
          ref={flashlistRef}
          data={matches}
          renderItem={renderItem}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={() => {
            if (matches.length === 0) return null
            return <DateHeader date={matches[0].date}/>
          }}
          keyExtractor={item => item.id}
          initialScrollIndex={filter === "past" ? matches.length - 1 : 0}
        />
      </View>
      
    </SafeAreaView>
  )
}

const renderItem: ListRenderItem<Break> = ({item}) => {
  const matches = item.matches.map(match => (
    <View key={match.id} className="bg-gray-2 dark:bg-gray-7 rounded-xl w-full h-fit flex-col">
      <View className="flex-row px-4 justify-between items-center border-b-gray-4 dark:border-b-gray-5 border-b-[1px] h-8">
        <Text className="text-gray-5 dark:text-gray-3 text-base font-medium w-2/5 text-left">{match.stage}</Text>

        {isLive(match.timestamp) && 
        <Image source={require("../../assets/images/live.png")} style={{height: 30, width: 48}}/>
        }

        <Text className="text-gray-5 dark:text-gray-3 text-base font-medium w-2/5 text-right">{match.place}</Text>
      </View>
      
      <View className="flex-row justify-between items-center px-4 h-14">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail" 
          className={`${match.score_a > match.score_b ? "text-main-light" : "text-gray-8 dark:text-gray-1" } font-semibold text-[18px] text-left w-[37%]`}>{match.team_season_a_id.name}</Text>

        <Text className="text-gray-8 dark:text-gray-1 text-[18px] font-semibold">{match.score_a} - {match.score_b}</Text>

        <Text 
          numberOfLines={2}
          ellipsizeMode="tail"
          className={`${match.score_a > match.score_b ? "text-main-light" : "text-gray-8 dark:text-gray-1" } font-semibold text-[18px] text-right w-[37%]`}>{match.team_season_b_id.name}</Text>
      </View>
    </View>
  ))

  return (
    <View className="p-3 gap-4 rounded-xl bg-gray-1 dark:bg-gray-8 flex-col items-start">
      <Text className="text-lg text-dark dark:text-white font-bold">{formatTime(item.date)}</Text>
      {matches}
    </View>
  )
}