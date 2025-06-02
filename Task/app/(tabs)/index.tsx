import ThreeButtons from "@/components/ThreeButtons";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
      <View style={{ flexDirection: "row", gap: 4 }}>
        <MaterialCommunityIcons name="purse" size={18} color="#8358EB" />
        <Text style={styles.cardLabel}>{item.label}</Text>
      </View>
      <View style={{}}>
        <Text style={styles.cardCount}>{item.count}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Entypo name="menu" size={28} color="white" style={styles.icon} />
          <Text style={styles.headerText}>Overview</Text>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="person-circle-outline" size={26} color="white" />
        </View>
      </View>
      <ThreeButtons />
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
      {/* <View style={styles.bottomNav}>
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
      </View> */}
    </View>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A1E44",
    height: "100%",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    // backgroundColor: "red",
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
    paddingHorizontal: 20,
    gap: 6,
    // alignItems: "center",
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
