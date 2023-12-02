import React from "react";
import {
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fontFamily } from "@constants/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Divider } from "react-native-paper";
import DiscussionBody from "@components/chat/DiscussionBody";

type Props = {};

const ToolBar = () => {
  return (
    <View>
      <View
        style={{
          marginTop: Platform.OS === "android" ? 50 : 40,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: 10,
          marginBottom: 5,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-sharp" size={28} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: fontFamily.semiBold,
            fontSize: 16,
          }}
        >
          Support
        </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="refresh" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <Divider style={{ borderColor: "#e7e7e7", borderWidth: 1 }} />
    </View>
  );
};

const support = (props: Props) => {
  return (
    <SafeAreaView>
      <ToolBar />
      <View
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <DiscussionBody />
      </View>
    </SafeAreaView>
  );
};

export default support;
