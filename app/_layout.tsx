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
        <Stack.Screen name="(subAdmin)" />
      ) : userRole === "EMPLOYEE" ? (
        <Stack.Screen name="(employee)" />
      ) : (
        ""
      )}
    </Stack>
  );
}
