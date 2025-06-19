import { Colors } from "@/constants/Colors";
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
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tabs.Screen
          name="Bookings"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("@/assets/Logo/new.png")} style={{tintColor:Colors.STB.buttons}}/>
              // <Image source={require("../../assets/Logo/new.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: Colors.STB.buttons }}>
                Bookings
              </Text>
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
