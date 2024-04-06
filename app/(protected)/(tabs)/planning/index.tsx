import { fetchEvents } from "@loaders/tasks";
import { useAuthStore } from "@store/authStore";
import { useTaskStore } from "@store/taskStore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { AgendaEvent } from "src/types/Entities";

const timeToString = (time: string | number | Date) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export function planning() {
  const [items, setItems] = React.useState({});

  const loadItems = (day: { timestamp: number }) => {
    setTimeout(() => {
      for (let i = -15; i < 20; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime,
              height: Math.max(10, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);

    console.log(items);
  };
  // const { session } = useAuthStore();

  // const loadItems = () => {
  //   if (!session) {
  //     return;
  //   }

  const { setOpenEventForm } = useTaskStore();
  //   fetchEvents(session?.user.id).then((res) => {
  //     console.log(res);
  //     setItems(res);
  //   });
  // };

  const renderItem = (item: {
    name:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
  }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => setOpenEventForm(true)}
      >
        <Card
          style={{
            backgroundColor: "#fff",
          }}
        >
          <Card.Content>
            <View>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2022-07-07"}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
      />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
