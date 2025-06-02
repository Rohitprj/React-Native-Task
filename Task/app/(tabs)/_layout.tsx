import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Image } from "react-native";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "white",
        tabBarStyle: {
          height: 70,
          // borderRadius: 40,
          position: "relative",
          // bottom: 5,
          width: Dimensions.get("screen").width,
          alignSelf: "center",
          // paddingBottom: 10,
          backgroundColor: "#1B3170",
          borderTopWidth: 0, // Remove top border
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image source={require("../../assets/Logo/Frame.png")} />
          ),
          tabBarLabelStyle: { fontSize: 12, fontWeight: "600", color: "white" },
        }}
      />
      <Tabs.Screen
        name="Customers"
        options={{
          title: "Customers",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image source={require("../../assets/Logo/clients.png")} />
          ),
          tabBarLabelStyle: { fontSize: 12, fontWeight: "400", color: "white" },
        }}
      />
      <Tabs.Screen
        name="Clients"
        options={{
          title: "Clients",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image source={require("../../assets/Logo/booking.png")} />
          ),
          tabBarLabelStyle: { fontSize: 12, fontWeight: "400", color: "white" },
        }}
      />
      <Tabs.Screen
        name="Booking"
        options={{
          title: "Booking",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image source={require("../../assets/Logo/new.png")} />
          ),
          tabBarLabelStyle: { fontSize: 12, fontWeight: "400", color: "white" },
        }}
      />
      <Tabs.Screen
        name="Packages"
        options={{
          title: "Packages",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image source={require("../../assets/Logo/Icons.png")} />
          ),
          tabBarLabelStyle: { fontSize: 12, fontWeight: "400", color: "white" },
        }}
      />
    </Tabs>
  );
}
