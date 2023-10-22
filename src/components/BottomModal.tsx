import React, { useRef, useState } from "react";
import { BottomSheet, Button } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { List, TextInput } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import { useTaskStore } from "@store/taskStore";
import SendBtn from "@assets/images/icons_svg/send.svg";
import Flag from "@assets/images/icons_svg/flag.svg";
import Calendar from "@assets/images/icons_svg/calendar2.svg";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import CalendarModal from "./CalendarModal";

export const BottomModal = () => {
  const { openTaskForm, setOpenTaskForm } = useTaskStore();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const height = useSharedValue(0);

  const handlePress = () => {
    height.value = withSpring(220);
  };

  const closePriorityList = () => {
    height.value = withSpring(0);
  };

  const priorities = [
    {
      id: "1",
      label: "High",
      value: "High",
      iconColor: "#ED2939",
      onPress: () => {},
    },
    {
      id: "2",
      label: "Medium",
      value: "Medium",
      iconColor: "#FF5E0E",
      onPress: () => {},
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
      onPress: () => closePriorityList(),
    },
  ];

  return (
    <>
      <CalendarModal visible={visible} hideModal={hideModal} />
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
        >
          <Animated.View
            style={{
              backgroundColor: "#fff",
              width: "50%",
              height,
            }}
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
                onPress={priority.onPress}
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
              // label="What's for today champ !"
              placeholder="What's the mission of today champ ?"
              value={""}
              // onChangeText={(text) => setEmail(text)}
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
            }}
          >
            <TouchableOpacity onPress={handlePress}>
              <Flag />
            </TouchableOpacity>
            <TouchableOpacity onPress={showModal}>
              <Calendar />
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </SafeAreaProvider>
    </>
  );
};
