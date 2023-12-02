import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontFamily } from "@constants/typography";
import { Divider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthStore } from "@store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type Props = {};

const ProfileMenu = (props: Props) => {
  const { setSession } = useAuthStore();
  const profileItems = [
    {
      id: 1,
      label: "Support",
      icon: <FontAwesome name="support" size={24} color="black" />,
      action: () => {
        router.push("/support");
      },
    },
    {
      id: 2,
      label: "Sign Out",
      icon: <AntDesign name="logout" size={24} color="black" />,
      action: () => {
        setSession(null);
        AsyncStorage.removeItem("session");
      },
    },
  ];

  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginHorizontal: 20,
        marginTop: 40,
        gap: 30,
      }}
    >
      {profileItems.map((item) => (
        <View style={{ width: "100%" }} key={item.id}>
          <TouchableOpacity
            key={item.id}
            onPress={item.action}
            style={styles.Link}
          >
            {item.icon}
            <Text style={styles.linkLabel}>{item.label}</Text>
          </TouchableOpacity>
          <Divider
            style={{
              width: "100%",
              borderColor: "#e7e7e7",
              borderWidth: 1,
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
  Link: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    gap: 10,
  },
  linkLabel: {
    fontFamily: fontFamily.Medium,
    fontSize: 16,
  },
});
