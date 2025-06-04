import { fetchBookingsApi } from "@/utils/bookingApi";
import { BookingData, DisplayBookingItem } from "@/utils/types/bookingTypes";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const BookingsScreen = () => {
  const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        // apiData will now correctly be BookingData[] directly
        const apiData: BookingData[] = await fetchBookingsApi(); 
        
        // Map the raw API data to the format your FlatList expects
        const mappedData: DisplayBookingItem[] = apiData.map((booking) => ({
          id: booking.id,
          name: booking.customer.name,
          store: booking.store.name,
          // Determine status based on 'paid' field or 'status' if preferred
          // From your screenshot, 'PAID' or 'UNPAID' is shown.
          // Using 'paid' boolean is more direct for this, but if your API 'status' field
          // also maps directly to "PAID"/"UNPAID" then that could be used.
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
  }, []); // Empty dependency array means this runs once on component mount

  // --- START: Loading and Error States ---
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
        <TouchableOpacity style={styles.retryButton} onPress={() => { /* Implement retry logic here */ }}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // --- END: Loading and Error States ---

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Entypo name="menu" size={26} color="white" />
          <Text style={styles.headerTitle}>Bookings</Text>
        </View>
        <Ionicons name="person-circle-outline" size={28} color="white" />
      </View>

      {/* Filters */}
      <View style={{ marginBottom: 16 }}>
        <FlatList
          data={["All Stores", "Status", "Paid Status", "Customer"]}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterText}>{item}</Text>
              <AntDesign name="down" size={14} color="white" />
            </TouchableOpacity>
          )}
        />
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
        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.buttonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 0.8 }]}>CUSTOMER</Text>
        <Text style={[styles.columnHeader, { flex: 1 }]}>STORE</Text>
        <Text style={[styles.columnHeader, { flex: 0.5, textAlign: 'right' }]}>ACTIONS</Text>
      </View>

      {/* Booking List */}
      <FlatList
        data={bookings} // Use the fetched and mapped bookings data
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()} // Use a unique ID from your API
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
            <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end' }}>
              <Icon name="edit-3" size={20} color="#3b82f6" />
            </TouchableOpacity>
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
    alignItems: 'center', // Align items vertically in the row
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
    flex: 1, // Allow store text to take available space
    marginHorizontal: 5,
  },
});

export default BookingsScreen;