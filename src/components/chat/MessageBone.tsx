import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Bubbles from "./Bubbles";

type Props = {
  messages: any;
};

const MessageBone = ({ messages }: Props) => {
  const messagesEndRef = React.useRef<any>(null);

  useEffect(() => {
    const lastMessage = messagesEndRef.current?.lastElementChild;

    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.containerHome}>
      <ScrollView
        ref={messagesEndRef}
        onContentSizeChange={() =>
          messagesEndRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => {
          messagesEndRef.current?.scrollToEnd({ animated: true });
        }}
        // refreshControl={
        // 	<RefreshControl
        // 		refreshing={is_loading}
        // 		onRefresh={refresh_chat}
        // 	/>
        // }
      >
        {messages.map((message: any) => (
          <Bubbles msg={message} key={message.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageBone;

const styles = StyleSheet.create({
  containerHome: {
    width: "100%",
    flex: 1,
    height: "100%",
    // paddingTop: 10,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textCenter: {
    textAlign: "center",
    marginTop: 20,
  },
  NoMessagesText: {
    textAlign: "center",
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: 167,
    opacity: 0.4,
    fontSize: 16,
  },
});
