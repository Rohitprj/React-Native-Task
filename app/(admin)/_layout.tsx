import { Colors } from "@/constants/Colors";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DrawerLayout() {
  const router = useRouter();

  function CustomDrawerContent() {
    return (
      <View style={styles.drawerContainer}>
        <Text style={styles.drawerTitle}>Admin</Text>

          <DrawerItem
            label="Overview"
            onPress={() => router.push("/Overview")}
          />
        <DrawerItem label="Store" onPress={() => router.push("/(admin)/(tabs)")} />
        <DrawerItem
          label="Customer"
          onPress={() => router.push("/(admin)/(tabs)/Customers")}
        />
        <DrawerItem
          label="Clients"
          onPress={() => router.push("/(admin)/(tabs)/Clients")}
        />
        <DrawerItem
          label="Bookings"
          onPress={() => router.push("/(admin)/(tabs)/Bookings")}
        />
        <DrawerItem
          label="Packages"
          onPress={() => router.push("/(admin)/(tabs)/Packages")}
        />
      </View>
    );
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        headerLeft: () => <DrawerToggleButton />,
        drawerStyle: {
          backgroundColor: "#fff",
        },
      }}
      drawerContent={CustomDrawerContent}
    />
  );
}

const DrawerItem = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.drawerButton} onPress={onPress}>
    <Text style={styles.drawerButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 20 : 60,
    paddingHorizontal: 20,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
    color: Colors.STB.text,
  },
  drawerButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 1,
  },
  drawerButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
