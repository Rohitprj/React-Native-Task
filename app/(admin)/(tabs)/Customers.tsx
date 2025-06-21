// import { Colors } from "@/constants/Colors";
// import axiosInstance from "@/utils/axiosInstance"; // Assuming this path is correctly configured in your Expo project
// import { getUserData, removeUserData } from "@/utils/tokenStorage";
// import { AntDesign, Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
// import { DrawerNavigationProp } from "@react-navigation/drawer";
// import { useNavigation } from "@react-navigation/native";
// import { useRouter } from "expo-router";
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

// const screenWidth = Dimensions.get("window").width;
// const modalCalculatedWidth = screenWidth * 0.9;

// // --- START: API Interfaces ---
// interface CustomerData {
//   id: number;
//   name: string;
//   phone: string;
//   email: string;
//   createdAt: string;
//   // Potentially add stage, source, nextCallbackDate etc. from API if available
// }

// interface CustomersApiResponse {
//   valid: boolean;
//   customers: CustomerData[];
//   message?: string;
// }

// interface StageData {
//   id: number;
//   name: string;
// }

// interface StagesApiResponse {
//   valid: boolean;
//   stages: StageData[];
//   message?: string;
// }

// interface SourceData {
//   id: number;
//   name: string;
// }

// interface SourcesApiResponse {
//   valid: boolean;
//   sources: SourceData[];
//   message?: string;
// }

// interface DisplayCustomerItem {
//   id: number;
//   name: string;
//   phone: string;
//   date: string;
//   status: string; // E.g., "PAID", "UNPAID" - will be mocked or derived
// }

// // Updated interface for new customer form data, including new fields
// interface NewCustomerFormData {
//   name: string;
//   phone: string;
//   email: string;
//   modeOfPayment?: string; // New: Optional mode of payment
//   utrNumber?: string; // New: Optional UTR number
// }
// // --- END: API Interfaces ---

// // --- START: API Functions ---
// // (No changes to API functions for this request, but keeping them for context)
// async function fetchCustomersApi(): Promise<CustomerData[]> {
//   try {
//     const response = await axiosInstance.get<CustomersApiResponse>("/customer");
//     if (
//       response.data &&
//       response.data.valid &&
//       Array.isArray(response.data.customers)
//     ) {
//       return response.data.customers;
//     } else {
//       console.warn(
//         "API response did not contain a valid 'customers' array:",
//         response.data
//       );
//       throw new Error(response.data.message || "Failed to fetch customers.");
//     }
//   } catch (error) {
//     console.error("Error fetching customers:", error);
//     throw error;
//   }
// }

// async function createCustomerApi(
//   customerData: NewCustomerFormData
// ): Promise<CustomerData> {
//   try {
//     // Ensure axiosInstance is correctly configured to send to your backend
//     // Assuming the backend can receive modeOfPayment and utrNumber
//     const response = await axiosInstance.post<CustomerData>(
//       "/customer",
//       customerData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error creating customer:", error);
//     throw error;
//   }
// }

// async function fetchTodayCallbacksApi(): Promise<CustomerData[]> {
//   try {
//     const response = await axiosInstance.get<CustomersApiResponse>(
//       "/lead/today-callbacks"
//     );
//     if (
//       response.data &&
//       response.data.valid &&
//       Array.isArray(response.data.customers)
//     ) {
//       return response.data.customers;
//     } else {
//       console.warn(
//         "API response for today callbacks did not contain valid 'customers' array:",
//         response.data
//       );
//       throw new Error(
//         response.data.message || "Failed to fetch today's callbacks."
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching today's callbacks:", error);
//     throw error;
//   }
// }

// async function fetchStagesApi(): Promise<StageData[]> {
//   try {
//     const response = await axiosInstance.get<StagesApiResponse>("/lead/stage");
//     if (
//       response.data &&
//       response.data.valid &&
//       Array.isArray(response.data.stages)
//     ) {
//       return response.data.stages;
//     } else {
//       console.warn(
//         "API response for stages did not contain valid 'stages' array:",
//         response.data
//       );
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching stages:", error);
//     return [];
//   }
// }

// async function fetchSourcesApi(): Promise<SourceData[]> {
//   try {
//     const response = await axiosInstance.get<SourcesApiResponse>(
//       "/lead/source"
//     );
//     if (
//       response.data &&
//       response.data.valid &&
//       Array.isArray(response.data.sources)
//     ) {
//       return response.data.sources;
//     } else {
//       console.warn(
//         "API response for sources did not contain valid 'sources' array:",
//         response.data
//       );
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching sources:", error);
//     return [];
//   }
// }

// async function fetchCustomersByStageApi(
//   stageName: string
// ): Promise<CustomerData[]> {
//   try {
//     const response = await axiosInstance.get<CustomersApiResponse>(
//       `/lead/customer/leads/stage/${encodeURIComponent(stageName)}`
//     );
//     if (
//       response.data &&
//       response.data.valid &&
//       Array.isArray(response.data.customers)
//     ) {
//       return response.data.customers;
//     } else {
//       console.warn(
//         `API response for stage '${stageName}' did not contain valid 'customers' array:`,
//         response.data
//       );
//       throw new Error(
//         response.data.message ||
//           `Failed to fetch customers for stage: ${stageName}`
//       );
//     }
//   } catch (error) {
//     console.error(`Error fetching customers by stage '${stageName}':`, error);
//     throw error;
//   }
// }

// async function fetchCustomersBySourceApi(
//   sourceName: string
// ): Promise<CustomerData[]> {
//   try {
//     const response = await axiosInstance.get<CustomersApiResponse>(
//       `/lead/customer/leads/source/${encodeURIComponent(sourceName)}`
//     );
//     if (
//       response.data &&
//       response.data.valid &&
//       Array.isArray(response.data.customers)
//     ) {
//       return response.data.customers;
//     } else {
//       console.warn(
//         `API response for source '${sourceName}' did not contain valid 'customers' array:`,
//         response.data
//       );
//       throw new Error(
//         response.data.message ||
//           `Failed to fetch customers for source: ${sourceName}`
//       );
//     }
//   } catch (error) {
//     console.error(`Error fetching customers by source '${sourceName}':`, error);
//     throw error;
//   }
// }
// // --- END: API Functions ---

// const CustomersScreen = () => {
//   const [customers, setCustomers] = useState<DisplayCustomerItem[]>([]);
//   const [displayedCustomers, setDisplayedCustomers] = useState<
//     DisplayCustomerItem[]
//   >([]);

//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showNewCustomerForm, setShowNewCustomerForm] =
//     useState<boolean>(false);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const [newCustomerData, setNewCustomerData] = useState<NewCustomerFormData>({
//     name: "",
//     phone: "",
//     email: "",
//     modeOfPayment: "", // New: Initialize mode of payment
//     utrNumber: "", // New: Initialize UTR number
//   });

//   const [stages, setStages] = useState<StageData[]>([]);
//   const [sources, setSources] = useState<SourceData[]>([]);
//   const [selectedStage, setSelectedStage] = useState<string>("");
//   const [selectedSource, setSelectedSource] = useState<string>("");
//   const [showStagePicker, setShowStagePicker] = useState<boolean>(false);
//   const [showSourcePicker, setShowSourcePicker] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
// const [showLogout, setShowLogout] = useState(false);
// const [userEmail, setUserEmail] = useState<string>("");
//   // New state for Mode of Payment picker visibility
//   const [showPaymentModePicker, setShowPaymentModePicker] =
//     useState<boolean>(false);

//   // Static options for Mode of Payment dropdown
//   const paymentModeOptions = [
//     { id: "1", name: "Pay via UPI" },
//     { id: "2", name: "Net Banking" },
//     { id: "3", name: "Cash on Delivery" },
//   ];

//   const navigation = useNavigation<DrawerNavigationProp<any>>();
// const router = useRouter();
//   const handleLogout = async () => {
//       await removeUserData();
//       router.replace("/LoginScreen");
//     };
//   const mapCustomerDataToDisplay = (
//     apiData: CustomerData[]
//   ): DisplayCustomerItem[] => {
//     return apiData.map((customer) => ({
//       id: customer.id,
//       name: customer.name,
//       phone: customer.phone,
//       date: new Date(customer.createdAt).toLocaleDateString("en-GB"),
//       status: Math.random() > 0.5 ? "PAID" : "UNPAID", // Still mocking status
//     }));
//   };

//   const loadAllCustomers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const apiData: CustomerData[] = await fetchCustomersApi();
//       const asyncUserData = await getUserData();
//             if (asyncUserData?.email) setUserEmail(asyncUserData.email);
//       const mappedData = mapCustomerDataToDisplay(apiData);
//       setCustomers(mappedData);
//       setDisplayedCustomers(mappedData);
//       setSelectedStage("");
//       setSelectedSource("");
//       setSearchTerm("");
//     } catch (err: any) {
//       console.error("Failed to fetch all customers:", err);
//       setError(
//         err.message || "Failed to load customers. Please try again later."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTodayCallbacks = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const apiData: CustomerData[] = await fetchTodayCallbacksApi();
//       const mappedData = mapCustomerDataToDisplay(apiData);
//       setCustomers(mappedData);
//       setDisplayedCustomers(mappedData);
//       setSelectedStage("");
//       setSelectedSource("");
//       setSearchTerm("");
//     } catch (err: any) {
//       console.error("Failed to fetch today's callbacks:", err);
//       setError(
//         err.message || "Failed to load today's callbacks. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStageFilter = async (stageName: string) => {
//     setSelectedStage(stageName);
//     setShowStagePicker(false);

//     if (stageName === "") {
//       loadAllCustomers();
//     } else {
//       try {
//         setLoading(true);
//         setError(null);
//         const apiData: CustomerData[] = await fetchCustomersByStageApi(
//           stageName
//         );
//         const mappedData = mapCustomerDataToDisplay(apiData);
//         setCustomers(mappedData);
//         setDisplayedCustomers(mappedData);
//         setSelectedSource("");
//         setSearchTerm("");
//       } catch (err: any) {
//         console.error(`Failed to fetch customers by stage ${stageName}:`, err);
//         setError(
//           err.message || `Failed to load customers for stage: ${stageName}.`
//         );
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSourceFilter = async (sourceName: string) => {
//     setSelectedSource(sourceName);
//     setShowSourcePicker(false);

//     if (sourceName === "") {
//       loadAllCustomers();
//     } else {
//       try {
//         setLoading(true);
//         setError(null);
//         const apiData: CustomerData[] = await fetchCustomersBySourceApi(
//           sourceName
//         );
//         const mappedData = mapCustomerDataToDisplay(apiData);
//         setCustomers(mappedData);
//         setDisplayedCustomers(mappedData);
//         setSelectedStage("");
//         setSearchTerm("");
//       } catch (err: any) {
//         console.error(
//           `Failed to fetch customers by source ${sourceName}:`,
//           err
//         );
//         setError(
//           err.message || `Failed to load customers for source: ${sourceName}.`
//         );
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSearch = (text: string) => {
//     setSearchTerm(text);

//     if (text === "") {
//       setDisplayedCustomers(customers);
//     } else {
//       const lowercasedText = text.toLowerCase();
//       const filtered = customers.filter(
//         (customer) =>
//           customer.name.toLowerCase().includes(lowercasedText) ||
//           customer.phone.toLowerCase().includes(lowercasedText)
//       );
//       setDisplayedCustomers(filtered);
//     }
//   };

//   // Handler for selecting payment mode
//   const handlePaymentModeSelect = (mode: string) => {
//     setNewCustomerData({ ...newCustomerData, modeOfPayment: mode });
//     setShowPaymentModePicker(false);
//   };

//   useEffect(() => {
//     const initData = async () => {
//       await loadAllCustomers();
//       const fetchedStages = await fetchStagesApi();
//       setStages(fetchedStages);
//       const fetchedSources = await fetchSourcesApi();
//       setSources(fetchedSources);
//     };
//     initData();
//   }, []);

//   const handleInputChange = (
//     field: keyof NewCustomerFormData,
//     value: string
//   ) => {
//     setNewCustomerData({ ...newCustomerData, [field]: value });
//   };

//   const handleAddNewCustomer = async () => {
//     // Basic validation for existing fields
//     if (
//       !newCustomerData.name ||
//       !newCustomerData.phone ||
//       !newCustomerData.email
//     ) {
//       Alert.alert("Error", "Name, Phone, and Email are required.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       // Send all newCustomerData including modeOfPayment and utrNumber
//       await createCustomerApi(newCustomerData);
//       Alert.alert("Success", "Customer added successfully!");
//       setNewCustomerData({
//         name: "",
//         phone: "",
//         email: "",
//         modeOfPayment: "", // Reset new fields
//         utrNumber: "", // Reset new fields
//       });
//       setShowNewCustomerForm(false);
//       await loadAllCustomers(); // Re-fetch all customers to show the new one and reset filters/search
//     } catch (err: any) {
//       Alert.alert(
//         "Error",
//         err.message || "Failed to add customer. Please try again."
//       );
//       console.error("Submission error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text style={styles.loadingText}>Loading customers...</Text>
//       </View>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={loadAllCustomers} // Retry fetching data
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
//         {/* <View style={styles.headerLeft}>
//         </View> */}
//         <TouchableOpacity
//           onPress={() => navigation.openDrawer()}
//           style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
//         >
//           <Feather name="menu" size={24} color="black" />
//         <Text style={styles.headerTitle}>Customers</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//                   style={styles.headerIcons}
//                   onPress={() => setShowLogout(true)}
//                 >
//                   <Ionicons name="person-circle-outline" size={26} color="black" />
//                 </TouchableOpacity>
//       </View>
// <Modal visible={showLogout} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalEmail}>{userEmail}</Text>
//             <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//               <Text style={styles.logoutButtonText}>Logout</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setShowLogout(false)}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       {/* Filters (in a horizontal ScrollView) */}
//       <View style={{ marginBottom: 16 }}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filterRow}
//         >
//           {/* Today Callbacks Button */}
//           <TouchableOpacity
//             style={styles.todayCallbacksBtn}
//             onPress={handleTodayCallbacks}
//           >
//             <Text style={styles.buttonText}>Today Callbacks</Text>
//           </TouchableOpacity>

//           {/* Select Stage Dropdown Button */}
//           <TouchableOpacity
//             style={styles.filterSelectBtn}
//             onPress={() => setShowStagePicker(true)}
//           >
//             <Text style={styles.filterText}>
//               {selectedStage ? selectedStage : "Select a Stage"}
//             </Text>
//             <AntDesign name="down" size={14} color="white" />
//           </TouchableOpacity>

//           {/* Select Source Dropdown Button */}
//           <TouchableOpacity
//             style={styles.filterSelectBtn}
//             onPress={() => setShowSourcePicker(true)}
//           >
//             <Text style={styles.filterText}>
//               {selectedSource ? selectedSource : "Select a Source"}
//             </Text>
//             <AntDesign name="down" size={14} color="white" />
//           </TouchableOpacity>
//         </ScrollView>
//       </View>

//       {/* Search, New Button, and Refresh Button */}
//       <View style={styles.searchRow}>
//         <TextInput
//           placeholder="Search by name or phone"
//           placeholderTextColor={Colors.STB.buttons}
//           style={styles.searchInput}
//           value={searchTerm}
//           onChangeText={handleSearch} // This will now filter the displayed list
//         />
//         <View style={{ flexDirection: "row", gap: 10 }}>
//           <TouchableOpacity
//             style={styles.newButton}
//             onPress={() => setShowNewCustomerForm(true)}
//           >
//             <Text style={{ ...styles.buttonText, color: "white" }}>
//               + New
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.iconButton}
//             onPress={loadAllCustomers} // Refresh button reloads all customers and clears filters/search
//           >
//             <SimpleLineIcons name="refresh" size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Table Headers */}
//       <View style={styles.tableHeader}>
//         <Text style={[styles.columnHeader, { flex: 1.5 }]}>NAME</Text>
//         <Text
//           style={[
//             styles.columnHeader,
//             { flex: 1, textAlign: "center", right: 40 },
//           ]}
//         >
//           PHONE
//         </Text>
//         <Text style={[styles.columnHeader, { flex: 1, textAlign: "right" }]}>
//           CREATED ON DATE
//         </Text>
//       </View>

//       {/* List */}
//       <FlatList
//         data={displayedCustomers} // UPDATED: Use displayedCustomers for rendering
//         keyExtractor={(item) => item.id.toString()} // Use actual ID from API
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <View style={{ flex: 1.5 }}>
//               <Text style={styles.customerName}>{item.name}</Text>
//               {/* This status is mocked, replace with actual data if available */}
//               <Text
//                 style={item.status === "PAID" ? styles.paid : styles.unpaid}
//               >
//                 {item.status}
//               </Text>
//             </View>
//             <Text style={[styles.customerPhone, { flex: 1 }]}>
//               {item.phone}
//             </Text>
//             <View style={{ flex: 1.5, alignItems: "flex-end" }}>
//               <Text style={styles.customerDate}>{item.date}</Text>
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={() =>
//           !loading &&
//           !error && (
//             <View style={styles.emptyListContainer}>
//               <Text style={styles.emptyListText}>No customers found.</Text>
//             </View>
//           )
//         }
//       />

//       {/* New Customer Form Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showNewCustomerForm}
//         onRequestClose={() => setShowNewCustomerForm(false)}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.modalOverlay}
//         >
//           <ScrollView contentContainerStyle={styles.formScrollContainer}>
//             <View style={styles.formContainer}>
//               <Text style={styles.formTitle}>Add New Customer</Text>

//               <Text style={styles.inputLabel}>Customer Name</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter customer name"
//                 placeholderTextColor="#94a3b8"
//                 value={newCustomerData.name}
//                 onChangeText={(text) => handleInputChange("name", text)}
//               />

//               <Text style={styles.inputLabel}>Customer Phone</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter customer phone"
//                 placeholderTextColor="#94a3b8"
//                 keyboardType="phone-pad"
//                 value={newCustomerData.phone}
//                 onChangeText={(text) => handleInputChange("phone", text)}
//               />

//               <Text style={styles.inputLabel}>Customer Email</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter customer email"
//                 placeholderTextColor="#94a3b8"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={newCustomerData.email}
//                 onChangeText={(text) => handleInputChange("email", text)}
//               />

//               {/* New Field: Mode of Payment */}
//               <Text style={styles.inputLabel}>Mode of Payment</Text>
//               <TouchableOpacity
//                 style={styles.formInput} // Re-using formInput style for consistent look
//                 onPress={() => setShowPaymentModePicker(true)}
//               >
//                 <Text
//                   style={
//                     newCustomerData.modeOfPayment
//                       ? styles.pickerSelectedText
//                       : styles.pickerPlaceholderText
//                   }
//                 >
//                   {newCustomerData.modeOfPayment || "Select mode of payment"}
//                 </Text>
//                 <AntDesign
//                   name="down"
//                   size={14}
//                   color="#94a3b8"
//                   style={styles.pickerIcon}
//                 />
//               </TouchableOpacity>

//               {/* New Field: UTR Number */}
//               <Text style={styles.inputLabel}>UTR Number</Text>
//               <TextInput
//                 style={styles.formInput}
//                 placeholder="Enter UTR number (optional)"
//                 placeholderTextColor="#94a3b8"
//                 value={newCustomerData.utrNumber}
//                 onChangeText={(text) => handleInputChange("utrNumber", text)}
//               />

//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[
//                     styles.submitButton,
//                     isSubmitting && styles.submitButtonDisabled,
//                   ]}
//                   onPress={handleAddNewCustomer}
//                   disabled={isSubmitting} // Disable while submitting
//                 >
//                   {isSubmitting ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.buttonText}>Submit</Text>
//                   )}
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelButton}
//                   onPress={() => setShowNewCustomerForm(false)}
//                   disabled={isSubmitting} // Disable cancel while submitting
//                 >
//                   <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Modal>

//       {/* Stage Picker Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={showStagePicker}
//         onRequestClose={() => setShowStagePicker(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setShowStagePicker(false)} // Close when tapping outside
//         >
//           <View style={styles.pickerModalContainer}>
//             <FlatList
//               data={[{ id: 0, name: "Select a stage" }, ...stages]} // Add default option
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.pickerItem}
//                   onPress={() =>
//                     handleStageFilter(
//                       item.name === "Select a stage" ? "" : item.name
//                     )
//                   }
//                 >
//                   <Text style={styles.pickerItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//               ItemSeparatorComponent={() => (
//                 <View style={styles.pickerSeparator} />
//               )}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Source Picker Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={showSourcePicker}
//         onRequestClose={() => setShowSourcePicker(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setShowSourcePicker(false)} // Close when tapping outside
//         >
//           <View style={styles.pickerModalContainer}>
//             <FlatList
//               data={[{ id: 0, name: "Select a source" }, ...sources]} // Add default option
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.pickerItem}
//                   onPress={() =>
//                     handleSourceFilter(
//                       item.name === "Select a source" ? "" : item.name
//                     )
//                   }
//                 >
//                   <Text style={styles.pickerItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//               ItemSeparatorComponent={() => (
//                 <View style={styles.pickerSeparator} />
//               )}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* New: Mode of Payment Picker Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={showPaymentModePicker}
//         onRequestClose={() => setShowPaymentModePicker(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setShowPaymentModePicker(false)}
//         >
//           <View style={styles.pickerModalContainer}>
//             <FlatList
//               data={[
//                 { id: "0", name: "Select mode of payment" },
//                 ...paymentModeOptions,
//               ]} // Add default option
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.pickerItem}
//                   onPress={() =>
//                     handlePaymentModeSelect(
//                       item.name === "Select mode of payment" ? "" : item.name
//                     )
//                   }
//                 >
//                   <Text style={styles.pickerItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//               ItemSeparatorComponent={() => (
//                 <View style={styles.pickerSeparator} />
//               )}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.STB.background,
//     paddingHorizontal: 16,
//     paddingTop: 30,
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
//     marginTop: 10,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 12,
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "black",
//   },headerIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   filterRow: {
//     flexDirection: "row",
//     gap: 10,
//     paddingRight: 20,
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 12,
//     justifyContent: "space-between",
//   },
//   searchInput: {
//     flex: 1,
//     backgroundColor: Colors.STB.background,
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//     borderWidth: 1,
//     borderColor: Colors.STB.buttons,
//   },
//   newButton: {
//     backgroundColor: Colors.STB.buttons,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 13,
//   },
//   iconButton: {
//     backgroundColor: Colors.STB.buttons,
//     padding: 10,
//     borderRadius: 8,
//   },
//   tableHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingBottom: 8,
//     borderBottomColor: "#334155",
//     borderBottomWidth: 1,
//     marginBottom: 6,
//   },
//   columnHeader: {
//     color: "#94a3b8",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 14,
//     borderBottomColor: "#1e293b",
//     borderBottomWidth: 1,
//   },
//   customerName: {
//     color: "#1E3A8A",
//     fontWeight: "bold",
//     fontSize: 13,
//   },
//   paid: {
//     color: "#10b981",
//     fontSize: 12,
//   },
//   unpaid: {
//     color: "#ef4444",
//     fontSize: 12,
//   },
//   customerPhone: {
//     color: "#94a3b8",
//     fontSize: 12,
//   },
//   customerDate: {
//     color: "#94a3b8",
//     fontSize: 12,
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
//     flexDirection: "row", // Added for picker touchable opacity
//     alignItems: "center", // Added for picker touchable opacity
//     justifyContent: "space-between", // Added for picker touchable opacity
//   },
//   pickerSelectedText: {
//     // New style for selected text in picker
//     color: "#fff",
//     fontSize: 16,
//   },
//   pickerPlaceholderText: {
//     // New style for placeholder text in picker
//     color: "#94a3b8",
//     fontSize: 16,
//   },
//   pickerIcon: {
//     // New style for dropdown icon in picker
//     marginLeft: 10,
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
//   filterSelectBtn: {
//     backgroundColor: Colors.STB.buttons,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     alignItems: "center",
//     minWidth: 120,
//   },
//   filterText: {
//     color: "#fff",
//     fontSize: 13,
//   },
//   todayCallbacksBtn: {
//     backgroundColor: Colors.STB.buttons,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pickerModalContainer: {
//     backgroundColor: "#1e293b",
//     borderRadius: 10,
//     paddingVertical: 10,
//     width: modalCalculatedWidth * 0.8,
//     maxHeight: Dimensions.get("window").height * 0.6,
//   },
//   pickerItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   pickerItemText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   pickerSeparator: {
//     height: 1,
//     backgroundColor: "#334155",
//     marginHorizontal: 10,
//   },
//   emptyListContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 50,
//   },
//   emptyListText: {
//     color: "#94a3b8",
//     fontSize: 16,
//   },modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//   },
//   modalEmail: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 20,
//     color: "#333",
//   },
//   logoutButton: {
//     backgroundColor: "#ef4444",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   logoutButtonText: {
//     color: "white",
//     fontWeight: "600",
//   },
//   cancelText: {
//     color: "#555",
//     marginTop: 5,
//   },
// });

// export default CustomersScreen;

import { Colors } from "@/constants/Colors";
import axiosInstance from "@/utils/axiosInstance"; // Assuming this path is correctly configured in your Expo project
import { getUserData, removeUserData } from "@/utils/tokenStorage";
import { AntDesign, Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
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

const screenWidth = Dimensions.get("window").width;
const modalCalculatedWidth = screenWidth * 0.9;

// --- START: API Interfaces ---
interface CustomerData {
  id: number;
  name: string;
  phone: string;
  email: string | null; // email can be null
  createdAt: string;
  // Potentially add stage, source, nextCallbackDate etc. from API if available
}

interface CustomersApiResponse {
  valid: boolean;
  customers: CustomerData[];
  message?: string;
}

interface StageData {
  id: number;
  name: string;
}

interface StagesApiResponse {
  valid: boolean;
  stages: StageData[];
  message?: string;
}

interface SourceData {
  id: number;
  name: string;
}

interface SourcesApiResponse {
  valid: boolean;
  sources: SourceData[];
  message?: string;
}

interface DisplayCustomerItem {
  id: number;
  name: string;
  phone: string;
  email: string | null; // Added email to display interface
  date: string;
  status: string; // E.g., "PAID", "UNPAID" - will be mocked or derived
}

// Updated interface for new customer form data, including new fields
interface NewCustomerFormData {
  name: string;
  phone: string;
  email: string;
  modeOfPayment?: string; // New: Optional mode of payment
  utrNumber?: string; // New: Optional UTR number
}

// Interface for Customer Edit Payload (Name and Email)
interface CustomerEditPayload {
    name: string;
    email: string | null;
}

// --- END: API Interfaces ---

// --- START: API Functions ---
async function fetchCustomersApi(): Promise<CustomerData[]> {
  try {
    const response = await axiosInstance.get<CustomersApiResponse>("/customer");
    if (
      response.data &&
      response.data.valid &&
      Array.isArray(response.data.customers)
    ) {
      return response.data.customers;
    } else {
      console.warn(
        "API response did not contain a valid 'customers' array:",
        response.data
      );
      throw new Error(response.data.message || "Failed to fetch customers.");
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
}

async function createCustomerApi(
  customerData: NewCustomerFormData
): Promise<CustomerData> {
  try {
    const response = await axiosInstance.post<CustomerData>(
      "/customer",
      customerData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

// NEW: Function to update customer details (name and email)
async function updateCustomerApi(
    customerId: number,
    payload: CustomerEditPayload
): Promise<CustomerData> {
    try {
        const response = await axiosInstance.put<CustomerData>(
            `/customer/${customerId}`,
            payload
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating customer ${customerId}:`, error);
        throw error;
    }
}

async function fetchTodayCallbacksApi(): Promise<CustomerData[]> {
  try {
    const response = await axiosInstance.get<CustomersApiResponse>(
      "/lead/today-callbacks"
    );
    if (
      response.data &&
      response.data.valid &&
      Array.isArray(response.data.customers)
    ) {
      return response.data.customers;
    } else {
      console.warn(
        "API response for today callbacks did not contain valid 'customers' array:",
        response.data
      );
      throw new Error(
        response.data.message || "Failed to fetch today's callbacks."
      );
    }
  } catch (error) {
    console.error("Error fetching today's callbacks:", error);
    throw error;
  }
}

async function fetchStagesApi(): Promise<StageData[]> {
  try {
    const response = await axiosInstance.get<StagesApiResponse>("/lead/stage");
    if (
      response.data &&
      response.data.valid &&
      Array.isArray(response.data.stages)
    ) {
      return response.data.stages;
    } else {
      console.warn(
        "API response for stages did not contain valid 'stages' array:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching stages:", error);
    return [];
  }
}

async function fetchSourcesApi(): Promise<SourceData[]> {
  try {
    const response = await axiosInstance.get<SourcesApiResponse>(
      "/lead/source"
    );
    if (
      response.data &&
      response.data.valid &&
      Array.isArray(response.data.sources)
    ) {
      return response.data.sources;
    } else {
      console.warn(
        "API response for sources did not contain valid 'sources' array:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching sources:", error);
    return [];
  }
}

async function fetchCustomersByStageApi(
  stageName: string
): Promise<CustomerData[]> {
  try {
    const response = await axiosInstance.get<CustomersApiResponse>(
      `/lead/customer/leads/stage/${encodeURIComponent(stageName)}`
    );
    if (
      response.data &&
      response.data.valid &&
      Array.isArray(response.data.customers)
    ) {
      return response.data.customers;
    } else {
      console.warn(
        `API response for stage '${stageName}' did not contain valid 'customers' array:`,
        response.data
      );
      throw new Error(
        response.data.message ||
          `Failed to fetch customers for stage: ${stageName}`
      );
    }
  } catch (error) {
    console.error(`Error fetching customers by stage '${stageName}':`, error);
    throw error;
  }
}

async function fetchCustomersBySourceApi(
  sourceName: string
): Promise<CustomerData[]> {
  try {
    const response = await axiosInstance.get<CustomersApiResponse>(
      `/lead/customer/leads/source/${encodeURIComponent(sourceName)}`
    );
    if (
      response.data &&
      response.data.valid &&
      Array.isArray(response.data.customers)
    ) {
      return response.data.customers;
    } else {
      console.warn(
        `API response for source '${sourceName}' did not contain valid 'customers' array:`,
        response.data
      );
      throw new Error(
        response.data.message || `Failed to fetch customers for source: ${sourceName}.`
      );
    }
  } catch (error) {
    console.error(`Error fetching customers by source '${sourceName}':`, error);
    throw error;
  }
}
// --- END: API Functions ---

const CustomersScreen = () => {
  const [customers, setCustomers] = useState<DisplayCustomerItem[]>([]);
  const [displayedCustomers, setDisplayedCustomers] = useState<
    DisplayCustomerItem[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewCustomerForm, setShowNewCustomerForm] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [newCustomerData, setNewCustomerData] = useState<NewCustomerFormData>({
    name: "",
    phone: "",
    email: "",
    modeOfPayment: "", // New: Initialize mode of payment
    utrNumber: "", // New: Initialize UTR number
  });

  const [stages, setStages] = useState<StageData[]>([]);
  const [sources, setSources] = useState<SourceData[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [showStagePicker, setShowStagePicker] = useState<boolean>(false);
  const [showSourcePicker, setShowSourcePicker] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showLogout, setShowLogout] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  // New state for Mode of Payment picker visibility
  const [showPaymentModePicker, setShowPaymentModePicker] =
    useState<boolean>(false);

  // --- NEW: State for Edit Customer Modal ---
  const [showEditCustomerModal, setShowEditCustomerModal] = useState<boolean>(false);
  const [selectedCustomerForEdit, setSelectedCustomerForEdit] =
    useState<DisplayCustomerItem | null>(null);
  const [editCustomerName, setEditCustomerName] = useState<string>('');
  const [editCustomerEmail, setEditCustomerEmail] = useState<string | null>('');
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState<boolean>(false);


  // Static options for Mode of Payment dropdown
  const paymentModeOptions = [
    { id: "1", name: "Pay via UPI" },
    { id: "2", name: "Net Banking" },
    { id: "3", name: "Cash on Delivery" },
  ];

  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const router = useRouter();

  const handleLogout = async () => {
    await removeUserData();
    router.replace("/LoginScreen");
  };

  const mapCustomerDataToDisplay = (
    apiData: CustomerData[]
  ): DisplayCustomerItem[] => {
    return apiData.map((customer) => ({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email, // Map email from API response
      date: new Date(customer.createdAt).toLocaleDateString("en-GB"),
      status: Math.random() > 0.5 ? "PAID" : "UNPAID", // Still mocking status
    }));
  };

  const loadAllCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiData: CustomerData[] = await fetchCustomersApi();
      const asyncUserData = await getUserData();
      if (asyncUserData?.email) setUserEmail(asyncUserData.email);
      const mappedData = mapCustomerDataToDisplay(apiData);
      setCustomers(mappedData);
      setDisplayedCustomers(mappedData);
      setSelectedStage("");
      setSelectedSource("");
      setSearchTerm("");
    } catch (err: any) {
      console.error("Failed to fetch all customers:", err);
      setError(
        err.message || "Failed to load customers. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTodayCallbacks = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiData: CustomerData[] = await fetchTodayCallbacksApi();
      const mappedData = mapCustomerDataToDisplay(apiData);
      setCustomers(mappedData);
      setDisplayedCustomers(mappedData);
      setSelectedStage("");
      setSelectedSource("");
      setSearchTerm("");
    } catch (err: any) {
      console.error("Failed to fetch today's callbacks:", err);
      setError(
        err.message || "Failed to load today's callbacks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStageFilter = async (stageName: string) => {
    setSelectedStage(stageName);
    setShowStagePicker(false);

    if (stageName === "") {
      loadAllCustomers();
    } else {
      try {
        setLoading(true);
        setError(null);
        const apiData: CustomerData[] = await fetchCustomersByStageApi(
          stageName
        );
        const mappedData = mapCustomerDataToDisplay(apiData);
        setCustomers(mappedData);
        setDisplayedCustomers(mappedData);
        setSelectedSource("");
        setSearchTerm("");
      } catch (err: any) {
        console.error(`Failed to fetch customers by stage ${stageName}:`, err);
        setError(
          err.message || `Failed to load customers for stage: ${stageName}.`
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSourceFilter = async (sourceName: string) => {
    setSelectedSource(sourceName);
    setShowSourcePicker(false);

    if (sourceName === "") {
      loadAllCustomers();
    } else {
      try {
        setLoading(true);
        setError(null);
        const apiData: CustomerData[] = await fetchCustomersBySourceApi(
          sourceName
        );
        const mappedData = mapCustomerDataToDisplay(apiData);
        setCustomers(mappedData);
        setDisplayedCustomers(mappedData);
        setSelectedStage("");
        setSearchTerm("");
      } catch (err: any) {
        console.error(
          `Failed to fetch customers by source ${sourceName}:`,
          err
        );
        setError(
          err.message || `Failed to load customers for source: ${sourceName}.`
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);

    if (text === "") {
      setDisplayedCustomers(customers);
    } else {
      const lowercasedText = text.toLowerCase();
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(lowercasedText) ||
          customer.phone.toLowerCase().includes(lowercasedText)
      );
      setDisplayedCustomers(filtered);
    }
  };

  // Handler for selecting payment mode
  const handlePaymentModeSelect = (mode: string) => {
    setNewCustomerData({ ...newCustomerData, modeOfPayment: mode });
    setShowPaymentModePicker(false);
  };

  useEffect(() => {
    const initData = async () => {
      await loadAllCustomers();
      const fetchedStages = await fetchStagesApi();
      setStages(fetchedStages);
      const fetchedSources = await fetchSourcesApi();
      setSources(fetchedSources);
    };
    initData();
  }, []);

  const handleInputChange = (
    field: keyof NewCustomerFormData,
    value: string
  ) => {
    setNewCustomerData({ ...newCustomerData, [field]: value });
  };

  const handleAddNewCustomer = async () => {
    // Basic validation for existing fields
    if (
      !newCustomerData.name ||
      !newCustomerData.phone ||
      !newCustomerData.email
    ) {
      Alert.alert("Error", "Name, Phone, and Email are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Send all newCustomerData including modeOfPayment and utrNumber
      await createCustomerApi(newCustomerData);
      Alert.alert("Success", "Customer added successfully!");
      setNewCustomerData({
        name: "",
        phone: "",
        email: "",
        modeOfPayment: "", // Reset new fields
        utrNumber: "", // Reset new fields
      });
      setShowNewCustomerForm(false);
      await loadAllCustomers(); // Re-fetch all customers to show the new one and reset filters/search
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.message || "Failed to add customer. Please try again."
      );
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NEW: Edit Customer Functions ---
  const openEditModal = (customer: DisplayCustomerItem) => {
    setSelectedCustomerForEdit(customer);
    setEditCustomerName(customer.name);
    setEditCustomerEmail(customer.email);
    setShowEditCustomerModal(true);
  };

  const handleEditCustomerNameChange = (text: string) => {
    setEditCustomerName(text);
  };

  const handleEditCustomerEmailChange = (text: string) => {
    setEditCustomerEmail(text === '' ? null : text); // Allow email to be null
  };

  const handleUpdateCustomer = async () => {
    if (!selectedCustomerForEdit) return;

    if (!editCustomerName.trim()) {
      Alert.alert("Validation Error", "Customer Name cannot be empty.");
      return;
    }

    setIsUpdatingCustomer(true);
    try {
      const payload: CustomerEditPayload = {
        name: editCustomerName,
        email: editCustomerEmail,
      };
      await updateCustomerApi(selectedCustomerForEdit.id, payload);
      Alert.alert("Success", "Customer updated successfully!");
      setShowEditCustomerModal(false);
      await loadAllCustomers(); // Refresh the list
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to update customer.");
      console.error("Customer update error:", err);
    } finally {
      setIsUpdatingCustomer(false);
    }
  };
  // --- END: Edit Customer Functions ---


  // Render loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading customers...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadAllCustomers} // Retry fetching data
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
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Feather name="menu" size={24} color="black" />
          <Text style={styles.headerTitle}>Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerIcons}
          onPress={() => setShowLogout(true)}
        >
          <Ionicons name="person-circle-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>
      <Modal visible={showLogout} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmail}>{userEmail}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLogout(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Filters (in a horizontal ScrollView) */}
      <View style={{ marginBottom: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {/* Today Callbacks Button */}
          <TouchableOpacity
            style={styles.todayCallbacksBtn}
            onPress={handleTodayCallbacks}
          >
            <Text style={styles.buttonText}>Today Callbacks</Text>
          </TouchableOpacity>

          {/* Select Stage Dropdown Button */}
          <TouchableOpacity
            style={styles.filterSelectBtn}
            onPress={() => setShowStagePicker(true)}
          >
            <Text style={styles.filterText}>
              {selectedStage ? selectedStage : "Select a Stage"}
            </Text>
            <AntDesign name="down" size={14} color="white" />
          </TouchableOpacity>

          {/* Select Source Dropdown Button */}
          <TouchableOpacity
            style={styles.filterSelectBtn}
            onPress={() => setShowSourcePicker(true)}
          >
            <Text style={styles.filterText}>
              {selectedSource ? selectedSource : "Select a Source"}
            </Text>
            <AntDesign name="down" size={14} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Search, New Button, and Refresh Button */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search by name or phone"
          placeholderTextColor={Colors.STB.buttons}
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch} // This will now filter the displayed list
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => setShowNewCustomerForm(true)}
          >
            <Text style={{ ...styles.buttonText, color: "white" }}>
              + New
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={loadAllCustomers} // Refresh button reloads all customers and clears filters/search
          >
            <SimpleLineIcons name="refresh" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 1.5 }]}>NAME</Text>
        <Text
          style={[
            styles.columnHeader,
            { flex: 1, textAlign: "center", right: 40 },
          ]}
        >
          PHONE
        </Text>
        <Text style={[styles.columnHeader, { flex: 1, textAlign: "right",right:8 }]}>
          CREATED ON DATE
        </Text>
        {/* NEW: Action Column Header */}
        <Text style={[styles.columnHeader, {  textAlign: "center"}]}>
          ACTION
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={displayedCustomers} // UPDATED: Use displayedCustomers for rendering
        keyExtractor={(item) => item.id.toString()} // Use actual ID from API
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.customerName}>{item.name}</Text>
              {/* This status is mocked, replace with actual data if available */}
              <Text
                style={item.status === "PAID" ? styles.paid : styles.unpaid}
              >
                {item.status}
              </Text>
            </View>
            <Text style={[styles.customerPhone]}>
              {item.phone}
            </Text>
            <View style={{ flex: 1.5, alignItems: "flex-end",right:10 }}>
              <Text style={styles.customerDate}>{item.date}</Text>
            </View>
            {/* NEW: Action Column with Edit Button */}
            <View style={[styles.actionsColumn, { flex: 0.5, alignItems: 'center' }]}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => openEditModal(item)} // Pass the customer item to the edit modal
              >
                <Feather name="edit" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          !loading &&
          !error && (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No customers found.</Text>
            </View>
          )
        }
      />

      {/* New Customer Form Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNewCustomerForm}
        onRequestClose={() => setShowNewCustomerForm(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.formScrollContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Add New Customer</Text>

              <Text style={styles.inputLabel}>Customer Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter customer name"
                placeholderTextColor="#94a3b8"
                value={newCustomerData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />

              <Text style={styles.inputLabel}>Customer Phone</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter customer phone"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                value={newCustomerData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
              />

              <Text style={styles.inputLabel}>Customer Email</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter customer email"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={newCustomerData.email}
                onChangeText={(text) => handleInputChange("email", text)}
              />

              {/* New Field: Mode of Payment */}
              <Text style={styles.inputLabel}>Mode of Payment</Text>
              <TouchableOpacity
                style={styles.formInput} // Re-using formInput style for consistent look
                onPress={() => setShowPaymentModePicker(true)}
              >
                <Text
                  style={
                    newCustomerData.modeOfPayment
                      ? styles.pickerSelectedText
                      : styles.pickerPlaceholderText
                  }
                >
                  {newCustomerData.modeOfPayment || "Select mode of payment"}
                </Text>
                <AntDesign
                  name="down"
                  size={14}
                  color="#94a3b8"
                  style={styles.pickerIcon}
                />
              </TouchableOpacity>

              {/* New Field: UTR Number */}
              <Text style={styles.inputLabel}>UTR Number</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter UTR number (optional)"
                placeholderTextColor="#94a3b8"
                value={newCustomerData.utrNumber}
                onChangeText={(text) => handleInputChange("utrNumber", text)}
              />

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isSubmitting && styles.submitButtonDisabled,
                  ]}
                  onPress={handleAddNewCustomer}
                  disabled={isSubmitting} // Disable while submitting
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowNewCustomerForm(false)}
                  disabled={isSubmitting} // Disable cancel while submitting
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* NEW: Edit Customer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditCustomerModal}
        onRequestClose={() => setShowEditCustomerModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Customer Details</Text>

            <Text style={styles.inputLabel}>Customer Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter customer name"
              placeholderTextColor="#94a3b8"
              value={editCustomerName}
              onChangeText={handleEditCustomerNameChange}
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter customer email (optional)"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={editCustomerEmail || ''} // Handle null email
              onChangeText={handleEditCustomerEmailChange}
            />

            <View style={styles.formActions}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  isUpdatingCustomer && styles.submitButtonDisabled,
                ]}
                onPress={handleUpdateCustomer}
                disabled={isUpdatingCustomer}
              >
                {isUpdatingCustomer ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowEditCustomerModal(false)}
                disabled={isUpdatingCustomer}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Stage Picker Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showStagePicker}
        onRequestClose={() => setShowStagePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowStagePicker(false)} // Close when tapping outside
        >
          <View style={styles.pickerModalContainer}>
            <FlatList
              data={[{ id: 0, name: "Select a stage" }, ...stages]} // Add default option
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() =>
                    handleStageFilter(
                      item.name === "Select a stage" ? "" : item.name
                    )
                  }
                >
                  <Text style={styles.pickerItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.pickerSeparator} />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Source Picker Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSourcePicker}
        onRequestClose={() => setShowSourcePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowSourcePicker(false)} // Close when tapping outside
        >
          <View style={styles.pickerModalContainer}>
            <FlatList
              data={[{ id: 0, name: "Select a source" }, ...sources]} // Add default option
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() =>
                    handleSourceFilter(
                      item.name === "Select a source" ? "" : item.name
                    )
                  }
                >
                  <Text style={styles.pickerItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.pickerSeparator} />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* New: Mode of Payment Picker Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPaymentModePicker}
        onRequestClose={() => setShowPaymentModePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowPaymentModePicker(false)}
        >
          <View style={styles.pickerModalContainer}>
            <FlatList
              data={[
                { id: "0", name: "Select mode of payment" },
                ...paymentModeOptions,
              ]} // Add default option
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() =>
                    handlePaymentModeSelect(
                      item.name === "Select mode of payment" ? "" : item.name
                    )
                  }
                >
                  <Text style={styles.pickerItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.pickerSeparator} />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.STB.background,
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
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 20,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.STB.background,
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.STB.buttons,
  },
  newButton: {
    backgroundColor: Colors.STB.buttons,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  iconButton: {
    backgroundColor: Colors.STB.buttons,
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
    flexShrink: 0,
    textAlign: 'left',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
    alignItems: "center", // Align items vertically in the center
  },
  customerName: {
    color: "#1E3A8A",
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
    color: "#94a3b8",
    fontSize: 12,
  },
  customerDate: {
    color: "#94a3b8",
    fontSize: 12,
  },
  actionsColumn: {
    alignItems: "center", // Center the edit button
  },
  editButton: {
    backgroundColor: Colors.STB.buttons,
    padding: 8,
    borderRadius: 5,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerSelectedText: {
    color: "#fff",
    fontSize: 16,
  },
  pickerPlaceholderText: {
    color: "#94a3b8",
    fontSize: 16,
  },
  pickerIcon: {
    marginLeft: 10,
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
  filterSelectBtn: {
    backgroundColor: Colors.STB.buttons,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    minWidth: 120,
  },
  filterText: {
    color: "#fff",
    fontSize: 13,
  },
  todayCallbacksBtn: {
    backgroundColor: Colors.STB.buttons,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerModalContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 10,
    paddingVertical: 10,
    width: modalCalculatedWidth * 0.8,
    maxHeight: Dimensions.get("window").height * 0.6,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  pickerItemText: {
    color: "#fff",
    fontSize: 16,
  },
  pickerSeparator: {
    height: 1,
    backgroundColor: "#334155",
    marginHorizontal: 10,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyListText: {
    color: "#94a3b8",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalEmail: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "600",
  },
  cancelText: {
    color: "#555",
    marginTop: 5,
  },
});

export default CustomersScreen;
