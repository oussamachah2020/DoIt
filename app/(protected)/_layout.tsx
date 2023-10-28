import { useAuthStore } from "@store/authStore";
import SignIn from "../(auth)/sign_in";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuProvider } from "react-native-popup-menu";

export default function AppLayout() {
  const [loaded] = useFonts({
    PoppinsBold: require("@assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("@assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("@assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("@assets/fonts/Poppins-SemiBold.ttf"),
  });

  const { isAuth, setSession, session } = useAuthStore();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("session");
      if (value !== null) {
        const user_session = JSON.parse(value);
        setSession(user_session);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (session || isAuth === true) {
    return (
      <MenuProvider>
        <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      </MenuProvider>
    );
  } else {
    return <SignIn />;
  }
}
