import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useDateRange } from '@marceloterreiro/flash-calendar';
import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { supabase } from '../supabase';
import { AdvancedFilters } from '../utils/matches';
import { CustomSheet } from "./bottomSheet";
import { CustomCalendar } from './calendar';

export default function Filters({filter, setFilter, advFilters, setAdvFilters}) {
  
  return (
    <View className='w-full h-fit flex-row justify-between'>
      
      <View className='flex-row gap-1'>
        <TimeframeFilter isSelected={filter === "past"} onPress={() => setFilter("past")} text={"Przeszłe"}/>
        <TimeframeFilter isSelected={filter === "today"} onPress={() => setFilter("today")} text={"Dzisiaj"}/>
        <TimeframeFilter isSelected={filter === "upcoming"} onPress={() => setFilter("upcoming")} text={"Nadchodzące"}/>
      </View>

      <AdvancedFilter advFilters={advFilters} setAdvFilters={setAdvFilters}/>

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

function AdvancedFilter({advFilters, setAdvFilters}) {  
  const colorScheme = useColorScheme()
  const bsRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["60%", "95%"], [])

  const leagues = ["HBL", "HVL", "HLK"]
  const stages = ["Finał", "Półfinał", "Ćwierćfinał", "1/8 Finału", "Faza grupowa"]//USEFUL
  
  
  const { calendarActiveDateRanges, onCalendarDayPress, dateRange } = useDateRange()
  const [selectedTeams, setSelectedTeams] = useState([])
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [selectedStage, setSelectedStage] = useState(null)

  const [teams, setTeams] = useState<{id: string, name: string}[]>([])

  useEffect(() => {
    fetchTeams().then(data => {
      setTeams(data)
    })
  }, [])

  const [teamSearch, setTeamSearch] = useState("")
  const [showTeams, setShowTeams] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const filteredTeams = useMemo(() => 
    teams.filter(team => 
      team.name.toLowerCase().includes(teamSearch.toLowerCase())
    ), 
    [teamSearch, teams]
  )

  const onSave = () => {
    const filters: AdvancedFilters = {}
    
    if (dateRange.startId && dateRange.endId) {
      filters.timeframe = {
        start: dateRange.startId, 
        end: dateRange.endId
      }
    }
    
    if (selectedTeams && selectedTeams.length > 0) {
      filters.teams = selectedTeams
    }
    
    if (selectedLeague) {
      filters.league = selectedLeague
    }
    
    if (selectedStage) {
      filters.stage = selectedStage
    }

    if (advFilters !== filters) {
      setAdvFilters(filters)
    } 
  }

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
        <BottomSheetView className='flex-1 px-5 py-3 flex-col gap-5'>

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
                  {selectedTeams.map(teamId => {
                    const team = teams.find(t => t.id === teamId)
                    return (
                      <TouchableOpacity
                      key={teamId}
                        onPress={() => {
                          setSelectedTeams(selectedTeams.filter(t => t !== teamId))
                        }}
                        className='px-2 bg-main-light dark:bg-main rounded-full'
                      >
                        <Text className='text-sm font-normal text-dark dark:text-light'>{team.name}</Text>
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
                        prev.includes(item.id) ? prev.filter(t => t !== item.id) : [...prev, item.id]
                      )
                    }}
                    className='px-4 py-4'
                  >
                    <Text className='text-dark dark:text-light text-base'>{item.name}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View className='h-[1px] bg-gray-3 dark:bg-gray-6'></View>}
                ListEmptyComponent={() => <Text className='text-gray-3 dark:text-gray-6 text-center py-4 text-base font-medium'>Nie znaleziono drużyny</Text>}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                className='h-1/5'
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
                  className={`${selectedLeague === league ? "bg-main-light dark:bg-main" : "bg-gray-2 dark:bg-gray-7"} 
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
                    className={`${selectedStage === stage ? "bg-main-light dark:bg-main" : "bg-gray-2 dark:bg-gray-7"}
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

          <TouchableOpacity 
            onPress={onSave}
            className='rounded-xl bg-main-light dark:bg-main py-2 mt-1'
          >
            <Text className='text-lg text-dark dark:text-light font-semibold text-center'>Zapisz</Text>
          </TouchableOpacity>

        </BottomSheetView>
      </CustomSheet>
    </>
    
  )
}

async function fetchTeams() {
  try {
    const {data, error} = await supabase
      .from("teams")
      .select("id, name")

    if (error) throw error

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

function formatDateId(startDate: string | undefined, endDate: string | undefined) {
  if (!startDate || !endDate) {
    return "Wybierz datę"
  }

  return `${new Date(startDate).toLocaleDateString('pl-PL')} - ${new Date(endDate).toLocaleDateString('pl-PL')}`
}
