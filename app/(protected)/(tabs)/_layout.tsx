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
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { useAuthStore } from "@store/authStore";
import { supabase } from "@lib/supabase";

import { useRef, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform, StatusBar } from "react-native";
import { MenuProvider } from "react-native-popup-menu";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function AppLayout() {
  const session = useAuthStore((v) => v.session);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function save_push_token() {
    try {
      if (expoPushToken) {
        const { error } = await supabase
          .from("tokens")
          .insert([{ user_id: session?.user.id, push_token: expoPushToken }]);

        if (error) {
          console.error(error);
        } else {
          console.log("push token saved");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function sendNotifReminder() {
    fetch("https://doti-notifications.onrender.com/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
        title: "Daily Reminder",
        content: "Don't forget today's tasks",
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    save_push_token();
  }, [expoPushToken]);

  useEffect(() => {
    saveProfileInfo();
  }, [session?.user.id]);

  useEffect(() => {
    // Set up an interval to fire the fetch request once per day (in milliseconds)
    const interval = 24 * 60 * 60 * 1000; // 24 hours

    // Initial trigger when the component mounts
    sendNotifReminder();

    // Set up the interval to trigger the function once per day
    const intervalId = setInterval(() => {
      sendNotifReminder();
    }, interval);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, [session?.user.id]);

  return (
    <MenuProvider>
      <StatusBar barStyle={"dark-content"} />
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
    </MenuProvider>
  );
}

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: "Here is the notification body",
//       data: { data: "goes here" },
//     },
//     trigger: { seconds: 2 },
//   });
// }

async function registerForPushNotificationsAsync() {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "73c7643b-2093-4ca4-899d-c2c0139c0f92",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  } catch (error) {
    console.error(error);
  }
}
