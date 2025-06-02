import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 25;

const data = new Array(30).fill(null).map((_, index) => ({
  id: index.toString(),
  count: 4,
  label: "Total Employees",
}));

const OverviewScreen = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardCount}>{item.count}</Text>
      <Text style={styles.cardLabel}>{item.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1E44" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Overview</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="filter" size={22} color="white" style={styles.icon} />
          <Ionicons name="person-circle-outline" size={26} color="white" />
        </View>
      </View>

      {/* Cards */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { name: "Overview", icon: "grid-outline" },
          { name: "Customers", icon: "people-outline" },
          { name: "Clients", icon: "briefcase-outline" },
          { name: "Bookings", icon: "calendar-outline" },
          { name: "Finance", icon: "cash-outline" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            <Ionicons name={item.icon as any} size={22} color="#fff" />
            <Text style={styles.navText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A1E44",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  icon: {
    marginRight: 15,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#11245A",
    margin: 8,
    width: CARD_WIDTH,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  cardCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardLabel: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#11245A",
    paddingVertical: 10,
    borderTopWidth: 0.3,
    borderTopColor: "#444",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 11,
    color: "#fff",
    marginTop: 2,
  },
});
