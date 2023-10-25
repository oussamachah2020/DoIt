import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import FloatButton from "@components/Fab";
import { fontFamily } from "@constants/typography";
import { DragBtn, OptionsMenuBtn, MenuBtn } from "@constants/assets";
import React, { useEffect, useState } from "react";
import { ITask } from "src/types/Entities";
import { supabase } from "@lib/supabase";
import { useAuthStore } from "@store/authStore";
import { CheckBox } from "@rneui/themed";
import { router } from "expo-router";

export default function Home() {
  const [visible, setVisible] = React.useState(false);
  const [tasksData, setTasksData] = useState<ITask[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const session = useAuthStore((v) => v.session);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  async function getTasks() {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("userId", session?.user.id);

    if (tasks) {
      setTasksData(tasks);
    } else {
      console.error(error);
    }
  }

  async function setTaskDone(taskId: string) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ done: true })
      .eq("id", taskId)
      .select();

    if (data) {
      console.log(data);
    }
  }

  useEffect(() => {
    getTasks();
  }, [tasksData]);

  return (
    <View>
      <FloatButton showModal={showModal} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <MenuBtn />
          </TouchableOpacity>
          <Text
            style={{
              color: "#000",
              fontFamily: fontFamily.semiBold,
              fontSize: 18,
              marginTop: 5,
            }}
          >
            Tasks
          </Text>
        </View>
      </View>
      <ScrollView style={styles.tasksList}>
        {tasksData.map((task) => (
          <TouchableOpacity
            style={styles.taskContainer}
            key={task.id}
            onPress={() =>
              router.push({
                pathname: "/(protected)/(task_details)/task_details",
                params: { taskId: task.id },
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <CheckBox
                textStyle={styles.taskLabel}
                checked={checked}
                onPress={() => setTaskDone(task.id)}
                title={task.label}
              />
            </View>
            <TouchableOpacity>
              <OptionsMenuBtn />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 20,
  },
  header: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  taskLabel: {
    color: "#000",
    fontSize: 16,
    fontFamily: fontFamily.regular,
    // marginTop: 3,
  },
  tasksList: {
    marginTop: 20,
    height: Dimensions.get("screen").height - 230,
    marginLeft: 20,
  },
  taskContainer: {
    backgroundColor: "#fff",
    elevation: 5,
    width: "95%",
    height: 52,
    marginBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
  },
});
