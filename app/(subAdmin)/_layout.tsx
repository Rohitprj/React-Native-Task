import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Image, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 90,
            position: "relative",
            width: Dimensions.get("screen").width,
            alignSelf: "center",
            backgroundColor: "#1B3170",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        {/* <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("../../assets/Logo/Frame.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
                Store
              </Text>
            ),
          }}
        /> */}
        {/* <Tabs.Screen
          name="Customers"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("../../assets/Logo/clients.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
                Customers
              </Text>
            ),
          }}
        /> */}
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("../../assets/Logo/booking.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
                Clients
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="Bookings"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("../../assets/Logo/new.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
                Bookings
              </Text>
            ),
          }}
        />
        {/* <Tabs.Screen
          name="Packages"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("../../assets/Logo/Icons.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
                Packages
              </Text>
            ),
          }}
        /> */}
      </Tabs>
    </SafeAreaProvider>
  );
}
