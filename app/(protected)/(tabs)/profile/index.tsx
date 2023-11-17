import { BottomModal } from "@components/BottomModal";
import { fontFamily } from "@constants/typography";
import { supabase } from "@lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "@rneui/themed";
import { useAuthStore } from "@store/authStore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";

function profile() {
  const { setSession, session } = useAuthStore();
  const [profileData, setProfileData] = useState({
    email: "",
    fullName: "",
  });

  async function getProfile() {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(`email, full_name`)
      .eq("userId", session?.user.id)
      .single();

    if (profile) {
      // Update profileData using setProfileData
      setProfileData({
        email: profile.email,
        fullName: profile.full_name,
      });
    } else {
      console.error(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.profileContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          size={50}
          rounded
          title={profileData.fullName.charAt(0)}
          titleStyle={{
            fontFamily: fontFamily.Medium,
            fontSize: 25,
            marginTop: 5,
          }}
          containerStyle={{ backgroundColor: "#2F89FC" }}
        />
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
      <TouchableOpacity
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
          setSession(null);
          AsyncStorage.clear();
        }}
      >
        <Text style={{ color: "#fff", fontFamily: fontFamily.semiBold }}>
          Logout
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: fontFamily.semiBold,
          marginTop: 300,
        }}
      >
        V {Constants.expoConfig?.version}
      </Text>
    </View>
  );
}

export default profile;

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
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
