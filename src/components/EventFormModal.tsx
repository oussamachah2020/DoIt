import { fontFamily } from "@constants/typography";
import { Overlay } from "@rneui/themed";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Button } from "@rneui/themed";
import { AgendaEvent } from "src/types/Entities";
import { useAuthStore } from "@store/authStore";
import { createEvent } from "@loaders/tasks";
import { useTaskStore } from "@store/taskStore";
import { Calendar } from "react-native-calendars";

type Props = {};

function EventFormModal({}: Props) {
  const { session } = useAuthStore();
  const { setOpenEventForm, openEventForm } = useTaskStore();
  const [event, setEvent] = useState<AgendaEvent>({
    todo: "",
    description: "",
    user: session?.user.id,
  });

  function AddEvent() {
    console.log(event);
    createEvent(event)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }

  return (
    <Overlay
      isVisible={openEventForm}
      overlayStyle={{
        width: "90%",
        height: "60%",
        borderRadius: 10,
        paddingTop: 20,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.Medium,
          fontSize: 16,
        }}
      >
        Create an event
      </Text>
      <View style={{ width: "100%", marginTop: 30, gap: 30 }}>
        <TextInput
          style={{
            backgroundColor: "#fff",
          }}
          value={event.todo}
          onChangeText={(text) => setEvent({ ...event, todo: text })}
          placeholder="Event Title"
        />
        <TextInput
          style={{
            backgroundColor: "#fff",
          }}
          value={event.description}
          onChangeText={(text) => setEvent({ ...event, description: text })}
          placeholder="Event Description"
        />
        <TouchableOpacity>
          <></>
        </TouchableOpacity>
        <Calendar />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          gap: 10,
          marginTop: 20,
          marginVertical: 15,
        }}
      >
        <Button
          title={"Cancel"}
          containerStyle={{
            marginTop: 16,
            width: 100,
          }}
          titleStyle={{
            color: "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
            borderRadius: 10,
            borderColor: "#2F89FC",
            borderWidth: 1,
          }}
          onPress={() => setOpenEventForm(false)}
        />
        <Button
          title={"Confirm"}
          containerStyle={{
            marginTop: 16,
            width: 100,
          }}
          titleStyle={{
            color: "#000",
          }}
          buttonStyle={{
            backgroundColor: "#fff",
            borderRadius: 10,
            borderColor: "#2F89FC",
            borderWidth: 1,
          }}
          onPress={AddEvent}
        />
      </View>
    </Overlay>
  );
}

export default EventFormModal;
