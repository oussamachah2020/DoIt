import { fontFamily } from "@constants/typography";
import { formatDate } from "@utils/dateFormatter";
import React from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Planning() {
  const [selected, setSelected] = React.useState(formatDate(new Date()));
  return (
    <View
      style={{
        marginTop: 80,
      }}
    >
      <Text
        style={{
          marginBottom: 20,
          fontFamily: fontFamily.semiBold,
          marginLeft: 20,
          fontSize: 18,
        }}
      >
        Planning
      </Text>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        initialDate={formatDate(new Date())}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "#2F89FC",
          },
        }}
      />
    </View>
  );
}
