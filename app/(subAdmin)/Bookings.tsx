// import {
//   createBookingApi,
//   createDirectBookingApi,
//   fetchBookingsApi,
//   fetchBookingsByCustomerTypeApi,
//   fetchBookingsByDateApi,
//   fetchBookingsByPaidStatusApi,
//   fetchBookingsByStatusApi,
//   fetchBookingsByStoreApi,
// } from "@/utils/bookingApi";
// import {
//   AdminDirectBookingPayload,
//   BookingData, // Assuming this exists and has the necessary fields
//   NewBookingPayload,
// } from "@/utils/types/bookingTypes";
// import { AntDesign } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker"; // Import DatePicker
// import { Picker } from "@react-native-picker/picker";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   FlatList,
//   Image,
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

// // Assuming you have these API utility functions defined, e.g., in a new `dataFetchApi.ts`
// import { Colors } from "@/constants/Colors";
// import {
//   fetchCustomersApi,
//   fetchPackagesApi,
//   fetchStoresApi,
// } from "@/utils/bookingApi"; // Ensure these return { customers: [] } etc.
// import { DrawerNavigationProp } from "@react-navigation/drawer";
// import { useNavigation } from "@react-navigation/native";
// import { useLocalSearchParams } from "expo-router";

// interface Customer {
//   id: number;
//   name: string;
//   phone?: string; // Make phone optional as it might not always be there
//   totalBookings?: number; // Add totalBookings to customer interface if it exists on backend
// }

// interface Store {
//   id: number;
//   name: string;
// }

// interface Package {
//   id: number;
//   name: string;
//   type: string; // Assuming package has a type
// }

// // Extend DisplayBookingItem with new fields
// interface DisplayBookingItem {
//   id: number;
//   name: string; // Customer Name
//   phone: string; // Customer Phone
//   bookingsTypes: string; // Total bookings for this customer
//   status: string; // "PAID" or "UNPAID" based on `paid` boolean, also includes booking status like PENDING/COMPLETED
//   store: string; // Store Name
//   packageName: string; // Name of the package booked
//   packageType: string; // Type of the package booked
//   overs: number; // Total overs in the booking/package
//   oversLeft: number; // Overs remaining
//   price: number; // Price of the booking/package
//   paidTo: string; // Who the payment was marked by (paymentMarkedBy)
//   paymentDate: string; // Date of payment (paymentMarkedAt)
//   date: string; // Booking Date (YYYY-MM-DD)
//   time: string; // Booking Time (HH:MM)
// }

// const screenWidth = Dimensions.get("window").width;
// const modalCalculatedWidth = screenWidth * 0.9;

// const BookingsScreen = () => {
//   const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);

//   console.log("All Bookings", bookings);

//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [stores, setStores] = useState<Store[]>([]);
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [dataLoading, setDataLoading] = useState<boolean>(true);
//   const [dataError, setDataError] = useState<string | null>(null);

//   const [selectedFilterStoreId, setSelectedFilterStoreId] = useState<number>(0);
//   const [selectedFilterStatus, setSelectedFilterStatus] =
//     useState<string>("all");
//   const [selectedFilterPaidStatus, setSelectedFilterPaidStatus] =
//     useState<string>("all");
//   const [selectedFilterCustomerType, setSelectedFilterCustomerType] =
//     useState<string>("all");
//   const [selectedFilterDate, setSelectedFilterDate] = useState<Date | null>(
//     null
//   );
//   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

//   const [showNewDirectBookingForm, setShowNewDirectBookingForm] =
//     useState<boolean>(false);
//   const [newDirectBookingData, setNewDirectBookingData] =
//     useState<AdminDirectBookingPayload>({
//       bookingType: "Package",
//       storeId: 0,
//       customerName: "",
//       customerPhone: "",
//       customerEmail: "",
//       packageId: null,
//       price: null,
//       overs: null,
//     });
//   const [isSubmittingDirect, setIsSubmittingDirect] = useState<boolean>(false);
//   const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] =
//     useState<DisplayBookingItem | null>(null);

//   const [showCustomerBookingModal, setShowCustomerBookingModal] =
//     useState<boolean>(false);
//   const [customerBookingData, setCustomerBookingData] =
//     useState<NewBookingPayload>({
//       bookingType: "Package",
//       customerId: 0,
//       storeId: 0,
//       packageId: null,
//       price: null,
//       overs: null,
//     });
//   const [isSubmittingCustomer, setIsSubmittingCustomer] =
//     useState<boolean>(false);
//   const navigation = useNavigation<DrawerNavigationProp<any>>();

//   const params = useLocalSearchParams();
//   const { storeId, storeName } = params;

//   console.log("Data1", storeId);
//   console.log("Data2", storeName);

//   const loadBookingsFiltered = async (
//     filterType: "all" | "store" | "status" | "paid" | "customerType" | "date",
//     value?: any
//   ) => {
//     try {
//       setLoading(true);
//       setError(null);
//       let apiData: BookingData[] = [];

//       switch (filterType) {
//         case "store":
//           apiData = await fetchBookingsByStoreApi(value as number);
//           break;
//         case "status":
//           apiData = await fetchBookingsByStatusApi(value as string);
//           break;
//         case "paid":
//           apiData = await fetchBookingsByPaidStatusApi(value as string);
//           break;
//         case "customerType":
//           apiData = await fetchBookingsByCustomerTypeApi(value as string);
//           break;
//         case "date":
//           const formattedDate = (value as Date)?.toISOString().split("T")[0];
//           apiData = await fetchBookingsByDateApi(formattedDate);
//           break;
//         case "all":
//         default:
//           apiData = await fetchBookingsApi();
//           break;
//       }

//       const mappedData: DisplayBookingItem[] = apiData.map((booking) => ({
//         id: booking.id,
//         name: booking.customer.name,
//         phone: booking.customer?.phone || "N/A",
//         bookingsTypes: booking.bookingType || "N/A", // Added to match DisplayBookingItem type
//         status: booking.paid ? "PAID" : "UNPAID", // This also includes the overall booking status like PENDING
//         store: booking.store.name,
//         packageName: booking.package?.name || "N/A",
//         packageType: booking.package?.type || "N/A",
//         overs: booking.overs || 0,
//         oversLeft: booking.oversLeft || 0,
//         price: booking.price || 0,
//         paidTo: booking.paymentMarkedBy || "N/A",
//         paymentDate: booking.paymentMarkedAt?.split("T")[0] || "N/A",
//         date: booking.date || "N/A",
//         time: booking.time || "N/A",
//       }));
//       setBookings(mappedData);
//     } catch (err) {
//       console.error("Failed to fetch bookings with filter:", err);
//       setError("Failed to load bookings. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadDropdownData = async () => {
//     try {
//       setDataLoading(true);
//       setDataError(null);
//       const [customersResponse, storesResponse, packagesResponse] =
//         await Promise.all([
//           fetchCustomersApi(),
//           fetchStoresApi(),
//           fetchPackagesApi(),
//         ]);

//       setCustomers(customersResponse.customers || []);
//       setStores(storesResponse.stores || []);
//       setPackages(packagesResponse.packages || []);
//     } catch (err) {
//       console.error("Failed to fetch dropdown data:", err);
//       setDataError("Failed to load necessary data for forms.");
//     } finally {
//       setDataLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initialStoreId = params.storeId ? parseInt(params.storeId as string, 10) : 0;

//     const loadData = async () => {
//       if (initialStoreId && initialStoreId > 0) {
//         await loadBookingsFiltered("store", initialStoreId);
//         setSelectedFilterStoreId(initialStoreId);
//       } else {
//         await loadBookingsFiltered("all");
//       }
//       await loadDropdownData();
//     };

//     loadData();

//   }, [params.storeId]); // Add params.storeId to the dependency array

//   const handleFilterStoreChange = (itemValue: number) => {
//     setSelectedFilterStoreId(itemValue);
//     setSelectedFilterStatus("all");
//     setSelectedFilterPaidStatus("all");
//     setSelectedFilterCustomerType("all");
//     setSelectedFilterDate(null);
//     if (itemValue === 0) {
//       loadBookingsFiltered("all");
//     } else {
//       loadBookingsFiltered("store", itemValue);
//     }
//   };

//   const handleFilterStatusChange = (itemValue: string) => {
//     setSelectedFilterStatus(itemValue);
//     setSelectedFilterStoreId(0);
//     setSelectedFilterPaidStatus("all");
//     setSelectedFilterCustomerType("all");
//     setSelectedFilterDate(null);
//     if (itemValue === "all") {
//       loadBookingsFiltered("all");
//     } else {
//       loadBookingsFiltered("status", itemValue);
//     }
//   };

//   const handleFilterPaidStatusChange = (itemValue: string) => {
//     setSelectedFilterPaidStatus(itemValue);
//     setSelectedFilterStoreId(0);
//     setSelectedFilterStatus("all");
//     setSelectedFilterCustomerType("all");
//     setSelectedFilterDate(null);
//     if (itemValue === "all") {
//       loadBookingsFiltered("all");
//     } else {
//       loadBookingsFiltered("paid", itemValue);
//     }
//   };

//   const handleFilterCustomerTypeChange = (itemValue: string) => {
//     setSelectedFilterCustomerType(itemValue);
//     setSelectedFilterStoreId(0);
//     setSelectedFilterStatus("all");
//     setSelectedFilterPaidStatus("all");
//     setSelectedFilterDate(null);
//     if (itemValue === "all") {
//       loadBookingsFiltered("all");
//     } else {
//       loadBookingsFiltered("customerType", itemValue);
//     }
//   };

//   const handleFilterDateChange = (event: any, selectedDate?: Date) => {
//     setShowDatePicker(Platform.OS === "ios");
//     if (selectedDate) {
//       setSelectedFilterDate(selectedDate);
//       setSelectedFilterStoreId(0);
//       setSelectedFilterStatus("all");
//       setSelectedFilterPaidStatus("all");
//       setSelectedFilterCustomerType("all");
//       loadBookingsFiltered("date", selectedDate);
//     } else {
//       // If user cancels date selection, reset filter or keep previous
//       // For now, let's reset to all bookings if date selection is cancelled
//       // setSelectedFilterDate(null);
//       // loadBookingsFiltered("all");
//     }
//   };

//   const handleNewDirectBookingFormChange = (
//     field: keyof AdminDirectBookingPayload,
//     value: string | number | null
//   ) => {
//     setNewDirectBookingData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const handleCreateDirectBooking = async () => {
//     setIsSubmittingDirect(true);

//     let payload: AdminDirectBookingPayload = {
//       storeId: newDirectBookingData.storeId,
//       bookingType: newDirectBookingData.bookingType,
//       customerName: newDirectBookingData.customerName,
//       customerPhone: newDirectBookingData.customerPhone,
//       customerEmail: newDirectBookingData.customerEmail,
//     };

//     if (newDirectBookingData.bookingType === "Package") {
//       if (!newDirectBookingData.packageId) {
//         Alert.alert(
//           "Validation Error",
//           "Package is required for Package booking."
//         );
//         setIsSubmittingDirect(false);
//         return;
//       }
//       payload.packageId = newDirectBookingData.packageId;
//     } else {
//       if (!newDirectBookingData.overs || !newDirectBookingData.price) {
//         Alert.alert(
//           "Validation Error",
//           "Overs and Price are required for Custom booking."
//         );
//         setIsSubmittingDirect(false);
//         return;
//       }
//       payload.overs = parseInt(newDirectBookingData.overs as any);
//       payload.price = parseFloat(newDirectBookingData.price as any);
//     }

//     if (
//       payload.storeId === 0 ||
//       !payload.customerName ||
//       !payload.customerPhone ||
//       !payload.customerEmail
//     ) {
//       Alert.alert(
//         "Validation Error",
//         "Store, Customer Name, Phone, and Email are required."
//       );
//       setIsSubmittingDirect(false);
//       return;
//     }

//     try {
//       await createDirectBookingApi(payload);
//       Alert.alert("Success", "Direct booking created successfully!");
//       setNewDirectBookingData({
//         bookingType: "Package",
//         storeId: 0,
//         customerName: "",
//         customerPhone: "",
//         customerEmail: "",
//         packageId: null,
//         price: null,
//         overs: null,
//       });
//       setShowNewDirectBookingForm(false);
//       loadBookingsFiltered("all");
//     } catch (err) {
//       Alert.alert(
//         "Error",
//         "Failed to create direct booking. Please check your input and try again."
//       );
//       console.error("Direct booking submission error:", err);
//     } finally {
//       setIsSubmittingDirect(false);
//     }
//   };

//   const handleCustomerBookingFormChange = (
//     field: keyof NewBookingPayload,
//     value: string | number | null
//   ) => {
//     setCustomerBookingData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const handleCreateCustomerBooking = async () => {
//     setIsSubmittingCustomer(true);
//     let payload: NewBookingPayload = {
//       customerId: parseInt(customerBookingData.customerId as any),
//       storeId: parseInt(customerBookingData.storeId as any),
//       bookingType: customerBookingData.bookingType,
//     };

//     if (customerBookingData.bookingType === "Package") {
//       if (!customerBookingData.packageId) {
//         Alert.alert(
//           "Validation Error",
//           "Package is required for Package booking."
//         );
//         setIsSubmittingCustomer(false);
//         return;
//       }
//       payload.packageId = parseInt(customerBookingData.packageId as any);
//     } else {
//       if (!customerBookingData.overs || !customerBookingData.price) {
//         Alert.alert(
//           "Validation Error",
//           "Overs and Price are required for Custom booking."
//         );
//         setIsSubmittingCustomer(false);
//         return;
//       }
//       payload.overs = parseInt(customerBookingData.overs as any);
//       payload.price = parseFloat(customerBookingData.price as any);
//     }

//     if (
//       isNaN(payload.customerId) ||
//       payload.customerId === 0 ||
//       isNaN(payload.storeId) ||
//       payload.storeId === 0
//     ) {
//       Alert.alert("Validation Error", "Customer and Store must be selected.");
//       setIsSubmittingCustomer(false);
//       return;
//     }

//     try {
//       await createBookingApi(payload);
//       Alert.alert("Success", "Booking created successfully!");
//       setCustomerBookingData({
//         bookingType: "Package",
//         customerId: 0,
//         storeId: 0,
//         packageId: null,
//         price: null,
//         overs: null,
//       });
//       setShowCustomerBookingModal(false);
//       loadBookingsFiltered("all");
//     } catch (err) {
//       Alert.alert(
//         "Error",
//         "Failed to create booking. Please check your input and try again."
//       );
//       console.error("Booking submission error:", err);
//     } finally {
//       setIsSubmittingCustomer(false);
//     }
//   };

//   if (loading || dataLoading) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text style={styles.loadingText}>Loading data...</Text>
//       </View>
//     );
//   }

//   if (error || dataError) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <Text style={styles.errorText}>{error || dataError}</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={() => {
//             loadBookingsFiltered("all");
//             loadDropdownData();
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

//       <View style={styles.header}>
//         <TouchableOpacity
//           // onPress={() => navigation.openDrawer()}
//           style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
//         >
//           {/* <Feather name="menu" size={24} color="black" /> */}
//           <Text style={styles.headerTitle}>Bookings</Text>
//         </TouchableOpacity>
//         {/* <Ionicons name="person-circle-outline" size={28} color="black" /> */}
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.filterRow}
//       >
//         <View style={styles.filterPickerContainer}>
//           <Picker
//             selectedValue={selectedFilterStoreId}
//             onValueChange={(itemValue: number) =>
//               handleFilterStoreChange(itemValue)
//             }
//             style={styles.filterPickerStyle}
//             itemStyle={styles.filterPickerItemStyle}
//           >
//             <Picker.Item label="All Stores" value={0} />
//             {stores.map((store) => (
//               <Picker.Item key={store.id} label={store.name} value={store.id} />
//             ))}
//           </Picker>
//         </View>

//         <View style={styles.filterPickerContainer}>
//           <Picker
//             selectedValue={selectedFilterStatus}
//             onValueChange={(itemValue: string) =>
//               handleFilterStatusChange(itemValue)
//             }
//             style={styles.filterPickerStyle}
//             itemStyle={styles.filterPickerItemStyle}
//           >
//             <Picker.Item label="Status" value="all" />
//             <Picker.Item label="Pending" value="0" />
//             <Picker.Item label="Completed" value="1" />
//           </Picker>
//         </View>

//         <View style={styles.filterPickerContainer}>
//           <Picker
//             selectedValue={selectedFilterPaidStatus}
//             onValueChange={(itemValue: string) =>
//               handleFilterPaidStatusChange(itemValue)
//             }
//             style={styles.filterPickerStyle}
//             itemStyle={styles.filterPickerItemStyle}
//           >
//             <Picker.Item label="Paid Status" value="all" />
//             <Picker.Item label="Unpaid" value="0" />
//             <Picker.Item label="Paid" value="1" />
//           </Picker>
//         </View>

//         <View style={styles.filterPickerContainer}>
//           <Picker
//             selectedValue={selectedFilterCustomerType}
//             onValueChange={(itemValue: string) =>
//               handleFilterCustomerTypeChange(itemValue)
//             }
//             style={styles.filterPickerStyle}
//             itemStyle={styles.filterPickerItemStyle}
//           >
//             <Picker.Item label="Customer Type" value="all" />
//             <Picker.Item label="NORMAL" value="0" />
//             <Picker.Item label="IVR" value="1" />
//             <Picker.Item label="WHATSAPP" value="2" />
//             <Picker.Item label="ENQUIRY" value="3" />
//           </Picker>
//         </View>

//         <TouchableOpacity
//           style={styles.datePickerButton}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <Text style={styles.datePickerButtonText}>
//             {selectedFilterDate
//               ? selectedFilterDate.toLocaleDateString("en-GB")
//               : "Select Date"}
//           </Text>
//           <AntDesign name="calendar" size={16} color="#fff" />
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             testID="dateTimePicker"
//             value={selectedFilterDate || new Date()}
//             mode="date"
//             display="default"
//             onChange={handleFilterDateChange}
//             maximumDate={new Date()}
//           />
//         )}
//       </ScrollView>

//       <View style={styles.searchRow}>
//         <TextInput
//           placeholder="Search"
//           placeholderTextColor={Colors.STB.buttons}
//           style={styles.searchInput}
//         />
//         <TouchableOpacity
//           style={styles.smallButton}
//           onPress={() => setShowCustomerBookingModal(true)}
//         >
//           <Text style={styles.buttonText}>Existing</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.smallButton}
//           onPress={() => setShowNewDirectBookingForm(true)}
//         >
//           <Text style={styles.buttonText}>+ New</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Horizontal Scroll for Table Content */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={true}>
//         <View>
//           {/* Table Header */}
//           <View style={styles.tableHeader}>
//             <Text style={[styles.columnHeader, { width: 100 }]}>CUSTOMER</Text>
//             <Text style={[styles.columnHeader, { width: 120 }]}>STORE</Text>
//             <Text style={[styles.columnHeader, { width: 90 }]}>PHONE</Text>
//             <Text style={[styles.columnHeader, { width: 70 }]}>BOOKINGS TYPE</Text>
//             <Text style={[styles.columnHeader, { width: 70 }]}>STATUS</Text>
//             <Text style={[styles.columnHeader, { width: 90 }]}>PACKAGE</Text>
//             <Text style={[styles.columnHeader, { width: 80 }]}>PACKAGE TYPE</Text>
//             <Text style={[styles.columnHeader, { width: 60 }]}>OVERS</Text>
//             <Text style={[styles.columnHeader, { width: 60 }]}>OVERS LEFT</Text>
//             <Text style={[styles.columnHeader, { width: 70 }]}>PRICE</Text>
//             <Text style={[styles.columnHeader, { width: 80 }]}>PAID TO</Text>
//             <Text style={[styles.columnHeader, { width: 90 }]}>PAYMENT DATE</Text>
//             <Text style={[styles.columnHeader, { width: 90 }]}>DATE</Text>
//             <Text style={[styles.columnHeader, { width: 60 }]}>TIME</Text>
//             <Text style={[styles.columnHeader, { width: 60, textAlign: "right" }]}>
//               ACTIONS
//             </Text>
//           </View>

//           {/* Booking List - Vertical Scroll Handled by FlatList */}
//           <FlatList
//             data={bookings}
//             showsVerticalScrollIndicator={false}
//             keyExtractor={(item) => item.id.toString()}
//             contentContainerStyle={{ paddingBottom: 30 }}
//             renderItem={({ item }) => (
//               <View style={styles.row}>
//                 <Text style={[styles.columnText, { width: 100 }]}>{item.name}</Text>
//                 <Text style={[styles.columnText, { width: 120 }]}>{item.store}</Text>
//                 <Text style={[styles.columnText, { width: 90 }]}>{item.phone}</Text>
//                 <Text style={[styles.columnText, { width: 70 }]}>{item.bookingsTypes}</Text>
//                 <Text
//                   style={[
//                     styles.columnText,
//                     { width: 70 },
//                     item.status === "PAID" ? styles.paid : styles.unpaid,
//                   ]}
//                 >
//                   {item.status}
//                 </Text>
//                 <Text style={[styles.columnText, { width: 90 }]}>{item.packageName}</Text>
//                 <Text style={[styles.columnText, { width: 80 }]}>{item.packageType}</Text>
//                 <Text style={[styles.columnText, { width: 60 }]}>{item.overs}</Text>
//                 <Text style={[styles.columnText, { width: 60 }]}>{item.oversLeft}</Text>
//                 <Text style={[styles.columnText, { width: 70 }]}>₹{item.price}</Text>
//                 <Text style={[styles.columnText, { width: 80 }]}>{item.paidTo}</Text>
//                 <Text style={[styles.columnText, { width: 90 }]}>{item.paymentDate}</Text>
//                 <Text style={[styles.columnText, { width: 90 }]}>{item.date}</Text>
//                 <Text style={[styles.columnText, { width: 60 }]}>{item.time}</Text>
//                 <TouchableOpacity
//                   style={[styles.actionsColumn, { width: 60 }]}
//                   onPress={() => {
//                     setSelectedBooking(item);
//                     setShowBookingDetailsModal(true);
//                   }}
//                 >
//                   <Image source={require("@/assets/Logo/link.png")} />
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//         </View>
//       </ScrollView>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showBookingDetailsModal}
//         onRequestClose={() => setShowBookingDetailsModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={[styles.formContainer, { alignItems: "stretch" }]}>
//             <Text style={[styles.formTitle, { marginBottom: 10 }]}>
//               Bookings Details
//             </Text>
//             {selectedBooking && (
//               <>
//                 <Text style={styles.detailLabel}>
//                   Customer:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.name}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Phone:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.phone}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Total Bookings:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.bookingsTypes}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Store:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.store}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Package:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.packageName} ({selectedBooking.packageType})
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Overs:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.overs} (Left: {selectedBooking.oversLeft})
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Price:{" "}
//                   <Text style={styles.detailValue}>₹{selectedBooking.price}</Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Paid Status:{" "}
//                   <Text
//                     style={
//                       selectedBooking.status === "PAID"
//                         ? styles.paid
//                         : styles.unpaid
//                     }
//                   >
//                     {selectedBooking.status}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Paid To:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.paidTo}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Payment Date:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.paymentDate}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Booking Date:{" "}
//                   <Text style={styles.detailValue}>{selectedBooking.date}</Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Booking Time:{" "}
//                   <Text style={styles.detailValue}>{selectedBooking.time}</Text>
//                 </Text>
//               </>
//             )}

//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#17A34A",
//                 borderRadius: 8,
//                 paddingVertical: 12,
//                 alignItems: "center",
//                 marginVertical: 10,
//               }}
//               // onPress={handleMarkPaymentAsDone}
//             >
//               <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                 Mark Payment As Done
//               </Text>
//             </TouchableOpacity>

//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <Text
//                 style={{
//                   fontWeight: "bold",
//                   marginBottom: 5,
//                   alignSelf: "center",
//                 }}
//               >
//                 OVERS PLAYED
//               </Text>
//               <TextInput
//                 style={[styles.formInput, { marginBottom: 10, width: "60%" }]}
//                 placeholder="Enter Overs Played"
//                 placeholderTextColor="#94a3b8"
//                 // value={}
//                 // onChangeText={}
//               />
//             </View>

//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 gap: 10,
//               }}
//             >
//               <TouchableOpacity
//                 style={[styles.cancelButton, { flex: 1 }]}
//                 onPress={() => setShowBookingDetailsModal(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Close</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.submitButton, { flex: 1 }]}
//                 // onPress={handleSubmitOversPlayed}
//               >
//                 <Text style={styles.buttonText}>Submit</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showNewDirectBookingForm}
//         onRequestClose={() => {
//           if (!isSubmittingDirect) {
//             setShowNewDirectBookingForm(false);
//           }
//         }}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.modalOverlay}
//         >
//           <ScrollView contentContainerStyle={styles.formScrollContainer}>
//             <View style={styles.formContainer}>
//               <Text style={styles.formTitle}>Add New Direct Booking</Text>

//               <Text style={styles.inputLabel}>Booking Type</Text>
//               <View style={styles.typeSelectorContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     newDirectBookingData.bookingType === "Package" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     handleNewDirectBookingFormChange("bookingType", "Package")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       newDirectBookingData.bookingType === "Package" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Package
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     newDirectBookingData.bookingType === "Custom" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     handleNewDirectBookingFormChange("bookingType", "Custom")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       newDirectBookingData.bookingType === "Custom" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Custom
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.inputLabel}>Customer Name</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter Customer Name"
//                 placeholderTextColor="#94a3b8"
//                 value={newDirectBookingData.customerName}
//                 onChangeText={(text) =>
//                   handleNewDirectBookingFormChange("customerName", text)
//                 }
//               />

//               <Text style={styles.inputLabel}>Customer Phone</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter Customer Phone"
//                 placeholderTextColor="#94a3b8"
//                 keyboardType="phone-pad"
//                 value={newDirectBookingData.customerPhone}
//                 onChangeText={(text) =>
//                   handleNewDirectBookingFormChange("customerPhone", text)
//                 }
//               />

//               <Text style={styles.inputLabel}>Customer Email</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter Customer Email"
//                 placeholderTextColor="#94a3b8"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={newDirectBookingData.customerEmail}
//                 onChangeText={(text) =>
//                   handleNewDirectBookingFormChange("customerEmail", text)
//                 }
//               />

//               <Text style={styles.inputLabel}>Store</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={newDirectBookingData.storeId?.toString()}
//                   onValueChange={(itemValue) =>
//                     handleNewDirectBookingFormChange(
//                       "storeId",
//                       parseInt(itemValue as string, 10)
//                     )
//                   }
//                   style={styles.pickerStyle}
//                   itemStyle={styles.pickerItemStyle}
//                 >
//                   <Picker.Item label="Select a store" value="0" />
//                   {stores.map((store) => (
//                     <Picker.Item
//                       key={store.id}
//                       label={store.name}
//                       value={store.id.toString()}
//                     />
//                   ))}
//                 </Picker>
//               </View>

//               {newDirectBookingData.bookingType === "Package" ? (
//                 <>
//                   <Text style={styles.inputLabel}>Package</Text>
//                   <View style={styles.pickerContainer}>
//                     <Picker
//                       selectedValue={
//                         newDirectBookingData.packageId?.toString() || ""
//                       }
//                       onValueChange={(itemValue) =>
//                         handleNewDirectBookingFormChange(
//                           "packageId",
//                           parseInt(itemValue as string, 10)
//                         )
//                       }
//                       style={styles.pickerStyle}
//                       itemStyle={styles.pickerItemStyle}
//                     >
//                       <Picker.Item label="Select a package" value="" />
//                       {packages.map((pack) => (
//                         <Picker.Item
//                           key={pack.id}
//                           label={pack.name}
//                           value={pack.id.toString()}
//                         />
//                       ))}
//                     </Picker>
//                   </View>
//                 </>
//               ) : (
//                 <>
//                   <Text style={styles.inputLabel}>Overs</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Overs"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={newDirectBookingData.overs?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleNewDirectBookingFormChange("overs", text)
//                     }
//                   />

//                   <Text style={styles.inputLabel}>Price</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Price"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={newDirectBookingData.price?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleNewDirectBookingFormChange("price", text)
//                     }
//                   />
//                 </>
//               )}

//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[
//                     styles.submitButton,
//                     isSubmittingDirect && styles.submitButtonDisabled,
//                   ]}
//                   onPress={handleCreateDirectBooking}
//                   disabled={isSubmittingDirect}
//                 >
//                   {isSubmittingDirect ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.buttonText}>Submit</Text>
//                   )}
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => setShowNewDirectBookingForm(false)}
//                   disabled={isSubmittingDirect}
//                 >
//                   <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCustomerBookingModal}
//         onRequestClose={() => {
//           if (!isSubmittingCustomer) {
//             setShowCustomerBookingModal(false);
//           }
//         }}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.modalOverlay}
//         >
//           <ScrollView contentContainerStyle={styles.formScrollContainer}>
//             <View style={styles.formContainer}>
//               <Text style={styles.formTitle}>Add New Booking</Text>

//               <Text style={styles.inputLabel}>Booking Type</Text>
//               <View style={styles.typeSelectorContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     customerBookingData.bookingType === "Package" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     handleCustomerBookingFormChange("bookingType", "Package")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       customerBookingData.bookingType === "Package" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Package
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     customerBookingData.bookingType === "Custom" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     handleCustomerBookingFormChange("bookingType", "Custom")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       customerBookingData.bookingType === "Custom" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Custom
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.inputLabel}>Customer</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={customerBookingData.customerId.toString()}
//                   onValueChange={(itemValue) =>
//                     handleCustomerBookingFormChange("customerId", itemValue)
//                   }
//                   style={styles.pickerStyle}
//                   itemStyle={styles.pickerItemStyle}
//                 >
//                   <Picker.Item label="Select a customer" value="0" />
//                   {customers.map((customer) => (
//                     <Picker.Item
//                       key={customer.id}
//                       label={customer.name}
//                       value={customer.id.toString()}
//                     />
//                   ))}
//                 </Picker>
//               </View>

//               <Text style={styles.inputLabel}>Store</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={customerBookingData.storeId.toString()}
//                   onValueChange={(itemValue) =>
//                     handleCustomerBookingFormChange("storeId", itemValue)
//                   }
//                   style={styles.pickerStyle}
//                   itemStyle={styles.pickerItemStyle}
//                 >
//                   <Picker.Item label="Select a store" value="0" />
//                   {stores.map((store) => (
//                     <Picker.Item
//                       key={store.id}
//                       label={store.name}
//                       value={store.id.toString()}
//                     />
//                   ))}
//                 </Picker>
//               </View>

//               {customerBookingData.bookingType === "Package" ? (
//                 <>
//                   <Text style={styles.inputLabel}>Package</Text>
//                   <View style={styles.pickerContainer}>
//                     <Picker
//                       selectedValue={
//                         customerBookingData.packageId?.toString() || ""
//                       }
//                       onValueChange={(itemValue) =>
//                         handleCustomerBookingFormChange("packageId", itemValue)
//                       }
//                       style={styles.pickerStyle}
//                       itemStyle={styles.pickerItemStyle}
//                     >
//                       <Picker.Item label="Select a package" value="" />
//                       {packages.map((pack) => (
//                         <Picker.Item
//                           key={pack.id}
//                           label={pack.name}
//                           value={pack.id.toString()}
//                         />
//                       ))}
//                     </Picker>
//                   </View>
//                 </>
//               ) : (
//                 <>
//                   <Text style={styles.inputLabel}>Overs</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Overs"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={customerBookingData.overs?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleCustomerBookingFormChange("overs", text)
//                     }
//                   />

//                   <Text style={styles.inputLabel}>Price</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Price"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={customerBookingData.price?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleCustomerBookingFormChange("price", text)
//                     }
//                   />
//                 </>
//               )}

//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[
//                     styles.submitButton,
//                     isSubmittingCustomer && styles.submitButtonDisabled,
//                   ]}
//                   onPress={handleCreateCustomerBooking}
//                   disabled={isSubmittingCustomer}
//                 >
//                   {isSubmittingCustomer ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.buttonText}>Submit</Text>
//                   )}
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => setShowCustomerBookingModal(false)}
//                   disabled={isSubmittingCustomer}
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
//     backgroundColor: Colors.STB.background,
//     paddingHorizontal: 16,
//     paddingTop: StatusBar.currentHeight || 30,
//   },
//   centerContent: {
//     flex: 1,
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
//     marginVertical: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "black",
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 16,
//     top: 8,
//   },
//   searchInput: {
//     flex: 1,
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//     borderWidth: 1.5,
//     borderColor: Colors.STB.buttons,
//   },
//   smallButton: {
//     backgroundColor: Colors.STB.buttons,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
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
//     // Sum of all column widths (100+90+70+70+120+90+80+60+60+70+80+90+90+60+60 = 1200)
//     width: 1200,
//   },
//   columnHeader: {
//     color: "#94a3b8",
//     fontSize: 11,
//     fontWeight: "600",
//     flexShrink: 0,
//     textAlign: 'left',
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 10,
//     borderBottomColor: "#1e293b",
//     borderBottomWidth: 1,
//     alignItems: "center",
//     // Fixed width for the entire data row, must match tableHeader's width
//     width: 1200,
//   },
//   columnText: {
//     color: Colors.STB.text,
//     fontSize: 11,
//     flexShrink: 0,
//   },
//   paid: {
//     color: "#10b981",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   unpaid: {
//     color: "#ef4444",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   actionsColumn: {
//     alignItems: "flex-end",
//     // flexShrink: 0, // already applied by default due to width
//   },
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
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     width: modalCalculatedWidth,
//     alignSelf: "center",
//   },
//   formTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "black",
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
//     color: "#000",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     height: 40,
//     width: "100%",
//     marginBottom: 15,
//     fontSize: 12,
//     borderWidth: 1,
//     borderColor: "lightgrey",
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
//     backgroundColor: "#60a5fa",
//   },
//   cancelButton: {
//     backgroundColor: "#F44043",
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   cancelButtonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   typeSelectorContainer: {
//     flexDirection: "row",
//     backgroundColor: "#0f172a",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#334155",
//     overflow: "hidden",
//     marginBottom: 15,
//   },
//   typeSelectorButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   typeSelectorButtonActive: {
//     backgroundColor: "#3b82f6",
//   },
//   typeSelectorText: {
//     color: "#cbd5e0",
//     fontWeight: "600",
//     fontSize: 15,
//   },
//   typeSelectorTextActive: {
//     color: "#fff",
//   },
//   pickerContainer: {
//     backgroundColor: "#0f172a",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#334155",
//     marginBottom: 15,
//     overflow: "hidden",
//     height: 50,
//     justifyContent: "center",
//   },
//   pickerStyle: {
//     color: "#fff",
//     height: 50,
//     width: "100%",
//   },
//   pickerItemStyle: {
//     color: "#fff", // iOS specific
//     fontSize: 16,
//   },
//   filterRow: {
//     flexDirection: "row",
//     paddingVertical: 10,
//     bottom: 8,
//   },
//   filterPickerContainer: {
//     backgroundColor: Colors.STB.buttons,
//     borderRadius: 8,
//     overflow: "hidden",
//     height: 40,
//     justifyContent: "center",
//     minWidth: 160,
//     marginRight: 10,
//     flexShrink: 1,
//   },
//   filterPickerStyle: {
//     color: "#fff",
//     height: 50,
//     width: "100%",
//     fontSize: 14,
//   },
//   filterPickerItemStyle: {
//     color: "#fff", // iOS specific
//     fontSize: 14,
//   },
//   datePickerButton: {
//     backgroundColor: Colors.STB.buttons,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//     height: 40,
//     flexDirection: "row",
//     gap: 8,
//   },
//   datePickerButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   detailLabel: {
//     fontWeight: "bold",
//     marginBottom: 5,
//     color: "black",
//   },
//   detailValue: {
//     fontWeight: "normal",
//     color: "#444",
//   },
// });

// export default BookingsScreen;

// import {
//   createBookingApi,
//   createDirectBookingApi,
//   fetchBookingsApi,
//   fetchBookingsByCustomerTypeApi,
//   fetchBookingsByDateApi,
//   fetchBookingsByPaidStatusApi,
//   fetchBookingsByStatusApi,
//   fetchBookingsByStoreApi,
// } from "@/utils/bookingApi";
// import {
//   AdminDirectBookingPayload,
//   BookingData, // Assuming this exists and has the necessary fields
//   NewBookingPayload,
// } from "@/utils/types/bookingTypes";
// import { AntDesign, Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker"; // Import DatePicker
// import { Picker } from "@react-native-picker/picker";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   Image,
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

// // Assuming you have these API utility functions defined, e.g., in a new `dataFetchApi.ts`
// import { Colors } from "@/constants/Colors";
// import {
//   fetchCustomersApi,
//   fetchPackagesApi,
//   fetchStoresApi,
// } from "@/utils/bookingApi"; // Ensure these return { customers: [] } etc.
// import { DrawerNavigationProp } from "@react-navigation/drawer";
// import { useNavigation } from "@react-navigation/native";
// import { useLocalSearchParams } from "expo-router";
// // IMPORTANT: Using your provided axiosInstance from '@/utils/axiosInstance'
// import axiosInstance from '@/utils/axiosInstance';


// interface Customer {
//   id: number;
//   name: string;
//   phone?: string; // Make phone optional as it might not always be there
//   totalBookings?: number; // Add totalBookings to customer interface if it exists on backend
// }

// interface Store {
//   id: number;
//   name: string;
// }

// interface Package {
//   id: number;
//   name: string;
//   type: string; // Assuming package has a type
// }

// // Extend DisplayBookingItem with new fields
// interface DisplayBookingItem {
//   id: number;
//   name: string; // Customer Name
//   phone: string; // Customer Phone
//   bookingsTypes: string; // Total bookings for this customer
//   // Changed 'status' to reflect payment status for table display
//   status: "PAID" | "UNPAID"; // Now explicitly reflects payment status
//   store: string; // Store Name
//   packageName: string; // Name of the package booked
//   packageType: string; // Type of the package booked
//   overs: number; // Total overs in the booking/package
//   oversLeft: number; // Overs remaining
//   price: number; // Price of the booking/package
//   paidTo: string; // Who the payment was marked by (paymentMarkedBy)
//   paymentDate: string; // Date of payment (paymentMarkedAt)
//   date: string; // Booking Date (YYYY-MM-DD)
//   time: string; // Booking Time (HH:MM)
//   paid: boolean; // Explicitly add paid status
// }

// const screenWidth = Dimensions.get("window").width;
// const modalCalculatedWidth = screenWidth * 0.9;

// // Custom Message Modal Component
// interface MessageModalProps {
//   isVisible: boolean;
//   message: string;
//   onClose: () => void;
//   type: 'success' | 'error' | 'info';
// }

// const MessageModal: React.FC<MessageModalProps> = ({ isVisible, message, onClose, type }) => {
//   if (!isVisible) return null;

//   let backgroundColor = '#fff';
//   let textColor = 'black';
//   let title = 'Info';

//   if (type === 'success') {
//     backgroundColor = '#d1fae5'; // green-100
//     textColor = '#065f46'; // green-800
//     title = 'Success!';
//   } else if (type === 'error') {
//     backgroundColor = '#fee2e2'; // red-100
//     textColor = '#991b1b'; // red-800
//     title = 'Error!';
//   }

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={isVisible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <View style={[styles.messageModalContainer, { backgroundColor }]}>
//           <Text style={[styles.messageModalTitle, { color: textColor }]}>{title}</Text>
//           <Text style={[styles.messageModalText, { color: textColor }]}>{message}</Text>
//           <TouchableOpacity
//             style={[styles.messageModalButton, { backgroundColor: type === 'success' ? '#10b981' : (type === 'error' ? '#ef4444' : '#3b82f6') }]}
//             onPress={onClose}
//           >
//             <Text style={styles.buttonText}>OK</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };


// const BookingsScreen = () => {
//   const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<DisplayBookingItem[]>([]); // New state for filtered bookings
//   console.log("All Bookings", bookings);

//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [stores, setStores] = useState<Store[]>([]);
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [dataLoading, setDataLoading] = useState<boolean>(true);
//   const [dataError, setDataError] = useState<string | null>(null);

//   const [selectedFilterStoreId, setSelectedFilterStoreId] = useState<number>(0);
//   const [selectedFilterStatus, setSelectedFilterStatus] =
//     useState<string>("all");
//   const [selectedFilterPaidStatus, setSelectedFilterPaidStatus] =
//     useState<string>("all");
//   const [selectedFilterCustomerType, setSelectedFilterCustomerType] =
//     useState<string>("all");
//   const [selectedFilterDate, setSelectedFilterDate] = useState<Date | null>(
//     null
//   );
//   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

//   const [showNewDirectBookingForm, setShowNewDirectBookingForm] =
//     useState<boolean>(false);
//   const [newDirectBookingData, setNewDirectBookingData] =
//     useState<AdminDirectBookingPayload>({
//       bookingType: "Package",
//       storeId: 0,
//       customerName: "",
//       customerPhone: "",
//       customerEmail: "",
//       packageId: null,
//       price: null,
//       overs: null,
//     });
//   const [isSubmittingDirect, setIsSubmittingDirect] = useState<boolean>(false);

//   const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] =
//     useState<DisplayBookingItem | null>(null);
//   const [oversPlayedInput, setOversPlayedInput] = useState<string>(''); // State for overs played input in modal

//   // State for custom message modal
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [messageModalContent, setMessageModalContent] = useState({ message: '', type: 'info' as 'info' | 'success' | 'error' });

//   const [showCustomerBookingModal, setShowCustomerBookingModal] =
//     useState<boolean>(false);
//   const [customerBookingData, setCustomerBookingData] =
//     useState<NewBookingPayload>({
//       bookingType: "Package",
//       customerId: 0,
//       storeId: 0,
//       packageId: null,
//       price: null,
//       overs: null,
//     });
//   const [isSubmittingCustomer, setIsSubmittingCustomer] =
//     useState<boolean>(false);
//   const navigation = useNavigation<DrawerNavigationProp<any>>();

//   const params = useLocalSearchParams();
//   const { storeId, storeName } = params;

//   // State for search input
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   console.log("Data1", storeId);
//   console.log("Data2", storeName);

//   const loadBookingsFiltered = async (
//     filterType: "all" | "store" | "status" | "paid" | "customerType" | "date",
//     value?: any
//   ) => {
//     try {
//       setLoading(true);
//       setError(null);
//       let apiData: BookingData[] = [];

//       switch (filterType) {
//         case "store":
//           apiData = await fetchBookingsByStoreApi(value as number);
//           break;
//         case "status":
//           apiData = await fetchBookingsByStatusApi(value as string);
//           break;
//         case "paid":
//           apiData = await fetchBookingsByPaidStatusApi(value as string);
//           break;
//         case "customerType":
//           apiData = await fetchBookingsByCustomerTypeApi(value as string);
//           break;
//         case "date":
//           const formattedDate = (value as Date)?.toISOString().split("T")[0];
//           apiData = await fetchBookingsByDateApi(formattedDate);
//           break;
//         case "all":
//         default:
//           apiData = await fetchBookingsApi();
//           break;
//       }

//       const mappedData: DisplayBookingItem[] = apiData.map((booking) => ({
//         id: booking.id,
//         name: booking.customer.name,
//         phone: booking.customer?.phone || "N/A",
//         bookingsTypes: booking.bookingType || "N/A", // Added to match DisplayBookingItem type
//         status: booking.paid ? "PAID" : "UNPAID", // Changed: Map directly to PAID/UNPAID based on 'paid' boolean
//         paid: booking.paid, // Directly use the paid boolean
//         store: booking.store.name,
//         packageName: booking.package?.name || "N/A",
//         packageType: booking.package?.type || "N/A",
//         overs: booking.overs || 0,
//         oversLeft: booking.oversLeft || 0,
//         price: booking.price || 0,
//         paidTo: booking.paymentMarkedBy || "N/A",
//         paymentDate: booking.paymentMarkedAt?.split("T")[0] || "N/A",
//         date: booking.date || "N/A",
//         time: booking.time || "N/A",
//       }));
//       setBookings(mappedData);
//       setFilteredBookings(mappedData); // Initialize filtered bookings
//     } catch (err) {
//       console.error("Failed to fetch bookings with filter:", err);
//       setError("Failed to load bookings. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadDropdownData = async () => {
//     try {
//       setDataLoading(true);
//       setDataError(null);
//       const [customersResponse, storesResponse, packagesResponse] =
//         await Promise.all([
//           fetchCustomersApi(),
//           fetchStoresApi(),
//           fetchPackagesApi(),
//         ]);

//       setCustomers(customersResponse.customers || []);
//       setStores(storesResponse.stores || []);
//       setPackages(packagesResponse.packages || []);
//     } catch (err) {
//       console.error("Failed to fetch dropdown data:", err);
//       setDataError("Failed to load necessary data for forms.");
//     } finally {
//       setDataLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initialStoreId = params.storeId ? parseInt(params.storeId as string, 10) : 0;

//     const loadData = async () => {
//       if (initialStoreId && initialStoreId > 0) {
//         await loadBookingsFiltered("store", initialStoreId);
//         setSelectedFilterStoreId(initialStoreId);
//       } else {
//         await loadBookingsFiltered("all");
//       }
//       await loadDropdownData();
//     };

//     loadData();

//   }, [params.storeId]); // Add params.storeId to the dependency array

//   // Effect to apply search filter whenever bookings or searchQuery changes
//   useEffect(() => {
//     const applySearchFilter = () => {
//       if (!searchQuery) {
//         setFilteredBookings(bookings); // If search query is empty, show all bookings
//         return;
//       }
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       const newFilteredBookings = bookings.filter(booking =>
//         booking.name.toLowerCase().includes(lowerCaseQuery) ||
//         (booking.phone && booking.phone.toLowerCase().includes(lowerCaseQuery))
//       );
//       setFilteredBookings(newFilteredBookings);
//     };
//     applySearchFilter();
//   }, [bookings, searchQuery]);


//   const handleFilterStoreChange = (itemValue: number) => {
//     setSelectedFilterStoreId(itemValue);
//     setSelectedFilterStatus("all");
//     setSelectedFilterPaidStatus("all");
//     setSelectedFilterCustomerType("all");
//     setSelectedFilterDate(null);
//     setSearchQuery(''); // Clear search on filter change
//     if (itemValue === 0) {
//       loadBookingsFiltered("all");
//     } else {
//       loadBookingsFiltered("store", itemValue);
//     }
//   };

//   const handleFilterStatusChange = (itemValue: string) => {
//     setSelectedFilterStatus(itemValue);
//     setSelectedFilterStoreId(0);
//     setSelectedFilterPaidStatus("all");
//     setSelectedFilterCustomerType("all");
//     setSelectedFilterDate(null);
//     setSearchQuery(''); // Clear search on filter change
//     if (itemValue === "all") {
//       loadBookingsFiltered("all");
//     } else {
//       loadBookingsFiltered("status", itemValue);
//     }
//   };

//   const handleFilterPaidStatusChange = (itemValue: string) => {
//     setSelectedFilterPaidStatus(itemValue);
//     setSelectedFilterStoreId(0);
//     setSelectedFilterStatus("all");
//     setSelectedFilterCustomerType("all");
//     setSelectedFilterDate(null);
//     setSearchQuery(''); // Clear search on filter change
//     if (itemValue === "all") {
//       loadBookingsFiltered("all");
//     } else {
//       loadBookingsFiltered("paid", itemValue);
//     }
//   };

//   const handleFilterCustomerTypeChange = (itemValue: string) => {
//     setSelectedFilterCustomerType(itemValue);
//     setSelectedFilterStoreId(0);
//     setSelectedFilterStatus("all");
//     setSelectedFilterPaidStatus("all");
//     setSelectedFilterDate(null);
//     setSearchQuery(''); // Clear search on filter change
//     if (itemValue === "all") {
//       loadBookingsFiltered("all");
//     } else {
//       loadBookingsFiltered("customerType", itemValue);
//     }
//   };

//   const handleFilterDateChange = (event: any, selectedDate?: Date) => {
//     setShowDatePicker(Platform.OS === "ios");
//     if (selectedDate) {
//       setSelectedFilterDate(selectedDate);
//       setSelectedFilterStoreId(0);
//       setSelectedFilterStatus("all");
//       setSelectedFilterPaidStatus("all");
//       setSelectedFilterCustomerType("all");
//       setSearchQuery(''); // Clear search on filter change
//       loadBookingsFiltered("date", selectedDate);
//     } else {
//       // If user cancels date selection, reset filter or keep previous
//       // For now, let's reset to all bookings if date selection is cancelled
//       // setSelectedFilterDate(null);
//       // loadBookingsFiltered("all");
//     }
//   };

//   const handleNewDirectBookingFormChange = (
//     field: keyof AdminDirectBookingPayload,
//     value: string | number | null
//   ) => {
//     setNewDirectBookingData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const handleCreateDirectBooking = async () => {
//     setIsSubmittingDirect(true);

//     let payload: AdminDirectBookingPayload = {
//       storeId: newDirectBookingData.storeId,
//       bookingType: newDirectBookingData.bookingType,
//       customerName: newDirectBookingData.customerName,
//       customerPhone: newDirectBookingData.customerPhone,
//       customerEmail: newDirectBookingData.customerEmail,
//     };

//     if (newDirectBookingData.bookingType === "Package") {
//       if (!newDirectBookingData.packageId) {
//         setMessageModalContent({ message: "Package is required for Package booking.", type: 'error' });
//         setShowMessageModal(true);
//         setIsSubmittingDirect(false);
//         return;
//       }
//       payload.packageId = newDirectBookingData.packageId;
//     } else {
//       if (!newDirectBookingData.overs || !newDirectBookingData.price) {
//         setMessageModalContent({ message: "Overs and Price are required for Custom booking.", type: 'error' });
//         setShowMessageModal(true);
//         setIsSubmittingDirect(false);
//         return;
//       }
//       payload.overs = parseInt(newDirectBookingData.overs as any);
//       payload.price = parseFloat(newDirectBookingData.price as any);
//     }

//     if (
//       payload.storeId === 0 ||
//       !payload.customerName ||
//       !payload.customerPhone ||
//       !payload.customerEmail
//     ) {
//       setMessageModalContent({ message: "Store, Customer Name, Phone, and Email are required.", type: 'error' });
//       setShowMessageModal(true);
//       setIsSubmittingDirect(false);
//       return;
//     }

//     try {
//       await createDirectBookingApi(payload);
//       setMessageModalContent({ message: "Direct booking created successfully!", type: 'success' });
//       setShowMessageModal(true);
//       setNewDirectBookingData({
//         bookingType: "Package",
//         storeId: 0,
//         customerName: "",
//         customerPhone: "",
//         customerEmail: "",
//         packageId: null,
//         price: null,
//         overs: null,
//       });
//       setShowNewDirectBookingForm(false);
//       loadBookingsFiltered("all");
//     } catch (err) {
//       setMessageModalContent({ message: "Failed to create direct booking. Please check your input and try again.", type: 'error' });
//       setShowMessageModal(true);
//       console.error("Direct booking submission error:", err);
//     } finally {
//       setIsSubmittingDirect(false);
//     }
//   };

//   const handleCustomerBookingFormChange = (
//     field: keyof NewBookingPayload,
//     value: string | number | null
//   ) => {
//     setCustomerBookingData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const handleCreateCustomerBooking = async () => {
//     setIsSubmittingCustomer(true);
//     let payload: NewBookingPayload = {
//       customerId: parseInt(customerBookingData.customerId as any),
//       storeId: parseInt(customerBookingData.storeId as any),
//       bookingType: customerBookingData.bookingType,
//     };

//     if (customerBookingData.bookingType === "Package") {
//       if (!customerBookingData.packageId) {
//         setMessageModalContent({ message: "Package is required for Package booking.", type: 'error' });
//         setShowMessageModal(true);
//         setIsSubmittingCustomer(false);
//         return;
//       }
//       payload.packageId = parseInt(customerBookingData.packageId as any);
//     } else {
//       if (!customerBookingData.overs || !customerBookingData.price) {
//         setMessageModalContent({ message: "Overs and Price are required for Custom booking.", type: 'error' });
//         setShowMessageModal(true);
//         setIsSubmittingCustomer(false);
//         return;
//       }
//       payload.overs = parseInt(customerBookingData.overs as any);
//       payload.price = parseFloat(customerBookingData.price as any);
//     }

//     if (
//       isNaN(payload.customerId) ||
//       payload.customerId === 0 ||
//       isNaN(payload.storeId) ||
//       payload.storeId === 0
//     ) {
//       setMessageModalContent({ message: "Customer and Store must be selected.", type: 'error' });
//       setShowMessageModal(true);
//       setIsSubmittingCustomer(false);
//       return;
//     }

//     try {
//       await createBookingApi(payload);
//       setMessageModalContent({ message: "Booking created successfully!", type: 'success' });
//       setShowMessageModal(true);
//       setCustomerBookingData({
//         bookingType: "Package",
//         customerId: 0,
//         storeId: 0,
//         packageId: null,
//         price: null,
//         overs: null,
//       });
//       setShowCustomerBookingModal(false);
//       loadBookingsFiltered("all");
//     } catch (err) {
//       setMessageModalContent({ message: "Failed to create booking. Please check your input and try again.", type: 'error' });
//       setShowMessageModal(true);
//       console.error("Booking submission error:", err);
//     } finally {
//       setIsSubmittingCustomer(false);
//     }
//   };

//   // Function to get a single booking's details (for the modal)
//   const getBookingDetails = async (bookingId: number) => {
//     try {
//       const response = await axiosInstance.get(
//         `/admin/booking/details/${bookingId}`
//       );
//       if (response.data.valid) {
//         const booking = response.data.booking;
//         // Ensure the mapping from BookingData to DisplayBookingItem is correct
//         const mappedBooking: DisplayBookingItem = {
//           id: booking.id,
//           name: booking.customer.name,
//           phone: booking.customer?.phone || "N/A",
//           bookingsTypes: booking.bookingType || "N/A",
//           status: booking.paid ? "PAID" : "UNPAID", // Changed: Map directly to PAID/UNPAID based on 'paid' boolean
//           paid: booking.paid, // Directly use the paid boolean
//           store: booking.store.name,
//           packageName: booking.package?.name || "N/A",
//           packageType: booking.package?.type || "N/A",
//           overs: booking.overs || 0,
//           oversLeft: booking.oversLeft || 0,
//           price: booking.price || 0,
//           paidTo: booking.paymentMarkedBy || "N/A",
//           paymentDate: booking.paymentMarkedAt?.split("T")[0] || "N/A",
//           date: booking.date || "N/A",
//           time: booking.time || "N/A",
//         };
//         setSelectedBooking(mappedBooking);
//         setOversPlayedInput(''); // Clear overs input when modal opens
//         setShowBookingDetailsModal(true);
//       } else {
//         setMessageModalContent({ message: "Failed to fetch booking details.", type: 'error' });
//         setShowMessageModal(true);
//       }
//     } catch (error) {
//       console.error("Error fetching booking details:", error);
//       setMessageModalContent({ message: "Error fetching booking details. Please try again.", type: 'error' });
//       setShowMessageModal(true);
//     }
//   };

//   // Function to mark payment as done
//   const handleMarkPaymentAsDone = async () => {
//     if (!selectedBooking) return;
//     try {
//       const response = await axiosInstance.get(
//         `/admin/booking/payment/mark/${selectedBooking.id}`
//       );
//       if (response.data.valid) {
//         setMessageModalContent({ message: "Payment marked as done successfully!", type: 'success' });
//         setShowMessageModal(true);
//         // After successful update, refresh the details in the modal and the main list
//         getBookingDetails(selectedBooking.id); 
//         loadBookingsFiltered("all"); 
//       } else {
//         setMessageModalContent({ message: "Failed to mark payment as done.", type: 'error' });
//         setShowMessageModal(true);
//       }
//     } catch (err) {
//       console.error("Error marking payment:", err);
//       setMessageModalContent({ message: "Error marking payment. Please try again.", type: 'error' });
//       setShowMessageModal(true);
//     }
//   };

//   // Function to handle overs played submission
//   const handleSubmitOversPlayed = async () => {
//     if (!selectedBooking) return;

//     const overs = parseInt(oversPlayedInput, 10);

//     if (isNaN(overs) || overs <= 0) {
//       setMessageModalContent({ message: "Please enter a valid number of overs.", type: 'error' });
//       setShowMessageModal(true);
//       return;
//     }

//     if (overs > selectedBooking.oversLeft) {
//       setMessageModalContent({ message: `Overs played cannot exceed overs left (${selectedBooking.oversLeft}).`, type: 'error' });
//       setShowMessageModal(true);
//       return;
//     }

//     try {
//       const response = await axiosInstance.put(
//         `/admin/booking/${selectedBooking.id}`,
//         { playedOvers: overs }
//       );
//       if (response.data.valid) {
//         setMessageModalContent({ message: "Overs played updated successfully!", type: 'success' });
//         setShowMessageModal(true);
//         setOversPlayedInput(''); // Clear input
//         // After successful update, refresh the details in the modal and the main list
//         getBookingDetails(selectedBooking.id); 
//         loadBookingsFiltered("all"); 
//       } else {
//         setMessageModalContent({ message: "Failed to update overs played.", type: 'error' });
//         setShowMessageModal(true);
//       }
//     } catch (error) {
//       console.error("Error updating overs played:", error);
//       setMessageModalContent({ message: "Error updating overs played. Please try again.", type: 'error' });
//       setShowMessageModal(true);
//     }
//   };

//   if (loading || dataLoading) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text style={styles.loadingText}>Loading data...</Text>
//       </View>
//     );
//   }

//   if (error || dataError) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <Text style={styles.errorText}>{error || dataError}</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={() => {
//             loadBookingsFiltered("all");
//             loadDropdownData();
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

//       <View style={styles.header}>
//         <TouchableOpacity
//           // onPress={() => navigation.openDrawer()}
//           style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
//         >
//           {/* <Feather name="menu" size={24} color="black" /> */}
//           <Text style={styles.headerTitle}>Bookings</Text>
//         </TouchableOpacity>
//         <Ionicons name="person-circle-outline" size={28} color="black" />
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.filterRow}
//       >
//         <View style={styles.filterPickerContainer}>
//           <Picker
//             selectedValue={selectedFilterStoreId}
//             onValueChange={(itemValue: number) =>
//               handleFilterStoreChange(itemValue)
//             }
//             style={styles.filterPickerStyle}
//             itemStyle={styles.filterPickerItemStyle}
//           >
//             <Picker.Item label="All Stores" value={0} />
//             {stores.map((store) => (
//               <Picker.Item key={store.id} label={store.name} value={store.id} />
//             ))}
//           </Picker>
//         </View>

//         <View style={styles.filterPickerContainer}>
//           <Picker
//             selectedValue={selectedFilterStatus}
//             onValueChange={(itemValue: string) =>
//               handleFilterStatusChange(itemValue)
//             }
//             style={styles.filterPickerStyle}
//             itemStyle={styles.filterPickerItemStyle}
//           >
//             <Picker.Item label="Status" value="all" />
//             <Picker.Item label="Pending" value="0" />
//             <Picker.Item label="Completed" value="1" />
//           </Picker>
//         </View>

//         <View style={styles.filterPickerContainer}>
//           <Picker
//             selectedValue={selectedFilterPaidStatus}
//             onValueChange={(itemValue: string) =>
//               handleFilterPaidStatusChange(itemValue)
//             }
//             style={styles.filterPickerStyle}
//             itemStyle={styles.filterPickerItemStyle}
//           >
//             <Picker.Item label="Paid Status" value="all" />
//             <Picker.Item label="Unpaid" value="0" />
//             <Picker.Item label="Paid" value="1" />
//           </Picker>
//         </View>

//         <View style={styles.filterPickerContainer}>
//           <Picker
//             selectedValue={selectedFilterCustomerType}
//             onValueChange={(itemValue: string) =>
//               handleFilterCustomerTypeChange(itemValue)
//             }
//             style={styles.filterPickerStyle}
//             itemStyle={styles.filterPickerItemStyle}
//           >
//             <Picker.Item label="Customer Type" value="all" />
//             <Picker.Item label="NORMAL" value="0" />
//             <Picker.Item label="IVR" value="1" />
//             <Picker.Item label="WHATSAPP" value="2" />
//             <Picker.Item label="ENQUIRY" value="3" />
//           </Picker>
//         </View>

//         <TouchableOpacity
//           style={styles.datePickerButton}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <Text style={styles.datePickerButtonText}>
//             {selectedFilterDate
//               ? selectedFilterDate.toLocaleDateString("en-GB")
//               : "Select Date"}
//           </Text>
//           <AntDesign name="calendar" size={16} color="#fff" />
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             testID="dateTimePicker"
//             value={selectedFilterDate || new Date()}
//             mode="date"
//             display="default"
//             onChange={handleFilterDateChange}
//             maximumDate={new Date()}
//           />
//         )}
//       </ScrollView>

//       <View style={styles.searchRow}>
//         <TextInput
//           placeholder="Search by customer name or phone"
//           placeholderTextColor={Colors.STB.buttons}
//           style={styles.searchInput}
//           value={searchQuery}
//           onChangeText={setSearchQuery} // Update search query state
//         />
//         <TouchableOpacity
//           style={styles.smallButton}
//           onPress={() => setShowCustomerBookingModal(true)}
//         >
//           <Text style={styles.buttonText}>Existing</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.smallButton}
//           onPress={() => setShowNewDirectBookingForm(true)}
//         >
//           <Text style={styles.buttonText}>+ New</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Horizontal Scroll for Table Content */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={true}>
//         <View>
//           {/* Table Header */}
//           <View style={styles.tableHeader}>
//             <Text style={[styles.columnHeader, { width: 100 }]}>CUSTOMER</Text>
//             <Text style={[styles.columnHeader, { width: 120 }]}>STORE</Text>
//             <Text style={[styles.columnHeader, { width: 90 }]}>PHONE</Text>
//             <Text style={[styles.columnHeader, { width: 70 }]}>BOOKINGS TYPE</Text>
//             <Text style={[styles.columnHeader, { width: 70 }]}>STATUS</Text>
//             <Text style={[styles.columnHeader, { width: 90 }]}>PACKAGE</Text>
//             <Text style={[styles.columnHeader, { width: 80 }]}>PACKAGE TYPE</Text>
//             <Text style={[styles.columnHeader, { width: 60 }]}>OVERS</Text>
//             <Text style={[styles.columnHeader, { width: 60 }]}>OVERS LEFT</Text>
//             <Text style={[styles.columnHeader, { width: 70 }]}>PRICE</Text>
//             <Text style={[styles.columnHeader, { width: 80 }]}>PAID TO</Text>
//             <Text style={[styles.columnHeader, { width: 90 }]}>PAYMENT DATE</Text>
//             <Text style={[styles.columnHeader, { width: 90 }]}>DATE</Text>
//             <Text style={[styles.columnHeader, { width: 60 }]}>TIME</Text>
//             <Text style={[styles.columnHeader, { width: 60, textAlign: "right" }]}>
//               ACTIONS
//             </Text>
//           </View>

//           {/* Booking List - Vertical Scroll Handled by FlatList */}
//           <FlatList
//             data={filteredBookings} // Use filteredBookings here
//             showsVerticalScrollIndicator={false}
//             keyExtractor={(item) => item.id.toString()}
//             contentContainerStyle={{ paddingBottom: 30 }}
//             renderItem={({ item }) => (
//               <View style={styles.row}>
//                 <Text style={[styles.columnText, { width: 100 }]}>{item.name}</Text>
//                 <Text style={[styles.columnText, { width: 120 }]}>{item.store}</Text>
//                 <Text style={[styles.columnText, { width: 90 }]}>{item.phone}</Text>
//                 <Text style={[styles.columnText, { width: 70 }]}>{item.bookingsTypes}</Text>
//                 <Text
//                   style={[
//                     styles.columnText,
//                     { width: 70 },
//                     item.status === "PAID" ? styles.paid : styles.unpaid, // Use item.status (now PAID/UNPAID) for styling
//                   ]}
//                 >
//                   {item.status}
//                 </Text>
//                 <Text style={[styles.columnText, { width: 90 }]}>{item.packageName}</Text>
//                 <Text style={[styles.columnText, { width: 80 }]}>{item.packageType}</Text>
//                 <Text style={[styles.columnText, { width: 60 }]}>{item.overs}</Text>
//                 <Text style={[styles.columnText, { width: 60 }]}>{item.oversLeft}</Text>
//                 <Text style={[styles.columnText, { width: 70 }]}>₹{item.price}</Text>
//                 <Text style={[styles.columnText, { width: 80 }]}>{item.paidTo}</Text>
//                 <Text style={[styles.columnText, { width: 90 }]}>{item.paymentDate}</Text>
//                 <Text style={[styles.columnText, { width: 90 }]}>{item.date}</Text>
//                 <Text style={[styles.columnText, { width: 60 }]}>{item.time}</Text>
//                 <TouchableOpacity
//                   style={[styles.actionsColumn, { width: 60 }]}
//                   onPress={() => getBookingDetails(item.id)} // Call the new function to fetch details and open modal
//                 >
//                   <Image source={require("@/assets/Logo/link.png")} />
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//         </View>
//       </ScrollView>

//       {/* Booking Details Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showBookingDetailsModal}
//         onRequestClose={() => setShowBookingDetailsModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={[styles.formContainer, { alignItems: "stretch" }]}>
//             <Text style={[styles.formTitle, { marginBottom: 10 }]}>
//               Booking Details
//             </Text>
//             {selectedBooking && (
//               <>
//                 <Text style={styles.detailLabel}>
//                   Customer:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.name} ({selectedBooking.phone})
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Store:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.store}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Booking Type:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.bookingsTypes}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Package:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.packageName} ({selectedBooking.packageType})
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Total Overs:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.overs}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Overs Left:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.oversLeft}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Price:{" "}
//                   <Text style={styles.detailValue}>₹{selectedBooking.price}</Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Payment Status:{" "}
//                   <Text
//                     style={
//                       selectedBooking.paid
//                         ? styles.paid
//                         : styles.unpaid
//                     }
//                   >
//                     {selectedBooking.paid ? "PAID" : "UNPAID"}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Paid By:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.paidTo}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Payment Date:{" "}
//                   <Text style={styles.detailValue}>
//                     {selectedBooking.paymentDate}
//                   </Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Booking Date:{" "}
//                   <Text style={styles.detailValue}>{selectedBooking.date}</Text>
//                 </Text>
//                 <Text style={styles.detailLabel}>
//                   Booking Time:{" "}
//                   <Text style={styles.detailValue}>{selectedBooking.time}</Text>
//                 </Text>

//                 {/* Mark Payment as Done Button */}
//                 {!selectedBooking.paid && (
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: "#17A34A",
//                       borderRadius: 8,
//                       paddingVertical: 12,
//                       alignItems: "center",
//                       marginVertical: 10,
//                     }}
//                     onPress={handleMarkPaymentAsDone}
//                   >
//                     <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                       Mark Payment As Done
//                     </Text>
//                   </TouchableOpacity>
//                 )}

//                 {/* Overs Played Input */}
//                 <View
//                   style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 10 }}
//                 >
//                   <Text
//                     style={{
//                       fontWeight: "bold",
//                       marginBottom: 5,
//                       alignSelf: "center",
//                       color: 'black'
//                     }}
//                   >
//                     OVERS PLAYED
//                   </Text>
//                   <TextInput
//                     style={[styles.formInput, { marginBottom: 10, width: "60%", color: 'black' }]}
//                     placeholder="Enter Overs Played"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={oversPlayedInput}
//                     onChangeText={(text) => {
//                       // Basic validation: only allow numbers, and don't allow more than oversLeft
//                       const numericValue = parseInt(text, 10);
//                       if (isNaN(numericValue) || numericValue < 0) {
//                         setOversPlayedInput('');
//                       } else if (selectedBooking && numericValue > selectedBooking.oversLeft) {
//                         setOversPlayedInput(selectedBooking.oversLeft.toString());
//                       } else {
//                         setOversPlayedInput(text);
//                       }
//                     }}
//                   />
//                 </View>

//                 {/* Action Buttons for Booking Details Modal */}
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     gap: 10,
//                     marginTop: 10,
//                   }}
//                 >
//                   <TouchableOpacity
//                     style={[styles.cancelButton, { flex: 1 }]}
//                     onPress={() => setShowBookingDetailsModal(false)}
//                   >
//                     <Text style={styles.cancelButtonText}>Close</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[styles.submitButton, { flex: 1 }]}
//                     onPress={handleSubmitOversPlayed}
//                   >
//                     <Text style={styles.buttonText}>Submit Overs</Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* New Direct Booking Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showNewDirectBookingForm}
//         onRequestClose={() => {
//           if (!isSubmittingDirect) {
//             setShowNewDirectBookingForm(false);
//           }
//         }}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.modalOverlay}
//         >
//           <ScrollView contentContainerStyle={styles.formScrollContainer}>
//             <View style={styles.formContainer}>
//               <Text style={styles.formTitle}>Add New Direct Booking</Text>

//               <Text style={styles.inputLabel}>Booking Type</Text>
//               <View style={styles.typeSelectorContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     newDirectBookingData.bookingType === "Package" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     handleNewDirectBookingFormChange("bookingType", "Package")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       newDirectBookingData.bookingType === "Package" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Package
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     newDirectBookingData.bookingType === "Custom" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     handleNewDirectBookingFormChange("bookingType", "Custom")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       newDirectBookingData.bookingType === "Custom" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Custom
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.inputLabel}>Customer Name</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter Customer Name"
//                 placeholderTextColor="#94a3b8"
//                 value={newDirectBookingData.customerName}
//                 onChangeText={(text) =>
//                   handleNewDirectBookingFormChange("customerName", text)
//                 }
//               />

//               <Text style={styles.inputLabel}>Customer Phone</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter Customer Phone"
//                 placeholderTextColor="#94a3b8"
//                 keyboardType="phone-pad"
//                 value={newDirectBookingData.customerPhone}
//                 onChangeText={(text) =>
//                   handleNewDirectBookingFormChange("customerPhone", text)
//                 }
//               />

//               <Text style={styles.inputLabel}>Customer Email</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter Customer Email"
//                 placeholderTextColor="#94a3b8"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={newDirectBookingData.customerEmail}
//                 onChangeText={(text) =>
//                   handleNewDirectBookingFormChange("customerEmail", text)
//                 }
//               />

//               <Text style={styles.inputLabel}>Store</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={newDirectBookingData.storeId?.toString()}
//                   onValueChange={(itemValue) =>
//                     handleNewDirectBookingFormChange(
//                       "storeId",
//                       parseInt(itemValue as string, 10)
//                     )
//                   }
//                   style={styles.pickerStyle}
//                   itemStyle={styles.pickerItemStyle}
//                 >
//                   <Picker.Item label="Select a store" value="0" />
//                   {stores.map((store) => (
//                     <Picker.Item
//                       key={store.id}
//                       label={store.name}
//                       value={store.id.toString()}
//                     />
//                   ))}
//                 </Picker>
//               </View>

//               {newDirectBookingData.bookingType === "Package" ? (
//                 <>
//                   <Text style={styles.inputLabel}>Package</Text>
//                   <View style={styles.pickerContainer}>
//                     <Picker
//                       selectedValue={
//                         newDirectBookingData.packageId?.toString() || ""
//                       }
//                       onValueChange={(itemValue) =>
//                         handleNewDirectBookingFormChange(
//                           "packageId",
//                           parseInt(itemValue as string, 10)
//                         )
//                       }
//                       style={styles.pickerStyle}
//                       itemStyle={styles.pickerItemStyle}
//                     >
//                       <Picker.Item label="Select a package" value="" />
//                       {packages.map((pack) => (
//                         <Picker.Item
//                           key={pack.id}
//                           label={pack.name}
//                           value={pack.id.toString()}
//                         />
//                       ))}
//                     </Picker>
//                   </View>
//                 </>
//               ) : (
//                 <>
//                   <Text style={styles.inputLabel}>Overs</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Overs"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={newDirectBookingData.overs?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleNewDirectBookingFormChange("overs", text)
//                     }
//                   />

//                   <Text style={styles.inputLabel}>Price</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Price"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={newDirectBookingData.price?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleNewDirectBookingFormChange("price", text)
//                     }
//                   />
//                 </>
//               )}

//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[
//                     styles.submitButton,
//                     isSubmittingDirect && styles.submitButtonDisabled,
//                   ]}
//                   onPress={handleCreateDirectBooking}
//                   disabled={isSubmittingDirect}
//                 >
//                   {isSubmittingDirect ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.buttonText}>Submit</Text>
//                   )}
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => setShowNewDirectBookingForm(false)}
//                   disabled={isSubmittingDirect}
//                 >
//                   <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Modal>

//       {/* Existing Customer Booking Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCustomerBookingModal}
//         onRequestClose={() => {
//           if (!isSubmittingCustomer) {
//             setShowCustomerBookingModal(false);
//           }
//         }}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.modalOverlay}
//         >
//           <ScrollView contentContainerStyle={styles.formScrollContainer}>
//             <View style={styles.formContainer}>
//               <Text style={styles.formTitle}>Add New Booking</Text>

//               <Text style={styles.inputLabel}>Booking Type</Text>
//               <View style={styles.typeSelectorContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     customerBookingData.bookingType === "Package" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     handleCustomerBookingFormChange("bookingType", "Package")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       customerBookingData.bookingType === "Package" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Package
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.typeSelectorButton,
//                     customerBookingData.bookingType === "Custom" &&
//                       styles.typeSelectorButtonActive,
//                   ]}
//                   onPress={() =>
//                     handleCustomerBookingFormChange("bookingType", "Custom")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.typeSelectorText,
//                       customerBookingData.bookingType === "Custom" &&
//                         styles.typeSelectorTextActive,
//                     ]}
//                   >
//                     Custom
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.inputLabel}>Customer</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={customerBookingData.customerId.toString()}
//                   onValueChange={(itemValue) =>
//                     handleCustomerBookingFormChange("customerId", itemValue)
//                   }
//                   style={styles.pickerStyle}
//                   itemStyle={styles.pickerItemStyle}
//                 >
//                   <Picker.Item label="Select a customer" value="0" />
//                   {customers.map((customer) => (
//                     <Picker.Item
//                       key={customer.id}
//                       label={customer.name}
//                       value={customer.id.toString()}
//                     />
//                   ))}
//                 </Picker>
//               </View>

//               <Text style={styles.inputLabel}>Store</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={customerBookingData.storeId.toString()}
//                   onValueChange={(itemValue) =>
//                     handleCustomerBookingFormChange("storeId", itemValue)
//                   }
//                   style={styles.pickerStyle}
//                   itemStyle={styles.pickerItemStyle}
//                 >
//                   <Picker.Item label="Select a store" value="0" />
//                   {stores.map((store) => (
//                     <Picker.Item
//                       key={store.id}
//                       label={store.name}
//                       value={store.id.toString()}
//                     />
//                   ))}
//                 </Picker>
//               </View>

//               {customerBookingData.bookingType === "Package" ? (
//                 <>
//                   <Text style={styles.inputLabel}>Package</Text>
//                   <View style={styles.pickerContainer}>
//                     <Picker
//                       selectedValue={
//                         customerBookingData.packageId?.toString() || ""
//                       }
//                       onValueChange={(itemValue) =>
//                         handleCustomerBookingFormChange("packageId", itemValue)
//                       }
//                       style={styles.pickerStyle}
//                       itemStyle={styles.pickerItemStyle}
//                     >
//                       <Picker.Item label="Select a package" value="" />
//                       {packages.map((pack) => (
//                         <Picker.Item
//                           key={pack.id}
//                           label={pack.name}
//                           value={pack.id.toString()}
//                         />
//                       ))}
//                     </Picker>
//                   </View>
//                 </>
//               ) : (
//                 <>
//                   <Text style={styles.inputLabel}>Overs</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Overs"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={customerBookingData.overs?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleCustomerBookingFormChange("overs", text)
//                     }
//                   />

//                   <Text style={styles.inputLabel}>Price</Text>
//                   <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter Price"
//                     placeholderTextColor="#94a3b8"
//                     keyboardType="numeric"
//                     value={customerBookingData.price?.toString() || ""}
//                     onChangeText={(text) =>
//                       handleCustomerBookingFormChange("price", text)
//                     }
//                   />
//                 </>
//               )}

//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[
//                     styles.submitButton,
//                     isSubmittingCustomer && styles.submitButtonDisabled,
//                   ]}
//                   onPress={handleCreateCustomerBooking}
//                   disabled={isSubmittingCustomer}
//                 >
//                   {isSubmittingCustomer ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.buttonText}>Submit</Text>
//                   )}
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => setShowCustomerBookingModal(false)}
//                   disabled={isSubmittingCustomer}
//                 >
//                   <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Modal>

//       {/* Custom Message Modal */}
//       <MessageModal
//         isVisible={showMessageModal}
//         message={messageModalContent.message}
//         onClose={() => setShowMessageModal(false)}
//         type={messageModalContent.type}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.STB.background,
//     paddingHorizontal: 16,
//     paddingTop: StatusBar.currentHeight || 30,
//   },
//   centerContent: {
//     flex: 1,
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
//     marginVertical: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "black",
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 16,
//     top: 8,
//   },
//   searchInput: {
//     flex: 1,
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//     borderWidth: 1.5,
//     borderColor: Colors.STB.buttons,
//   },
//   smallButton: {
//     backgroundColor: Colors.STB.buttons,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
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
//     // Sum of all column widths (100+90+70+70+120+90+80+60+60+70+80+90+90+60+60 = 1200)
//     width: 1200,
//   },
//   columnHeader: {
//     color: "#94a3b8",
//     fontSize: 11,
//     fontWeight: "600",
//     flexShrink: 0,
//     textAlign: 'left',
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 10,
//     borderBottomColor: "#1e293b",
//     borderBottomWidth: 1,
//     alignItems: "center",
//     // Fixed width for the entire data row, must match tableHeader's width
//     width: 1200,
//   },
//   columnText: {
//     color: Colors.STB.text,
//     fontSize: 11,
//     flexShrink: 0,
//   },
//   paid: {
//     color: "#10b981",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   unpaid: {
//     color: "#ef4444",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   actionsColumn: {
//     alignItems: "flex-end",
//     // flexShrink: 0, // already applied by default due to width
//   },
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
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     width: modalCalculatedWidth,
//     alignSelf: "center",
//   },
//   formTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   inputLabel: {
//     color: "#cbd5e0", // This was for dark background, now on white. Adjust if needed.
//     fontSize: 14,
//     marginBottom: 5,
//     marginTop: 10,
//   },
//   formInput: {
//     color: "#000",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     height: 40,
//     width: "100%",
//     marginBottom: 15,
//     fontSize: 12,
//     borderWidth: 1,
//     borderColor: "lightgrey",
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
//     backgroundColor: "#60a5fa",
//   },
//   cancelButton: {
//     backgroundColor: "#F44043",
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   cancelButtonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   typeSelectorContainer: {
//     flexDirection: "row",
//     backgroundColor: "#0f172a", // This was for dark background, now on white. Adjust if needed.
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#334155", // Adjust if needed
//     overflow: "hidden",
//     marginBottom: 15,
//   },
//   typeSelectorButton: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   typeSelectorButtonActive: {
//     backgroundColor: "#3b82f6",
//   },
//   typeSelectorText: {
//     color: "#cbd5e0", // Adjust if needed
//     fontWeight: "600",
//     fontSize: 15,
//   },
//   typeSelectorTextActive: {
//     color: "#fff",
//   },
//   pickerContainer: {
//     backgroundColor: "#0f172a", // Adjust if needed
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#334155", // Adjust if needed
//     marginBottom: 15,
//     overflow: "hidden",
//     height: 50,
//     justifyContent: "center",
//   },
//   pickerStyle: {
//     color: "#fff", // Adjust if needed
//     height: 50,
//     width: "100%",
//   },
//   pickerItemStyle: {
//     color: "#fff", // iOS specific // Adjust if needed
//     fontSize: 16,
//   },
//   filterRow: {
//     flexDirection: "row",
//     paddingVertical: 10,
//     bottom: 8,
//   },
//   filterPickerContainer: {
//     backgroundColor: Colors.STB.buttons,
//     borderRadius: 8,
//     overflow: "hidden",
//     height: 40,
//     justifyContent: "center",
//     minWidth: 160,
//     marginRight: 10,
//     flexShrink: 1,
//   },
//   filterPickerStyle: {
//     color: "#fff",
//     height: 50,
//     width: "100%",
//     fontSize: 14,
//   },
//   filterPickerItemStyle: {
//     color: "#fff", // iOS specific
//     fontSize: 14,
//   },
//   datePickerButton: {
//     backgroundColor: Colors.STB.buttons,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//     height: 40,
//     flexDirection: "row",
//     gap: 8,
//   },
//   datePickerButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   detailLabel: {
//     fontWeight: "bold",
//     marginBottom: 5,
//     color: "black", // Changed to black for visibility on white background
//   },
//   detailValue: {
//     fontWeight: "normal",
//     color: "#444",
//   },
//   // Styles for the custom message modal
//   messageModalContainer: {
//     borderRadius: 10,
//     padding: 20,
//     width: modalCalculatedWidth * 0.8, // Make it a bit smaller than the main modal
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   messageModalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   messageModalText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   messageModalButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
// });

// export default BookingsScreen;

import {
  createBookingApi,
  createDirectBookingApi,
  fetchBookingsApi,
  fetchBookingsByCustomerTypeApi,
  fetchBookingsByDateApi,
  fetchBookingsByPaidStatusApi,
  fetchBookingsByStatusApi,
  fetchBookingsByStoreApi,
} from "@/utils/bookingApi";
import {
  AdminDirectBookingPayload,
  BookingData, // Assuming this exists and has the necessary fields
  NewBookingPayload,
} from "@/utils/types/bookingTypes";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DatePicker
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
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

// Assuming you have these API utility functions defined, e.g., in a new `dataFetchApi.ts`
import { Colors } from "@/constants/Colors";
import {
  fetchCustomersApi,
  fetchPackagesApi,
  fetchStoresApi,
} from "@/utils/bookingApi"; // Ensure these return { customers: [] } etc.
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
// IMPORTANT: Using your provided axiosInstance from '@/utils/axiosInstance'
import axiosInstance from '@/utils/axiosInstance';


interface Customer {
  id: number;
  name: string;
  phone?: string; // Make phone optional as it might not always be there
  totalBookings?: number; // Add totalBookings to customer interface if it exists on backend
}

interface Store {
  id: number;
  name: string;
}

interface Package {
  id: number;
  name: string;
  type: string; // Assuming package has a type
}

// Extend DisplayBookingItem with new fields
interface DisplayBookingItem {
  id: number;
  name: string; // Customer Name
  phone: string; // Customer Phone
  bookingsTypes: string; // Total bookings for this customer
  // Changed 'status' to reflect payment status for table display
  status: "PAID" | "UNPAID"; // Now explicitly reflects payment status
  store: string; // Store Name
  packageName: string; // Name of the package booked
  packageType: string; // Type of the package booked
  overs: number; // Total overs in the booking/package
  oversLeft: number; // Overs remaining
  price: number; // Price of the booking/package
  paidTo: string; // Who the payment was marked by (paymentMarkedBy)
  paymentDate: string; // Date of payment (paymentMarkedAt)
  date: string; // Booking Date (YYYY-MM-DD)
  time: string; // Booking Time (HH:MM)
  paid: boolean; // Explicitly add paid status
}

const screenWidth = Dimensions.get("window").width;
const modalCalculatedWidth = screenWidth * 0.9;

// Custom Message Modal Component
interface MessageModalProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
}

const MessageModal: React.FC<MessageModalProps> = ({ isVisible, message, onClose, type }) => {
  if (!isVisible) return null;

  let backgroundColor = '#fff';
  let textColor = 'black';
  let title = 'Info';

  if (type === 'success') {
    backgroundColor = '#d1fae5'; // green-100
    textColor = '#065f46'; // green-800
    title = 'Success!';
  } else if (type === 'error') {
    backgroundColor = '#fee2e2'; // red-100
    textColor = '#991b1b'; // red-800
    title = 'Error!';
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.messageModalContainer, { backgroundColor }]}>
          <Text style={[styles.messageModalTitle, { color: textColor }]}>{title}</Text>
          <Text style={[styles.messageModalText, { color: textColor }]}>{message}</Text>
          <TouchableOpacity
            style={[styles.messageModalButton, { backgroundColor: type === 'success' ? '#10b981' : (type === 'error' ? '#ef4444' : '#3b82f6') }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const BookingsScreen = () => {
  const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<DisplayBookingItem[]>([]); // New state for filtered bookings
  console.log("All Bookings", bookings);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [customers, setCustomers] = useState<Customer[]>([]);
  // New state for filtered customers based on search
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const [selectedFilterStoreId, setSelectedFilterStoreId] = useState<number>(0);
  const [selectedFilterStatus, setSelectedFilterStatus] =
    useState<string>("all");
  const [selectedFilterPaidStatus, setSelectedFilterPaidStatus] =
    useState<string>("all");
  const [selectedFilterCustomerType, setSelectedFilterCustomerType] =
    useState<string>("all");
  const [selectedFilterDate, setSelectedFilterDate] = useState<Date | null>(
    null
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [showNewDirectBookingForm, setShowNewDirectBookingForm] =
    useState<boolean>(false);
  const [newDirectBookingData, setNewDirectBookingData] =
    useState<AdminDirectBookingPayload>({
      bookingType: "Package",
      storeId: 0,
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      packageId: null,
      price: null,
      overs: null,
    });
  const [isSubmittingDirect, setIsSubmittingDirect] = useState<boolean>(false);

  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<DisplayBookingItem | null>(null);
  const [oversPlayedInput, setOversPlayedInput] = useState<string>(''); // State for overs played input in modal

  // State for custom message modal
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageModalContent, setMessageModalContent] = useState({ message: '', type: 'info' as 'info' | 'success' | 'error' });

  const [showCustomerBookingModal, setShowCustomerBookingModal] =
    useState<boolean>(false);
  const [customerBookingData, setCustomerBookingData] =
    useState<NewBookingPayload>({
      bookingType: "Package",
      customerId: 0,
      storeId: 0,
      packageId: null,
      price: null,
      overs: null,
    });
  const [isSubmittingCustomer, setIsSubmittingCustomer] =
    useState<boolean>(false);
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const params = useLocalSearchParams();
  const { storeId, storeName } = params;

  // State for search input
  const [searchQuery, setSearchQuery] = useState<string>('');
  // New state for customer search query within the modal
  const [customerSearchQuery, setCustomerSearchQuery] = useState<string>('');

  console.log("Data1", storeId);
  console.log("Data2", storeName);

  const loadBookingsFiltered = async (
    filterType: "all" | "store" | "status" | "paid" | "customerType" | "date",
    value?: any
  ) => {
    try {
      setLoading(true);
      setError(null);
      let apiData: BookingData[] = [];

      switch (filterType) {
        case "store":
          apiData = await fetchBookingsByStoreApi(value as number);
          break;
        case "status":
          apiData = await fetchBookingsByStatusApi(value as string);
          break;
        case "paid":
          apiData = await fetchBookingsByPaidStatusApi(value as string);
          break;
        case "customerType":
          apiData = await fetchBookingsByCustomerTypeApi(value as string);
          break;
        case "date":
          const formattedDate = (value as Date)?.toISOString().split("T")[0];
          apiData = await fetchBookingsByDateApi(formattedDate);
          break;
        case "all":
        default:
          apiData = await fetchBookingsApi();
          break;
      }

      const mappedData: DisplayBookingItem[] = apiData.map((booking) => ({
        id: booking.id,
        name: booking.customer.name,
        phone: booking.customer?.phone || "N/A",
        bookingsTypes: booking.bookingType || "N/A", // Added to match DisplayBookingItem type
        status: booking.paid ? "PAID" : "UNPAID", // Changed: Map directly to PAID/UNPAID based on 'paid' boolean
        paid: booking.paid, // Directly use the paid boolean
        store: booking.store.name,
        packageName: booking.package?.name || "N/A",
        packageType: booking.package?.type || "N/A",
        overs: booking.overs || 0,
        oversLeft: booking.oversLeft || 0,
        price: booking.price || 0,
        paidTo: booking.paymentMarkedBy || "N/A",
        paymentDate: booking.paymentMarkedAt?.split("T")[0] || "N/A",
        date: booking.date || "N/A",
        time: booking.time || "N/A",
      }));
      setBookings(mappedData);
      setFilteredBookings(mappedData); // Initialize filtered bookings
    } catch (err) {
      console.error("Failed to fetch bookings with filter:", err);
      setError("Failed to load bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadDropdownData = async () => {
    try {
      setDataLoading(true);
      setDataError(null);
      const [customersResponse, storesResponse, packagesResponse] =
        await Promise.all([
          fetchCustomersApi(),
          fetchStoresApi(),
          fetchPackagesApi(),
        ]);

      setCustomers(customersResponse.customers || []);
      setFilteredCustomers(customersResponse.customers || []); // Initialize filteredCustomers
      setStores(storesResponse.stores || []);
      setPackages(packagesResponse.packages || []);
    } catch (err) {
      console.error("Failed to fetch dropdown data:", err);
      setDataError("Failed to load necessary data for forms.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const initialStoreId = params.storeId ? parseInt(params.storeId as string, 10) : 0;

    const loadData = async () => {
      if (initialStoreId && initialStoreId > 0) {
        await loadBookingsFiltered("store", initialStoreId);
        setSelectedFilterStoreId(initialStoreId);
      } else {
        await loadBookingsFiltered("all");
      }
      await loadDropdownData();
    };

    loadData();

  }, [params.storeId]); // Add params.storeId to the dependency array

  // Effect to apply search filter whenever bookings or searchQuery changes
  useEffect(() => {
    const applySearchFilter = () => {
      if (!searchQuery) {
        setFilteredBookings(bookings); // If search query is empty, show all bookings
        return;
      }
      const lowerCaseQuery = searchQuery.toLowerCase();
      const newFilteredBookings = bookings.filter(booking =>
        booking.name.toLowerCase().includes(lowerCaseQuery) ||
        (booking.phone && booking.phone.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredBookings(newFilteredBookings);
    };
    applySearchFilter();
  }, [bookings, searchQuery]);

  // Effect to apply customer search filter whenever customers or customerSearchQuery changes
  useEffect(() => {
    const applyCustomerSearchFilter = () => {
      if (!customerSearchQuery) {
        setFilteredCustomers(customers); // If search query is empty, show all customers
        return;
      }
      const lowerCaseQuery = customerSearchQuery.toLowerCase();
      const newFilteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(lowerCaseQuery) ||
        (customer.phone && customer.phone.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredCustomers(newFilteredCustomers);
    };
    applyCustomerSearchFilter();
  }, [customers, customerSearchQuery]);


  const handleFilterStoreChange = (itemValue: number) => {
    setSelectedFilterStoreId(itemValue);
    setSelectedFilterStatus("all");
    setSelectedFilterPaidStatus("all");
    setSelectedFilterCustomerType("all");
    setSelectedFilterDate(null);
    setSearchQuery(''); // Clear search on filter change
    if (itemValue === 0) {
      loadBookingsFiltered("all");
    } else {
      loadBookingsFiltered("store", itemValue);
    }
  };

  const handleFilterStatusChange = (itemValue: string) => {
    setSelectedFilterStatus(itemValue);
    setSelectedFilterStoreId(0);
    setSelectedFilterPaidStatus("all");
    setSelectedFilterCustomerType("all");
    setSelectedFilterDate(null);
    setSearchQuery(''); // Clear search on filter change
    if (itemValue === "all") {
      loadBookingsFiltered("all");
    } else {
      loadBookingsFiltered("status", itemValue);
    }
  };

  const handleFilterPaidStatusChange = (itemValue: string) => {
    setSelectedFilterPaidStatus(itemValue);
    setSelectedFilterStoreId(0);
    setSelectedFilterStatus("all");
    setSelectedFilterCustomerType("all");
    setSelectedFilterDate(null);
    setSearchQuery(''); // Clear search on filter change
    if (itemValue === "all") {
      loadBookingsFiltered("all");
    } else {
      loadBookingsFiltered("paid", itemValue);
    }
  };

  const handleFilterCustomerTypeChange = (itemValue: string) => {
    setSelectedFilterCustomerType(itemValue);
    setSelectedFilterStoreId(0);
    setSelectedFilterStatus("all");
    setSelectedFilterPaidStatus("all");
    setSelectedFilterDate(null);
    setSearchQuery(''); // Clear search on filter change
    if (itemValue === "all") {
      loadBookingsFiltered("all");
    } else {
      loadBookingsFiltered("customerType", itemValue);
    }
  };

  const handleFilterDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setSelectedFilterDate(selectedDate);
      setSelectedFilterStoreId(0);
      setSelectedFilterStatus("all");
      setSelectedFilterPaidStatus("all");
      setSelectedFilterCustomerType("all");
      setSearchQuery(''); // Clear search on filter change
      loadBookingsFiltered("date", selectedDate);
    } else {
      // If user cancels date selection, reset filter or keep previous
      // For now, let's reset to all bookings if date selection is cancelled
      // setSelectedFilterDate(null);
      // loadBookingsFiltered("all");
    }
  };

  const handleNewDirectBookingFormChange = (
    field: keyof AdminDirectBookingPayload,
    value: string | number | null
  ) => {
    setNewDirectBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCreateDirectBooking = async () => {
    setIsSubmittingDirect(true);

    let payload: AdminDirectBookingPayload = {
      storeId: newDirectBookingData.storeId,
      bookingType: newDirectBookingData.bookingType,
      customerName: newDirectBookingData.customerName,
      customerPhone: newDirectBookingData.customerPhone,
      customerEmail: newDirectBookingData.customerEmail,
    };

    if (newDirectBookingData.bookingType === "Package") {
      if (!newDirectBookingData.packageId) {
        setMessageModalContent({ message: "Package is required for Package booking.", type: 'error' });
        setShowMessageModal(true);
        setIsSubmittingDirect(false);
        return;
      }
      payload.packageId = newDirectBookingData.packageId;
    } else {
      if (!newDirectBookingData.overs || !newDirectBookingData.price) {
        setMessageModalContent({ message: "Overs and Price are required for Custom booking.", type: 'error' });
        setShowMessageModal(true);
        setIsSubmittingDirect(false);
        return;
      }
      payload.overs = parseInt(newDirectBookingData.overs as any);
      payload.price = parseFloat(newDirectBookingData.price as any);
    }

    if (
      payload.storeId === 0 ||
      !payload.customerName ||
      !payload.customerPhone ||
      !payload.customerEmail
    ) {
      setMessageModalContent({ message: "Store, Customer Name, Phone, and Email are required.", type: 'error' });
      setShowMessageModal(true);
      setIsSubmittingDirect(false);
      return;
    }

    try {
      await createDirectBookingApi(payload);
      setMessageModalContent({ message: "Direct booking created successfully!", type: 'success' });
      setShowMessageModal(true);
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
      loadBookingsFiltered("all");
    } catch (err) {
      setMessageModalContent({ message: "Failed to create direct booking. Please check your input and try again.", type: 'error' });
      setShowMessageModal(true);
      console.error("Direct booking submission error:", err);
    } finally {
      setIsSubmittingDirect(false);
    }
  };

  const handleCustomerBookingFormChange = (
    field: keyof NewBookingPayload,
    value: string | number | null
  ) => {
    setCustomerBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCreateCustomerBooking = async () => {
    setIsSubmittingCustomer(true);
    let payload: NewBookingPayload = {
      customerId: parseInt(customerBookingData.customerId as any),
      storeId: parseInt(customerBookingData.storeId as any),
      bookingType: customerBookingData.bookingType,
    };

    if (customerBookingData.bookingType === "Package") {
      if (!customerBookingData.packageId) {
        setMessageModalContent({ message: "Package is required for Package booking.", type: 'error' });
        setShowMessageModal(true);
        setIsSubmittingCustomer(false);
        return;
      }
      payload.packageId = parseInt(customerBookingData.packageId as any);
    } else {
      if (!customerBookingData.overs || !customerBookingData.price) {
        setMessageModalContent({ message: "Overs and Price are required for Custom booking.", type: 'error' });
        setShowMessageModal(true);
        setIsSubmittingCustomer(false);
        return;
      }
      payload.overs = parseInt(customerBookingData.overs as any);
      payload.price = parseFloat(customerBookingData.price as any);
    }

    if (
      isNaN(payload.customerId) ||
      payload.customerId === 0 ||
      isNaN(payload.storeId) ||
      payload.storeId === 0
    ) {
      setMessageModalContent({ message: "Customer and Store must be selected.", type: 'error' });
      setShowMessageModal(true);
      setIsSubmittingCustomer(false);
      return;
    }

    try {
      await createBookingApi(payload);
      setMessageModalContent({ message: "Booking created successfully!", type: 'success' });
      setShowMessageModal(true);
      setCustomerBookingData({
        bookingType: "Package",
        customerId: 0,
        storeId: 0,
        packageId: null,
        price: null,
        overs: null,
      });
      setShowCustomerBookingModal(false);
      loadBookingsFiltered("all");
    } catch (err) {
      setMessageModalContent({ message: "Failed to create booking. Please check your input and try again.", type: 'error' });
      setShowMessageModal(true);
      console.error("Booking submission error:", err);
    } finally {
      setIsSubmittingCustomer(false);
    }
  };

  // Function to get a single booking's details (for the modal)
  const getBookingDetails = async (bookingId: number) => {
    try {
      const response = await axiosInstance.get(
        `/admin/booking/details/${bookingId}`
      );
      if (response.data.valid) {
        const booking = response.data.booking;
        // Ensure the mapping from BookingData to DisplayBookingItem is correct
        const mappedBooking: DisplayBookingItem = {
          id: booking.id,
          name: booking.customer.name,
          phone: booking.customer?.phone || "N/A",
          bookingsTypes: booking.bookingType || "N/A",
          status: booking.paid ? "PAID" : "UNPAID", // Changed: Map directly to PAID/UNPAID based on 'paid' boolean
          paid: booking.paid, // Directly use the paid boolean
          store: booking.store.name,
          packageName: booking.package?.name || "N/A",
          packageType: booking.package?.type || "N/A",
          overs: booking.overs || 0,
          oversLeft: booking.oversLeft || 0,
          price: booking.price || 0,
          paidTo: booking.paymentMarkedBy || "N/A",
          paymentDate: booking.paymentMarkedAt?.split("T")[0] || "N/A",
          date: booking.date || "N/A",
          time: booking.time || "N/A",
        };
        setSelectedBooking(mappedBooking);
        setOversPlayedInput(''); // Clear overs input when modal opens
        setShowBookingDetailsModal(true);
      } else {
        setMessageModalContent({ message: "Failed to fetch booking details.", type: 'error' });
        setShowMessageModal(true);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setMessageModalContent({ message: "Error fetching booking details. Please try again.", type: 'error' });
      setShowMessageModal(true);
    }
  };

  // Function to mark payment as done
  const handleMarkPaymentAsDone = async () => {
    if (!selectedBooking) return;
    try {
      const response = await axiosInstance.get(
        `/admin/booking/payment/mark/${selectedBooking.id}`
      );
      if (response.data.valid) {
        setMessageModalContent({ message: "Payment marked as done successfully!", type: 'success' });
        setShowMessageModal(true);
        // After successful update, refresh the details in the modal and the main list
        getBookingDetails(selectedBooking.id); 
        loadBookingsFiltered("all"); 
      } else {
        setMessageModalContent({ message: "Failed to mark payment as done.", type: 'error' });
        setShowMessageModal(true);
      }
    } catch (err) {
      console.error("Error marking payment:", err);
      setMessageModalContent({ message: "Error marking payment. Please try again.", type: 'error' });
      setShowMessageModal(true);
    }
  };

  // Function to handle overs played submission
  const handleSubmitOversPlayed = async () => {
    if (!selectedBooking) return;

    const overs = parseInt(oversPlayedInput, 10);

    if (isNaN(overs) || overs <= 0) {
      setMessageModalContent({ message: "Please enter a valid number of overs.", type: 'error' });
      setShowMessageModal(true);
      return;
    }

    if (overs > selectedBooking.oversLeft) {
      setMessageModalContent({ message: `Overs played cannot exceed overs left (${selectedBooking.oversLeft}).`, type: 'error' });
      setShowMessageModal(true);
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/admin/booking/${selectedBooking.id}`,
        { playedOvers: overs }
      );
      if (response.data.valid) {
        setMessageModalContent({ message: "Overs played updated successfully!", type: 'success' });
        setShowMessageModal(true);
        setOversPlayedInput(''); // Clear input
        // After successful update, refresh the details in the modal and the main list
        getBookingDetails(selectedBooking.id); 
        loadBookingsFiltered("all"); 
      } else {
        setMessageModalContent({ message: "Failed to update overs played.", type: 'error' });
        setShowMessageModal(true);
      }
    } catch (error) {
      console.error("Error updating overs played:", error);
      setMessageModalContent({ message: "Error updating overs played. Please try again.", type: 'error' });
      setShowMessageModal(true);
    }
  };

  if (loading || dataLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  if (error || dataError) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error || dataError}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            loadBookingsFiltered("all");
            loadDropdownData();
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

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Feather name="menu" size={24} color="black" />
          <Text style={styles.headerTitle}>Bookings</Text>
        </TouchableOpacity>
        <Ionicons name="person-circle-outline" size={28} color="black" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <View style={styles.filterPickerContainer}>
          <Picker
            selectedValue={selectedFilterStoreId}
            onValueChange={(itemValue: number) =>
              handleFilterStoreChange(itemValue)
            }
            style={styles.filterPickerStyle}
            itemStyle={styles.filterPickerItemStyle}
          >
            <Picker.Item label="All Stores" value={0} />
            {stores.map((store) => (
              <Picker.Item key={store.id} label={store.name} value={store.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.filterPickerContainer}>
          <Picker
            selectedValue={selectedFilterStatus}
            onValueChange={(itemValue: string) =>
              handleFilterStatusChange(itemValue)
            }
            style={styles.filterPickerStyle}
            itemStyle={styles.filterPickerItemStyle}
          >
            <Picker.Item label="Status" value="all" />
            <Picker.Item label="Pending" value="0" />
            <Picker.Item label="Completed" value="1" />
          </Picker>
        </View>

        <View style={styles.filterPickerContainer}>
          <Picker
            selectedValue={selectedFilterPaidStatus}
            onValueChange={(itemValue: string) =>
              handleFilterPaidStatusChange(itemValue)
            }
            style={styles.filterPickerStyle}
            itemStyle={styles.filterPickerItemStyle}
          >
            <Picker.Item label="Paid Status" value="all" />
            <Picker.Item label="Unpaid" value="0" />
            <Picker.Item label="Paid" value="1" />
          </Picker>
        </View>

        <View style={styles.filterPickerContainer}>
          <Picker
            selectedValue={selectedFilterCustomerType}
            onValueChange={(itemValue: string) =>
              handleFilterCustomerTypeChange(itemValue)
            }
            style={styles.filterPickerStyle}
            itemStyle={styles.filterPickerItemStyle}
          >
            <Picker.Item label="Customer Type" value="all" />
            <Picker.Item label="NORMAL" value="0" />
            <Picker.Item label="IVR" value="1" />
            <Picker.Item label="WHATSAPP" value="2" />
            <Picker.Item label="ENQUIRY" value="3" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerButtonText}>
            {selectedFilterDate
              ? selectedFilterDate.toLocaleDateString("en-GB")
              : "Select Date"}
          </Text>
          <AntDesign name="calendar" size={16} color="#fff" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedFilterDate || new Date()}
            mode="date"
            display="default"
            onChange={handleFilterDateChange}
            maximumDate={new Date()}
          />
        )}
      </ScrollView>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search by customer name or phone"
          placeholderTextColor={Colors.STB.buttons}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery} // Update search query state
        />
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => setShowCustomerBookingModal(true)}
        >
          <Text style={styles.buttonText}>Existing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => setShowNewDirectBookingForm(true)}
        >
          <Text style={styles.buttonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll for Table Content */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, { width: 100 }]}>CUSTOMER</Text>
            <Text style={[styles.columnHeader, { width: 120 }]}>STORE</Text>
            <Text style={[styles.columnHeader, { width: 90 }]}>PHONE</Text>
            <Text style={[styles.columnHeader, { width: 70 }]}>BOOKINGS TYPE</Text>
            <Text style={[styles.columnHeader, { width: 70 }]}>STATUS</Text>
            <Text style={[styles.columnHeader, { width: 90 }]}>PACKAGE</Text>
            <Text style={[styles.columnHeader, { width: 80 }]}>PACKAGE TYPE</Text>
            <Text style={[styles.columnHeader, { width: 60 }]}>OVERS</Text>
            <Text style={[styles.columnHeader, { width: 60 }]}>OVERS LEFT</Text>
            <Text style={[styles.columnHeader, { width: 70 }]}>PRICE</Text>
            <Text style={[styles.columnHeader, { width: 80 }]}>PAID TO</Text>
            <Text style={[styles.columnHeader, { width: 90 }]}>PAYMENT DATE</Text>
            <Text style={[styles.columnHeader, { width: 90 }]}>DATE</Text>
            <Text style={[styles.columnHeader, { width: 60 }]}>TIME</Text>
            <Text style={[styles.columnHeader, { width: 60, textAlign: "right" }]}>
              ACTIONS
            </Text>
          </View>

          {/* Booking List - Vertical Scroll Handled by FlatList */}
          <FlatList
            data={filteredBookings} // Use filteredBookings here
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={[styles.columnText, { width: 100 }]}>{item.name}</Text>
                <Text style={[styles.columnText, { width: 120 }]}>{item.store}</Text>
                <Text style={[styles.columnText, { width: 90 }]}>{item.phone}</Text>
                <Text style={[styles.columnText, { width: 70 }]}>{item.bookingsTypes}</Text>
                <Text
                  style={[
                    styles.columnText,
                    { width: 70 },
                    item.status === "PAID" ? styles.paid : styles.unpaid, // Use item.status (now PAID/UNPAID) for styling
                  ]}
                >
                  {item.status}
                </Text>
                <Text style={[styles.columnText, { width: 90 }]}>{item.packageName}</Text>
                <Text style={[styles.columnText, { width: 80 }]}>{item.packageType}</Text>
                <Text style={[styles.columnText, { width: 60 }]}>{item.overs}</Text>
                <Text style={[styles.columnText, { width: 60 }]}>{item.oversLeft}</Text>
                <Text style={[styles.columnText, { width: 70 }]}>₹{item.price}</Text>
                <Text style={[styles.columnText, { width: 80 }]}>{item.paidTo}</Text>
                <Text style={[styles.columnText, { width: 90 }]}>{item.paymentDate}</Text>
                <Text style={[styles.columnText, { width: 90 }]}>{item.date}</Text>
                <Text style={[styles.columnText, { width: 60 }]}>{item.time}</Text>
                <TouchableOpacity
                  style={[styles.actionsColumn, { width: 60 }]}
                  onPress={() => getBookingDetails(item.id)} // Call the new function to fetch details and open modal
                >
                  <Image source={require("@/assets/Logo/link.png")} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Booking Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBookingDetailsModal}
        onRequestClose={() => setShowBookingDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.formContainer, { alignItems: "stretch" }]}>
            <Text style={[styles.formTitle, { marginBottom: 10 }]}>
              Booking Details
            </Text>
            {selectedBooking && (
              <>
                <Text style={styles.detailLabel}>
                  Customer:{" "}
                  <Text style={styles.detailValue}>
                    {selectedBooking.name} ({selectedBooking.phone})
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Store:{" "}
                  <Text style={styles.detailValue}>
                    {selectedBooking.store}
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Booking Type:{" "}
                  <Text style={styles.detailValue}>
                    {selectedBooking.bookingsTypes}
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Package:{" "}
                  <Text style={styles.detailValue}>
                    {selectedBooking.packageName} ({selectedBooking.packageType})
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Total Overs:{" "}
                  <Text style={styles.detailValue}>
                    {selectedBooking.overs}
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Overs Left:{" "}
                  <Text style={styles.detailValue}>
                    {selectedBooking.oversLeft}
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Price:{" "}
                  <Text style={styles.detailValue}>₹{selectedBooking.price}</Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Payment Status:{" "}
                  <Text
                    style={
                      selectedBooking.paid
                        ? styles.paid
                        : styles.unpaid
                    }
                  >
                    {selectedBooking.paid ? "PAID" : "UNPAID"}
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Paid By:{" "}
                  <Text style={styles.detailValue}>
                    {selectedBooking.paidTo}
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Payment Date:{" "}
                  <Text style={styles.detailValue}>
                    {selectedBooking.paymentDate}
                  </Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Booking Date:{" "}
                  <Text style={styles.detailValue}>{selectedBooking.date}</Text>
                </Text>
                <Text style={styles.detailLabel}>
                  Booking Time:{" "}
                  <Text style={styles.detailValue}>{selectedBooking.time}</Text>
                </Text>

                {/* Mark Payment as Done Button */}
                {!selectedBooking.paid && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#17A34A",
                      borderRadius: 8,
                      paddingVertical: 12,
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                    onPress={handleMarkPaymentAsDone}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Mark Payment As Done
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Overs Played Input */}
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 10 }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                      alignSelf: "center",
                      color: 'black'
                    }}
                  >
                    OVERS PLAYED
                  </Text>
                  <TextInput
                    style={[styles.formInput, { marginBottom: 10, width: "60%", color: 'black' }]}
                    placeholder="Enter Overs Played"
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={oversPlayedInput}
                    onChangeText={(text) => {
                      // Basic validation: only allow numbers, and don't allow more than oversLeft
                      const numericValue = parseInt(text, 10);
                      if (isNaN(numericValue) || numericValue < 0) {
                        setOversPlayedInput('');
                      } else if (selectedBooking && numericValue > selectedBooking.oversLeft) {
                        setOversPlayedInput(selectedBooking.oversLeft.toString());
                      } else {
                        setOversPlayedInput(text);
                      }
                    }}
                  />
                </View>

                {/* Action Buttons for Booking Details Modal */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    style={[styles.cancelButton, { flex: 1 }]}
                    onPress={() => setShowBookingDetailsModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.submitButton, { flex: 1 }]}
                    onPress={handleSubmitOversPlayed}
                  >
                    <Text style={styles.buttonText}>Submit Overs</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* New Direct Booking Modal */}
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

              <Text style={styles.inputLabel}>Booking Type</Text>
              <View style={styles.typeSelectorContainer}>
                <TouchableOpacity
                  style={[
                    styles.typeSelectorButton,
                    newDirectBookingData.bookingType === "Package" &&
                      styles.typeSelectorButtonActive,
                  ]}
                  onPress={() =>
                    handleNewDirectBookingFormChange("bookingType", "Package")
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
                    handleNewDirectBookingFormChange("bookingType", "Custom")
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

              <Text style={styles.inputLabel}>Store</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={newDirectBookingData.storeId?.toString()}
                  onValueChange={(itemValue) =>
                    handleNewDirectBookingFormChange(
                      "storeId",
                      parseInt(itemValue as string, 10)
                    )
                  }
                  style={styles.pickerStyle}
                  itemStyle={styles.pickerItemStyle}
                >
                  <Picker.Item label="Select a store" value="0" />
                  {stores.map((store) => (
                    <Picker.Item
                      key={store.id}
                      label={store.name}
                      value={store.id.toString()}
                    />
                  ))}
                </Picker>
              </View>

              {newDirectBookingData.bookingType === "Package" ? (
                <>
                  <Text style={styles.inputLabel}>Package</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={
                        newDirectBookingData.packageId?.toString() || ""
                      }
                      onValueChange={(itemValue) =>
                        handleNewDirectBookingFormChange(
                          "packageId",
                          parseInt(itemValue as string, 10)
                        )
                      }
                      style={styles.pickerStyle}
                      itemStyle={styles.pickerItemStyle}
                    >
                      <Picker.Item label="Select a package" value="" />
                      {packages.map((pack) => (
                        <Picker.Item
                          key={pack.id}
                          label={pack.name}
                          value={pack.id.toString()}
                        />
                      ))}
                    </Picker>
                  </View>
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
                  onPress={handleCreateDirectBooking}
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

      {/* Existing Customer Booking Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCustomerBookingModal}
        onRequestClose={() => {
          if (!isSubmittingCustomer) {
            setShowCustomerBookingModal(false);
            setCustomerSearchQuery(''); // Clear search when closing modal
          }
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.formScrollContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Add New Booking</Text>

              <Text style={styles.inputLabel}>Booking Type</Text>
              <View style={styles.typeSelectorContainer}>
                <TouchableOpacity
                  style={[
                    styles.typeSelectorButton,
                    customerBookingData.bookingType === "Package" &&
                      styles.typeSelectorButtonActive,
                  ]}
                  onPress={() =>
                    handleCustomerBookingFormChange("bookingType", "Package")
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
                    handleCustomerBookingFormChange("bookingType", "Custom")
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

              <Text style={styles.inputLabel}>Customer</Text>
              {/* Customer Search Input */}
              <TextInput
                style={styles.formInput}
                placeholder="Search customer by name or phone"
                placeholderTextColor="#94a3b8"
                value={customerSearchQuery}
                onChangeText={setCustomerSearchQuery} // Update customer search query state
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={customerBookingData.customerId.toString()}
                  onValueChange={(itemValue) =>
                    handleCustomerBookingFormChange("customerId", itemValue)
                  }
                  style={styles.pickerStyle}
                  itemStyle={styles.pickerItemStyle}
                >
                  <Picker.Item label="Select a customer" value="0" />
                  {/* Use filteredCustomers for the picker */}
                  {filteredCustomers.map((customer) => (
                    <Picker.Item
                      key={customer.id}
                      label={`${customer.name} (${customer.phone || 'N/A'})`}
                      value={customer.id.toString()}
                    />
                  ))}
                </Picker>
              </View>

              <Text style={styles.inputLabel}>Store</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={customerBookingData.storeId.toString()}
                  onValueChange={(itemValue) =>
                    handleCustomerBookingFormChange("storeId", itemValue)
                  }
                  style={styles.pickerStyle}
                  itemStyle={styles.pickerItemStyle}
                >
                  <Picker.Item label="Select a store" value="0" />
                  {stores.map((store) => (
                    <Picker.Item
                      key={store.id}
                      label={store.name}
                      value={store.id.toString()}
                    />
                  ))}
                </Picker>
              </View>

              {customerBookingData.bookingType === "Package" ? (
                <>
                  <Text style={styles.inputLabel}>Package</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={
                        customerBookingData.packageId?.toString() || ""
                      }
                      onValueChange={(itemValue) =>
                        handleCustomerBookingFormChange("packageId", itemValue)
                      }
                      style={styles.pickerStyle}
                      itemStyle={styles.pickerItemStyle}
                    >
                      <Picker.Item label="Select a package" value="" />
                      {packages.map((pack) => (
                        <Picker.Item
                          key={pack.id}
                          label={pack.name}
                          value={pack.id.toString()}
                        />
                      ))}
                    </Picker>
                  </View>
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

      {/* Custom Message Modal */}
      <MessageModal
        isVisible={showMessageModal}
        message={messageModalContent.message}
        onClose={() => setShowMessageModal(false)}
        type={messageModalContent.type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.STB.background,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight || 30,
  },
  centerContent: {
    flex: 1,
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
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
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
    marginBottom: 16,
    top: 8,
  },
  searchInput: {
    flex: 1,
    color: "#000", // Changed to black for visibility on white background
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1.5,
    borderColor: Colors.STB.buttons,
  },
  smallButton: {
    backgroundColor: Colors.STB.buttons,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomColor: "#334155",
    borderBottomWidth: 1,
    marginBottom: 6,
    width: 1200,
  },
  columnHeader: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
    flexShrink: 0,
    textAlign: 'left',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
    alignItems: "center",
    width: 1200,
  },
  columnText: {
    color: Colors.STB.text,
    fontSize: 11,
    flexShrink: 0,
  },
  paid: {
    color: "#10b981",
    fontSize: 12,
    fontWeight: "bold",
  },
  unpaid: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "bold",
  },
  actionsColumn: {
    alignItems: "flex-end",
  },
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: modalCalculatedWidth,
    alignSelf: "center",
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    color: "black", 
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },
  formInput: {
    color: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 40,
    width: "100%",
    marginBottom: 15,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "lightgrey",
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
    backgroundColor: "#60a5fa",
  },
  cancelButton: {
    backgroundColor: "#F44043",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  typeSelectorContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0", // Changed for white background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc", // Changed for white background
    overflow: "hidden",
    marginBottom: 15,
  },
  typeSelectorButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  typeSelectorButtonActive: {
    backgroundColor: "#3b82f6",
  },
  typeSelectorText: {
    color: "black", // Changed for white background
    fontWeight: "600",
    fontSize: 15,
  },
  typeSelectorTextActive: {
    color: "#fff",
  },
  pickerContainer: {
    backgroundColor: "#e0e0e0", // Changed for white background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc", // Changed for white background
    marginBottom: 15,
    overflow: "hidden",
    height: 50,
    justifyContent: "center",
  },
  pickerStyle: {
    color: "black", // Changed for white background
    height: 50,
    width: "100%",
  },
  pickerItemStyle: {
    color: "black", // iOS specific // Changed for white background
    fontSize: 16,
  },
  filterRow: {
    flexDirection: "row",
    paddingVertical: 10,
    bottom: 8,
  },
  filterPickerContainer: {
    backgroundColor: Colors.STB.buttons,
    borderRadius: 8,
    overflow: "hidden",
    height: 40,
    justifyContent: "center",
    minWidth: 160,
    marginRight: 10,
    flexShrink: 1,
  },
  filterPickerStyle: {
    color: "#fff",
    height: 50,
    width: "100%",
    fontSize: 14,
  },
  filterPickerItemStyle: {
    color: "#fff", // iOS specific
    fontSize: 14,
  },
  datePickerButton: {
    backgroundColor: Colors.STB.buttons,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    height: 40,
    flexDirection: "row",
    gap: 8,
  },
  datePickerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  detailLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  detailValue: {
    fontWeight: "normal",
    color: "#444",
  },
  messageModalContainer: {
    borderRadius: 10,
    padding: 20,
    width: modalCalculatedWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageModalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  messageModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default BookingsScreen;