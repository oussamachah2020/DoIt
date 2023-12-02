import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { TextInput } from "react-native-paper";
import MessageBone from "./MessageBone";

type Props = {};

const DiscussionBody = (props: Props) => {
  const [text, setText] = useState("");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height: "100%",
      }}
    >
      <MessageBone />
      <TextInput
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </KeyboardAvoidingView>
  );
};

export default DiscussionBody;
