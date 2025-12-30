import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useDateRange } from '@marceloterreiro/flash-calendar';
import { useMemo, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { CustomSheet } from "./bottomSheet";
import { CustomCalendar } from './calendar';

export default function Filters({selected, setSelected}) {
  
  return (
    <View className='w-full h-fit flex-row justify-between'>
      
      <View className='flex-row gap-1'>
        <TimeframeFilter isSelected={selected === "past"} onPress={() => setSelected("past")} text={"Przeszłe"}/>
        <TimeframeFilter isSelected={selected === "today"} onPress={() => setSelected("today")} text={"Dzisiaj"}/>
        <TimeframeFilter isSelected={selected === "upcoming"} onPress={() => setSelected("upcoming")} text={"Nadchodzące"}/>
      </View>

      <AdvancedFilter/>

    </View>
  )
}

type TimeframeFilterProps = {
  isSelected: boolean;
  onPress: () => void;
  text: string;
}

function TimeframeFilter({isSelected, onPress, text}: TimeframeFilterProps) {    
  return (
    <TouchableOpacity className={`p-2 items-center justify-center ${isSelected ? "bg-main" : "bg-transparent"} rounded-2xl`}
      onPress={onPress}
    >
      <Text className={`${isSelected ? "text-light" : "text-dark"} dark:text-light text-base font-semibold`}>{text}</Text>
    </TouchableOpacity>
  )
}

function AdvancedFilter() {  
  const colorScheme = useColorScheme()

  const bsRef = useRef<BottomSheetModal>(null)

  const leagues = ["HBL", "HVL", "HLK"]
  const [selectedLeague, setSelectedLeague] = useState(null)

  const stages = ["Finał", "Półfinał", "Ćwierćfinał", "1/8 Finału", "Faza grupowa"]
  const [selectedStage, setSelectedStage] = useState(null)

  const teams = ["Lebubu", "Ser Faraona", "Salchichias", "Mike i gang", "Prawdziwki", "Jelenia Góra", "Twoja stara", "Placka", "ŻKS Żentos", "Bratas", "a", "b", "c", "d", "e", "f", "g"]

  const [teamSearch, setTeamSearch] = useState("")
  const [showTeams, setShowTeams] = useState(false)
  const [selectedTeams, setSelectedTeams] = useState([])

  const { calendarActiveDateRanges, onCalendarDayPress, dateRange } = useDateRange()
  const [showCalendar, setShowCalendar] = useState(false)

  const filteredTeams = useMemo(() => 
    teams.filter(team => 
      team.toLowerCase().includes(teamSearch.toLowerCase())
    ), 
    [teamSearch, teams]
  )

  const snapPoints = useMemo(() => ["60%", "90%"], [])

  return (
    <>
      <TouchableOpacity 
        onPress={() => bsRef.current.present()}
        className='px-3 flex-row gap-[6px] items-center bg-gray-8 dark:bg-gray-1 h-fit rounded-full'
      >
        <Ionicons name="filter" size={32} className="text-light dark:text-dark"/>
        <Text className='text-light dark:text-dark font-semibold text-base'>Filtruj</Text>
      </TouchableOpacity>

      <CustomSheet
        ref={bsRef}
        snapPoints={snapPoints}
      >
        <BottomSheetView className='flex-1 px-4 py-3 flex-col gap-5'>

          <View className='flex-col gap-2'>
            <Text className='text-base font-semibold text-dark dark:text-light'>Zakres czasowy</Text>
            <TouchableOpacity 
              onPress={() => setShowCalendar(true)}
              className='bg-gray-2 dark:bg-gray-7 rounded-xl py-3 px-4 gap-2 flex-row'
            >
              <Feather name="calendar" size={24} color={colorScheme === "dark" ? "#F2F3F3" : "#0B0E0E"} />
              <Text className='text-base font-semibold text-dark dark:text-light'>
                {formatDateId(dateRange.startId, dateRange.endId)}
              </Text>
            </TouchableOpacity>
          </View>

          {showCalendar && (
            <Modal
              animationType="fade"
              visible={showCalendar}
              transparent={true}
              onRequestClose={() => setShowCalendar(false)}
            >
              <View className="flex-1 justify-center items-center bg-black/70">
                <TouchableOpacity
                  className="absolute top-0 left-0 right-0 bottom-0"
                  onPress={() => setShowCalendar(false)}
                  activeOpacity={1}
                />
                <View className='w-[85%] bg-gray-1 dark:bg-gray-8 rounded-xl p-1 z-10'>
                  <CustomCalendar 
                    calendarActiveDateRanges={calendarActiveDateRanges} 
                    onCalendarDayPress={onCalendarDayPress}
                  />
                </View>
              </View>
            </Modal>
          )}

          <View className='flex-col gap-2'>
            <View className='flex-row gap-4 items-center'>
              <Text className='text-base font-semibold text-dark dark:text-light'>Drużyna</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View className='flex-row gap-1'>
                  {selectedTeams.map(team => {
                    return (
                      <TouchableOpacity
                      key={team}
                        onPress={() => {
                          setSelectedTeams(selectedTeams.filter(t => t !== team))
                        }}
                        className='px-2 bg-main-light dark:bg-main rounded-full'
                      >
                        <Text className='text-sm font-normal text-dark dark:text-light'>{team}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
            </View>
            
            <View className='bg-gray-2 dark:bg-gray-7 px-4 flex-row rounded-xl items-center h-12 gap-2'>
              <MaterialIcons name="search" size={24} color={colorScheme === "dark" ? "#F2F3F3" : "#0B0E0E"} />
              <TextInput 
                className='flex-1 text-base font-medium self-center text-dark dark:text-light'
                autoCorrect={false}
                selectionColor={colorScheme === "dark" ? "hsl(188, 90%, 20%)": "hsl(188, 90%, 30%)"}
                placeholder='wybierz drużynę'
                onFocus={() => {
                  bsRef.current.expand()
                  setShowTeams(true)
                }}
                onBlur={() => {
                  bsRef.current.collapse()
                  setShowTeams(false)
                }}
                value={teamSearch}
                onChangeText={setTeamSearch}
              />
            </View>
            {showTeams && (
              <FlatList
                data={filteredTeams}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    onPress={() => {
                      setSelectedTeams(prev => 
                        prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]
                      )
                    }}
                    className='px-4 py-4'
                  >
                    <Text className='text-dark dark:text-light text-base'>{item}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View className='h-[1px] bg-gray-3 dark:bg-gray-6'></View>}
                ListEmptyComponent={() => <Text className='text-gray-3 dark:text-gray-6 text-center py-4 text-base font-medium'>Nie znaleziono drużyny</Text>}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                className='h-1/4'
              />
            )}
          </View>

          <View className='flex-col gap-2'>
            <Text className='text-base font-semibold text-dark dark:text-light'>Liga</Text>
            <View className='flex-row gap-2'>
              {leagues.map(league => (
                <TouchableOpacity
                  key={league}
                  onPress={() => setSelectedLeague(selectedLeague === league ? null : league)}
                  className={`${selectedLeague === league ? "bg-main" : "bg-gray-2 dark:bg-gray-7"} 
                    flex-1 py-3 justify-center items-center rounded-xl`}
                >
                  <Text className={`text-base font-semibold ${selectedLeague === league ? "text-light" : "text-dark dark:text-light"}`}>
                    {league}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className='flex-col gap-2'>
            <Text className='text-base font-semibold text-dark dark:text-light'>Etap rozgrywek</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className='flex-row gap-2'>
                {stages.map(stage => (
                  <TouchableOpacity
                    key={stage}
                    onPress={() => setSelectedStage(selectedStage === stage ? null : stage)}
                    className={`${selectedStage === stage ? "bg-main" : "bg-gray-2 dark:bg-gray-7"}
                      px-4 py-3 justify-center items-center rounded-xl`}
                  >
                    <Text className={`text-base font-semibold ${selectedStage === stage ? "text-white" : "text-dark dark:text-light"}`}>
                      {stage}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

        </BottomSheetView>
      </CustomSheet>
    </>
    
  )
}

function formatDateId(startDate: string | undefined, endDate: string | undefined) {
  if (!startDate || !endDate) {
    return "Wybierz datę"
  }

  const [startDay, startMonth, startYear] = startDate.split("-")
  const [endDay, endMonth, endYear] = endDate.split("-")

  return `${new Date(startDate).toLocaleDateString('pl-PL')} - ${new Date(endDate).toLocaleDateString('pl-PL')}`
}
