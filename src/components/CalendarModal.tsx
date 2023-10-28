import React from "react";
import { Button } from "@rneui/themed";
import { Text, View } from "react-native";
import { useTaskStore } from "@store/taskStore";
import { Overlay } from "@rneui/base";
import { formatDate } from "@utils/dateFormatter";
import { fontFamily } from "@constants/typography";
import { Calendar } from "react-native-calendars";

type Props = {
  selected: string;
  setSelected: (value: string) => void;
};

const CalendarModal = ({ selected, setSelected }: Props) => {
  const { openCalendarModal, setOpenCalendarModal } = useTaskStore();

  return (
    <Overlay
      isVisible={openCalendarModal}
      onBackdropPress={() => setOpenCalendarModal(false)}
      overlayStyle={{ width: "80%", backgroundColor: "#fff" }}
    >
      <Text
        style={{
          textAlign: "center",
          fontFamily: fontFamily.Medium,
          fontSize: 16,
          paddingVertical: 10,
          borderBottomColor: "#e7e7e7",
          borderBottomWidth: 1,
        }}
      >
        Schedule your task
      </Text>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
          setOpenCalendarModal(false);
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 10,
          marginVertical: 15,
        }}
      >
        <Button
          title={"Cancel"}
          containerStyle={{
            marginTop: 16,
            width: 100,
          }}
          titleStyle={{
            color: "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
            borderRadius: 10,
            borderColor: "#2F89FC",
            borderWidth: 1,
          }}
          onPress={() => setOpenCalendarModal(false)}
        />
      </View>
    </Overlay>
  );
};

export default CalendarModal;
