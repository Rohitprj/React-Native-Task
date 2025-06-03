import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const bookingsData = [
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "PAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
  {
    name: "ANTIKA MISHRA",
    store: "Strike The Ball - Sector 93",
    status: "UNPAID",
  },
];

const BookingsScreen = () => {
  return (
    <View style={styles.container}>
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
        <Text style={styles.columnHeader}>CUSTOMER</Text>
        <Text style={styles.columnHeader}>STORE</Text>
        <Text style={styles.columnHeader}>ACTIONS</Text>
      </View>

      {/* Booking List */}
      <FlatList
        data={bookingsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text
                style={item.status === "PAID" ? styles.paid : styles.unpaid}
              >
                {item.status}
              </Text>
            </View>
            <Text style={styles.storeText}>{item.store}</Text>
            <TouchableOpacity>
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
});

export default BookingsScreen;
