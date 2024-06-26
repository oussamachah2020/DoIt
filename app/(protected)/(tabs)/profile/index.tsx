import { BottomModal } from "@components/BottomModal";
import { fontFamily } from "@constants/typography";
import { supabase } from "@lib/supabase";
import { Avatar } from "@rneui/themed";
import { useAuthStore } from "@store/authStore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import AvatarUploader from "@components/AvatarUploader";
import ProfileMenu from "@components/ProfileMenu";
import { useTaskStore } from "@store/taskStore";
import { updateAvatarUrl } from "@loaders/profile";

function profile() {
  const { session } = useAuthStore();
  const { uploadedImagePath } = useTaskStore();
  const [profileData, setProfileData] = useState({
    email: "",
    fullName: "",
    avatar_url: null,
  });

  async function getProfile() {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(`email, full_name, avatar_url`)
      .eq("userId", session?.user.id)
      .single();

    if (profile) {
      // Update profileData using setProfileData
      setProfileData({
        email: profile.email,
        fullName: profile.full_name,
        avatar_url: profile.avatar_url,
      });
    } else {
      console.error(error);
    }
  }

  console.log(profileData.avatar_url);

  useEffect(() => {
    try {
      if (!session) {
        return;
      }

      if (uploadedImagePath) {
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(uploadedImagePath);

        if (data) {
          updateAvatarUrl(session?.user.id, data.publicUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  }, [session, uploadedImagePath]);

  useEffect(() => {
    getProfile();
  }, [session?.user?.id, uploadedImagePath]);

  return (
    <View style={styles.profileContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{}}>
          {profileData.avatar_url !== null ? (
            <Image
              source={{
                uri: profileData.avatar_url,
              }}
              alt="avatar"
              style={{ width: 120, height: 120, borderRadius: 100 }} // Set dimensions as needed
              resizeMode="contain" // Adjust resizeMode as per your requirement
            />
          ) : (
            <Avatar
              size={120}
              rounded
              title={profileData.fullName.charAt(0)}
              titleStyle={{
                fontFamily: fontFamily.Medium,
                fontSize: 35,
                marginTop: 0,
              }}
              containerStyle={{ backgroundColor: "#2F89FC" }}
            />
          )}
          <AvatarUploader />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={styles.username}>{profileData.fullName}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
        </View>
      </View>
      <ProfileMenu />
      {/* <TouchableOpacity
        style={{
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
          height: 42,
          width: 120,
          backgroundColor: "#E64848",
          borderRadius: 10,
        }}
        onPress={() => {
         
        }}
      >
        <Text style={{ color: "#fff", fontFamily: fontFamily.semiBold }}>
          Logout
        </Text>
      </TouchableOpacity> */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily.semiBold,
            position: "absolute",
            bottom: -300,
            fontSize: 16,
          }}
        >
          V {Constants.expoConfig?.version}
        </Text>
      </View>
    </View>
  );
}

export default profile;

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: 80,
  },
  username: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  email: {
    fontFamily: fontFamily.Medium,
    fontSize: 14,
    color: "rgba(0,0,0,0.5)",
  },
});
