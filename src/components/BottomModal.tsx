import React, { useEffect, useRef, useState } from "react";
import { BottomSheet, Button } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { List, TextInput } from "react-native-paper";
import { Text, TouchableOpacity, View } from "react-native";
import { useTaskStore } from "@store/taskStore";
import SendBtn from "@assets/images/icons_svg/send.svg";
import Flag from "@assets/images/icons_svg/flag.svg";
import CalendarIcon from "@assets/images/icons_svg/calendar2.svg";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { supabase } from "@lib/supabase";
import { Overlay } from "@rneui/base";
import { formatDate } from "@utils/dateFormatter";
import { fontFamily } from "@constants/typography";
import { Calendar } from "react-native-calendars";
import { useAuthStore } from "@store/authStore";
import Toast from "react-native-toast-message";

type Props = {
  visible: boolean;
  hideModal: () => void;

  selected: string;
  setSelected: (value: string) => void;
};

const CalendarModal = ({
  visible,
  hideModal,
  selected,
  setSelected,
}: Props) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={hideModal}
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
          onPress={hideModal}
        />
        <Button
          title={"OK"}
          containerStyle={{
            marginTop: 16,
            width: 100,
          }}
          buttonStyle={{
            borderRadius: 10,
          }}
        />
      </View>
    </Overlay>
  );
};

export const BottomModal = () => {
  const { openTaskForm, setOpenTaskForm } = useTaskStore();
  const session = useAuthStore((v) => v.session);

  const [visible, setVisible] = React.useState(false);
  const [task, setTask] = useState("");
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [priority, setPriority] = React.useState("No Priority");
  const [selectedDate, setSelectedDate] = React.useState(
    formatDate(new Date())
  );

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const toggleMenu = () => {
    setVisibleMenu(!visibleMenu);
  };

  const priorities = [
    {
      id: "1",
      label: "High",
      value: "High",
      iconColor: "#ED2939",
    },
    {
      id: "2",
      label: "Medium",
      value: "Medium",
      iconColor: "#FF5E0E",
    },
    {
      id: "3",
      label: "Low",
      value: "Low",
      iconColor: "#2F89FC",
      onPress: () => {},
    },
    {
      id: "4",
      label: "No Priority",
      value: "No Priority",
      iconColor: "#30E3CA",
    },
  ];

  const createNewTask = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            label: task,
            do_at: selectedDate,
            priority,
            userId: session?.user.id,
          },
        ])
        .select();

      if (data) {
        setTask("");
        setOpenTaskForm(false);
        Toast.show({
          type: "success",
          text1: "Good job!",
          text2: "Task created successfully !",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "OOPS !",
          text2: error.message,
        });
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <CalendarModal
        visible={visible}
        hideModal={hideModal}
        selected={selectedDate}
        setSelected={setSelectedDate}
      />
      <SafeAreaProvider
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <BottomSheet
          modalProps={{}}
          isVisible={openTaskForm}
          onBackdropPress={() => {
            setOpenTaskForm(false);
          }}
          containerStyle={{
            zIndex: 1,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "#fff",
              width: "50%",
              display: visibleMenu ? "flex" : "none", // Toggle visibility
            }}
            entering={SlideInDown}
            exiting={SlideOutDown}
          >
            {priorities.map((priority) => (
              <List.Item
                key={priority.id}
                title={priority.label}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="flag"
                    color={priority.iconColor}
                  />
                )}
                onPress={() => {
                  setPriority(priority.value);
                  setVisibleMenu(false);
                }}
              />
            ))}
          </Animated.View>
          <View
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <TextInput
              placeholder="What's the mission of today champ ?"
              value={task}
              onChangeText={(text) => setTask(text)}
              contentStyle={{
                backgroundColor: "#F5F5F5",
                width: "100%",
                position: "relative",
              }}
              style={{
                color: "#000",
              }}
            />

            <TouchableOpacity
              style={{
                position: "absolute",
                top: 12,
                bottom: 0,
                right: 15,
              }}
              onPress={createNewTask}
            >
              <SendBtn />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#F5F5F5",
              height: 40,
              paddingLeft: 20,
              paddingTop: 1,
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              zIndex: 99,
            }}
          >
            <TouchableOpacity onPress={toggleMenu}>
              <Flag />
            </TouchableOpacity>
            <TouchableOpacity onPress={showModal}>
              <CalendarIcon />
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </SafeAreaProvider>
    </React.Fragment>
  );
};
