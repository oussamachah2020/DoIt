import { Tabs } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { fontFamily } from "@constants/typography";
import { PaperProvider } from "react-native-paper";
import {
  Calendar,
  CalendarR,
  Home,
  HomeR,
  Profile,
  ProfileR,
} from "@constants/assets";

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
            tabBarIcon: ({ color }) => {
              if (color === "#E86188") {
                return <HomeR width={22} />;
              } else {
                return <Home width={22} />;
              }
            },
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
            tabBarIcon: ({ color }) => {
              if (color === "#E86188") {
                return <CalendarR width={22} />;
              } else {
                return <Calendar width={22} />;
              }
            },
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
            tabBarIcon: ({ color }) => {
              if (color === "#E86188") {
                return <ProfileR width={25} />;
              } else {
                return <Profile width={25} />;
              }
            },
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
