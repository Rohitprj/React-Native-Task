// app/_layout.tsx
import { getUserData } from "@/utils/tokenStorage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const check = async () => {
      const token = await getUserData();
      setAuthenticated(!!token);
      setLoading(false);
    };

    check();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!authenticated ? (
        <Stack.Screen name="index" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}

// import { getToken } from "@/utils/tokenStorage";
// import { Stack } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, View } from "react-native";

// export default function RootLayout() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [key, setKey] = useState(0); // 👈 Force re-render key

//   const checkToken = async () => {
//     const token = await getToken();
//     setLoggedIn(!!token);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     checkToken();
//   }, [key]); // 👈 Refresh when key changes

//   // 👇 Add function to trigger refresh (you'll call this after logout)
//   global.refreshLayout = () => setKey((prev) => prev + 1);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator />
//       </View>
//     );
//   }

//   return (
//     <Stack screenOptions={{ headerShown: false }} key={key}>
//       {loggedIn ? (
//         <Stack.Screen name="(tabs)" />
//       ) : (
//         <Stack.Screen name="index" />
//       )}
//     </Stack>
//   );
// }
