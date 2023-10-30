import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import FloatButton from "@components/Fab";
import { fontFamily } from "@constants/typography";
import { OptionsMenuBtn, MenuBtn, Smile, Trash } from "@constants/assets";
import React, { useEffect, useMemo, useState } from "react";
import { ITask } from "src/types/Entities";
import { supabase } from "@lib/supabase";
import { useAuthStore } from "@store/authStore";
import { CheckBox } from "@rneui/themed";
import { router } from "expo-router";

function CompletedTaskSection({
  undo,
  userId,
}: {
  undo: (taskId: string) => void;
  userId: string | undefined;
}) {
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);

  async function getCompletedTasks() {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("userId", userId)
      .filter("done", "eq", true)
      .select();

    if (tasks) {
      setCompletedTasks(tasks);
    } else {
      console.error(error);
    }
  }

  async function deleteTask(taskId: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCompletedTasks();
  }, [completedTasks]);

  if (completedTasks.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        marginTop: -300,
        marginLeft: 20,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.semiBold,
          fontSize: 16,
          marginBottom: 20,
        }}
      >
        Completed
      </Text>
      <ScrollView>
        {completedTasks.map((task, index) => (
          <TouchableOpacity
            style={styles.taskContainer}
            key={task.id}
            disabled={true}
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
                checked={task.done}
                onPress={() => undo(task.id)}
                title={task.label}
              />
            </View>
            <TouchableOpacity
              style={{
                marginRight: 5,
              }}
              onPress={() => deleteTask(task.id)}
            >
              <Trash />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

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
      .eq("userId", session?.user.id)
      .filter("done", "eq", false)
      .select();

    if (tasks) {
      setTasksData(tasks);
    } else {
      console.error(error);
    }
  }

  async function setTaskDone(taskId: string) {
    setChecked(!checked);
    const { data: tasks, error } = await supabase
      .from("tasks")
      .update({ done: !checked })
      .eq("id", taskId);

    if (error) {
      console.log(error);
    }
  }

  async function deleteTask(taskId: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.error(error);
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
        {tasksData.length > 0 ? (
          <>
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
                    checked={task.done}
                    onPress={() => setTaskDone(task.id)}
                    title={task.label}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    marginRight: 5,
                  }}
                  onPress={() => deleteTask(task.id)}
                >
                  <Trash />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginTop: 50,
            }}
          >
            <Smile />
            <Text
              style={{
                fontFamily: fontFamily.semiBold,
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Nice Job, Proud of you!
            </Text>
          </View>
        )}
      </ScrollView>
      <CompletedTaskSection userId={session?.user.id} undo={setTaskDone} />
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
