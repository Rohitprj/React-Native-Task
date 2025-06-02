import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/Feather";

const ThreeButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
        {/* <Icon name="download" size={20} color="white" /> */}
        <Feather name="download" size={16} color="white" />
      </TouchableOpacity>

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
    backgroundColor: "#1D3B8B",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    backgroundColor: "#1D3B8B",
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
