import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          height: 70,
          borderRadius: 40,
          position: "relative",
          bottom: 5,
          width: Dimensions.get("screen").width - 20,
          alignSelf: "center",
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        }}
      />
      <Tabs.Screen
        name="Category"
        options={{
          title: "Client",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={24} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        }}
      />
      <Tabs.Screen
        name="MyRides"
        options={{
          title: "Booking",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="car" size={24} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Packages",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={24} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        }}
      />
    </Tabs>
  );
}
