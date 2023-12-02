import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@lib/supabase";
import { uploadAvatar } from "@loaders/profile";
import { useAuthStore } from "@store/authStore";
import { useTaskStore } from "@store/taskStore";

type Props = {};

const AvatarUploader = (props: Props) => {
  const { session } = useAuthStore();
  const { setUploadedImagePath } = useTaskStore();
  const uploadFromURI = async (image: ImagePicker.ImagePickerResult) => {
    if (!image.canceled) {
      let photo = image?.assets[0];

      //get the extension
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);

      //get the file name
      const file_name = photo.uri.replace(/^.*[\\\/]/, "");

      let formData: any = new FormData();
      formData.append("file", {
        uri: photo.uri,
        name: file_name,
        type: `image/${ext}`,
      });

      uploadAvatar(formData, session?.user?.id)
        .then((res: any) => {
          console.log("data: ", res);
          setUploadedImagePath(res.path);
        })
        .catch((err) => console.error("uploading error: ", err));
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      try {
        return await uploadFromURI(result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        position: "absolute",
        right: 10,
        bottom: 0,
        borderRadius: 50,
        height: 28,
        width: 28,
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
