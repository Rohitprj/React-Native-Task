import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Image, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 90,
            position: "relative",
            width: Dimensions.get("screen").width,
            alignSelf: "center",
            backgroundColor: "#1B3170",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        {false ? (
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Image source={require("../../assets/Logo/Frame.png")} />
              ),
              tabBarLabel: () => (
                <Text
                  style={{ fontSize: 12, fontWeight: "600", color: "white" }}
                >
                  Store
                </Text>
              ),
            }}
          />
        ) : null}

        {false && (
          <Tabs.Screen
            name="Customers"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Image source={require("../../assets/Logo/clients.png")} />
              ),
              tabBarLabel: () => (
                <Text
                  style={{ fontSize: 12, fontWeight: "400", color: "white" }}
                >
                  Customers
                </Text>
              ),
            }}
          />
        )}
        <Tabs.Screen
          name="Clients"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("../../assets/Logo/booking.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
                Clients
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="Bookings"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("../../assets/Logo/new.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
                Bookings
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="Packages"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={require("../../assets/Logo/Icons.png")} />
            ),
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "white" }}>
                Packages
              </Text>
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

// import { getUserData } from "@/utils/tokenStorage";
// import { Tabs } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Dimensions, Image, Text } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// // Define role-based permissions
// const rolePermissions = {
//   ADMIN: ["index", "Customers", "Clients", "Bookings", "Packages"],
//   SUBADMIN: ["index", "Clients", "Bookings"],
//   EMPLOYEE: ["index", "Bookings"],
// };

// export default function _layout() {
//   const [allowedTabs, setAllowedTabs] = useState<string[] | null>(null);

//   useEffect(() => {
//     (async () => {
//       const user = await getUserData();
//       const role = user?.role ?? "EMPLOYEE"; // fallback
//       const allowed = rolePermissions[role] || [];
//       setAllowedTabs(allowed);
//     })();
//   }, []);

//   if (allowedTabs === null) return null; // or loading indicator

//   return (
//     <SafeAreaProvider>
//       <Tabs
//         screenOptions={{
//           tabBarStyle: {
//             height: 90,
//             position: "relative",
//             width: Dimensions.get("screen").width,
//             alignSelf: "center",
//             backgroundColor: "#1B3170",
//             borderTopWidth: 0,
//             elevation: 0,
//             shadowOpacity: 0,
//           },
//         }}
//       >
//         {allowedTabs.includes("index") && (
//           <Tabs.Screen
//             name="index"
//             options={{
//               headerShown: false,
//               tabBarIcon: () => (
//                 <Image source={require("../../assets/Logo/Frame.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "600", color: "white" }}
//                 >
//                   Store
//                 </Text>
//               ),
//             }}
//           />
//         )}
//         {allowedTabs.includes("Customers") && (
//           <Tabs.Screen
//             name="Customers"
//             options={{
//               headerShown: false,
//               tabBarIcon: () => (
//                 <Image source={require("../../assets/Logo/clients.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Customers
//                 </Text>
//               ),
//             }}
//           />
//         )}
//         {allowedTabs.includes("Clients") && (
//           <Tabs.Screen
//             name="Clients"
//             options={{
//               headerShown: false,
//               tabBarIcon: () => (
//                 <Image source={require("../../assets/Logo/booking.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Clients
//                 </Text>
//               ),
//             }}
//           />
//         )}
//         {allowedTabs.includes("Bookings") && (
//           <Tabs.Screen
//             name="Bookings"
//             options={{
//               headerShown: false,
//               tabBarIcon: () => (
//                 <Image source={require("../../assets/Logo/new.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Bookings
//                 </Text>
//               ),
//             }}
//           />
//         )}
//         {allowedTabs.includes("Packages") && (
//           <Tabs.Screen
//             name="Packages"
//             options={{
//               headerShown: false,
//               tabBarIcon: () => (
//                 <Image source={require("../../assets/Logo/Icons.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Packages
//                 </Text>
//               ),
//             }}
//           />
//         )}
//       </Tabs>
//     </SafeAreaProvider>
//   );
// }

// import { Tabs } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Dimensions, Image, Text, View } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// // Assume getUserData is available globally or imported from a utility file
// // For this example, let's mock it as if it's coming from an async storage or context
// const getUserData = async () => {
//   // Replace this with your actual logic to retrieve persisted user data
//   // For demonstration, returning a mock based on your provided data
//   const mockUserData = {
//     SUBADMIN: {
//       appAccess: {
//         bookings: true,
//         clients: true,
//         customers: true,
//         packages: true,
//       }, // Added customers and packages for subadmin for complete example
//       email: "test@gmail.com",
//       role: "SUBADMIN",
//       token: "...",
//     },
//     EMPLOYEE: {
//       appAccess: { bookings: true },
//       email: "yadavrahul888211@gmail.com",
//       role: "EMPLOYEE",
//       token: "...",
//     },
//     ADMIN: {
//       // Assuming ADMIN has all access, as you mentioned
//       appAccess: {
//         bookings: true,
//         clients: true,
//         customers: true,
//         packages: true,
//       },
//       email: "admin@gmail.com",
//       role: "ADMIN",
//       token: "...",
//     },
//   };

//   // Simulate async data fetching
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   // You would typically get this from AsyncStorage or a global state management
//   // For testing, change 'SUBADMIN' to 'EMPLOYEE' or 'ADMIN' to see different tab sets
//   return mockUserData.SUBADMIN;
// };

// export default function TabsLayout() {
//   const [userData, setUserData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const data = await getUserData(); // Your actual function to get stored user data
//         setUserData(data);
//       } catch (error) {
//         console.error("Failed to load user data:", error);
//         // Handle error, e.g., redirect to login
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (isLoading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#1B3170",
//         }}
//       >
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={{ color: "#fff", marginTop: 10 }}>
//           Loading user permissions...
//         </Text>
//       </View>
//     );
//   }

//   const userRole = userData?.role;
//   const appAccess = userData?.appAccess || {};

//   // Helper function to check if a user has access to a specific feature
//   const hasAccess = (feature: string) => {
//     return userRole === "ADMIN" || appAccess[feature];
//   };

//   return (
//     <SafeAreaProvider>
//       <Tabs
//         screenOptions={{
//           tabBarStyle: {
//             height: 90,
//             position: "relative",
//             width: Dimensions.get("screen").width,
//             alignSelf: "center",
//             backgroundColor: "#1B3170",
//             borderTopWidth: 0,
//             elevation: 0,
//             shadowOpacity: 0,
//           },
//         }}
//       >
//         {/* Home/Store Tab - Usually accessible to all */}
//         <Tabs.Screen
//           name="index" // This corresponds to your home.tsx or index.tsx
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ color }) => (
//               <Image source={require("../../assets/Logo/Frame.png")} />
//             ),
//             tabBarLabel: () => (
//               <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
//                 Store
//               </Text>
//             ),
//           }}
//         />

//         {hasAccess("customers") && (
//           <Tabs.Screen
//             name="Customers"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/clients.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Customers
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {hasAccess("clients") && (
//           <Tabs.Screen
//             name="Clients"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/booking.png")} /> // Renamed for clarity, assuming clients.png for clients tab
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Clients
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {hasAccess("bookings") && (
//           <Tabs.Screen
//             name="Bookings"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/new.png")} /> // Renamed for clarity, assuming new.png for bookings tab
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Bookings
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {hasAccess("packages") && (
//           <Tabs.Screen
//             name="Packages"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/Icons.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Packages
//                 </Text>
//               ),
//             }}
//           />
//         )}
//       </Tabs>
//     </SafeAreaProvider>
//   );
// }

// import { Tabs } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Dimensions, Image, Text, View } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// // Assume getUserData is available globally or imported from a utility file
// // This is a mock function. REPLACE IT with your actual data retrieval logic.
// const getUserData = async () => {
//   // In a real app, this would fetch from AsyncStorage, context, or a global store.
//   // For demonstration, let's use a switch to simulate different user logins.
//   // Change the 'userType' to 'SUBADMIN', 'EMPLOYEE', or 'ADMIN' to test.
//   const userType = "SUBADMIN"; // <--- CHANGE THIS TO TEST DIFFERENT ROLES

//   let userData;
//   switch (userType) {
//     case "SUBADMIN":
//       userData = {
//         appAccess: { bookings: true, clients: true }, // As per your provided SUBADMIN data
//         email: "test@gmail.com",
//         role: "SUBADMIN",
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IlNVQkFETUlOIiwiYWNjZXNzVG8iOnsibG9ncyI6dHJ1ZSwiY2FsbHMiOnRydWUsInN0b3JlcyI6dHJ1ZSwiYm9va2luZ3MiOnRydWUsInBhY2thZ2VzIjp0cnVlLCJhZGQtc3RvcmUiOnRydWUsImN1c3RvbWVycyI6dHJ1ZSwiZW1wbG95ZWVzIjp0cnVlfSwiaWF0IjoxNzUwMTYwMDMzLCJleHAiOjE3NTA3NjQ4MzN9.Xbg9xGHDKxUyBLW3xy8J9Ow7MRDZg8Jz5bq_ghZwg1w",
//       };
//       break;
//     case "EMPLOYEE":
//       userData = {
//         appAccess: { bookings: true }, // As per your provided EMPLOYEE data
//         email: "yadavrahul888211@gmail.com",
//         role: "EMPLOYEE",
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhZGF2cmFodWw4ODgyMTFAZ21haWwuY29tIiwic3RvcmVJZCI6MiwiaWF0IjoxNzUwMTYwMDkxLCJleHAiOjE3NTA3NjQ4OTF9.-EFYJmafvpexxL0TB8KN3IfPjMi1TsLQp9HgIgP2CIk",
//       };
//       break;
//     case "ADMIN":
//     default: // Default to ADMIN if role not explicitly handled, or for full access
//       userData = {
//         appAccess: {
//           bookings: true,
//           clients: true,
//           customers: true,
//           packages: true,
//           store: true,
//         }, // ADMIN has all
//         email: "admin@gmail.com",
//         role: "ADMIN",
//         token: "...",
//       };
//       break;
//   }

//   // Simulate async data fetching
//   await new Promise((resolve) => setTimeout(resolve, 300));
//   return userData;
// };

// export default function TabsLayout() {
//   const [userData, setUserData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const data = await getUserData(); // Your actual function to get stored user data
//         setUserData(data);
//       } catch (error) {
//         console.error("Failed to load user data:", error);
//         // Handle error, e.g., redirect to login or show an error message
//         // You might want to navigate to the login screen here:
//         // router.replace('/login');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (isLoading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#1B3170",
//         }}
//       >
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={{ color: "#fff", marginTop: 10 }}>
//           Loading user permissions...
//         </Text>
//       </View>
//     );
//   }

//   const userRole = userData?.role;
//   const appAccess = userData?.appAccess || {};

//   // Define access rules based on roles and appAccess
//   const canShowStore = userRole === "ADMIN" || appAccess.store; // Assuming 'store' access in appAccess for ADMIN
//   const canShowCustomers = userRole === "ADMIN" || appAccess.customers;
//   const canShowClients = userRole === "ADMIN" || appAccess.clients;
//   const canShowBookings = userRole === "ADMIN" || appAccess.bookings;
//   const canShowPackages = userRole === "ADMIN" || appAccess.packages;

//   return (
//     <SafeAreaProvider>
//       <Tabs
//         screenOptions={{
//           tabBarStyle: {
//             height: 90,
//             position: "relative",
//             width: Dimensions.get("screen").width,
//             alignSelf: "center",
//             backgroundColor: "#1B3170",
//             borderTopWidth: 0,
//             elevation: 0,
//             shadowOpacity: 0,
//           },
//         }}
//       >
//         {/* Store Tab (index) */}
//         {canShowStore && (
//           <Tabs.Screen
//             name="index"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/Frame.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "600", color: "white" }}
//                 >
//                   Store
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {/* Customers Tab */}
//         {canShowCustomers && (
//           <Tabs.Screen
//             name="Customers"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/clients.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Customers
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {/* Clients Tab */}
//         {canShowClients && (
//           <Tabs.Screen
//             name="Clients"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/booking.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Clients
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {/* Bookings Tab */}
//         {canShowBookings && (
//           <Tabs.Screen
//             name="Bookings"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/new.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Bookings
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {/* Packages Tab */}
//         {canShowPackages && (
//           <Tabs.Screen
//             name="Packages"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/Icons.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Packages
//                 </Text>
//               ),
//             }}
//           />
//         )}
//       </Tabs>
//     </SafeAreaProvider>
//   );
// }

// import { Tabs } from "expo-router"; // Import 'router' for potential redirection
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Dimensions, Image, Text, View } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// // Assume getUserData is available globally or imported from a utility file
// const getUserData = async () => {
//   // In a real app, this would fetch from AsyncStorage, context, or a global store.
//   // For demonstration, let's use a switch to simulate different user logins.
//   // Change the 'userType' to 'SUBADMIN', 'EMPLOYEE', or 'ADMIN' to test.
//   const userType = "SUBADMIN"; // <--- CHANGE THIS TO TEST DIFFERENT ROLES

//   let userData;
//   switch (userType) {
//     case "SUBADMIN":
//       userData = {
//         appAccess: { bookings: true, clients: true }, // SUBADMIN access
//         email: "test@gmail.com",
//         role: "SUBADMIN",
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IlNVQkFETUlOIiwiYWNjZXNzVG8iOnsibG9ncyI6dHJ1ZSwiY2FsbHMiOnRydWUsInN0b3JlcyI6dHJ1ZSwiYm9va2luZ3MiOnRydWUsInBhY2thZ2VzIjp0cnVlLCJhZGQtc3RvcmUiOnRydWUsImN1c3RvbWVycyI6dHJ1ZSwiZW1wbG95ZWVzIjp0cnVlfSwiaWF0IjoxNzUwMTYwMDMzLCJleHAiOjE3NTA3NjQ4MzN9.Xbg9xGHDKxUyBLW3xy8J9Ow7MRDZg8Jz5bq_ghZwg1w",
//       };
//       break;
//     case "EMPLOYEE":
//       userData = {
//         appAccess: { bookings: true }, // EMPLOYEE access
//         email: "yadavrahul888211@gmail.com",
//         role: "EMPLOYEE",
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhZGF2cmFodWw4ODgyMTFAZ21haWwuY29tIiwic3RvcmVJZCI6MiwiaWF0IjoxNzUwMTYwMDkxLCJleHAiOjE3NTA3NjQ4OTF9.-EFYJmafvpexxL0TB8KN3IfPjMi1TsLQp9HgIgP2CIk",
//       };
//       break;
//     case "ADMIN":
//     default:
//       userData = {
//         appAccess: {
//           bookings: true,
//           clients: true,
//           customers: true,
//           packages: true,
//           index: true,
//         }, // ADMIN has all explicit access
//         email: "admin@gmail.com",
//         role: "ADMIN",
//         token: "...",
//       };
//       break;
//   }

//   await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate async data fetching
//   return userData;
// };

// export default function TabsLayout() {
//   const [userData, setUserData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const data = await getUserData();
//         setUserData(data);
//       } catch (error) {
//         console.error("Failed to load user data:", error);
//         // Optionally redirect to login on data fetch error
//         // router.replace('/login');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (isLoading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#1B3170",
//         }}
//       >
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={{ color: "#fff", marginTop: 10 }}>
//           Loading user permissions...
//         </Text>
//       </View>
//     );
//   }

//   const userRole = userData?.role;
//   const appAccess = userData?.appAccess || {};

//   // Define explicit access rules for each role and tab
//   const showStoreTab = userRole === "ADMIN";
//   const showCustomersTab = userRole === "ADMIN";
//   const showClientsTab =
//     userRole === "ADMIN" ||
//     (userRole === "SUBADMIN" && appAccess.clients === true);
//   const showBookingsTab = userRole === "ADMIN" || appAccess.bookings === true;
//   const showPackagesTab = userRole === "ADMIN";

//   return (
//     <SafeAreaProvider>
//       <Tabs
//         screenOptions={{
//           tabBarStyle: {
//             height: 90,
//             position: "relative",
//             width: Dimensions.get("screen").width,
//             alignSelf: "center",
//             backgroundColor: "#1B3170",
//             borderTopWidth: 0,
//             elevation: 0,
//             shadowOpacity: 0,
//           },
//         }}
//       >
//         {/* Store Tab (index) */}
//         {showStoreTab && (
//           <Tabs.Screen
//             name="index"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/Frame.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "600", color: "white" }}
//                 >
//                   Store
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {/* Customers Tab */}
//         {showCustomersTab && (
//           <Tabs.Screen
//             name="Customers"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/clients.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Customers
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {/* Clients Tab */}
//         {showClientsTab && (
//           <Tabs.Screen
//             name="Clients"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/booking.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Clients
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {/* Bookings Tab */}
//         {showBookingsTab && (
//           <Tabs.Screen
//             name="Bookings"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/new.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Bookings
//                 </Text>
//               ),
//             }}
//           />
//         )}

//         {/* Packages Tab */}
//         {showPackagesTab && (
//           <Tabs.Screen
//             name="Packages"
//             options={{
//               headerShown: false,
//               tabBarIcon: ({ color }) => (
//                 <Image source={require("../../assets/Logo/Icons.png")} />
//               ),
//               tabBarLabel: () => (
//                 <Text
//                   style={{ fontSize: 12, fontWeight: "400", color: "white" }}
//                 >
//                   Packages
//                 </Text>
//               ),
//             }}
//           />
//         )}
//       </Tabs>
//     </SafeAreaProvider>
//   );
// }
