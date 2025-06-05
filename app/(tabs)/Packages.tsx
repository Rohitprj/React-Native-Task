import axiosInstance from "@/utils/axiosInstance";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text, // Ensure Text is imported
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// --- START: New/Modified Interfaces ---

interface PackageData {
  id: number;
  name: string;
  price: number;
  overs: number;
  description: string | null;
  title: string | null;
  validity: string;
  image: string;
  normalMachinePrice: number | null;
  roboArmPrice: number | null;
  sessionsPerMonth: number | null;
  oversPerMonth: number | null;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface PackagesApiResponse {
  valid: boolean;
  packages: PackageData[];
}

interface DisplayPackageItem {
  id: number;
  name: string;
  overs: number;
  price: number;
  mPrice: number | null;
}

async function fetchPackagesApi(): Promise<PackageData[]> {
  try {
    const response = await axiosInstance.get<PackagesApiResponse>(
      "/admin/package"
    );
    // console.log("Packages API Raw Response:", response.data); // Log for debugging

    if (response.data && Array.isArray(response.data.packages)) {
      return response.data.packages;
    } else {
      console.warn(
        "API response did not contain a 'packages' array:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
}
// --- END: API Call Utility Function ---

const PackagesScreen: React.FC = () => {
  const [packages, setPackages] = useState<DisplayPackageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiData: PackageData[] = await fetchPackagesApi();

        const mappedData: DisplayPackageItem[] = apiData.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          overs: pkg.overs,
          price: pkg.price,
          mPrice: pkg.normalMachinePrice,
        }));
        setPackages(mappedData);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
        setError("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading packages...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Entypo name="menu" size={26} color="white" />
          <Text style={styles.headerTitle}>Packages</Text>
        </View>
        <Ionicons name="person-circle-outline" size={28} color="white" />
      </View>

      {/* Search and New Button */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.newButton}>
          <Text style={{ ...styles.buttonText, color: "#1e40af" }}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
        {/* Each header text wrapped in its own View for flex control */}
        <View style={{ flex: 2 }}>
          <Text style={styles.columnHeader}>NAME</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.columnHeader}>OVERS</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.columnHeader}>PRICE</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 5 }}>
          {/* Added paddingRight */}
          <Text style={styles.columnHeader}>M PRICE</Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {/* Each data cell wrapped in its own View for flex control */}
            <View style={{ flex: 2 }}>
              <Text style={styles.packageName}>{item.name}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.packageDetail}>{item.overs}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.packageDetail}>
                ₹{item.price.toLocaleString()}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 5 }}>
              {/* Added paddingRight */}
              <Text style={styles.packageDetail}>
                {item.mPrice ? `₹${item.mPrice.toLocaleString()}` : "-"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 16,
    paddingTop: 30,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  searchInput: {
    width: "60%",
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  newButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
    paddingTop: 12,
    borderBottomColor: "#334155",
    borderBottomWidth: 1,
    marginBottom: 6,
  },
  columnHeader: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
  },
  packageName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  packageDetail: {
    color: "#cbd5e0",
    fontSize: 12,
  },
});

export default PackagesScreen;
