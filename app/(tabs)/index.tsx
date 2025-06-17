import ThreeButtons from "@/components/ThreeButtons";
import axiosInstance from "@/utils/axiosInstance";
import { getUserData, removeUserData } from "@/utils/tokenStorage";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const FULL_WIDTH_CARD_WIDTH = width - 40;

type RootStackParamList = {
  Bookings: { storeId: number; storeName: string };
  Packages: undefined;
  Customers: undefined;
  Overview: undefined;
  StoreDetails: { storeId: number; storeName: string };
};

interface StoreApiItem {
  id: number;
  name: string;
}

interface StoreListApiResponse {
  valid: boolean;
  stores: StoreApiItem[];
  message?: string;
}

const OverviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [showLogout, setShowLogout] = useState(false);
  const [stores, setStores] = useState<StoreApiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [headerStoreName, setHeaderStoreName] =
    useState<string>("Loading Stores...");

  const router = useRouter();

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
      console.log("Response", response.data);
      const asyncUserData = await getUserData();
      console.log("PersistData", asyncUserData);
      if (response.data?.valid && Array.isArray(response.data?.stores)) {
        setStores(response.data.stores);
        if (response.data.stores.length > 0) {
          setHeaderStoreName("Stores");
        } else {
          setHeaderStoreName("No Stores");
        }
      } else {
        console.warn(
          "API response for /admin/store did not contain valid data:",
          response.data
        );
        setError("Invalid store data received from server.");
        setHeaderStoreName("Error");
      }
    } catch (err: any) {
      console.error("Error fetching stores:", err);
      setError(
        err.message || "Failed to load stores. Please check your network."
      );
      setHeaderStoreName("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleStoreCardPress = (storeId: number, storeName: string) => {
    navigation.navigate("Bookings", { storeId, storeName });
  };

  const renderStoreItem: ListRenderItem<StoreApiItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.storeCard}
      onPress={() => handleStoreCardPress(item.id, item.name)}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: `https://placehold.co/360x180/ADD8E6/000000?text=${encodeURIComponent(
            item.name
          )}`,
        }}
        style={styles.storeImage}
        onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
      />
      <View style={styles.storeInfo}>
        <Text style={styles.storeName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>4.8</Text>
          <Ionicons name="star" size={16} color="#FFD700" />
        </View>
      </View>
      <Text style={styles.storeLocation} numberOfLines={1}>
        Strike The Ball Outdoor Net, near Six Flag 2.0, . . .
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

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.headerText}>{headerStoreName}</Text>
        </View>
        <TouchableOpacity
          style={styles.headerIcons}
          onPress={() => setShowLogout(!showLogout)}
        >
          <Ionicons name="person-circle-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>
      {showLogout && <Button title="Logout" onPress={handleLogout} />}
      <ThreeButtons />

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
    backgroundColor: "#0A1E44",
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
    backgroundColor: "#0A1E44",
  },
  headerText: {
    color: "#fff",
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
  },
  storeCard: {
    backgroundColor: "#11245A",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 5,
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "bold",
  },
  storeLocation: {
    color: "#cbd5e0",
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
});
