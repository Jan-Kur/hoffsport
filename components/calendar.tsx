import type { CalendarActiveDateRange, CalendarOnDayPress, CalendarTheme } from "@marceloterreiro/flash-calendar";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { addMonths, addYears } from "date-fns";
import { memo, useState } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

interface CustomCalendarProps {
  calendarActiveDateRanges: CalendarActiveDateRange[]
  onCalendarDayPress: CalendarOnDayPress
}

export const CustomCalendar = memo(({calendarActiveDateRanges, onCalendarDayPress}: CustomCalendarProps) => {

  const colorScheme = useColorScheme()

  const accent = colorScheme === "dark" ? "#055561" : "#087F91"

  const customTheme: CalendarTheme = {
    rowMonth: {
      container: {
        height: 0,
        width: 0
      },
      content: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 0.5)",
        fontWeight: "600",
        fontSize: 15
      },
    },
    rowWeek: {
      container: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
        borderStyle: "solid",
      },
    },
    itemWeekName: { content: { color: "rgba(255, 255, 255, 0.5)" } },
    itemDayContainer: {
      activeDayFiller: {
        backgroundColor: accent,
      },
    },
    itemDay: {
      idle: ({ isPressed, isWeekend }) => ({
        container: {
          backgroundColor: isPressed ? accent : "transparent",
          borderRadius: 4,
          paddingVertical: 3,
          paddingHorizontal: 4
        },
        content: {
          color: isWeekend && !isPressed ? "rgba(255, 255, 255, 0.5)" : "#ffffff",
        },
      }),
      today: ({ isPressed }) => ({
        container: {
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: isPressed ? 4 : 30,
          backgroundColor: isPressed ? accent : "transparent",
          paddingVertical: 3,
          paddingHorizontal: 4,
          maxHeight: 50,
          maxWidth: 50
        },
        content: {
          color: isPressed ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
        },
      }),
      active: ({ isEndOfRange, isStartOfRange }) => ({
        container: {
          backgroundColor: accent,
          borderTopLeftRadius: isStartOfRange ? 20 : 0,
          borderBottomLeftRadius: isStartOfRange ? 20 : 0,
          borderTopRightRadius: isEndOfRange ? 20 : 0,
          borderBottomRightRadius: isEndOfRange ? 20 : 0,
        },
        content: {
          color: "#ffffff",
        },
      }),
    },
  }

  const [currentMonth, setCurrentMonth] = useState(toDateId(new Date()))

  const goNextMonth = () => {
    const date = new Date(currentMonth);
    setCurrentMonth(toDateId(addMonths(date, 1)));
  }

  const goPrevMonth = () => {
    const date = new Date(currentMonth);
    setCurrentMonth(toDateId(addMonths(date, -1)));
  }

  const goNextYear = () => {
    const date = new Date(currentMonth);
    setCurrentMonth(toDateId(addYears(date, 1)));
  }

  const goPrevYear = () => {
    const date = new Date(currentMonth);
    setCurrentMonth(toDateId(addYears(date, -1)));
  }

  return (
    <>
      <View className="flex-row justify-between w-full items-center -mb-6">
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={goPrevYear} className="bg-transparent justify-center items-center p-3">
            <Text className="text-3xl text-gray-4 dark:text-gray-5 font-bold">«</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goPrevMonth} className="bg-transparent justify-center items-center p-3">
            <Text className="text-3xl text-gray-4 dark:text-gray-5 font-bold">‹</Text>
          </TouchableOpacity>
        </View>

        <Text
          className="text-center text-lg font-semibold text-gray-4 dark:text-gray-5"
        >{new Date(currentMonth).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}</Text>

        <View className="flex-row gap-4">
          <TouchableOpacity onPress={goNextMonth} className="bg-transparent justify-center items-center p-3">
            <Text className="text-3xl text-gray-4 dark:text-gray-5 font-bold">›</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goNextYear} className="bg-transparent justify-center items-center p-3">
            <Text className="text-3xl text-gray-4 dark:text-gray-5 font-bold">»</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Calendar
        calendarActiveDateRanges={calendarActiveDateRanges}
        onCalendarDayPress={onCalendarDayPress}
        calendarDayHeight={30}
        calendarFirstDayOfWeek="monday"
        calendarMonthId={currentMonth}
        calendarRowHorizontalSpacing={16}
        calendarRowVerticalSpacing={16}
        theme={customTheme}
        calendarFormatLocale="pl-PL"
        
      />
    </>
  )
})