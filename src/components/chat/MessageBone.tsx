import React from "react";
import { ScrollView } from "react-native";
import Bubbles from "./Bubbles";

type Props = {};

const messages = [
  {
    id: "1",
    content: "hello",
    sent_at: new Date(),
    sent_by_me: true,
  },
  {
    id: "2",
    content: "hello",
    sent_at: new Date(),
    sent_by_me: false,
  },
  {
    id: "3",
    content: "hello",
    sent_at: new Date(),
    sent_by_me: false,
  },
  {
    id: "4",
    content: "hello",
    sent_at: new Date(),
    sent_by_me: true,
  },
];

const MessageBone = (props: Props) => {
  return (
    <ScrollView>
      {messages.map((msg) => (
        <Bubbles key={msg.id} msg={msg} />
      ))}
    </ScrollView>
  );
};

export default MessageBone;
