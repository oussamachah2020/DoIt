import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@store/authStore";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

function profile() {
  const { setSession } = useAuthStore();

  return (
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
  );
}

export default profile;
