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
import { formatDate } from "@utils/dateFormatter";

import { useAuthStore } from "@store/authStore";
import CalendarModal from "./CalendarModal";
import { priorities } from "@constants/data";
import { createTask } from "@loaders/tasks";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Ionicons } from "@expo/vector-icons";
import EventFormModal from "./EventFormModal";

export const BottomModal = () => {
  const { openTaskForm, setOpenTaskForm, setOpenCalendarModal } =
    useTaskStore();
  const session = useAuthStore((v) => v.session);

  const [task, setTask] = useState("");
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [priority, setPriority] = React.useState({
    value: "No Priority",
    color: "#30E3CA",
  });
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
    createTask(task, selectedDate, priority.value, session?.user.id)
      .then(() => {
        setTask("");
        setOpenTaskForm(false);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Task created successfully !",
        });
      })
      .catch((err) => {
        console.error(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Task Error",
          textBody: "Something went wrong !",
        });
      });
  };

  return (
    <React.Fragment>
      <CalendarModal selected={selectedDate} setSelected={setSelectedDate} />
      <EventFormModal />
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
              display: visibleMenu ? "flex" : "none",
            }}
            entering={SlideInDown}
            exiting={SlideOutDown}
          >
            {priorities.map((priority) => (
              <List.Item
                key={priority.id}
                titleStyle={{
                  color: "#000",
                }}
                title={priority.label}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="flag"
                    color={priority.iconColor}
                  />
                )}
                onPress={() => {
                  setPriority({
                    value: priority.value,
                    color: priority.iconColor,
                  });
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
                color: "#000",
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
              <Ionicons
                name="flag"
                size={20}
                style={{ color: priority.color }}
              />
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
