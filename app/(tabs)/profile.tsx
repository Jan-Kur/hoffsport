import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/authContext";
import { supabase } from '../../supabase';
import { fetchProfile, fetchStats, getInitials, getStats, StatsData } from '../../utils/profile';

export default function Profile() {
  const {signOut} = useContext(AuthContext)
  const colorScheme = useColorScheme()

  const [profile, setProfile] = useState<{full_name: string, grade: string, email: string}>({full_name: "", grade: "", email: ""})
  const [selectedStats, setSelectedStats] = useState<keyof StatsData>("overall")
  const [statsData, setStatsData] = useState<StatsData | null>(null)

  useEffect(() => {
    const initialFetch = async () => {
      const {data: {user}} = await supabase.auth.getUser()
      if (!user) return

      const [profile, stats] = await Promise.all([
        fetchProfile(user.id),
        fetchStats(user.id)
      ])

      setProfile(profile)
      setStatsData(stats)
      //console.log(`profile: ${profile.full_name} `)
      //console.log(`statsData: ${statsData}`)
    }
    
    initialFetch()
  }, [])

  return (
    <SafeAreaView className="bg-light dark:bg-dark items-center flex-1 px-4 py-2">
      <ScrollView className='flex-1'>
        <View className='gap-4 pb-6'>
          <View className="py-5 px-4 w-full flex-row justify-between bg-gray-1 dark:bg-gray-8 rounded-xl items-center">
            <View className="flex-row gap-3 items-center">
              <View className="w-16 h-16 justify-center items-center bg-main-light dark:bg-main rounded-full">
                <Text className="text-2xl font-semibold text-dark dark:text-light text-center">{getInitials(profile.full_name)}</Text>
              </View>
              <View className="flex-col items-start">
                <Text className="text-xl font-semibold text-dark dark:text-light">{profile.full_name}</Text>
                <Text className="text-base font-medium text-gray-5 dark:text-gray-4">{profile.email}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesome6 name="edit" size={26} color={colorScheme === "light" ? "#0B0E0E" : "#F2F3F3"} />
            </TouchableOpacity>
          </View>

          <View className="py-5 px-4 w-full flex-col bg-gray-1 dark:bg-gray-8 rounded-xl gap-4">
            <View className='flex-row gap-3 items-center'>
              <Octicons name="trophy" size={20} color={colorScheme === "light" ? "#0B0E0E" : "#F2F3F3"} />
              <Text className="text-xl font-semibold text-dark dark:text-light">Twoje Statystyki</Text>
            </View>

            <View className='flex-row gap-3 items-center'>
              {["overall", "HBL", "HVL", "HLK"].map((type: keyof StatsData)=> {
                return (
                  <TouchableOpacity
                    key={type} 
                    className={`${selectedStats === type ? "bg-main-light dark:bg-main" : "bg-gray-2 dark:bg-gray-7"}
                      px-4 py-3 justify-center items-center rounded-xl`}
                    onPress={() => setSelectedStats(type)}  
                  >
                    <Text className={`text-base font-medium ${selectedStats === type ? "text-white" : "text-dark dark:text-light"}`}>
                      {type === "overall" ? "Ogólne" : type}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            {!statsData ? (
                <View className="w-full py-8 items-center">
                  <ActivityIndicator size="large" />
                </View>
              ) : 
              <View className="flex-row w-full gap-4 flex-wrap">
                {getStats(selectedStats, statsData).map((row, rowIndex) => (
                  <View key={rowIndex} className="flex-row w-full gap-4">
                    {row.map((stat, statIndex) => (
                      <View key={statIndex} className="flex-1 bg-gray-2 dark:bg-gray-7 rounded-xl p-3">
                        <Text className="text-sm font-medium text-gray-5 dark:text-gray-4">
                          {stat.label}
                        </Text>
                        <Text className={`text-2xl font-bold text-dark dark:text-light`} numberOfLines={1}>
                          {stat.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
            </View>
            } 
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) 
}