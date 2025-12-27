import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useEffect, useMemo, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Filters from "../../components/scheduleFilters";

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
  date: Date
  matches: Match[]
}

type Filter = "past" | "today" | "upcoming" | null

export default function Schedule() {
  const [selected, setSelected] = useState<Filter>("today")

  const flashlistRef = useRef<any>(null)

  useEffect(() => {
    if (filteredMatches.length > 0) {
      if (selected === "past") {
        requestAnimationFrame(() => {
          flashlistRef.current?.scrollToEnd({ animated: true });
        })
      } else {
        requestAnimationFrame(() => {
          flashlistRef.current?.scrollToOffset({ offset: 0, animated: true });
        })
      }
    }
  }, [selected])

  const matches: Break[] = [
    {
      id: "101",
      date: new Date("2025-12-25T07:20:00"),
      matches: [
        {
          id: "201",
          team1: "Bratas in Asharatas",
          team2: "Pushtroyers",
          score1: 18,
          score2: 22,
          timestamp: new Date("2025-12-25T10:00:00"),
          stage: "Faza grupowa",
          place: "Sektor 1",
          status: "completed",
          league: "1001"
        },
        {
          id: "202",
          team1: "Prawdziwki",
          team2: "Żółwie Ninja",
          score1: 25,
          score2: 19,
          timestamp: new Date("2025-12-25T10:15:00"),
          stage: "Faza grupowa",
          place: "Sektor 2",
          status: "completed",
          league: "1001"
        }
      ]
    },
    {
      id: "66",
      date: new Date("2025-12-25T09:00:00"),
      matches: [
        {
          id: "201",
          team1: "Bratas in Asharatas",
          team2: "Pushtroyers",
          score1: 18,
          score2: 22,
          timestamp: new Date("2025-12-25T10:00:00"),
          stage: "Faza grupowa",
          place: "Sektor 1",
          status: "completed",
          league: "1001"
        },
        {
          id: "202",
          team1: "Prawdziwki",
          team2: "Żółwie Ninja",
          score1: 25,
          score2: 19,
          timestamp: new Date("2025-12-25T10:15:00"),
          stage: "Faza grupowa",
          place: "Sektor 2",
          status: "completed",
          league: "1001"
        }
      ]
    },
    {
      id: "67",
      date: new Date("2025-12-25T12:00:00"),
      matches: [
        {
          id: "201",
          team1: "Bratas in Asharatas",
          team2: "Pushtroyers",
          score1: 18,
          score2: 22,
          timestamp: new Date("2025-12-25T10:00:00"),
          stage: "Faza grupowa",
          place: "Sektor 1",
          status: "completed",
          league: "1001"
        },
        {
          id: "202",
          team1: "Prawdziwki",
          team2: "Żółwie Ninja",
          score1: 25,
          score2: 19,
          timestamp: new Date("2025-12-25T10:15:00"),
          stage: "Faza grupowa",
          place: "Sektor 2",
          status: "completed",
          league: "1001"
        }
      ]
    },
    {
      id: "68",
      date: new Date("2025-12-25T13:00:00"),
      matches: [
        {
          id: "201",
          team1: "Bratas in Asharatas",
          team2: "Pushtroyers",
          score1: 18,
          score2: 22,
          timestamp: new Date("2025-12-25T10:00:00"),
          stage: "Faza grupowa",
          place: "Sektor 1",
          status: "completed",
          league: "1001"
        },
        {
          id: "202",
          team1: "Prawdziwki",
          team2: "Żółwie Ninja",
          score1: 25,
          score2: 19,
          timestamp: new Date("2025-12-25T10:15:00"),
          stage: "Faza grupowa",
          place: "Sektor 2",
          status: "completed",
          league: "1001"
        }
      ]
    },
    {
      id: "69",
      date: new Date("2025-12-25T14:00:00"),
      matches: [
        {
          id: "201",
          team1: "Bratas in Asharatas",
          team2: "Pushtroyers",
          score1: 18,
          score2: 22,
          timestamp: new Date("2025-12-25T10:00:00"),
          stage: "Faza grupowa",
          place: "Sektor 1",
          status: "completed",
          league: "1001"
        },
        {
          id: "202",
          team1: "Prawdziwki",
          team2: "Żółwie Ninja",
          score1: 25,
          score2: 19,
          timestamp: new Date("2025-12-25T10:15:00"),
          stage: "Faza grupowa",
          place: "Sektor 2",
          status: "completed",
          league: "1001"
        }
      ]
    },
    {
      id: "70",
      date: new Date("2025-12-26T14:30:00"),
      matches: [
        {
          id: "203",
          team1: "Blue Sharks",
          team2: "Red Dragons",
          score1: 25,
          score2: 23,
          timestamp: new Date("2025-12-26T14:30:00"),
          stage: "Ćwierćfinał",
          place: "Sektor 1",
          status: "completed",
          league: "1002"
        }
      ]
    },
    {
      id: "103",
      date: new Date("2025-12-27T13:00:00"),
      matches: [
        {
          id: "204",
          team1: "Golden Eagles",
          team2: "Silver Foxes",
          score1: 12,
          score2: 20,
          timestamp: new Date("2025-12-27T13:00:00"),
          stage: "Półfinał",
          place: "Sektor 1",
          status: "not completed",
          league: "1003"
        },
        {
          id: "205",
          team1: "Night Owls",
          team2: "Day Lions",
          score1: 15,
          score2: 18,
          timestamp: new Date("2025-12-27T13:20:00"),
          stage: "Półfinał",
          place: "Sektor 2",
          status: "not completed",
          league: "1003"
        }
      ]
    },
    {
      id: "104",
      date: new Date("2025-12-28T16:00:00"),
      matches: [
        {
          id: "206",
          team1: "Thunder Cats",
          team2: "Wind Wolves",
          score1: 0,
          score2: 0,
          timestamp: new Date("2025-12-28T16:00:00"),
          stage: "Finał",
          place: "Sektor 1",
          status: "not completed",
          league: "1004"
        }
      ]
    },
    {
      id: "105",
      date: new Date("2025-12-29T11:15:00"),
      matches: [
        {
          id: "207",
          team1: "Lebubu",
          team2: "Ser Faraona",
          score1: 0,
          score2: 0,
          timestamp: new Date("2025-12-29T11:15:00"),
          stage: "Ćwierćfinał",
          place: "Sektor 2",
          status: "not completed",
          league: "1004"
        }
      ]
    },
    {
      id: "106",
      date: new Date("2025-12-24T09:30:00"),
      matches: [
        {
          id: "208",
          team1: "Crimson Bears",
          team2: "Emerald Turtles",
          score1: 30,
          score2: 28,
          timestamp: new Date("2025-12-24T09:30:00"),
          stage: "Faza grupowa",
          place: "Sektor 3",
          status: "completed",
          league: "1005"
        },
        {
          id: "209",
          team1: "Prawdziwki",
          team2: "Żółwie Ninja",
          score1: 22,
          score2: 25,
          timestamp: new Date("2025-12-24T09:50:00"),
          stage: "Faza grupowa",
          place: "Sektor 1",
          status: "completed",
          league: "1005"
        }
      ]
    }
  ]

  const filteredMatches = useMemo(() => {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0))
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999))


    return matches.filter(block => {
      switch (selected) {
        case "past":
          return block.date < startOfDay
        case "today":
          return block.date >= startOfDay && block.date <= endOfDay
        case "upcoming":
          return block.date > endOfDay
        default:
          return true
      }
    }).sort((Break1, Break2) => Break1.date.getTime() - Break2.date.getTime())
  }, [matches, selected])

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

      <Filters selected={selected} setSelected={setSelected}/>

      <View className="w-full flex-1 -mb-11">
        <FlashList
          ref={flashlistRef}
          data={filteredMatches}
          renderItem={renderItem}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={() => {
            if (filteredMatches.length === 0) return null
            return <DateHeader date={filteredMatches[0].date}/>
          }}
          keyExtractor={item => item.id}
          initialScrollIndex={selected === "past" ? filteredMatches.length - 1 : 0}
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
          className={`${match.score1 > match.score2 ? "text-main-light" : "text-gray-8 dark:text-gray-1" } font-semibold text-[18px] text-left w-[37%]`}>{match.team1}</Text>

        <Text className="text-gray-8 dark:text-gray-1 text-[18px] font-semibold">{match.score1} - {match.score2}</Text>

        <Text 
          numberOfLines={2}
          ellipsizeMode="tail"
          className={`${match.score2 > match.score1 ? "text-main-light" : "text-gray-8 dark:text-gray-1" } font-semibold text-[18px] text-right w-[37%]`}>{match.team2}</Text>
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


function isLive(date: Date) {
  const end = new Date(date.getTime());
  end.setMinutes(end.getMinutes() + 20);

  return date.getTime() <= Date.now() && end.getTime() >= Date.now();
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pl-PL', { 
    weekday: 'long',
    day: 'numeric',
    month: 'long' 
  }).format(date)
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}