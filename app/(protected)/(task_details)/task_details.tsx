import { fontFamily } from "@constants/typography";
import { supabase } from "@lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

interface SelectedTaskType {
  label: string;
  do_at: string;
  priority: string;
  done: boolean;
}

export default function TaskDetails() {
  const { taskId } = useLocalSearchParams();
  const [task, setTask] = useState<SelectedTaskType>();

  const getTaskDetailsWithId = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select(`label, do_at, priority, done`)
      .eq("id", taskId)
      .single();

    if (data) {
      setTask(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskDetailsWithId();
  }, [taskId]);

  console.log(task);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <View>
        <TextInput
          value={task?.label}
          //   onChangeText={(text) =>
          //     setTask(task?.label: text)
          //   }
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginLeft: 20,
  },
  title: {
    fontFamily: fontFamily.Medium,
    fontSize: 18,
  },
});
