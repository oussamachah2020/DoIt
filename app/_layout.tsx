import { Slot, SplashScreen, Stack } from "expo-router";
import Page from "./(auth)/sign_in";
import { Platform, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PoppinsBold: require("@assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("@assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("@assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("@assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#1b1b1b",
        paddingTop: Platform.OS === "android" ? 1.5 : 0,
      }}
    >
      <Page />
    </SafeAreaView>
  );
}
