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
import { fontFamily } from "@constants/typography";
import React, { useEffect, useState } from "react";
import { ITask } from "src/types/Entities";
import { CheckBox } from "@rneui/themed";
import {
  UnFinishTask,
  fetchCompletedTasksForUser,
  removeTask,
} from "@loaders/tasks";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useAuthStore } from "@store/authStore";
import { Smile, Trash } from "@constants/assets";

export function FinishedTasks() {
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const { session } = useAuthStore();

  const userId = session?.user.id;

  async function setTaskUnDone(taskId: string) {
    UnFinishTask(taskId)
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "SUCCESS",
          textBody: "Take your time !",
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

  useEffect(() => {
    fetchCompletedTasksForUser(userId)
      .then((tasks) => {
        setCompletedTasks(tasks as ITask[]);
      })
      .catch((err) => console.error(err));
  }, [completedTasks]);

  if (completedTasks.length === 0) {
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
          It's Okay, Take your time !
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        marginTop: 30,
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
        {completedTasks.map((task: ITask) => (
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
                onPress={() => setTaskUnDone(task.id)}
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
