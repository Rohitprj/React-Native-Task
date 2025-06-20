// import ThreeButtons from "@/components/ThreeButtons";
// import { Colors } from "@/constants/Colors";
// import axiosInstance from "@/utils/axiosInstance";
// import { getUserData, removeUserData } from "@/utils/tokenStorage";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { DrawerNavigationProp } from "@react-navigation/drawer";
// import { useNavigation } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   Image,
//   ListRenderItem,
//   Modal,
//   Platform,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");
// const FULL_WIDTH_CARD_WIDTH = width - 40;

// interface StoreApiItem {
//   id: number;
//   name: string;
//   image?: string;
// }

// interface StoreListApiResponse {
//   valid: boolean;
//   stores: StoreApiItem[];
//   message?: string;
// }

// const OverviewScreen: React.FC = () => {
//   const navigation = useNavigation<DrawerNavigationProp<any>>();
//   const router = useRouter();

//   const [showLogout, setShowLogout] = useState(false);
//   const [userEmail, setUserEmail] = useState<string>("");
//   const [stores, setStores] = useState<StoreApiItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [headerStoreName, setHeaderStoreName] = useState("Loading Stores...");

//   const handleLogout = async () => {
//     await removeUserData();
//     router.replace("/LoginScreen");
//   };

//   const fetchStores = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.get<StoreListApiResponse>(
//         "/admin/store"
//       );
//       console.log("Store", stores);
//       const asyncUserData = await getUserData();
//       if (asyncUserData?.email) setUserEmail(asyncUserData.email);

//       if (response.data?.valid && Array.isArray(response.data?.stores)) {
//         const imageMap: Record<number, string> = {
//           1: "https://striketheball.in/Public/gallery/110.jpg",
//           2: "https://striketheball.in/Public/gallery/93.jpg",
//           3: "https://striketheball.in/Public/gallery/10A.jpg",
//           4: "https://striketheball.in/Public/gallery/sector57.jpeg",
//           5: "https://striketheball.in/Public/gallery/1072.jpg",
//           6: "https://striketheball.in/Public/gallery/sec107.jpeg",
//         };

//         const enhancedStores = response.data.stores.map((store) => ({
//           ...store,
//           image:
//             imageMap[store.id] ??
//             `https://placehold.co/360x180/ADD8E6/000000?text=${encodeURIComponent(
//               store.name
//             )}`,
//         }));

//         setStores(enhancedStores);
//         setHeaderStoreName(enhancedStores.length > 0 ? "Stores" : "No Stores");
//       } else {
//         setError("Invalid store data received from server.");
//         setHeaderStoreName("Error");
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to load stores.");
//       setHeaderStoreName("Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStores();
//   }, []);

//   const handleStoreCardPress = (storeId: number, storeName: string) => {
//     router.push({ pathname: "/Bookings", params: { storeId, storeName } });
//   };

//   const renderStoreItem: ListRenderItem<StoreApiItem> = ({ item }) => (
//     <TouchableOpacity
//       style={styles.storeCard}
//       onPress={() => handleStoreCardPress(item.id, item.name)}
//       activeOpacity={0.8}
//     >
//       <Image
//         source={{ uri: item.image }}
//         style={styles.storeImage}
//         onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
//       />
//       <View style={styles.storeInfo}>
//         <Text style={styles.storeName} numberOfLines={1}>
//           {item.name}
//         </Text>
//         <View style={styles.ratingContainer}>
//           <Text style={styles.ratingText}>4.8</Text>
//           <Ionicons name="star" size={12} color="#FFD700" />
//         </View>
//       </View>
//       <Text style={styles.storeLocation} numberOfLines={1}>
//         Strike The Ball Outdoor Net, near Six Flag 2.0, . . .
//       </Text>
//       <TouchableOpacity
//         style={styles.bookingsButton}
//         onPress={() => handleStoreCardPress(item.id, item.name)}
//       >
//         <Text style={styles.bookingsButtonText}>BOOKINGS</Text>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#8358EB" />
//         <Text style={styles.loadingText}>Loading Stores...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchStores}>
//           <Text style={styles.buttonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor="transparent"
//         translucent
//       />

//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.openDrawer()}
//           style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
//         >
//           <Feather name="menu" size={24} color="black" />
//           <Text style={styles.headerText}>{headerStoreName}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.headerIcons}
//           onPress={() => setShowLogout(true)}
//         >
//           <Ionicons name="person-circle-outline" size={26} color="black" />
//         </TouchableOpacity>
//       </View>

//       <Modal visible={showLogout} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalEmail}>{userEmail}</Text>
//             <TouchableOpacity
//               style={styles.logoutButton}
//               onPress={handleLogout}
//             >
//               <Text style={styles.logoutButtonText}>Logout</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setShowLogout(false)}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <ThreeButtons />

//       <FlatList
//         data={stores}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderStoreItem}
//         contentContainerStyle={styles.storeListContent}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={() =>
//           !loading && !error && stores.length === 0 ? (
//             <View style={styles.emptyListContainer}>
//               <Text style={styles.emptyListText}>No stores found.</Text>
//             </View>
//           ) : null
//         }
//       />
//     </View>
//   );
// };
// export default OverviewScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.STB.background,
//   },
//   centerContent: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     color: "#fff",
//     marginTop: 10,
//     fontSize: 16,
//   },
//   errorText: {
//     color: "#ef4444",
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   retryButton: {
//     backgroundColor: "#3b82f6",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 13,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop:
//       Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 10 : 50,
//     // paddingBottom: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#edeae4",
//   },
//   headerText: {
//     color: "black",
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   headerIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   storeListContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   storeCard: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     overflow: "hidden",
//     marginBottom: 20,
//     width: FULL_WIDTH_CARD_WIDTH,
//     alignSelf: "center",
//   },
//   storeImage: {
//     width: "100%",
//     height: 180,
//     resizeMode: "cover",
//   },
//   storeInfo: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingTop: 10,
//   },
//   storeName: {
//     color: "black",
//     fontSize: 18,
//     fontWeight: "bold",
//     flex: 1,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0C2647",
//     borderRadius: 5,
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     gap: 5,
//   },
//   ratingText: {
//     color: "#FFD700",
//     fontSize: 12,
//     marginLeft: 4,
//     fontWeight: "bold",
//   },
//   storeLocation: {
//     color: "lightgrey",
//     fontSize: 13,
//     paddingHorizontal: 15,
//     marginTop: 5,
//     marginBottom: 10,
//   },
//   bookingsButton: {
//     backgroundColor: "#ffffff",
//     paddingVertical: 12,
//     marginHorizontal: 15,
//     marginBottom: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     borderColor: "#35A494",
//     borderWidth: 2,
//   },
//   bookingsButtonText: {
//     color: "#35A494",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   emptyListContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 50,
//   },
//   emptyListText: {
//     color: "#94a3b8",
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//   },
//   modalEmail: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 20,
//     color: "#333",
//   },
//   logoutButton: {
//     backgroundColor: "#ef4444",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   logoutButtonText: {
//     color: "white",
//     fontWeight: "600",
//   },
//   cancelText: {
//     color: "#555",
//     marginTop: 5,
//   },
// });

import { Colors } from "@/constants/Colors";
import axiosInstance from "@/utils/axiosInstance";
import { getUserData, removeUserData } from "@/utils/tokenStorage";
import { Feather, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const FULL_WIDTH_CARD_WIDTH = width - 40;

interface StoreApiItem {
  id: number;
  name: string;
  image?: string;
  location?: string; // Added location property
}

interface StoreListApiResponse {
  valid: boolean;
  stores: StoreApiItem[];
  message?: string;
}

const OverviewScreen: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const router = useRouter();

  const [showLogout, setShowLogout] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [stores, setStores] = useState<StoreApiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [headerStoreName, setHeaderStoreName] = useState("Loading Stores...");

  const handleLogout = async () => {
    await removeUserData();
    router.replace("/LoginScreen");
  };

  const fetchStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<StoreListApiResponse>(
        "/admin/store"
      );
      console.log("Store", response.data);
      const asyncUserData = await getUserData();
      if (asyncUserData?.email) setUserEmail(asyncUserData.email);

      if (response.data?.valid && Array.isArray(response.data?.stores)) {
        const imageMap: Record<number, string> = {
          1: "https://striketheball.in/Public/gallery/110.jpg",
          2: "https://striketheball.in/Public/gallery/93.jpg",
          3: "https://striketheball.in/Public/gallery/10A.jpg",
          4: "https://striketheball.in/Public/gallery/sector57.jpeg",
          5: "https://striketheball.in/Public/gallery/1072.jpg",
          6: "https://striketheball.in/Public/gallery/sec107.jpeg",
        };

        const enhancedStores = response.data.stores.map((store) => ({
          ...store,
          image:
            imageMap[store.id] ??
            `https://placehold.co/360x180/ADD8E6/000000?text=${encodeURIComponent(
              store.name
            )}`,
          location: "Strike The Ball Outdoor Net, near Six Flag 2.0, . . .", // Default location for fetched stores
        }));

        // Add static data cards
        const staticStores: StoreApiItem[] = [
          {
            id: 1001, // Unique ID for static data
            name: "Strike The Ball | Actual Turf",
            image: "https://striketheball.in/Public/gallery/1072.jpg",
            location: "SECTOR 107",
          },
          {
            id: 1002, // Unique ID for static data
            name: "Strike The Ball | Actual Turf",
            image: "https://striketheball.in/Public/gallery/sec107.jpeg",
            location: "SECTOR 107",
          },
        ];

        // Combine fetched stores with static stores
        const combinedStores = [...enhancedStores, ...staticStores];

        setStores(combinedStores);
        setHeaderStoreName(combinedStores.length > 0 ? "Stores" : "No Stores");
      } else {
        setError("Invalid store data received from server.");
        setHeaderStoreName("Error");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load stores.");
      setHeaderStoreName("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleStoreCardPress = (storeId: number, storeName: string) => {
    router.push({ pathname: "/Bookings", params: { storeId, storeName } });
  };

  const renderStoreItem: ListRenderItem<StoreApiItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.storeCard}
      onPress={() => handleStoreCardPress(item.id, item.name)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.storeImage}
        onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
      />
      <View style={styles.storeInfo}>
        <Text style={styles.storeName} numberOfLines={1}>
          {item.name}
        </Text>
        {/* <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>4.8</Text>
          <Ionicons name="star" size={12} color="#FFD700" />
        </View> */}
      </View>
      <Text style={styles.storeLocation} numberOfLines={1}>
        {item.location}
      </Text>
      <TouchableOpacity
        style={styles.bookingsButton}
        onPress={() => handleStoreCardPress(item.id, item.name)}
      >
        <Text style={styles.bookingsButtonText}>BOOKINGS</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#8358EB" />
        <Text style={styles.loadingText}>Loading Stores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchStores}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Feather name="menu" size={24} color="black" />
          <Text style={styles.headerText}>{headerStoreName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerIcons}
          onPress={() => setShowLogout(true)}
        >
          <Ionicons name="person-circle-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <Modal visible={showLogout} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmail}>{userEmail}</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLogout(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <ThreeButtons /> */}

      <FlatList
        data={stores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStoreItem}
        contentContainerStyle={styles.storeListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          !loading && !error && stores.length === 0 ? (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No stores found.</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
export default OverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.STB.background,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 10 : 50,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#edeae4",
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
  storeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    width: FULL_WIDTH_CARD_WIDTH,
    alignSelf: "center",
  },
  storeImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  storeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  storeName: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C2647",
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 5,
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "bold",
  },
  storeLocation: {
    color: "lightgrey",
    fontSize: 13,
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  bookingsButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "#35A494",
    borderWidth: 2,
  },
  bookingsButtonText: {
    color: "#35A494",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyListText: {
    color: "#94a3b8",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalEmail: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "600",
  },
  cancelText: {
    color: "#555",
    marginTop: 5,
  },
});
