import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const ThreeButtons = () => {
  return (
    <View style={styles.container}>
        {/* <Icon name="download" size={20} color="white" /> */}
      {/* <TouchableOpacity style={styles.iconButton}>
        <Feather name="download" size={16} color="white" />
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.textButton}>
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textButton}>
        <Text style={styles.buttonText}>Select Month</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThreeButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    justifyContent: "flex-end",
  },
  iconButton: {
    backgroundColor: "#6250D5",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    backgroundColor: "#6250D5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
