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
import React, { useEffect } from "react";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  SuccessToast,
} from "react-native-toast-message";
import { useAuthStore } from "@store/authStore";
import { supabase } from "@lib/supabase";

export default function AppLayout() {
  const session = useAuthStore((v) => v.session);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: any) => (
      <SuccessToast
        {...props}
        style={{ borderLeftColor: "#59CE8F" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontFamily: fontFamily.Medium,
        }}
        text2Style={{
          fontSize: 14,
          color: "rgba(0,0,0,0.5)",
          fontFamily: fontFamily.regular,
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
          fontFamily: fontFamily.Medium,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };

  const saveProfileInfo = async () => {
    if (session?.user.id) {
      // Check if a profile with the same userId exists
      const { data: existingProfiles, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("userId", session.user.id);

      if (error) {
        console.error(error);
        return;
      }

      if (existingProfiles.length === 0) {
        // If no profile with the same userId exists, insert a new one
        const { data, error } = await supabase.from("profiles").insert([
          {
            email: session.user.email,
            full_name: session?.user.email?.split("@")[0],
            userId: session.user.id,
          },
        ]);

        if (data) {
          console.log("Profile registered successfully");
        } else {
          console.error(error);
        }
      } else {
        console.log("Profile already exists");
      }
    }
  };

  useEffect(() => {
    saveProfileInfo();
  }, [session?.user.id]);

  return (
    <>
      <Toast config={toastConfig} />

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
