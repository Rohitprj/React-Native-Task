// import { fetchBookingsApi } from "@/utils/bookingApi";
// import { BookingData, DisplayBookingItem } from "@/utils/types/bookingTypes";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Icon from "react-native-vector-icons/Feather";

// // Get screen width once outside the component to avoid recalculations
// const screenWidth = Dimensions.get("window").width;
// const modalCalculatedWidth = screenWidth * 0.9; // Calculate 90% of screen width

// const BookingsScreen = () => {
//   const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showNewBookingForm, setShowNewBookingForm] = useState<boolean>(false);
//   const [newBookingData, setNewBookingData] = useState({
//     bookingType: "Package",
//     customerEmail: "",
//     customerName: "",
//     customerPhone: "",
//     overs: "",
//     packageId: "",
//     price: "",
//     storeId: "",
//   });

//   useEffect(() => {
//     const loadBookings = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const apiData: BookingData[] = await fetchBookingsApi();

//         const mappedData: DisplayBookingItem[] = apiData.map((booking) => ({
//           id: booking.id,
//           name: booking.customer.name,
//           store: booking.store.name,
//           status: booking.paid ? "PAID" : "UNPAID",
//         }));
//         setBookings(mappedData);
//       } catch (err) {
//         console.error("Failed to fetch bookings:", err);
//         setError("Failed to load bookings. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadBookings();
//   }, []);

//   const handleAddNewBooking = () => {
//     // You would typically send this data to your API
//     console.log("New Booking Data:", newBookingData);
//     // Reset form and hide it
//     setNewBookingData({
//       bookingType: "Package",
//       customerEmail: "",
//       customerName: "",
//       customerPhone: "",
//       overs: "",
//       packageId: "",
//       price: "",
//       storeId: "",
//     });
//     setShowNewBookingForm(false);
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text style={styles.loadingText}>Loading bookings...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={() => {
//             /* Implement retry logic here */
//           }}
//         >
//           <Text style={styles.buttonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Text style={styles.headerTitle}>Bookings</Text>
//         </View>
//         <Ionicons name="person-circle-outline" size={28} color="white" />
//       </View>

//       {/* Search and Action Buttons */}
//       <View style={styles.searchRow}>
//         <TextInput
//           placeholder="Search"
//           placeholderTextColor="#94a3b8"
//           style={styles.searchInput}
//         />
//         <TouchableOpacity style={styles.smallButton}>
//           <Text style={styles.buttonText}>Existing</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.smallButton}
//           onPress={() => setShowNewBookingForm(true)}
//         >
//           <Text style={styles.buttonText}>+ New</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Table Header */}
//       <View style={styles.tableHeader}>
//         <Text style={[styles.columnHeader, { flex: 0.8 }]}>CUSTOMER</Text>
//         <Text style={[styles.columnHeader, { flex: 1 }]}>STORE</Text>
//         <Text style={[styles.columnHeader, { flex: 0.5, textAlign: "right" }]}>
//           ACTIONS
//         </Text>
//       </View>

//       {/* Booking List */}
//       <FlatList
//         data={bookings}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <View style={{ flex: 0.8 }}>
//               <Text style={styles.customerName}>{item.name}</Text>
//               <Text
//                 style={item.status === "PAID" ? styles.paid : styles.unpaid}
//               >
//                 {item.status}
//               </Text>
//             </View>
//             <Text style={styles.storeText}>{item.store}</Text>
//             <TouchableOpacity style={{ flex: 0.5, alignItems: "flex-end" }}>
//               <Icon name="edit-3" size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       {/* New Booking Form Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showNewBookingForm}
//         onRequestClose={() => setShowNewBookingForm(false)}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.modalOverlay}
//         >
//           <ScrollView contentContainerStyle={styles.formScrollContainer}>
//             <View style={styles.formContainer}>
//               <Text style={styles.formTitle}>Add New Booking</Text>

//               {/* Booking Type (Read-only as per your initial data) */}
//               <Text style={styles.inputLabel}>Booking Type</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.bookingType}
//                 onChangeText={(text) =>
//                   setNewBookingData({ ...newBookingData, bookingType: text })
//                 }
//                 placeholderTextColor="#94a3b8"
//                 editable={false} // This field is static ("Package")
//               />

//               <Text style={styles.inputLabel}>Customer Name</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.customerName}
//                 onChangeText={(text) =>
//                   setNewBookingData({ ...newBookingData, customerName: text })
//                 }
//                 placeholder="Enter customer name"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Customer Email</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.customerEmail}
//                 onChangeText={(text) =>
//                   setNewBookingData({ ...newBookingData, customerEmail: text })
//                 }
//                 placeholder="Enter customer email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Customer Phone</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.customerPhone}
//                 onChangeText={(text) =>
//                   setNewBookingData({ ...newBookingData, customerPhone: text })
//                 }
//                 placeholder="Enter customer phone"
//                 keyboardType="phone-pad"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Package ID</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.packageId}
//                 onChangeText={(text) =>
//                   setNewBookingData({ ...newBookingData, packageId: text })
//                 }
//                 placeholder="Enter package ID (e.g., 17)"
//                 keyboardType="numeric"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Price</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.price}
//                 onChangeText={(text) =>
//                   setNewBookingData({ ...newBookingData, price: text })
//                 }
//                 placeholder="Enter price"
//                 keyboardType="numeric"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Overs</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.overs}
//                 onChangeText={(text) =>
//                   setNewBookingData({ ...newBookingData, overs: text })
//                 }
//                 placeholder="Enter number of overs"
//                 keyboardType="numeric"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Store ID</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.storeId}
//                 onChangeText={(text) =>
//                   setNewBookingData({ ...newBookingData, storeId: text })
//                 }
//                 placeholder="Enter store ID (e.g., 1)"
//                 keyboardType="numeric"
//                 placeholderTextColor="#94a3b8"
//               />

//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={styles.submitButton}
//                   onPress={handleAddNewBooking}
//                 >
//                   <Text style={styles.buttonText}>Submit</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => setShowNewBookingForm(false)}
//                 >
//                   <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
//     paddingHorizontal: 16,
//   },
//   centerContent: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     color: "#fff",
//     marginTop: 10,
//     fontSize: 16,
//   },
//   errorText: {
//     color: "#ef4444",
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   retryButton: {
//     backgroundColor: "#3b82f6",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 5,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   filterRow: {
//     flexDirection: "row",
//   },
//   filterBtn: {
//     backgroundColor: "#374151",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     justifyContent: "center",
//     marginRight: 10,
//     height: 30,
//     flexDirection: "row",
//     gap: 8,
//     alignItems: "center",
//   },
//   filterText: {
//     color: "#fff",
//     fontSize: 13,
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 16,
//   },
//   searchInput: {
//     flex: 1,
//     backgroundColor: "#1e293b",
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//   },
//   smallButton: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#0f172a",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 8,
//     borderBottomColor: "#334155",
//     borderBottomWidth: 1,
//     marginBottom: 6,
//   },
//   columnHeader: {
//     color: "#94a3b8",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 14,
//     borderBottomColor: "#1e293b",
//     borderBottomWidth: 1,
//     alignItems: "center",
//   },
//   customerName: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   paid: {
//     color: "#10b981",
//     fontSize: 12,
//   },
//   unpaid: {
//     color: "#ef4444",
//     fontSize: 12,
//   },
//   storeText: {
//     color: "#cbd5e0",
//     fontSize: 12,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   // --- Modal Styles (Replicated from PackagesScreen) ---
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },
//   formScrollContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//     width: "100%", // Ensure this wrapper takes full width available
//     paddingVertical: 20,
//   },
//   formContainer: {
//     backgroundColor: "#1e293b",
//     borderRadius: 10,
//     padding: 20,
//     width: modalCalculatedWidth, // Using the calculated 90% width
//     alignSelf: "center",
//   },
//   formTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputLabel: {
//     color: "#cbd5e0",
//     fontSize: 14,
//     marginBottom: 5,
//     marginTop: 10,
//   },
//   formInput: {
//     backgroundColor: "#0f172a",
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     height: 50, // Matched height of Packages input
//     marginBottom: 15,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#334155",
//   },
//   formActions: {
//     flexDirection: "column", // Stack buttons vertically
//     marginTop: 20,
//     gap: 10, // Space between buttons
//   },
//   submitButton: {
//     backgroundColor: "#3b82f6",
//     paddingVertical: 15, // Matched padding of Packages submit
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   // This style is not used for BookingsScreen, but keeping for consistency if a disabled state is needed
//   submitButtonDisabled: {
//     backgroundColor: "#60a5fa",
//   },
//   cancelButton: {
//     backgroundColor: "transparent", // Matching Packages cancel button
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#94a3b8", // Matching Packages cancel button
//   },
//   cancelButtonText: {
//     color: "#94a3b8", // Matching Packages cancel button
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

// export default BookingsScreen;

// import { createBookingApi, fetchBookingsApi } from "@/utils/bookingApi"; // Import createBookingApi
// import {
//   BookingData,
//   DisplayBookingItem,
//   NewBookingPayload,
// } from "@/utils/types/bookingTypes"; // Import NewBookingPayload
// import { Ionicons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   FlatList,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Icon from "react-native-vector-icons/Feather";

// // Get screen width once outside the component to avoid recalculations
// const screenWidth = Dimensions.get("window").width;
// const modalCalculatedWidth = screenWidth * 0.9; // Calculate 90% of screen width

// const BookingsScreen = () => {
//   const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // State for the "New Booking" modal (original)
//   const [showNewBookingForm, setShowNewBookingForm] = useState<boolean>(false);
//   const [newBookingData, setNewBookingData] = useState({
//     bookingType: "Package", // This modal is always for "Package"
//     customerEmail: "",
//     customerName: "",
//     customerPhone: "",
//     overs: "",
//     packageId: "",
//     price: "",
//     storeId: "",
//   });

//   // State for the "Existing Booking" modal (new)
//   const [showExistingBookingModal, setShowExistingBookingModal] =
//     useState<boolean>(false);
//   const [existingBookingData, setExistingBookingData] =
//     useState<NewBookingPayload>({
//       bookingType: "Package", // Default booking type
//       customerId: null as any, // Use null or 0, will handle validation
//       storeId: null as any,
//       packageId: null as any, // Optional for custom booking
//       price: null as any, // Optional for package booking
//       overs: null as any, // Optional for package booking
//     });
//   const [isSubmittingExisting, setIsSubmittingExisting] =
//     useState<boolean>(false);

//   // Function to load bookings from API
//   const loadBookings = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const apiData: BookingData[] = await fetchBookingsApi();

//       const mappedData: DisplayBookingItem[] = apiData.map((booking) => ({
//         id: booking.id,
//         name: booking.customer.name,
//         store: booking.store.name,
//         status: booking.paid ? "PAID" : "UNPAID",
//       }));
//       setBookings(mappedData);
//     } catch (err) {
//       console.error("Failed to fetch bookings:", err);
//       setError("Failed to load bookings. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial data load on component mount
//   useEffect(() => {
//     loadBookings();
//   }, []);

//   const handleNewBookingFormChange = (field: string, value: string) => {
//     setNewBookingData({ ...newBookingData, [field]: value });
//   };

//   // Original handle for the "+ New" button (which was just console.log)
//   const handleAddNewBooking = () => {
//     // This is the placeholder for the original +New button submission
//     // You would typically have an API call here for this specific form's logic.
//     console.log("New Booking Data (Original +New button):", newBookingData);
//     Alert.alert(
//       "Info",
//       "Original '+ New' button action (currently just logs data)."
//     );
//     setNewBookingData({
//       bookingType: "Package",
//       customerEmail: "",
//       customerName: "",
//       customerPhone: "",
//       overs: "",
//       packageId: "",
//       price: "",
//       storeId: "",
//     });
//     setShowNewBookingForm(false);
//   };

//   // Handle input for the "Existing" booking modal
//   const handleExistingBookingFormChange = (
//     field: keyof NewBookingPayload,
//     value: string
//   ) => {
//     setExistingBookingData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   // Handle submission for the "Existing" booking modal
//   const handleCreateExistingBooking = async () => {
//     setIsSubmittingExisting(true);
//     let payload: NewBookingPayload = {
//       customerId: parseInt(existingBookingData.customerId as any), // Convert to number
//       storeId: parseInt(existingBookingData.storeId as any), // Convert to number
//       bookingType: existingBookingData.bookingType,
//     };

//     // Conditional fields based on booking type
//     if (existingBookingData.bookingType === "Package") {
//       if (!existingBookingData.packageId) {
//         Alert.alert(
//           "Validation Error",
//           "Package ID is required for Package booking."
//         );
//         setIsSubmittingExisting(false);
//         return;
//       }
//       payload.packageId = parseInt(existingBookingData.packageId as any);
//     } else {
//       // Custom booking
//       if (!existingBookingData.overs || !existingBookingData.price) {
//         Alert.alert(
//           "Validation Error",
//           "Overs and Price are required for Custom booking."
//         );
//         setIsSubmittingExisting(false);
//         return;
//       }
//       payload.overs = parseInt(existingBookingData.overs as any);
//       payload.price = parseFloat(existingBookingData.price as any);
//     }

//     // Basic validation for common fields
//     if (isNaN(payload.customerId) || isNaN(payload.storeId)) {
//       Alert.alert(
//         "Validation Error",
//         "Customer ID and Store ID must be valid numbers."
//       );
//       setIsSubmittingExisting(false);
//       return;
//     }

//     try {
//       await createBookingApi(payload); // Call the API
//       Alert.alert("Success", "Booking created successfully!");
//       // Reset form and close modal
//       setExistingBookingData({
//         bookingType: "Package",
//         customerId: null as any,
//         storeId: null as any,
//         packageId: null as any,
//         price: null as any,
//         overs: null as any,
//       });
//       setShowExistingBookingModal(false);
//       loadBookings(); // Re-fetch bookings to show the new one
//     } catch (err) {
//       Alert.alert(
//         "Error",
//         "Failed to create booking. Please check your input and try again."
//       );
//       console.error("Booking submission error:", err);
//     } finally {
//       setIsSubmittingExisting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text style={styles.loadingText}>Loading bookings...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={loadBookings}>
//           <Text style={styles.buttonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Text style={styles.headerTitle}>Bookings</Text>
//         </View>
//         <Ionicons name="person-circle-outline" size={28} color="white" />
//       </View>

//       {/* Search and Action Buttons */}
//       <View style={styles.searchRow}>
//         <TextInput
//           placeholder="Search"
//           placeholderTextColor="#94a3b8"
//           style={styles.searchInput}
//         />
//         <TouchableOpacity
//           style={styles.smallButton}
//           onPress={() => setShowExistingBookingModal(true)} // Open new modal
//         >
//           <Text style={styles.buttonText}>Existing</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.smallButton}
//           onPress={() => setShowNewBookingForm(true)} // Open original modal
//         >
//           <Text style={styles.buttonText}>+ New</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Table Header */}
//       <View style={styles.tableHeader}>
//         <Text style={[styles.columnHeader, { flex: 0.8 }]}>CUSTOMER</Text>
//         <Text style={[styles.columnHeader, { flex: 1 }]}>STORE</Text>
//         <Text style={[styles.columnHeader, { flex: 0.5, textAlign: "right" }]}>
//           ACTIONS
//         </Text>
//       </View>

//       {/* Booking List */}
//       <FlatList
//         data={bookings}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <View style={{ flex: 0.8 }}>
//               <Text style={styles.customerName}>{item.name}</Text>
//               <Text
//                 style={item.status === "PAID" ? styles.paid : styles.unpaid}
//               >
//                 {item.status}
//               </Text>
//             </View>
//             <Text style={styles.storeText}>{item.store}</Text>
//             <TouchableOpacity style={{ flex: 0.5, alignItems: "flex-end" }}>
//               <Icon name="edit-3" size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       {/* Original "New Booking" Form Modal (Package only) */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showNewBookingForm}
//         onRequestClose={() => setShowNewBookingForm(false)}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.modalOverlay}
//         >
//           <ScrollView contentContainerStyle={styles.formScrollContainer}>
//             <View style={styles.formContainer}>
//               <Text style={styles.formTitle}>Add New Booking</Text>
//               {/* This modal's fields are static "Package" type related */}
//               <Text style={styles.inputLabel}>Booking Type</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value="Package" // This modal is specifically for Package
//                 editable={false}
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Customer Name</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.customerName}
//                 onChangeText={(text) =>
//                   handleNewBookingFormChange("customerName", text)
//                 }
//                 placeholder="Enter customer name"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Customer Email</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.customerEmail}
//                 onChangeText={(text) =>
//                   handleNewBookingFormChange("customerEmail", text)
//                 }
//                 placeholder="Enter customer email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Customer Phone</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.customerPhone}
//                 onChangeText={(text) =>
//                   handleNewBookingFormChange("customerPhone", text)
//                 }
//                 placeholder="Enter customer phone"
//                 keyboardType="phone-pad"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Package ID</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.packageId}
//                 onChangeText={(text) =>
//                   handleNewBookingFormChange("packageId", text)
//                 }
//                 placeholder="Enter package ID (e.g., 17)"
//                 keyboardType="numeric"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Price</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.price}
//                 onChangeText={(text) =>
//                   handleNewBookingFormChange("price", text)
//                 }
//                 placeholder="Enter price"
//                 keyboardType="numeric"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Overs</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.overs}
//                 onChangeText={(text) =>
//                   handleNewBookingFormChange("overs", text)
//                 }
//                 placeholder="Enter number of overs"
//                 keyboardType="numeric"
//                 placeholderTextColor="#94a3b8"
//               />

//               <Text style={styles.inputLabel}>Store ID</Text>
//               <TextInput
//                 style={styles.formInput}
//                 value={newBookingData.storeId}
//                 onChangeText={(text) =>
//                   handleNewBookingFormChange("storeId", text)
//                 }
//                 placeholder="Enter store ID (e.g., 1)"
//                 keyboardType="numeric"
//                 placeholderTextColor="#94a3b8"
//               />

//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={styles.submitButton}
//                   onPress={handleAddNewBooking} // This button's handler
//                 >
//                   <Text style={styles.buttonText}>Submit</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => setShowNewBookingForm(false)}
//                 >
//                   <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Modal>

//       {/* New "Existing Booking" Modal (with Booking Type toggle) */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showExistingBookingModal}
//         onRequestClose={() => {
//           if (!isSubmittingExisting) {
//             setShowExistingBookingModal(false);
//           }
//         }}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.modalOverlay}
//         >
//           <ScrollView contentContainerStyle={styles.formScrollContainer}>
//             <View style={styles.formContainer}>
//               <Text style={styles.formTitle}>Create Booking</Text>

//               {/* Booking Type Selector */}
//               <Text style={styles.inputLabel}>Booking Type</Text>
//               <View style={styles.typeSelectorContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     existingBookingData.bookingType === "Package" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     setExistingBookingData((prev) => ({
//                       ...prev,
//                       bookingType: "Package",
//                       overs: null as any, // Clear relevant fields
//                       price: null as any,
//                     }))
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       existingBookingData.bookingType === "Package" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Package
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     existingBookingData.bookingType === "Custom" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     setExistingBookingData((prev) => ({
//                       ...prev,
//                       bookingType: "Custom",
//                       packageId: null as any, // Clear relevant fields
//                     }))
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       existingBookingData.bookingType === "Custom" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Custom
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {/* Common Fields */}
//               <Text style={styles.inputLabel}>Customer ID</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter Customer ID"
//                 placeholderTextColor="#94a3b8"
//                 keyboardType="numeric"
//                 value={existingBookingData.customerId?.toString() || ""}
//                 onChangeText={(text) =>
//                   handleExistingBookingFormChange("customerId", text)
//                 }
//               />

//               <Text style={styles.inputLabel}>Store ID</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter Store ID"
//                 placeholderTextColor="#94a3b8"
//                 keyboardType="numeric"
//                 value={existingBookingData.storeId?.toString() || ""}
//                 onChangeText={(text) =>
//                   handleExistingBookingFormChange("storeId", text)
//                 }
//               />

//               {/* Conditional Fields based on Booking Type */}
//               {existingBookingData.bookingType === "Package" ? (
//                 <>
//                   <Text style={styles.inputLabel}>Package ID</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Package ID"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={existingBookingData.packageId?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleExistingBookingFormChange("packageId", text)
//                     }
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Text style={styles.inputLabel}>Overs</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Overs"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={existingBookingData.overs?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleExistingBookingFormChange("overs", text)
//                     }
//                   />

//                   <Text style={styles.inputLabel}>Price</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Price"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={existingBookingData.price?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleExistingBookingFormChange("price", text)
//                     }
//                   />
//                 </>
//               )}

//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[
//                     styles.submitButton,
//                     isSubmittingExisting && styles.submitButtonDisabled,
//                   ]}
//                   onPress={handleCreateExistingBooking}
//                   disabled={isSubmittingExisting}
//                 >
//                   {isSubmittingExisting ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.buttonText}>Submit</Text>
//                   )}
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => setShowExistingBookingModal(false)}
//                   disabled={isSubmittingExisting}
//                 >
//                   <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
//     paddingHorizontal: 16,
//     paddingTop: StatusBar.currentHeight || 30, // Adjust paddingTop for StatusBar
//   },
//   centerContent: {
//     flex: 1, // Ensure it takes full height to center content
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     color: "#fff",
//     marginTop: 10,
//     fontSize: 16,
//   },
//   errorText: {
//     color: "#ef4444",
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   retryButton: {
//     backgroundColor: "#3b82f6",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12, // Adjusted for better spacing
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     // marginBottom: 5, // Removed, header itself has margin-bottom
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 16,
//   },
//   searchInput: {
//     flex: 1,
//     backgroundColor: "#1e293b",
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//   },
//   smallButton: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#0f172a", // Default for white background buttons
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 8,
//     borderBottomColor: "#334155",
//     borderBottomWidth: 1,
//     marginBottom: 6,
//   },
//   columnHeader: {
//     color: "#94a3b8",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 14,
//     borderBottomColor: "#1e293b",
//     borderBottomWidth: 1,
//     alignItems: "center",
//   },
//   customerName: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   paid: {
//     color: "#10b981",
//     fontSize: 12,
//   },
//   unpaid: {
//     color: "#ef4444",
//     fontSize: 12,
//   },
//   storeText: {
//     color: "#cbd5e0",
//     fontSize: 12,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   // --- Modal Styles (Replicated from PackagesScreen and existing Bookings) ---
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },
//   formScrollContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//     width: "100%",
//     paddingVertical: 20,
//   },
//   formContainer: {
//     backgroundColor: "#1e293b",
//     borderRadius: 10,
//     padding: 20,
//     width: modalCalculatedWidth,
//     alignSelf: "center",
//   },
//   formTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputLabel: {
//     color: "#cbd5e0",
//     fontSize: 14,
//     marginBottom: 5,
//     marginTop: 10,
//   },
//   formInput: {
//     backgroundColor: "#0f172a",
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     height: 50,
//     marginBottom: 15,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#334155",
//   },
//   formActions: {
//     flexDirection: "column",
//     marginTop: 20,
//     gap: 10,
//   },
//   submitButton: {
//     backgroundColor: "#3b82f6",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   submitButtonDisabled: {
//     backgroundColor: "#60a5fa", // Lighter blue when disabled
//   },
//   cancelButton: {
//     backgroundColor: "transparent",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#94a3b8",
//   },
//   cancelButtonText: {
//     color: "#94a3b8",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   // --- New Styles for Booking Type Selector ---
//   typeSelectorContainer: {
//     flexDirection: "row",
//     backgroundColor: "#0f172a",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#334155",
//     overflow: "hidden", // Ensures inner buttons respect borderRadius
//     marginBottom: 15,
//   },
//   typeSelectorButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   typeSelectorButtonActive: {
//     backgroundColor: "#3b82f6", // Active background color
//   },
//   typeSelectorText: {
//     color: "#cbd5e0", // Default text color
//     fontWeight: "600",
//     fontSize: 15,
//   },
//   typeSelectorTextActive: {
//     color: "#fff", // Active text color
//   },
// });

// export default BookingsScreen;

import {
  createBookingApi,
  createDirectBookingApi,
  fetchBookingsApi,
} from "@/utils/bookingApi"; // Import createDirectBookingApi
import {
  AdminDirectBookingPayload,
  BookingData,
  DisplayBookingItem,
  NewBookingPayload,
} from "@/utils/types/bookingTypes";
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
import Icon from "react-native-vector-icons/Feather";

// Get screen width once outside the component to avoid recalculations
const screenWidth = Dimensions.get("window").width;
const modalCalculatedWidth = screenWidth * 0.9; // Calculate 90% of screen width

const BookingsScreen = () => {
  const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for the "+ New" (Direct Admin Booking) modal
  const [showNewDirectBookingForm, setShowNewDirectBookingForm] =
    useState<boolean>(false);
  const [newDirectBookingData, setNewDirectBookingData] =
    useState<AdminDirectBookingPayload>({
      bookingType: "Package", // Default type for this modal
      storeId: 0, // Placeholder, ensure user inputs a valid number
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      packageId: null, // Initial null as it's conditional
      price: null, // Initial null as it's conditional
      overs: null, // Initial null as it's conditional
    });
  const [isSubmittingDirect, setIsSubmittingDirect] = useState<boolean>(false);

  // State for the "Existing Booking" (Customer ID based) modal - Renamed for clarity
  const [showCustomerBookingModal, setShowCustomerBookingModal] =
    useState<boolean>(false);
  const [customerBookingData, setCustomerBookingData] =
    useState<NewBookingPayload>({
      bookingType: "Package", // Default booking type
      customerId: 0, // Use 0 or null, will handle validation
      storeId: 0,
      packageId: null, // Optional for custom booking
      price: null, // Optional for package booking
      overs: null, // Optional for package booking
    });
  const [isSubmittingCustomer, setIsSubmittingCustomer] =
    useState<boolean>(false);

  // Function to load bookings from API
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

  // Initial data load on component mount
  useEffect(() => {
    loadBookings();
  }, []);

  // Handler for the "+ New" (Direct Admin Booking) modal inputs
  const handleNewDirectBookingFormChange = (
    field: keyof AdminDirectBookingPayload,
    value: string
  ) => {
    setNewDirectBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handler for the "+ New" (Direct Admin Booking) modal submission
  const handleCreateDirectBooking = async () => {
    setIsSubmittingDirect(true);

    let payload: AdminDirectBookingPayload = {
      storeId: parseInt(newDirectBookingData.storeId as any),
      bookingType: newDirectBookingData.bookingType,
      customerName: newDirectBookingData.customerName,
      customerPhone: newDirectBookingData.customerPhone,
      customerEmail: newDirectBookingData.customerEmail,
    };

    // Conditional fields based on booking type for Direct Admin Booking
    if (newDirectBookingData.bookingType === "Package") {
      if (!newDirectBookingData.packageId) {
        Alert.alert(
          "Validation Error",
          "Package ID is required for Package booking."
        );
        setIsSubmittingDirect(false);
        return;
      }
      payload.packageId = parseInt(newDirectBookingData.packageId as any);
    } else {
      // Custom booking
      if (!newDirectBookingData.overs || !newDirectBookingData.price) {
        Alert.alert(
          "Validation Error",
          "Overs and Price are required for Custom booking."
        );
        setIsSubmittingDirect(false);
        return;
      }
      payload.overs = parseInt(newDirectBookingData.overs as any);
      payload.price = parseFloat(newDirectBookingData.price as any);
    }

    // Basic validation for common fields
    if (
      isNaN(payload.storeId) ||
      !payload.customerName ||
      !payload.customerPhone ||
      !payload.customerEmail
    ) {
      Alert.alert(
        "Validation Error",
        "Store ID, Customer Name, Phone, and Email are required."
      );
      setIsSubmittingDirect(false);
      return;
    }

    try {
      // Call the NEW API for direct admin bookings
      await createDirectBookingApi(payload);
      Alert.alert("Success", "Direct booking created successfully!");
      // Reset form and close modal
      setNewDirectBookingData({
        bookingType: "Package",
        storeId: 0,
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        packageId: null,
        price: null,
        overs: null,
      });
      setShowNewDirectBookingForm(false);
      loadBookings(); // Re-fetch bookings to show the new one
    } catch (err) {
      Alert.alert(
        "Error",
        "Failed to create direct booking. Please check your input and try again."
      );
      console.error("Direct booking submission error:", err);
    } finally {
      setIsSubmittingDirect(false);
    }
  };

  // Handler for the "Existing Booking" (Customer ID based) modal inputs
  const handleCustomerBookingFormChange = (
    field: keyof NewBookingPayload,
    value: string
  ) => {
    setCustomerBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handler for the "Existing Booking" (Customer ID based) modal submission
  const handleCreateCustomerBooking = async () => {
    setIsSubmittingCustomer(true);
    let payload: NewBookingPayload = {
      customerId: parseInt(customerBookingData.customerId as any), // Convert to number
      storeId: parseInt(customerBookingData.storeId as any), // Convert to number
      bookingType: customerBookingData.bookingType,
    };

    // Conditional fields based on booking type
    if (customerBookingData.bookingType === "Package") {
      if (!customerBookingData.packageId) {
        Alert.alert(
          "Validation Error",
          "Package ID is required for Package booking."
        );
        setIsSubmittingCustomer(false);
        return;
      }
      payload.packageId = parseInt(customerBookingData.packageId as any);
    } else {
      // Custom booking
      if (!customerBookingData.overs || !customerBookingData.price) {
        Alert.alert(
          "Validation Error",
          "Overs and Price are required for Custom booking."
        );
        setIsSubmittingCustomer(false);
        return;
      }
      payload.overs = parseInt(customerBookingData.overs as any);
      payload.price = parseFloat(customerBookingData.price as any);
    }

    // Basic validation for common fields
    if (isNaN(payload.customerId) || isNaN(payload.storeId)) {
      Alert.alert(
        "Validation Error",
        "Customer ID and Store ID must be valid numbers."
      );
      setIsSubmittingCustomer(false);
      return;
    }

    try {
      await createBookingApi(payload); // Call the original API
      Alert.alert("Success", "Booking created successfully!");
      // Reset form and close modal
      setCustomerBookingData({
        bookingType: "Package",
        customerId: 0,
        storeId: 0,
        packageId: null,
        price: null,
        overs: null,
      });
      setShowCustomerBookingModal(false);
      loadBookings(); // Re-fetch bookings to show the new one
    } catch (err) {
      Alert.alert(
        "Error",
        "Failed to create booking. Please check your input and try again."
      );
      console.error("Booking submission error:", err);
    } finally {
      setIsSubmittingCustomer(false);
    }
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
        <TouchableOpacity style={styles.retryButton} onPress={loadBookings}>
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
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => setShowCustomerBookingModal(true)} // Open Customer ID based modal
        >
          <Text style={styles.buttonText}>Existing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => setShowNewDirectBookingForm(true)} // Open new Direct Admin Booking modal
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

      {/* NEW "+ New" (Direct Admin Booking) Modal (with Booking Type toggle and customer details) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNewDirectBookingForm}
        onRequestClose={() => {
          if (!isSubmittingDirect) {
            setShowNewDirectBookingForm(false);
          }
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.formScrollContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Add New Direct Booking</Text>

              {/* Booking Type Selector for New Direct Booking */}
              <Text style={styles.inputLabel}>Booking Type</Text>
              <View style={styles.typeSelectorContainer}>
                <TouchableOpacity
                  style={[
                    styles.typeSelectorButton,
                    newDirectBookingData.bookingType === "Package" &&
                      styles.typeSelectorButtonActive,
                  ]}
                  onPress={() =>
                    setNewDirectBookingData((prev) => ({
                      ...prev,
                      bookingType: "Package",
                      overs: null, // Clear relevant fields for Package
                      price: null,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.typeSelectorText,
                      newDirectBookingData.bookingType === "Package" &&
                        styles.typeSelectorTextActive,
                    ]}
                  >
                    Package
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeSelectorButton,
                    newDirectBookingData.bookingType === "Custom" &&
                      styles.typeSelectorButtonActive,
                  ]}
                  onPress={() =>
                    setNewDirectBookingData((prev) => ({
                      ...prev,
                      bookingType: "Custom",
                      packageId: null, // Clear relevant fields for Custom
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.typeSelectorText,
                      newDirectBookingData.bookingType === "Custom" &&
                        styles.typeSelectorTextActive,
                    ]}
                  >
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Customer Details for New Direct Booking */}
              <Text style={styles.inputLabel}>Customer Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter Customer Name"
                placeholderTextColor="#94a3b8"
                value={newDirectBookingData.customerName}
                onChangeText={(text) =>
                  handleNewDirectBookingFormChange("customerName", text)
                }
              />

              <Text style={styles.inputLabel}>Customer Phone</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter Customer Phone"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                value={newDirectBookingData.customerPhone}
                onChangeText={(text) =>
                  handleNewDirectBookingFormChange("customerPhone", text)
                }
              />

              <Text style={styles.inputLabel}>Customer Email</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter Customer Email"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={newDirectBookingData.customerEmail}
                onChangeText={(text) =>
                  handleNewDirectBookingFormChange("customerEmail", text)
                }
              />

              <Text style={styles.inputLabel}>Store ID</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter Store ID"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={newDirectBookingData.storeId?.toString() || ""}
                onChangeText={(text) =>
                  handleNewDirectBookingFormChange("storeId", text)
                }
              />

              {/* Conditional Fields based on Booking Type for Direct Admin Booking */}
              {newDirectBookingData.bookingType === "Package" ? (
                <>
                  <Text style={styles.inputLabel}>Package ID</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter Package ID"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={newDirectBookingData.packageId?.toString() || ""}
                    onChangeText={(text) =>
                      handleNewDirectBookingFormChange("packageId", text)
                    }
                  />
                </>
              ) : (
                <>
                  <Text style={styles.inputLabel}>Overs</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter Overs"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={newDirectBookingData.overs?.toString() || ""}
                    onChangeText={(text) =>
                      handleNewDirectBookingFormChange("overs", text)
                    }
                  />

                  <Text style={styles.inputLabel}>Price</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter Price"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={newDirectBookingData.price?.toString() || ""}
                    onChangeText={(text) =>
                      handleNewDirectBookingFormChange("price", text)
                    }
                  />
                </>
              )}

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isSubmittingDirect && styles.submitButtonDisabled,
                  ]}
                  onPress={handleCreateDirectBooking} // This button's handler
                  disabled={isSubmittingDirect}
                >
                  {isSubmittingDirect ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowNewDirectBookingForm(false)}
                  disabled={isSubmittingDirect}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Original "Existing Booking" Modal (Now renamed to Customer Booking Modal) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCustomerBookingModal} // Control with new state
        onRequestClose={() => {
          if (!isSubmittingCustomer) {
            setShowCustomerBookingModal(false);
          }
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.formScrollContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>
                Create Existing Customer Booking
              </Text>

              {/* Booking Type Selector */}
              <Text style={styles.inputLabel}>Booking Type</Text>
              <View style={styles.typeSelectorContainer}>
                <TouchableOpacity
                  style={[
                    styles.typeSelectorButton,
                    customerBookingData.bookingType === "Package" &&
                      styles.typeSelectorButtonActive,
                  ]}
                  onPress={() =>
                    setCustomerBookingData((prev) => ({
                      ...prev,
                      bookingType: "Package",
                      overs: null, // Clear relevant fields
                      price: null,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.typeSelectorText,
                      customerBookingData.bookingType === "Package" &&
                        styles.typeSelectorTextActive,
                    ]}
                  >
                    Package
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeSelectorButton,
                    customerBookingData.bookingType === "Custom" &&
                      styles.typeSelectorButtonActive,
                  ]}
                  onPress={() =>
                    setCustomerBookingData((prev) => ({
                      ...prev,
                      bookingType: "Custom",
                      packageId: null, // Clear relevant fields
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.typeSelectorText,
                      customerBookingData.bookingType === "Custom" &&
                        styles.typeSelectorTextActive,
                    ]}
                  >
                    Custom
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Common Fields */}
              <Text style={styles.inputLabel}>Customer ID</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter Customer ID"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={customerBookingData.customerId?.toString() || ""}
                onChangeText={(text) =>
                  handleCustomerBookingFormChange("customerId", text)
                }
              />

              <Text style={styles.inputLabel}>Store ID</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter Store ID"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={customerBookingData.storeId?.toString() || ""}
                onChangeText={(text) =>
                  handleCustomerBookingFormChange("storeId", text)
                }
              />

              {/* Conditional Fields based on Booking Type */}
              {customerBookingData.bookingType === "Package" ? (
                <>
                  <Text style={styles.inputLabel}>Package ID</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter Package ID"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={customerBookingData.packageId?.toString() || ""}
                    onChangeText={(text) =>
                      handleCustomerBookingFormChange("packageId", text)
                    }
                  />
                </>
              ) : (
                <>
                  <Text style={styles.inputLabel}>Overs</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter Overs"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={customerBookingData.overs?.toString() || ""}
                    onChangeText={(text) =>
                      handleCustomerBookingFormChange("overs", text)
                    }
                  />

                  <Text style={styles.inputLabel}>Price</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter Price"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={customerBookingData.price?.toString() || ""}
                    onChangeText={(text) =>
                      handleCustomerBookingFormChange("price", text)
                    }
                  />
                </>
              )}

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isSubmittingCustomer && styles.submitButtonDisabled,
                  ]}
                  onPress={handleCreateCustomerBooking}
                  disabled={isSubmittingCustomer}
                >
                  {isSubmittingCustomer ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowCustomerBookingModal(false)}
                  disabled={isSubmittingCustomer}
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
    paddingTop: StatusBar.currentHeight || 30, // Adjust paddingTop for StatusBar
  },
  centerContent: {
    flex: 1, // Ensure it takes full height to center content
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
    marginBottom: 12, // Adjusted for better spacing
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // marginBottom: 5, // Removed, header itself has margin-bottom
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
    color: "#0f172a", // Default for white background buttons
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
  // --- Modal Styles (Replicated from PackagesScreen and existing Bookings) ---
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  formScrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
  },
  formContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 10,
    padding: 20,
    width: modalCalculatedWidth,
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
    height: 50,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  formActions: {
    flexDirection: "column",
    marginTop: 20,
    gap: 10,
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#60a5fa", // Lighter blue when disabled
  },
  cancelButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#94a3b8",
  },
  cancelButtonText: {
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: 16,
  },
  // --- New Styles for Booking Type Selector ---
  typeSelectorContainer: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    overflow: "hidden", // Ensures inner buttons respect borderRadius
    marginBottom: 15,
  },
  typeSelectorButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  typeSelectorButtonActive: {
    backgroundColor: "#3b82f6", // Active background color
  },
  typeSelectorText: {
    color: "#cbd5e0", // Default text color
    fontWeight: "600",
    fontSize: 15,
  },
  typeSelectorTextActive: {
    color: "#fff", // Active text color
  },
});

export default BookingsScreen;
