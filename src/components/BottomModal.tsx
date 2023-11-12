import React, { useEffect, useState } from "react";
import { BottomSheet } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { List, TextInput } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import { useTaskStore } from "@store/taskStore";
import SendBtn from "@assets/images/icons_svg/send.svg";
import Flag from "@assets/images/icons_svg/flag.svg";
import CalendarIcon from "@assets/images/icons_svg/calendar2.svg";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { supabase } from "@lib/supabase";
import { formatDate } from "@utils/dateFormatter";

import { useAuthStore } from "@store/authStore";
import Toast from "react-native-toast-message";
import CalendarModal from "./CalendarModal";
import { priorities } from "@constants/data";

export const BottomModal = () => {
  const { openTaskForm, setOpenTaskForm, setOpenCalendarModal } =
    useTaskStore();
  const session = useAuthStore((v) => v.session);

  const [task, setTask] = useState("");
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [priority, setPriority] = React.useState("No Priority");
  const [selectedDate, setSelectedDate] = React.useState(
    formatDate(new Date())
  );

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const showModal = () => setOpenCalendarModal(true);

  const toggleMenu = () => {
    setVisibleMenu(!visibleMenu);
  };

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
      <CalendarModal selected={selectedDate} setSelected={setSelectedDate} />
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
