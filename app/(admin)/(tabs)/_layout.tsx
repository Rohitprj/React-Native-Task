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
            backgroundColor: "#ffffff",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("@/assets/Logo/Frame.png")} style={{tintColor:"#6250D5"}} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#6250D5" }}>
                Store
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="Customers"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("@/assets/Logo/clients.png")} style={{tintColor:"#6250D5"}}/>
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "#6250D5" }}>
                Customers
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="Clients"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("@/assets/Logo/booking.png")} style={{tintColor:"#6250D5"}}/>
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "#6250D5" }}>
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
              <Image source={require("@/assets/Logo/new.png")} style={{tintColor:"#6250D5"}}/>
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "#6250D5" }}>
                Bookings
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="Packages"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("@/assets/Logo/Icons.png")}style={{tintColor:"#6250D5"}} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "#6250D5" }}>
                Packages
              </Text>
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
