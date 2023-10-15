import { Redirect, Tabs } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import { fontFamily } from "@constants/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0C090A",
          borderTopColor: "#FFFFFF",
        },
      }}
      initialRouteName="home/index"
      sceneContainerStyle={{
        backgroundColor: "#0C090A",
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: "Home",

          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: fontFamily.Medium,
            marginTop: -4,
            lineHeight: 20,
          },
          tabBarActiveTintColor: "#E26310",
          tabBarInactiveTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: fontFamily.Medium,
            marginTop: -4,
            lineHeight: 20,
          },
          tabBarInactiveTintColor: "#fff",
          tabBarActiveTintColor: "#E26310",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-o" color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
