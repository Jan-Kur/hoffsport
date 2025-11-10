import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";

export default function ScheduleFilters() {
  const [selected, setSelected] = useState(1)
  
  return (
    <View className='w-full h-fit flex-row justify-between'>

      <TimeframeFilter isSelected={selected === 0} onPress={() => setSelected(0)} text={"Przeszłe"}/>
      <TimeframeFilter isSelected={selected === 1} onPress={() => setSelected(1)} text={"Dzisiaj"}/>
      <TimeframeFilter isSelected={selected === 2} onPress={() => setSelected(2)} text={"Nadchodzące"}/>

      <ScheduleFilter/>
      
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

function ScheduleFilter() {


  return (
    <TouchableOpacity className='px-3 flex-row gap-[6px] items-center bg-gray-8 dark:bg-gray-1 h-fit rounded-full'>
      <Ionicons name="filter" size={32} className="text-light dark:text-dark"/>
      <Text className='text-light dark:text-dark font-semibold text-base'>Filtruj</Text>
    </TouchableOpacity>
  )
}