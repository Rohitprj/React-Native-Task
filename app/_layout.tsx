import { getUserData } from "@/utils/tokenStorage";
import { Image } from "expo-image"; // <-- Import Image
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

type Role = "ADMIN" | "SUBADMIN" | "EMPLOYEE" | undefined;

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<Role>(undefined);
  const [showSplash, setShowSplash] = useState(true); // <-- Splash state

  useEffect(() => {
    // Show splash for 3 seconds
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(splashTimeout);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      const check = async () => {
        const userData = await getUserData();
        console.log("PersistData", userData);

        if (userData?.role) {
          setUserRole(userData.role.toUpperCase() as Role);
        }

        setLoading(false);
      };

      check();
    }
  }, [showSplash]);

  if (showSplash) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/Logo/striketheball.gif")}
          style={{ width: "100%", height: "100%" }}
          // resizeMode="cover"
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <ActivityIndicator size="large" /> */}
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


// import { getUserData } from "@/utils/tokenStorage";
// import { Image } from "expo-image";
// import { Stack } from "expo-router";
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect, useState } from "react";
// import { View } from "react-native"; // Removed ActivityIndicator as it's not strictly used in the final version

// type Role = "ADMIN" | "SUBADMIN" | "EMPLOYEE" | undefined;

// // Prevent the native splash screen from auto-hiding.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [appIsReady, setAppIsReady] = useState(false);
//   const [userRole, setUserRole] = useState<Role>(undefined);

//   useEffect(() => {
//     async function prepareApp() {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 4000));

//         const userData = await getUserData();
//         console.log("PersistData", userData);

//         if (userData?.role) {
//           setUserRole(userData.role.toUpperCase() as Role);
//         }
//       } catch (e) {
//         console.warn("App preparation error:", e);
//       } finally {
//         setAppIsReady(true);
//       }
//     }

//     prepareApp();
//   }, []);

//   useEffect(() => {
//     if (appIsReady) {
//       SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return (
//       <View style={{ flex: 1, backgroundColor: 'white' }}>
//         <Image
//           source={require("../assets/Logo/striketheball.gif")}
//           style={{ width: "100%", height: "100%" }}
//           // resizeMode="cover"
//         />
//       </View>
//     );
//   }

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {!userRole ? (
//         <Stack.Screen name="index" />
//       ) : userRole === "ADMIN" ? (
//         <Stack.Screen name="(admin)" />
//       ) : userRole === "SUBADMIN" ? (
//         <Stack.Screen name="(subAdmin)" />
//       ) : userRole === "EMPLOYEE" ? (
//         <Stack.Screen name="(employee)" />
//       ) : (
//         // --- FIX HERE: Render null or a fallback Stack.Screen ---
//         <Stack.Screen name="index" /> // Or null, depending on desired behavior
//         // If you truly want to render nothing, use `null`:
//         // null
//       )}
//     </Stack>
//   );
// }


// import { getUserData } from "@/utils/tokenStorage";
// import { Image } from "expo-image";
// import { Stack } from "expo-router";
// import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen
// import { useCallback, useEffect, useState } from "react"; // Add useCallback
// import { View } from "react-native";

// type Role = "ADMIN" | "SUBADMIN" | "EMPLOYEE" | undefined;

// // Prevent the native splash screen from auto-hiding.
// // This line should be at the top level of the module, before any component definition.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [appIsReady, setAppIsReady] = useState(false); // New state to manage overall app readiness
//   const [userRole, setUserRole] = useState<Role>(undefined);

//   useEffect(() => {
//     async function prepareApp() {
//       try {
//         // --- Phase 1: Show GIF for 4 seconds ---
//         // During this phase, the native splash screen is still visible,
//         // but your JS code has loaded. You are *showing* the GIF here.
//         // It's crucial that the native splash image *blends* with your GIF's initial state
//         // or that the GIF is the native splash itself if it's a very short,
//         // small, and static-looking start frame.
//         // For a seamless transition, the native splash should be a static image
//         // that transitions into your GIF.
//         await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for GIF duration

//         // --- Phase 2: Fetch user data after GIF animation ---
//         const userData = await getUserData();
//         console.log("PersistData", userData);

//         if (userData?.role) {
//           setUserRole(userData.role.toUpperCase() as Role);
//         }

//       } catch (e) {
//         console.warn("App preparation error:", e);
//       } finally {
//         // Mark app as ready after GIF and data fetching
//         setAppIsReady(true);
//       }
//     }

//     prepareApp();
//   }, []); // Run once on component mount

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       // Once the app is truly ready (GIF done, data fetched), hide the native splash screen.
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   // If the app is not yet ready, show the GIF.
//   // This View will be rendered on top of the native splash screen.
//   if (!appIsReady) {
//     return (
//       <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//         <Image
//           source={require("../assets/Logo/striketheball.gif")}
//           style={{ width: "100%", height: "100%" }}
//           // resizeMode="cover" or "contain" based on how you want the GIF to fill the screen
//         />
//       </View>
//     );
//   }

//   // Once appIsReady is true, the native splash has hidden, and we proceed with navigation.
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {!userRole ? (
//         <Stack.Screen name="index" />
//       ) : userRole === "ADMIN" ? (
//         <Stack.Screen name="(admin)" />
//       ) : userRole === "SUBADMIN" ? (
//         <Stack.Screen name="(subAdmin)" />
//       ) : userRole === "EMPLOYEE" ? (
//         <Stack.Screen name="(employee)" />
//       ) : (
//         // This case should ideally not be reached if Role is strictly typed,
//         // but leaving it for safety as in original code.
//         ""
//       )}
//     </Stack>
//   );
// }