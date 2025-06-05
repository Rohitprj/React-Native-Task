import {
  AntDesign,
  Feather,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const customersData = new Array(10).fill({
  name: "ANTIKA MISHRA",
  phone: "9963455787",
  date: "2025-06-02",
  status: "UNPAID",
});
customersData[0].status = "PAID";

const CustomersScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* <Entypo name="menu" size={26} color="white" /> */}
          <Text style={styles.headerTitle}>Customers</Text>
        </View>
        <Ionicons name="person-circle-outline" size={28} color="white" />
      </View>

      {/* Top Buttons */}
      <View style={styles.topRow}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={{ ...styles.sampleButton, flexDirection: "row", gap: 8 }}
          >
            <Feather name="download" size={16} color="white" />
            <Text style={styles.buttonText}>Sample</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.newButton}>
          <Text style={{ ...styles.buttonText, color: "#1e40af" }}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Filters Row */}

      <View style={{}}>
        <FlatList
          data={["Today's Callback", "Select Storage", "Select Source"]}
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

      {/* Search and Download */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="download-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <SimpleLineIcons name="refresh" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>NAME</Text>
        <Text style={styles.columnHeader}>PHONE</Text>
        <Text style={styles.columnHeader}>CREATED ON DATE</Text>
      </View>

      {/* List */}
      <FlatList
        data={customersData}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
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
            <Text style={styles.customerPhone}>{item.phone}</Text>
            <Text style={styles.customerDate}>{item.date}</Text>
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
  topRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  sampleButton: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
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
  uploadButton: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
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
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  filterDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  filterText: {
    color: "#fff",
    fontSize: 13,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  searchInput: {
    // flex: 1,
    width: "50%",
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  iconButton: {
    backgroundColor: "#1e40af",
    padding: 10,
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
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
    paddingVertical: 14,
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
  },
  customerName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  paid: {
    color: "#10b981",
    fontSize: 12,
  },
  unpaid: {
    color: "#ef4444",
    fontSize: 12,
  },
  customerPhone: {
    color: "#cbd5e0",
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  customerDate: {
    color: "#cbd5e0",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
  },
});

export default CustomersScreen;
