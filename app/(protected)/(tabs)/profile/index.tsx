import { BottomModal } from "@components/BottomModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@store/authStore";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function profile() {
  const { setSession } = useAuthStore();

  return (
    <View>
      <TouchableOpacity
        style={{
          marginTop: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E84271",
        }}
        onPress={() => {
          setSession(null);
          AsyncStorage.clear();
        }}
      >
        <Text style={{ color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default profile;
