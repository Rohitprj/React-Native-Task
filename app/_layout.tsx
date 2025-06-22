// import { getUserData } from "@/utils/tokenStorage";
// import { Stack } from "expo-router";
// import { useEffect, useState } from "react";
// import { Image, View } from "react-native";

// type Role = "ADMIN" | "SUBADMIN" | "EMPLOYEE" | undefined;

// export default function RootLayout() {
//   const [loading, setLoading] = useState(true);
//   const [showSplash, setShowSplash] = useState(true);
//   const [userRole, setUserRole] = useState<Role>(undefined);

//   useEffect(() => {
//     // Show splash screen for 3 seconds
//     const splashTimeout = setTimeout(() => {
//       setShowSplash(false);
//     }, 3000);

//     return () => clearTimeout(splashTimeout);
//   }, []);

//   useEffect(() => {
//     // After splash is hidden, fetch user data
//     if (!showSplash) {
//       const check = async () => {
//         const userData = await getUserData();
//         console.log("PersistData", userData);

//         if (userData?.role) {
//           setUserRole(userData.role.toUpperCase() as Role);
//         }

//         setLoading(false);
//       };

//       check();
//     }
//   }, [showSplash]);

//   // Show splash screen
//   if (showSplash) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
//         <Image
//           source={require("../assets/Logo/striketheball.gif")} // Adjust path if needed
//           // style={{ width: 200, height: 200, resizeMode: "contain" }}
//         />
//       </View>
//     );
//   }

//   // Show loader while checking user data
//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         {/* <Image
//           source={require("@/assets/loading.gif")} // Optional loader GIF
//           style={{ width: 100, height: 100 }}
//         /> */}
//       </View>
//     );
//   }

//   // Show main app based on role
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
//         ""
//       )}
//     </Stack>
//   );
// }


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
        setUserRole(userData.role.toUpperCase() as Role);
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

// import { getUserData } from "@/utils/tokenStorage";
// import { Stack } from "expo-router";
// import * as SplashScreen from 'expo-splash-screen';
// import { useCallback, useEffect, useState } from "react";
// import { View } from "react-native";

// import LoadingScreen from "../components/LoadingSplashScreen"; // Adjust path if needed

// type Role = "ADMIN" | "SUBADMIN" | "EMPLOYEE" | undefined;

// // Prevent the native splash screen from auto-hiding immediately
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [appIsReady, setAppIsReady] = useState(false);
//   const [showGifSplash, setShowGifSplash] = useState(true);
//   const [userRole, setUserRole] = useState<Role>(undefined);

//   useEffect(() => {
//     async function prepareApp() {
//       try {
//         const userData = await getUserData();
//         console.log("PersistData", userData);

//         if (userData?.role) {
//           setUserRole(userData.role.toUpperCase() as Role);
//         }

//         // Simulate any other async tasks if needed, e.g., font loading
//         await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading time
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     }

//     prepareApp();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       await SplashScreen.hideAsync();
//       // Keep the GIF splash visible for a short period
//       setTimeout(() => {
//         setShowGifSplash(false);
//       }, 2000); // Adjust this duration as needed
//     }
//   }, [appIsReady]);

//   // Main rendering logic
//   return (
//     <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//       {/* This conditional rendering ensures the GIF splash is shown on top 
//         while app is loading or until its duration is complete.
//         Once the GIF splash is hidden, the Stack will become visible.
//       */}
//       {(!appIsReady || showGifSplash) ? (
//         <LoadingScreen />
//       ) : (
//         <Stack screenOptions={{ headerShown: false }}>
//           {/* Here, instead of just defining routes, we define the *initial*
//             route based on the user's role. Expo Router will automatically
//             render the correct file for that route.
//           */}
//           {!userRole ? (
//             // If no user role, go to the public login/landing page
//             <Stack.Screen name="index" redirect={true} /> // `redirect={true}` is important for immediate navigation
//           ) : userRole === "ADMIN" ? (
//             // If admin, go to the admin group's index or a specific admin dashboard
//             <Stack.Screen name="(admin)" redirect={true} /> 
//           ) : userRole === "SUBADMIN" ? (
//             <Stack.Screen name="(subAdmin)" redirect={true} />
//           ) : userRole === "EMPLOYEE" ? (
//             <Stack.Screen name="(employee)" redirect={true} />
//           ) : (
//             // Fallback for unknown role, redirect to login
//             <Stack.Screen name="index" redirect={true} />
//           )}
//         </Stack>
//       )}
//     </View>
//   );
// }