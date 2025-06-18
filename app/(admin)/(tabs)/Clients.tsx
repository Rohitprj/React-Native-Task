import { Colors } from "@/constants/Colors";
import { getUserData, removeUserData } from "@/utils/tokenStorage";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Customer = {
  id: number;
  name: string;
  phone: string;
  createdAt: string;
};

const CustomersScreen = () => {
  const [customersData, setCustomersData] = useState<Customer[]>([]);
  const [filteredData, setFilteredData] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await removeUserData();
    router.replace("/LoginScreen");
  };

  const [userEmail, setUserEmail] = useState<string>("");


  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://striketheball.in/api/customer/clients"
      );
      const asyncUserData = await getUserData();
      if (asyncUserData?.email) setUserEmail(asyncUserData.email);
      if (response.data?.valid && Array.isArray(response.data?.customers)) {
        setCustomersData(response.data.customers);
        setFilteredData(response.data.customers);
        setSearchTerm("");
      } else {
        console.warn(
          "API response did not contain valid 'customers' array:",
          response.data
        );
        setError("Invalid data received from server. Please try again.");
      }
    } catch (err: any) {
      console.error("Error fetching customers:", err);

      setError(
        err.message ||
        "Failed to load customers. Please check your network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const lowercased = text.toLowerCase();
    const filtered = customersData.filter(
      (item) =>
        item.name?.toLowerCase().includes(lowercased) ||
        item.phone?.includes(lowercased)
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading customers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCustomers}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Feather name="menu" size={24} color="black" />
          <Text style={styles.headerTitle}>Client</Text>
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
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLogout(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Search and Refresh */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search by name or phone"
          placeholderTextColor={Colors.STB.buttons}
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.iconButton} onPress={fetchCustomers}>
          <SimpleLineIcons name="refresh" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 2 }]}>NAME</Text>
        <Text style={[styles.columnHeader, { flex: 1 }]}>PHONE</Text>
        <Text style={[styles.columnHeader, { flex: 1 }]}>CREATED ON DATE</Text>
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.customerName, { flex: 2 }]}>{item.name}</Text>
            <Text style={[styles.customerPhone, { flex: 1 }]}>
              {item.phone}
            </Text>
            <Text style={[styles.customerDate, { flex: 1 }]}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={() =>
          !loading &&
          !error && (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No customers found.</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.STB.background,
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
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  searchInput: {
    width: "70%",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.STB.buttons,
  },
  iconButton: {
    backgroundColor: Colors.STB.buttons,
    padding: 10,
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: "row",
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
    paddingVertical: 18,
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
  },
  customerName: {
    color: Colors.STB.text,
    fontWeight: "bold",
    fontSize: 13,
  },
  customerPhone: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
  },
  customerDate: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "right",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyListText: {
    color: "#94a3b8",
    fontSize: 16,
  }, modalContent: {
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
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
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
  }, modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomersScreen;
