import { fontFamily } from "@constants/typography";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {};

const DropDown = (props: Props) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.optionBtn}>
        <Text style={styles.option}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.optionBtn, marginTop: 10 }}>
        <Text style={styles.option}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "#fff",
    padding: 8,
    position: "absolute",
    width: "40%",
    right: 10,
    top: 40,
    borderRadius: 5,
    zIndex: 99,
    elevation: Platform.OS === "android" ? 10 : 0,
    shadowColor: "#fff",
  },
  option: {
    fontFamily: fontFamily.semiBold,
    paddingLeft: 5,
    paddingVertical: 5,
  },
  optionBtn: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
