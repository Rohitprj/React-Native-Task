import { DrawerToggleButton } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity, View } from "react-native";

export default function DrawerLayout() {

  function CustomDrawerContent() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 20 }}>
      <TouchableOpacity
        onPress={() => router.push("/(admin)/(tabs)")}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 18 }}> Store</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(admin)/(tabs)/Customers")}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 18 }}>Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(admin)/(tabs)/Clients")}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 18 }}>Clients</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(admin)/(tabs)/Bookings")}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 18 }}>Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(admin)/(tabs)/Packages")}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 18 }}>Packages</Text>
      </TouchableOpacity>
    </View>
  );
}
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        headerLeft: () => <DrawerToggleButton />, 
      }}
      drawerContent={CustomDrawerContent}
    />
  );
}
