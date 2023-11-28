import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

type Props = {};

const AvatarUploader = (props: Props) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // No permissions request is necessary for launching the image library
    if (status) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result.assets[0].uri);
      }
    }
  };

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
      onPress={pickImage}
    >
      <Ionicons name="camera-sharp" size={20} style={{}} color="#2F89FC" />
    </TouchableOpacity>
  );
};

export default AvatarUploader;
