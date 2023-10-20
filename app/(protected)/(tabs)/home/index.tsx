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
import DropDown from "@components/DropDown";
import { useState } from "react";

const tasks = [
  "task1",
  "task2",
  "task3",
  "task4",
  "task5",
  "task6",
  "task6",
  "task6",
  "task6",
  "task6",
  "task6",
  "task6",
  "task6",
];

export default function Home() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [clickedCardIndex, setClickedCardIndex] = useState(0);

  function toggleMenu() {
    setShowMenu(true);
  }

  return (
    <TouchableHighlight onPress={() => setShowMenu(false)}>
      <View>
        <FloatButton />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity>
              <MenuBtn />
            </TouchableOpacity>
            <Text
              style={{
                color: "#fff",
                fontFamily: fontFamily.semiBold,
                fontSize: 18,
                marginTop: 5,
              }}
            >
              Tasks
            </Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.tasksList}
          >
            {tasks.map((task, index) => (
              <View key={index} style={styles.taskContainer}>
                {showMenu && index === clickedCardIndex ? <DropDown /> : null}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 14,
                    zIndex: 1,
                  }}
                >
                  <DragBtn />
                  <Text style={styles.taskLabel}>{task}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setClickedCardIndex(index);
                    toggleMenu();
                  }}
                >
                  <OptionsMenuBtn />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 20,
    elevation: 0,
    zIndex: 0,
  },
  header: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  taskLabel: {
    color: "#fff",
    fontSize: 18,
    fontFamily: fontFamily.Medium,
    marginTop: 2,
  },
  tasksList: {
    marginTop: 20,
    height: Dimensions.get("screen").height - 230,
    elevation: 0,
    zIndex: 0,
  },
  taskContainer: {
    backgroundColor: "#3A3E51",
    width: "95%",
    height: 52,
    marginBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    elevation: 0,
    zIndex: 0,
  },
});
