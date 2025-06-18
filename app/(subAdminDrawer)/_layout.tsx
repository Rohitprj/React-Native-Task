import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerPosition: "left",
        headerLeft: () => <DrawerToggleButton />, // 👈 Show hamburger menu
      }}
    />
  );
}
