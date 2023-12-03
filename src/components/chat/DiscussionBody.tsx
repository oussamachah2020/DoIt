import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import MessageBone from "./MessageBone";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@store/authStore";
import { SUPPORT_ID } from "@env";
import { send_message } from "@loaders/profile";
import { supabase } from "@lib/supabase";

type Props = {};

// const messages = [
//   {
//     id: "1",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: true,
//   },
//   {
//     id: "2",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: false,
//   },
//   {
//     id: "3",
//     content: "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: false,
//   },
//   {
//     id: "4",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: true,
//   },
//   {
//     id: "5",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: true,
//   },
//   {
//     id: "6",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: true,
//   },
//   {
//     id: "7",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: true,
//   },
//   {
//     id: "8",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: true,
//   },
//   {
//     id: "9",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: true,
//   },
//   {
//     id: "10",
//     content: "hello",
//     sent_at: "2023-12-3 07:15",
//     sent_by_me: true,
//   },
// ];

const DiscussionBody = (props: Props) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const theme = useTheme();
  const { session } = useAuthStore();
  const my_id = session?.user.id;

  const otherUserUUID = useMemo(() => {
    let receiver_id: string | undefined = "";

    receiver_id =
      session?.user?.id === SUPPORT_ID ? SUPPORT_ID : session?.user.id;

    return receiver_id;
  }, [session?.user.id]);

  const handleSendMessage = () => {
    if (!my_id || !otherUserUUID) {
      return;
    }

    send_message(text, my_id, otherUserUUID)
      .then(() => {
        console.log("message sent !");
        setText("");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const messages = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => console.log("payload: ", payload)
      )
      .subscribe((status) => {
        console.log(status);
      });

    return () => {
      messages.unsubscribe();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ ...styles.container, paddingBottom: 10 }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ ...styles.container }}>
          <MessageBone messages={messages} />
        </View>
        <View style={{ ...styles.inputView }}>
          <TextInput
            theme={{
              colors: {
                background: theme.colors.onSurface,
              },
              fonts: {
                bodyLarge: {
                  ...theme.fonts.bodyLarge,
                },
              },
            }}
            outlineStyle={{ borderWidth: 0, borderRadius: 15 }}
            mode="outlined"
            style={{
              ...styles.msgInput,
              backgroundColor: "#fff",
              // backgroundColor: theme.colors.onSurface,
              color: "#000",
            }}
            contentStyle={{
              borderColor: "#7e7e7e",
              borderRadius: 10,
              borderWidth: theme.dark ? 0 : 1,
              color: "#000",
            }}
            onChangeText={(_text: string) => setText(_text)}
            value={text}
            maxLength={200}
            placeholder={"Type your messages"}
            placeholderTextColor={"rgba(105, 109, 117, 0.7)"}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
            disabled={!text}
          >
            <Ionicons name="send" size={25} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DiscussionBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginTop: 3,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 1,
  },
  userInformation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  InputContainer: {
    flexDirection: "row",
    width: "90%",
  },
  inputView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    height: 68,
    // position: "absolute",
    // bottom: 0,
  },
  screenHeader: {
    paddingTop: 50,
    paddingBottom: 9,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  sendButton: {
    position: "relative",
    right: 28,
  },
  msgInput: {
    width: "85%",
    marginRight: 41,
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 6,
  },
});
