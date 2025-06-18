import { getUserData } from "@/utils/tokenStorage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

type Role = "ADMIN" | "SUBADMIN" | "EMPLOYEE" | undefined;

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<Role>(undefined);

  useEffect(() => {
    const check = async () => {
      const userData = await getUserData();
      console.log("PersistData", userData);

      if (userData?.role) {
        setUserRole(userData.role.toUpperCase());
      }

      setLoading(false);
    };

    check();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!userRole ? (
        <Stack.Screen name="index" />
      ) : userRole === "ADMIN" ? (
        <Stack.Screen name="(admin)" />
      ) : userRole === "SUBADMIN" ? (
        <Stack.Screen name="(subAdminDrawer)" />
      ) : userRole === "EMPLOYEE" ? (
        <Stack.Screen name="(adminDrawer)" />
      ) : (
        ""
      )}
    </Stack>
  );
}

// import { getUserData } from "@/utils/tokenStorage";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, View } from "react-native";

// export default function RootLayout() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const check = async () => {
//       const userData = await getUserData();
//       console.log("PersistData", userData);

//       if (userData?.role) {
//         const role = userData.role.toUpperCase();
//         if (role === "ADMIN") {
//           router.replace("/(tabs)");
//         } else if (role === "SUBADMIN") {
//           router.replace("/(subAdmin)");
//         } else if (role === "EMPLOYEE") {
//           router.replace("/(employee)/Bookings");
//         } else {
//           router.replace("/");
//         }
//       } else {
//         router.replace("/");
//       }

//       setLoading(false);
//     };

//     check();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return null; // Or fallback screen briefly shown during redirect
// }
