import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AsyncStorage.getItem("token").then((v) => {
      console.log(v);
    });
  }, []);

  return <Text>OK</Text>;
}
