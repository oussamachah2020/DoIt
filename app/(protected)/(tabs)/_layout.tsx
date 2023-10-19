import { Tabs } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { fontFamily } from "@constants/typography";
import { PaperProvider } from "react-native-paper";

export default function AppLayout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000517",
            borderTopWidth: 0,
            paddingBottom: 2,
          },
        }}
        initialRouteName="home/index"
        sceneContainerStyle={{
          backgroundColor: "#000517",
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
            tabBarActiveTintColor: "#E86188",
            tabBarInactiveTintColor: "#fff",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" color={color} size={25} />
            ),
          }}
        />
        <Tabs.Screen
          name="planning/index"
          options={{
            tabBarLabel: "Planning",
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: fontFamily.Medium,
              marginTop: -4,
              lineHeight: 20,
            },
            tabBarInactiveTintColor: "#fff",
            tabBarActiveTintColor: "#E86188",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="calendar" color={color} size={25} />
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
            tabBarActiveTintColor: "#E86188",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-o" color={color} size={25} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
