import axiosInstance from "@/utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// --- START: Existing Interfaces ---
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
// --- END: Existing Interfaces ---

// --- START: New Interface for New Package Form Data ---
interface NewPackageFormData {
  name: string;
  price: string;
  overs: string;
  sessionsPerMonth: string;
  oversPerMonth: string;
  type: string;
  validity: string;
}
// --- END: New Interface for New Package Form Data ---

async function fetchPackagesApi(): Promise<PackageData[]> {
  try {
    const response = await axiosInstance.get<PackagesApiResponse>(
      "/admin/package"
    );
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

async function createPackageApi(
  packageData: NewPackageFormData
): Promise<PackageData> {
  const payload = {
    ...packageData,
    price: Number(packageData.price),
    overs: Number(packageData.overs),
    sessionsPerMonth: Number(packageData.sessionsPerMonth),
    oversPerMonth: Number(packageData.oversPerMonth),
  };

  try {
    const response = await axiosInstance.post<PackageData>(
      "/admin/package",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
}

// Get screen width once outside the component to avoid recalculations if screen size doesn't change
const screenWidth = Dimensions.get("window").width;
const modalWidth = screenWidth * 0.9; // Calculate 90% of screen width

const PackagesScreen: React.FC = () => {
  const [packages, setPackages] = useState<DisplayPackageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [newPackageForm, setNewPackageForm] = useState<NewPackageFormData>({
    name: "",
    price: "",
    overs: "",
    sessionsPerMonth: "",
    oversPerMonth: "",
    type: "SUBSCRIPTION",
    validity: "1 month",
  });

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

  useEffect(() => {
    loadPackages();
  }, []);

  const handleInputChange = (
    field: keyof NewPackageFormData,
    value: string
  ) => {
    setNewPackageForm({ ...newPackageForm, [field]: value });
  };

  const handleSubmitNewPackage = async () => {
    if (
      !newPackageForm.name ||
      !newPackageForm.price ||
      !newPackageForm.overs ||
      !newPackageForm.sessionsPerMonth ||
      !newPackageForm.oversPerMonth ||
      !newPackageForm.type ||
      !newPackageForm.validity
    ) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    if (
      isNaN(Number(newPackageForm.price)) ||
      isNaN(Number(newPackageForm.overs)) ||
      isNaN(Number(newPackageForm.sessionsPerMonth)) ||
      isNaN(Number(newPackageForm.oversPerMonth))
    ) {
      Alert.alert(
        "Error",
        "Price, Overs, Sessions, and Overs per Month must be numbers."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await createPackageApi(newPackageForm);
      Alert.alert("Success", "Package created successfully!");
      setIsModalVisible(false);
      setNewPackageForm({
        name: "",
        price: "",
        overs: "",
        sessionsPerMonth: "",
        oversPerMonth: "",
        type: "SUBSCRIPTION",
        validity: "1 month",
      });
      loadPackages();
    } catch (err) {
      Alert.alert("Error", "Failed to create package. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* <Entypo name="menu" size={26} color="white" /> */}
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
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={{ ...styles.buttonText, color: "#1e40af" }}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
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
              <Text style={styles.packageDetail}>
                {item.mPrice ? `₹${item.mPrice.toLocaleString()}` : "-"}
              </Text>
            </View>
          </View>
        )}
      />

      {/* New Package Form Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <ScrollView contentContainerStyle={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Package</Text>

              {/* Form Fields */}
              <TextInput
                style={styles.input}
                placeholder="Package Name"
                placeholderTextColor="#94a3b8"
                value={newPackageForm.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={newPackageForm.price}
                onChangeText={(text) => handleInputChange("price", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Overs"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={newPackageForm.overs}
                onChangeText={(text) => handleInputChange("overs", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Sessions Per Month"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={newPackageForm.sessionsPerMonth}
                onChangeText={(text) =>
                  handleInputChange("sessionsPerMonth", text)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Overs Per Month"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={newPackageForm.oversPerMonth}
                onChangeText={(text) =>
                  handleInputChange("oversPerMonth", text)
                }
              />
              {/* For 'type' and 'validity', consider using Picker/Dropdown for better UX */}
              <TextInput
                style={styles.input}
                placeholder="Type (e.g., SUBSCRIPTION)"
                placeholderTextColor="#94a3b8"
                value={newPackageForm.type}
                onChangeText={(text) => handleInputChange("type", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Validity (e.g., 1 month)"
                placeholderTextColor="#94a3b8"
                value={newPackageForm.validity}
                onChangeText={(text) => handleInputChange("validity", text)}
              />

              {/* Submit and Cancel Buttons */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  isSubmitting && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitNewPackage}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
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
  // --- Modal Styles ---
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContentWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%", // Ensure this wrapper takes full width available
    paddingVertical: 20,
  },
  modalContent: {
    backgroundColor: "#1e293b",
    borderRadius: 10,
    padding: 20,
    width: modalWidth, // Use the calculated width here
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0f172a",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#60a5fa",
  },
  cancelButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#94a3b8",
  },
  cancelButtonText: {
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default PackagesScreen;
