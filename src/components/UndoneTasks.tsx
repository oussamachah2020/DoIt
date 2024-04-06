import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FloatButton from "@components/Fab";
import { fontFamily } from "@constants/typography";
import { OptionsMenuBtn, Smile, Trash } from "@constants/assets";
import React, { useEffect, useState } from "react";
import { ITask } from "src/types/Entities";
import { supabase } from "@lib/supabase";
import { useAuthStore } from "@store/authStore";
import { CheckBox } from "@rneui/themed";
import { router } from "expo-router";
import { Menu } from "react-native-paper";
import { fetchTasksForUser, finishTask, removeTask } from "@loaders/tasks";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export function UndoneTasks() {
  const [tasksData, setTasksData] = useState<ITask[]>([]);
  const session = useAuthStore((v) => v.session);
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const openMenu = (taskId: string) => {
    setVisibleMenu(true);
    setSelectedTaskId(taskId);
  };

  const closeMenu = () => {
    setVisibleMenu(false);
    setSelectedTaskId(null);
  };

  async function getTasks() {
    fetchTasksForUser(session?.user.id)
      .then((tasks) => {
        setTasksData(tasks as ITask[]);
      })
      .catch((err) => console.error(err));
  }

  async function setTaskDone(taskId: string) {
    finishTask(taskId)
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Good Job!",
          textBody: "You're doing well champ !",
        });
      })
      .catch((err) => {
        console.error(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error !",
          textBody: "Something went wrong, retry !",
        });
      });
  }

  async function deleteTask(taskId: string) {
    removeTask(taskId)
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "DONE !",
          textBody: "Task removed successfully !",
        });
      })
      .catch((err) => {
        console.error(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error !",
          textBody: "Something went wrong, retry !",
        });
      });
  }

  const onRefresh = () => {
    setRefreshing(true);
    getTasks();

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  useEffect(() => {
    getTasks();
  }, [tasksData]);

  if (tasksData && tasksData.length == 0) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
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
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
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
      <ScrollView
        style={styles.tasksList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {tasksData?.map((task) => (
          <TouchableOpacity style={styles.taskContainer} key={task.id}>
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
            <Menu
              visible={visibleMenu && selectedTaskId === task.id}
              onDismiss={closeMenu}
              key={task.id}
              style={{
                backgroundColor: "#fff",
              }}
              contentStyle={{
                backgroundColor: "#fff",
              }}
              anchor={
                <TouchableOpacity onPress={() => openMenu(task.id)}>
                  <OptionsMenuBtn />
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => {
                  router.push({
                    pathname: "/task_details",
                    params: { taskId: task.id },
                  });
                }}
                titleStyle={{
                  color: "#000",
                }}
                leadingIcon="text"
                title="See details"
              />
              <Menu.Item
                onPress={() => {
                  deleteTask(task.id);
                }}
                title="Delete"
                leadingIcon="delete"
                titleStyle={{
                  color: "red",
                }}
              />
            </Menu>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
