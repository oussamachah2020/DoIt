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
import React, { useState } from "react";
import { BottomModal } from "@components/BottomModal";

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
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function toggleMenu() {
    setShowMenu(true);
  }

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
    color: "#fff",
    fontSize: 18,
    fontFamily: fontFamily.Medium,
    marginTop: 2,
  },
  tasksList: {
    marginTop: 20,
    height: Dimensions.get("screen").height - 230,
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
