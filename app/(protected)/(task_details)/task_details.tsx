import { fontFamily } from "@constants/typography";
import { supabase } from "@lib/supabase";
import { useTaskStore } from "@store/taskStore";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import CalendarModal from "@components/CalendarModal";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { priorities } from "@constants/data";
import { Button } from "@rneui/themed";
import { SuccessToast } from "react-native-toast-message";

interface SelectedTaskType {
  label: string;
  do_at: string;
  priority: string;
  done: boolean;
}

export default function TaskDetails() {
  const { taskId } = useLocalSearchParams();
  const [task, setTask] = useState<SelectedTaskType>({
    label: "",
    do_at: "",
    priority: "",
    done: false,
  });

  const { setOpenCalendarModal } = useTaskStore();
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const getTaskDetailsWithId = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("tasks")
        .select(`label, do_at, priority, done`)
        .eq("id", taskId)
        .single();

      if (data) {
        setTask(data);
        setSelectedDate(data.do_at);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    try {
      await supabase
        .from("tasks")
        .update({
          label: task.label,
          do_at: selectedDate,
          priority: task.priority,
          updated_at: new Date(),
        })
        .eq("id", taskId);

      SuccessToast({
        text1: "Good job!",
        text2: "Task created successfully !",
      });

      setTimeout(() => {
        router.push("/(protected)/(tabs)/home");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskDetailsWithId();
  }, [taskId]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={50} color={"#2F89FC"} />
        <Text
          style={{
            fontFamily: fontFamily.Medium,
            fontSize: 16,
            marginTop: 10,
          }}
        >
          Loading Task Details
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <CalendarModal selected={selectedDate} setSelected={setSelectedDate} />

      <View
        style={{
          position: "relative",
        }}
      >
        <TextInput
          value={task?.label}
          onChangeText={(text) => setTask({ ...task, label: text })}
          contentStyle={{
            backgroundColor: "#F5F5F5",
          }}
          style={{
            width: "90%",
            marginTop: 20,
            color: "#000",
            fontFamily: fontFamily.Medium,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setOpenCalendarModal(true)}
          >
            <Text style={styles.dateLabel}>
              <Ionicons name="calendar" size={20} color={"#b1b1b1"} />
              {"  "}
              {selectedDate}
            </Text>
          </TouchableOpacity>
          <Menu
            style={{
              width: "40%",
              marginTop: 42,
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}
          >
            <MenuTrigger text={task.priority} />
            <MenuOptions
              optionsContainerStyle={{
                padding: 5,
              }}
            >
              {priorities.map((priority) => (
                <MenuOption
                  key={priority.id}
                  onSelect={() =>
                    setTask({ ...task, priority: priority.value })
                  }
                  style={{
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.regular,
                      fontSize: 14,
                    }}
                  >
                    <Ionicons
                      name="flag"
                      size={20}
                      color={priority.iconColor}
                    />
                    {"  "}
                    {priority.label}
                  </Text>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        </View>
        <View
          style={{
            width: "93%",
            marginTop: 30,
            gap: 10,
            position: "absolute",
            bottom: -550,
          }}
        >
          <Button
            title={"Save Changes"}
            containerStyle={{
              borderRadius: 5,
              backgroundColor: "#2F89FC",
            }}
            titleStyle={{
              fontFamily: fontFamily.semiBold,
              fontSize: 14,
            }}
            onPress={updateTask}
          />
          <Button
            title={"Cancel"}
            containerStyle={{
              borderRadius: 5,
            }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: "#2F89FC",
              backgroundColor: "transparent",
            }}
            titleStyle={{
              fontFamily: fontFamily.semiBold,
              color: "#000",
              fontSize: 14,
            }}
            onPress={() => router.push("/(protected)/(tabs)/home")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingLeft: 20,
    height: Dimensions.get("screen").height,
    position: "relative",
  },
  title: {
    fontFamily: fontFamily.Medium,
    fontSize: 18,
  },

  dateBtn: {
    marginTop: 40,
    borderBottomWidth: 1,
    width: "50%",
    paddingBottom: 5,
    paddingLeft: 5,
  },
  dateLabel: {
    fontFamily: fontFamily.Medium,
  },

  priorityBtn: {
    marginTop: 40,
    borderBottomWidth: 1,
    width: "40%",
    paddingBottom: 5,
    paddingLeft: 5,
  },
  priorityLabel: {
    fontFamily: fontFamily.Medium,
  },
});
