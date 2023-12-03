import { fontFamily } from "@constants/typography";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  msg: any;
};

const Bubbles = ({ msg }: Props) => {
  return (
    <View
      style={{
        backgroundColor: msg.sent_by_me ? "skyblue" : "#e7e7e7",
        elevation: 5,
        borderRadius: 5,
        marginTop: 20,
        width: "50%",
        paddingVertical: 10,
        paddingLeft: 5,
        alignSelf: msg.sent_by_me ? "flex-end" : "flex-start",
        marginHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.Medium,
          fontSize: 14,
        }}
      >
        {msg.content}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily.Medium,
          fontSize: 12,
          fontStyle: "italic",
        }}
      >
        {msg.sent_at}
      </Text>
    </View>
  );
};

export default Bubbles;
