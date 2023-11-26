import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type Props = {};

const AvatarUploader = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        position: "absolute",
        right: 0,
        bottom: 0,
        borderRadius: 50,
        height: 25,
        width: 25,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        elevation: 2,
      }}
    >
      <Ionicons name="camera-sharp" size={20} style={{}} color="#2F89FC" />
    </TouchableOpacity>
  );
};

export default AvatarUploader;
