import { fontFamily } from "@constants/typography";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const DropDown = (props: Props) => {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.option}>Item</Text>
      {/* <Text style={styles.option}>Item</Text>
      <Text style={styles.option}>Item</Text>
      <Text style={styles.option}>Item</Text> */}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "#fff",
    padding: 5,
    position: "absolute",
    width: "40%",
    right: 10,
    top: 40,
    // bottom: -35,
    borderRadius: 5,
    zIndex: 99,
  },
  option: {
    fontFamily: fontFamily.regular,
    paddingLeft: 5,
    paddingVertical: 5,
  },
});
