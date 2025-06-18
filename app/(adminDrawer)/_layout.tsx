// import { usePathname } from "expo-router";
// import { Drawer } from "expo-router/drawer";

// // function CustomDrawerContent() {
// //   const router = useRouter();

// //   return (
// //     <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 20 }}>
// //       <TouchableOpacity
// //         onPress={() => router.push("/(adminDrawer)/(employee)/Bookings")}
// //         style={{ marginBottom: 20 }}
// //       >
// //         <Text style={{ fontSize: 18 }}>🏠 Home</Text>
// //       </TouchableOpacity>
// //       {/* <TouchableOpacity
// //         onPress={() => router.push("/(drawer)/(tabs)/explore")}
// //         style={{ marginBottom: 20 }}
// //       >
// //         <Text style={{ fontSize: 18 }}>ℹ️ About</Text>
// //       </TouchableOpacity> */}
// //     </View>
// //   );
// // }

// export default function DrawerLayout() {
//   const pathname = usePathname();

//   let headerTitle = "App";
//   if (pathname === "/(drawer)/(tabs)") {
//     headerTitle = "Home";
//   } else if (pathname === "/(drawer)/(tabs)/explore") {
//     headerTitle = "Explore";
//   }

//   return (
//     <Drawer
//       screenOptions={{
//         headerShown: true,
//         drawerPosition: "left",
//         // headerTitle: headerTitle, // 👈 Dynamic title here
//       }}
//       // drawerContent={CustomDrawerContent}
//     />
//   );
// }

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
