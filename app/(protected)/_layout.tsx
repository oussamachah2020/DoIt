import { useAuthStore } from "@store/authStore";
import SignIn from "../(auth)/sign_in";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-native-paper";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { fontFamily } from "@constants/typography";

export default function AppLayout() {
  const [loaded] = useFonts({
    PoppinsBold: require("@assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("@assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("@assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("@assets/fonts/Poppins-SemiBold.ttf"),
  });

  const { isAuth, setSession, session } = useAuthStore();

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

  if (!session) {
    return <SignIn />;
  }
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      <Toast config={toastConfig} />
    </Provider>
  );
}
