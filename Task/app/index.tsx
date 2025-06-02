import { View, Text } from "react-native";
import React from "react";
import LoginScreen from "./LoginScreen";
import OverviewScreen from "./OverviewScreen";

export default function index() {
  return (
    <View>
      {/* <Text>index</Text> */}
      <OverviewScreen />
    </View>
  );
}
