import { useAuthStore } from "@store/authStore";
import { Slot, router, useRootNavigation } from "expo-router";
import { useEffect } from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function RootLayout() {
  const rootNavigation = useRootNavigation();
  const { session } = useAuthStore();

  useEffect(() => {
    if (!rootNavigation?.isReady()) return;

    if (session === null) {
      console.log("session: ", session);
      router.replace("/auth/sign_in");
    } else {
      console.log("session: ", session);
      router.replace("/(protected)/(tabs)/home");
    }
  }, [session, rootNavigation, router]);

  return (
    <AlertNotificationRoot>
      <Slot />
    </AlertNotificationRoot>
  );
}
