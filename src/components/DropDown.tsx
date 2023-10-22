import { fontFamily } from "@constants/typography";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Delete, Edit } from "@constants/assets";

type Props = {};

const DropDown = (props: Props) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.optionBtn}>
        <Edit />
        <Text style={styles.option}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.optionBtn, marginTop: 10 }}>
        <Delete />
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
    elevation: Platform.OS === "android" ? 10 : 0,
    shadowColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  option: {
    fontFamily: fontFamily.semiBold,
    paddingLeft: 8,
    fontSize: 14,
  },
  optionBtn: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingVertical: 8,
    paddingLeft: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
});
