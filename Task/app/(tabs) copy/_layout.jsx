import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Dimensions } from "react-native";

export default function TabLayout() {
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
          title: "Home",
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
          title: "Category",
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
          title: "My Rides",
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
          title: "Settings",
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
