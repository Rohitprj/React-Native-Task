// import { Tabs } from "expo-router";
// import React from "react";
// import { Dimensions, Image } from "react-native";

// export default function _layout() {
//   return (
//     <Tabs
//       screenOptions={{
//         // tabBarActiveTintColor: "white",
//         tabBarStyle: {
//           height: 70,
//           // borderRadius: 40,
//           position: "relative",
//           // bottom: 5,
//           width: Dimensions.get("screen").width,
//           alignSelf: "center",
//           // paddingBottom: 10,
//           backgroundColor: "#1B3170",
//           borderTopWidth: 0,
//           elevation: 0,
//           shadowOpacity: 0,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Overview",
//           headerShown: false,
//           tabBarIcon: ({ color }) => (
//             <Image source={require("../../assets/Logo/Frame.png")} />
//           ),
//           tabBarLabelStyle: { fontSize: 12, fontWeight: "600", color: "white" },
//         }}
//       />
//       <Tabs.Screen
//         name="Customers"
//         options={{
//           title: "Customers",
//           headerShown: false,
//           tabBarIcon: ({ color }) => (
//             <Image source={require("../../assets/Logo/clients.png")} />
//           ),
//           tabBarLabelStyle: { fontSize: 12, fontWeight: "400", color: "white" },
//         }}
//       />
//       <Tabs.Screen
//         name="Clients"
//         options={{
//           title: "Clients",
//           headerShown: false,
//           tabBarIcon: ({ color }) => (
//             <Image source={require("../../assets/Logo/booking.png")} />
//           ),
//           tabBarLabelStyle: { fontSize: 12, fontWeight: "400", color: "white" },
//         }}
//       />
//       <Tabs.Screen
//         name="Booking"
//         options={{
//           title: "Booking",
//           headerShown: false,
//           tabBarIcon: ({ color }) => (
//             <Image source={require("../../assets/Logo/new.png")} />
//           ),
//           tabBarLabelStyle: { fontSize: 12, fontWeight: "400", color: "white" },
//         }}
//       />
//       <Tabs.Screen
//         name="Packages"
//         options={{
//           title: "Packages",
//           headerShown: false,
//           tabBarIcon: ({ color }) => (
//             <Image source={require("../../assets/Logo/Icons.png")} />
//           ),
//           tabBarLabelStyle: { fontSize: 12, fontWeight: "400", color: "white" },
//         }}
//       />
//     </Tabs>
//   );
// }

import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Image, Text } from "react-native";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
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
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image source={require("../../assets/Logo/Frame.png")} />
          ),
          tabBarLabel: () => (
            <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
              Overview
            </Text>
          ),
        }}
      />
      <Tabs.Screen
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
      />
      <Tabs.Screen
        name="Clients"
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
        name="Booking"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image source={require("../../assets/Logo/new.png")} />
          ),
          tabBarLabel: () => (
            <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
              Booking
            </Text>
          ),
        }}
      />
      <Tabs.Screen
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
      />
    </Tabs>
  );
}
