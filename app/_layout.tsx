import { Slot } from "expo-router";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function RootLayout() {
  return (
    <AlertNotificationRoot>
      <Slot />
    </AlertNotificationRoot>
  );
}
