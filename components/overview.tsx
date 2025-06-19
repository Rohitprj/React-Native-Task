// import ThreeButtons from "@/components/ThreeButtons";
// import overview from "@/utils/overview";
// import {
//   CardItem,
//   DashboardData,
//   LeadSource,
//   LeadStage,
//   Revenue,
// } from "@/utils/types/overviewTypes";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   ListRenderItem,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity, // Import TouchableOpacity
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width / 2 - 25;

// type RootStackParamList = {
//   Bookings: undefined;
//   Packages: undefined;
//   Customers: undefined;
//   Overview: undefined;
// };

// const OverviewScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async (): Promise<void> => {
//     try {
//       const data: DashboardData = await overview();
//       console.log("Dashboard Data", data);
//       setDashboardData(data);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       setDashboardData({
//         valid: true,
//         stores: 4,
//         employees: 4,
//         bookings: 621,
//         packages: 8,
//         customers: 3091,
//         todayLeads: 3,
//         monthLeads: 2655,
//         sources: [
//           {
//             name: "WhatsApp",
//             leadsCount: 1706,
//           },
//           {
//             name: "IVR",
//             leadsCount: 4,
//           },
//           {
//             name: "Walk In",
//             leadsCount: 1,
//           },
//         ],
//         stages: [
//           {
//             name: "Converted",
//             leadsCount: 2,
//           },
//           {
//             name: "New",
//             leadsCount: 1723,
//           },
//           {
//             name: "Promising",
//             leadsCount: 2,
//           },
//           {
//             name: "Appointment Scheduled",
//             leadsCount: 8,
//           },
//           {
//             name: "Booking confirmed",
//             leadsCount: 0,
//           },
//           {
//             name: "Not Interested",
//             leadsCount: 266,
//           },
//           {
//             name: "Completed",
//             leadsCount: 1,
//           },
//           {
//             name: "Contacted",
//             leadsCount: 233,
//           },
//           {
//             name: "Others",
//             leadsCount: 2641,
//           },
//           {
//             name: "Interested",
//             leadsCount: 214,
//           },
//           {
//             name: "Followed up",
//             leadsCount: 26,
//           },
//           {
//             name: "Open",
//             leadsCount: 168,
//           },
//           {
//             name: "non intersted",
//             leadsCount: 12,
//           },
//           {
//             name: "no answer",
//             leadsCount: 18,
//           },
//           {
//             name: "ringing",
//             leadsCount: 21,
//           },
//           {
//             name: "Will Visit",
//             leadsCount: 38,
//           },
//           {
//             name: "intersted",
//             leadsCount: 52,
//           },
//           {
//             name: "stays too far",
//             leadsCount: 25,
//           },
//           {
//             name: "location and our details",
//             leadsCount: 4,
//           },
//           {
//             name: "Sale closed",
//             leadsCount: 5,
//           },
//           {
//             name: "call back",
//             leadsCount: 40,
//           },
//           {
//             name: "Cricheroes",
//             leadsCount: 11,
//           },
//           {
//             name: "appointment schedule",
//             leadsCount: 6,
//           },
//         ],
//         todayFollowUps: 0,
//         revenue: [
//           {
//             storeId: 1,
//             storeName: "Strike The Ball - Palam Vihar",
//             total: 1346664,
//             month: 1346664,
//           },
//           {
//             storeId: 2,
//             storeName: "Strike The Ball - Sector 93",
//             total: 1396136,
//             month: 1396136,
//           },
//           {
//             storeId: 3,
//             storeName: "Strike The Ball - Sector 107",
//             total: 1000,
//             month: 1000,
//           },
//           {
//             storeId: 5,
//             storeName: "Strike The Ball 10A",
//             total: 100500,
//             month: 100500,
//           },
//         ],
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCardIcon = (
//     label: string
//   ): keyof typeof MaterialCommunityIcons.glyphMap => {
//     const iconMap: Record<
//       string,
//       keyof typeof MaterialCommunityIcons.glyphMap
//     > = {
//       "Total Bookings": "calendar-check",
//       "Total Packages": "package-variant",
//       "Total Stores": "store",
//       "Total Employees": "account-group",
//       "Total Customers": "account-multiple",
//       "Today Leads": "trending-up",
//       "Month Leads": "chart-line",
//       "Today CallBacks": "phone-incoming",
//       WhatsApp: "whatsapp",
//       IVR: "phone",
//       "Walk In": "walk",
//       Converted: "check-circle",
//       New: "new-box",
//       Promising: "star",
//       "Appointment Scheduled": "calendar-clock",
//       "Booking confirmed": "calendar-check",
//       "Not Interested": "close-circle",
//       Completed: "check-all",
//       Contacted: "phone-check",
//       Others: "dots-horizontal",
//       Interested: "heart",
//       "Followed up": "account-check",
//       Open: "folder-open",
//       "non intersted": "emoticon-sad-outline",
//       "no answer": "phone-hangup",
//       ringing: "phone-ring",
//       "Will Visit": "car",
//       intersted: "emoticon-happy-outline",
//       "stays too far": "map-marker-off",
//       "location and our details": "map-marker-check",
//       "Sale closed": "handshake",
//       "call back": "phone-return",
//       Cricheroes: "cricket",
//       "appointment schedule": "calendar-plus",
//     };

//     return iconMap[label] || "chart-box-outline";
//   };

//   const handleCardPress = (item: CardItem) => {
//     switch (item.label) {
//       case "Total Bookings":
//         navigation.navigate("Bookings");
//         break;
//       case "Total Packages":
//         navigation.navigate("Packages");
//         break;
//       case "Total Customers":
//         navigation.navigate("Customers");
//         break;
//       default:
//         console.log(
//           `Clicked on ${item.label} (No navigation implemented for this item)`
//         );
//         break;
//     }
//   };

//   // Prepare data for FlatList
//   const prepareCardData = (): CardItem[] => {
//     if (!dashboardData) return [];

//     const cards: CardItem[] = [
//       // Main metrics
//       { id: "1", count: dashboardData.bookings, label: "Total Bookings" },
//       { id: "2", count: dashboardData.packages, label: "Total Packages" },
//       { id: "3", count: dashboardData.stores, label: "Total Stores" },
//       { id: "4", count: dashboardData.employees, label: "Total Employees" },
//       { id: "5", count: dashboardData.customers, label: "Total Customers" },
//       { id: "6", count: dashboardData.todayLeads, label: "Today Leads" },
//       { id: "7", count: dashboardData.monthLeads, label: "Month Leads" },
//       {
//         id: "8",
//         count: dashboardData.todayFollowUps,
//         label: "Today CallBacks",
//       },
//     ];

//     dashboardData.sources.forEach((source: LeadSource, index: number) => {
//       cards.push({
//         id: `source_${index}`,
//         count: source.leadsCount,
//         label: source.name,
//       });
//     });

//     dashboardData.stages
//       .filter((stage: LeadStage) => stage.leadsCount > 0)
//       .forEach((stage: LeadStage, index: number) => {
//         cards.push({
//           id: `stage_${index}`,
//           count: stage.leadsCount,
//           label: stage.name,
//         });
//       });

//     // Add revenue data
//     dashboardData.revenue.forEach((store: Revenue, index: number) => {
//       cards.push({
//         id: `revenue_${index}`,
//         count: store.month.toLocaleString(),
//         label: store.storeName.replace("Strike The Ball - ", ""),
//         isRevenue: true,
//       });
//     });

//     return cards;
//   };

//   const renderItem: ListRenderItem<CardItem> = ({ item }) => {
//     const isNavigable =
//       item.label === "Total Bookings" ||
//       item.label === "Total Packages" ||
//       item.label === "Total Customers";

//     const CardContent = (
//       <View style={styles.card}>
//         <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
//           <MaterialCommunityIcons
//             name={getCardIcon(item.label)}
//             size={18}
//             color={item.isRevenue ? "#4CAF50" : "#8358EB"}
//           />
//           <Text style={styles.cardLabel} numberOfLines={2}>
//             {item.label}
//           </Text>
//         </View>
//         <View>
//           <Text
//             style={[styles.cardCount, item.isRevenue && { color: "#4CAF50" }]}
//           >
//             {item.isRevenue ? `₹${item.count}` : item.count}
//           </Text>
//         </View>
//       </View>
//     );

//     if (isNavigable) {
//       return (
//         <TouchableOpacity
//           onPress={() => handleCardPress(item)}
//           activeOpacity={0.7}
//         >
//           {CardContent}
//         </TouchableOpacity>
//       );
//     } else {
//       return CardContent;
//     }
//   };

//   if (loading) {
//     return (
//       <View
//         style={[
//           styles.container,
//           { justifyContent: "center", alignItems: "center" },
//         ]}
//       >
//         <ActivityIndicator size="large" color="#8358EB" />
//         <Text style={{ color: "#fff", marginTop: 10 }}>
//           Loading Dashboard...
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor="transparent"
//         translucent
//       />

//       {/* Header */}
//       <View style={styles.header}>
//         <View style={{ flexDirection: "row" }}>
//           <Text style={styles.headerText}>Overview</Text>
//         </View>
//         <View style={styles.headerIcons}>
//           <Ionicons name="person-circle-outline" size={26} color="white" />
//         </View>
//       </View>

//       <ThreeButtons />

//       {/* Cards */}
//       <FlatList
//         data={prepareCardData()}
//         keyExtractor={(item: CardItem) => item.id}
//         renderItem={renderItem}
//         numColumns={2}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default OverviewScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#0A1E44",
//     height: "100%",
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   headerText: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   headerIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     marginRight: 15,
//   },
//   listContent: {
//     paddingHorizontal: 10,
//     paddingBottom: 80,
//   },
//   card: {
//     backgroundColor: "#11245A",
//     margin: 8,
//     width: CARD_WIDTH,
//     borderRadius: 10,
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     gap: 6,
//   },
//   cardCount: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 5,
//   },
//   cardLabel: {
//     fontSize: 13,
//     color: "#fff",
//     textAlign: "left",
//     flex: 1,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "#11245A",
//     paddingVertical: 10,
//     borderTopWidth: 0.3,
//     borderTopColor: "#444",
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//   },
//   navItem: {
//     alignItems: "center",
//   },
//   navText: {
//     fontSize: 11,
//     color: "#fff",
//     marginTop: 2,
//   },
// });
