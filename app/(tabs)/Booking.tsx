import { fetchBookingsApi } from "@/utils/bookingApi";
import { BookingData, DisplayBookingItem } from "@/utils/types/bookingTypes";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import Icon from "react-native-vector-icons/Feather";

// Get screen width once outside the component to avoid recalculations
const screenWidth = Dimensions.get("window").width;
const modalCalculatedWidth = screenWidth * 0.9; // Calculate 90% of screen width

const BookingsScreen = () => {
  const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewBookingForm, setShowNewBookingForm] = useState<boolean>(false);
  const [newBookingData, setNewBookingData] = useState({
    bookingType: "Package",
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    overs: "",
    packageId: "",
    price: "",
    storeId: "",
  });

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiData: BookingData[] = await fetchBookingsApi();

        const mappedData: DisplayBookingItem[] = apiData.map((booking) => ({
          id: booking.id,
          name: booking.customer.name,
          store: booking.store.name,
          status: booking.paid ? "PAID" : "UNPAID",
        }));
        setBookings(mappedData);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleAddNewBooking = () => {
    // You would typically send this data to your API
    console.log("New Booking Data:", newBookingData);
    // Reset form and hide it
    setNewBookingData({
      bookingType: "Package",
      customerEmail: "",
      customerName: "",
      customerPhone: "",
      overs: "",
      packageId: "",
      price: "",
      storeId: "",
    });
    setShowNewBookingForm(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading bookings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            /* Implement retry logic here */
          }}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Bookings</Text>
        </View>
        <Ionicons name="person-circle-outline" size={28} color="white" />
      </View>

      {/* Search and Action Buttons */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.buttonText}>Existing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => setShowNewBookingForm(true)}
        >
          <Text style={styles.buttonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 0.8 }]}>CUSTOMER</Text>
        <Text style={[styles.columnHeader, { flex: 1 }]}>STORE</Text>
        <Text style={[styles.columnHeader, { flex: 0.5, textAlign: "right" }]}>
          ACTIONS
        </Text>
      </View>

      {/* Booking List */}
      <FlatList
        data={bookings}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text
                style={item.status === "PAID" ? styles.paid : styles.unpaid}
              >
                {item.status}
              </Text>
            </View>
            <Text style={styles.storeText}>{item.store}</Text>
            <TouchableOpacity style={{ flex: 0.5, alignItems: "flex-end" }}>
              <Icon name="edit-3" size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* New Booking Form Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNewBookingForm}
        onRequestClose={() => setShowNewBookingForm(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.formScrollContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Add New Booking</Text>

              {/* Booking Type (Read-only as per your initial data) */}
              <Text style={styles.inputLabel}>Booking Type</Text>
              <TextInput
                style={styles.formInput}
                value={newBookingData.bookingType}
                onChangeText={(text) =>
                  setNewBookingData({ ...newBookingData, bookingType: text })
                }
                placeholderTextColor="#94a3b8"
                editable={false} // This field is static ("Package")
              />

              <Text style={styles.inputLabel}>Customer Name</Text>
              <TextInput
                style={styles.formInput}
                value={newBookingData.customerName}
                onChangeText={(text) =>
                  setNewBookingData({ ...newBookingData, customerName: text })
                }
                placeholder="Enter customer name"
                placeholderTextColor="#94a3b8"
              />

              <Text style={styles.inputLabel}>Customer Email</Text>
              <TextInput
                style={styles.formInput}
                value={newBookingData.customerEmail}
                onChangeText={(text) =>
                  setNewBookingData({ ...newBookingData, customerEmail: text })
                }
                placeholder="Enter customer email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#94a3b8"
              />

              <Text style={styles.inputLabel}>Customer Phone</Text>
              <TextInput
                style={styles.formInput}
                value={newBookingData.customerPhone}
                onChangeText={(text) =>
                  setNewBookingData({ ...newBookingData, customerPhone: text })
                }
                placeholder="Enter customer phone"
                keyboardType="phone-pad"
                placeholderTextColor="#94a3b8"
              />

              <Text style={styles.inputLabel}>Package ID</Text>
              <TextInput
                style={styles.formInput}
                value={newBookingData.packageId}
                onChangeText={(text) =>
                  setNewBookingData({ ...newBookingData, packageId: text })
                }
                placeholder="Enter package ID (e.g., 17)"
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />

              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.formInput}
                value={newBookingData.price}
                onChangeText={(text) =>
                  setNewBookingData({ ...newBookingData, price: text })
                }
                placeholder="Enter price"
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />

              <Text style={styles.inputLabel}>Overs</Text>
              <TextInput
                style={styles.formInput}
                value={newBookingData.overs}
                onChangeText={(text) =>
                  setNewBookingData({ ...newBookingData, overs: text })
                }
                placeholder="Enter number of overs"
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />

              <Text style={styles.inputLabel}>Store ID</Text>
              <TextInput
                style={styles.formInput}
                value={newBookingData.storeId}
                onChangeText={(text) =>
                  setNewBookingData({ ...newBookingData, storeId: text })
                }
                placeholder="Enter store ID (e.g., 1)"
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleAddNewBooking}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowNewBookingForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  filterRow: {
    flexDirection: "row",
  },
  filterBtn: {
    backgroundColor: "#374151",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginRight: 10,
    height: 30,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  filterText: {
    color: "#fff",
    fontSize: 13,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  smallButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#0f172a",
    fontSize: 13,
    fontWeight: "600",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomColor: "#334155",
    borderBottomWidth: 1,
    marginBottom: 6,
  },
  columnHeader: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  customerName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  paid: {
    color: "#10b981",
    fontSize: 12,
  },
  unpaid: {
    color: "#ef4444",
    fontSize: 12,
  },
  storeText: {
    color: "#cbd5e0",
    fontSize: 12,
    flex: 1,
    marginHorizontal: 5,
  },
  // --- Modal Styles (Replicated from PackagesScreen) ---
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  formScrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%", // Ensure this wrapper takes full width available
    paddingVertical: 20,
  },
  formContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 10,
    padding: 20,
    width: modalCalculatedWidth, // Using the calculated 90% width
    alignSelf: "center",
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    color: "#cbd5e0",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },
  formInput: {
    backgroundColor: "#0f172a",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50, // Matched height of Packages input
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  formActions: {
    flexDirection: "column", // Stack buttons vertically
    marginTop: 20,
    gap: 10, // Space between buttons
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 15, // Matched padding of Packages submit
    borderRadius: 8,
    alignItems: "center",
  },
  // This style is not used for BookingsScreen, but keeping for consistency if a disabled state is needed
  submitButtonDisabled: {
    backgroundColor: "#60a5fa",
  },
  cancelButton: {
    backgroundColor: "transparent", // Matching Packages cancel button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#94a3b8", // Matching Packages cancel button
  },
  cancelButtonText: {
    color: "#94a3b8", // Matching Packages cancel button
    fontWeight: "600",
    fontSize: 16,
  },
});

export default BookingsScreen;
