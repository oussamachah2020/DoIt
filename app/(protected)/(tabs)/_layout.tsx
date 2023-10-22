import { Tabs } from "expo-router";
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
import { BottomModal } from "@components/BottomModal";

export default function AppLayout() {
  return (
    <>
      <BottomModal />
      <PaperProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#F5F5F5",
              // borderTopWidth: 0,
              paddingBottom: 2,
            },
          }}
          initialRouteName="home/index"
          sceneContainerStyle={{
            backgroundColor: "#F5F5F5",
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
              tabBarActiveTintColor: "#2F89FC",
              tabBarInactiveTintColor: "#000",
              tabBarIcon: ({ color }) => {
                if (color === "#2F89FC") {
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
              tabBarActiveTintColor: "#2F89FC",
              tabBarInactiveTintColor: "#000",
              tabBarIcon: ({ color }) => {
                if (color === "#2F89FC") {
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
              tabBarInactiveTintColor: "#000",
              tabBarActiveTintColor: "#2F89FC",
              tabBarIcon: ({ color }) => {
                if (color === "#2F89FC") {
                  return <ProfileR width={25} />;
                } else {
                  return <Profile width={25} />;
                }
              },
            }}
          />
        </Tabs>
      </PaperProvider>
    </>
  );
}
