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
        backgroundColor: msg.sent_by_me ? "#c4c4c4" : "red",
        marginTop: 5,
        width: "50%",
        paddingVertical: 10,
        paddingLeft: 5,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.Medium,
        }}
      >
        {msg.content}
      </Text>
    </View>
  );
};

export default Bubbles;
