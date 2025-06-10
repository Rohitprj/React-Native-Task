// import axiosInstance from "@/utils/axiosInstance"; // Import axiosInstance
// import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react"; // Import useEffect
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   FlatList,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView, // Import ActivityIndicator for loading state
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // Get screen width once outside the component to avoid recalculations
// const screenWidth = Dimensions.get("window").width;
// const modalCalculatedWidth = screenWidth * 0.9; // 90% of screen width

// // --- START: API Interfaces ---
// interface CustomerData {
//   id: number;
//   name: string;
//   phone: string;
//   email: string;
//   createdAt: string;
// }

// interface CustomersApiResponse {
//   valid: boolean;
//   customers: CustomerData[];
// }

// // Interface for data displayed in FlatList
// interface DisplayCustomerItem {
//   id: number;
//   name: string;
//   phone: string;
//   date: string; // Formatted date
//   status: string; // E.g., "PAID", "UNPAID" - will be mocked or derived
// }

// // Interface for new customer form data (matching API payload)
// interface NewCustomerFormData {
//   name: string;
//   phone: string;
//   email: string;
// }
// // --- END: API Interfaces ---

// // --- START: API Functions ---
// async function fetchCustomersApi(): Promise<CustomerData[]> {
//   try {
//     const response = await axiosInstance.get<CustomersApiResponse>("/customer");
//     if (response.data && Array.isArray(response.data.customers)) {
//       return response.data.customers;
//     } else {
//       console.warn(
//         "API response did not contain a 'customers' array:",
//         response.data
//       );
//       return [];
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
//     const response = await axiosInstance.post<CustomerData>(
//       "/customer",
//       customerData // Direct payload as it matches NewCustomerFormData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error creating customer:", error);
//     throw error;
//   }
// }
// // --- END: API Functions ---

// const CustomersScreen = () => {
//   const [customers, setCustomers] = useState<DisplayCustomerItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showNewCustomerForm, setShowNewCustomerForm] =
//     useState<boolean>(false);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // For submit button loading

//   const [newCustomerData, setNewCustomerData] = useState<NewCustomerFormData>({
//     name: "",
//     phone: "",
//     email: "",
//   });

//   // Function to load customers from API
//   const loadCustomers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const apiData: CustomerData[] = await fetchCustomersApi();

//       // Map API data to DisplayCustomerItem
//       const mappedData: DisplayCustomerItem[] = apiData.map((customer) => ({
//         id: customer.id,
//         name: customer.name,
//         phone: customer.phone,
//         // Assuming 'createdAt' is available for 'date' and we'll mock status
//         date: new Date(customer.createdAt).toLocaleDateString("en-GB"), // Format date as DD/MM/YYYY
//         status: Math.random() > 0.5 ? "PAID" : "UNPAID", // Mocking status for now
//       }));
//       setCustomers(mappedData);
//     } catch (err) {
//       console.error("Failed to fetch customers:", err);
//       setError("Failed to load customers. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial data load on component mount
//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   const handleInputChange = (
//     field: keyof NewCustomerFormData,
//     value: string
//   ) => {
//     setNewCustomerData({ ...newCustomerData, [field]: value });
//   };

//   const handleAddNewCustomer = async () => {
//     // Basic validation
//     if (
//       !newCustomerData.name ||
//       !newCustomerData.phone ||
//       !newCustomerData.email
//     ) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await createCustomerApi(newCustomerData); // Call the API
//       Alert.alert("Success", "Customer added successfully!");
//       setNewCustomerData({
//         name: "",
//         phone: "",
//         email: "",
//       });
//       setShowNewCustomerForm(false);
//       loadCustomers(); // Re-fetch customers to show the new one
//     } catch (err) {
//       Alert.alert("Error", "Failed to add customer. Please try again.");
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
//           onPress={loadCustomers} // Retry fetching data
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
//           <Text style={styles.headerTitle}>Customers</Text>
//         </View>
//         <Ionicons name="person-circle-outline" size={28} color="white" />
//       </View>

//       {/* Filters */}
//       <View style={{ marginBottom: 16 }}>
//         <FlatList
//           data={["Select Stage", "Select Source"]}
//           keyExtractor={(item) => item}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filterRow}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.filterBtn}>
//               <Text style={styles.filterText}>{item}</Text>
//               <AntDesign name="down" size={14} color="white" />
//             </TouchableOpacity>
//           )}
//         />
//       </View>

//       {/* Search and New Button */}
//       <View style={styles.searchRow}>
//         <TextInput
//           placeholder="Search"
//           placeholderTextColor="#94a3b8"
//           style={styles.searchInput}
//         />
//         <View style={{ flexDirection: "row", gap: 10 }}>
//           <TouchableOpacity
//             style={styles.newButton}
//             onPress={() => setShowNewCustomerForm(true)}
//           >
//             <Text style={{ ...styles.buttonText, color: "#1e40af" }}>
//               + New
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton} onPress={loadCustomers}>
//             {/* Added onPress to refresh button */}
//             <SimpleLineIcons name="refresh" size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Table Headers */}
//       <View style={styles.tableHeader}>
//         <Text style={[styles.columnHeader, { flex: 1.5 }]}>NAME</Text>
//         {/* Adjusted flex */}
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
//         data={customers} // Use fetched customers data
//         keyExtractor={(item) => item.id.toString()} // Use actual ID from API
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <View style={{ flex: 1.5 }}>
//               <Text style={styles.customerName}>{item.name}</Text>
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
//             {/* <Text style={[styles.customerDate, { flex: 1 }]}>{item.date}</Text> */}
//           </View>
//         )}
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
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
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
//     marginBottom: 12,
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   topRow: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 12,
//     justifyContent: "space-between",
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 12,
//     justifyContent: "space-between",
//   },
//   searchInput: {
//     width: "50%",
//     backgroundColor: "#1e293b",
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//   },
//   newButton: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white", // Default for white buttons, overridden for +New
//     fontWeight: "600",
//     fontSize: 13,
//   },
//   iconButton: {
//     backgroundColor: "#1e40af",
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
//     // flex will be set inline
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 14,
//     borderBottomColor: "#1e293b",
//     borderBottomWidth: 1,
//   },
//   customerName: {
//     color: "#fff",
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
//     color: "#cbd5e0",
//     fontSize: 12,
//   },
//   customerDate: {
//     color: "#cbd5e0",
//     fontSize: 12,
//   },
//   // --- MODAL STYLES ---
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
// });

// export default CustomersScreen;

import axiosInstance from "@/utils/axiosInstance"; // Import axiosInstance
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
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

// Get screen width once outside the component to avoid recalculations
const screenWidth = Dimensions.get("window").width;
const modalCalculatedWidth = screenWidth * 0.9; // 90% of screen width

// --- START: API Interfaces ---
interface CustomerData {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  // Add other customer properties if they come from the API for display
  // e.g., stage, source, nextCallbackDate etc.
}

interface CustomersApiResponse {
  valid: boolean;
  customers: CustomerData[];
  message?: string; // Optional message from API
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

// Interface for data displayed in FlatList
interface DisplayCustomerItem {
  id: number;
  name: string;
  phone: string;
  date: string; // Formatted date
  status: string; // E.g., "PAID", "UNPAID" - will be mocked or derived
  // Add stage, source, and next callback date if applicable for display
}

// Interface for new customer form data (matching API payload)
interface NewCustomerFormData {
  name: string;
  phone: string;
  email: string;
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

// NEW: Fetch Today's Callbacks
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

// NEW: Fetch Lead Stages
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
      return []; // Return empty array if not valid
    }
  } catch (error) {
    console.error("Error fetching stages:", error);
    return []; // Return empty array on error
  }
}

// NEW: Fetch Lead Sources
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
      return []; // Return empty array if not valid
    }
  } catch (error) {
    console.error("Error fetching sources:", error);
    return []; // Return empty array on error
  }
}

// NEW: Fetch Customers by Stage
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

// NEW: Fetch Customers by Source
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
        response.data.message ||
          `Failed to fetch customers for source: ${sourceName}`
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewCustomerForm, setShowNewCustomerForm] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // For submit button loading

  const [newCustomerData, setNewCustomerData] = useState<NewCustomerFormData>({
    name: "",
    phone: "",
    email: "",
  });

  // NEW STATES for filtering
  const [stages, setStages] = useState<StageData[]>([]);
  const [sources, setSources] = useState<SourceData[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [showStagePicker, setShowStagePicker] = useState<boolean>(false);
  const [showSourcePicker, setShowSourcePicker] = useState<boolean>(false);
  // State for search term (from previous code)
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Helper to map API CustomerData to DisplayCustomerItem
  const mapCustomerDataToDisplay = (
    apiData: CustomerData[]
  ): DisplayCustomerItem[] => {
    return apiData.map((customer) => ({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      date: new Date(customer.createdAt).toLocaleDateString("en-GB"),
      status: Math.random() > 0.5 ? "PAID" : "UNPAID", // Still mocking status
    }));
  };

  // Function to load all customers from API (resets filters)
  const loadAllCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiData: CustomerData[] = await fetchCustomersApi();
      setCustomers(mapCustomerDataToDisplay(apiData));
      // Reset filter selections when loading all customers
      setSelectedStage("");
      setSelectedSource("");
      setSearchTerm(""); // Also clear search term
    } catch (err: any) {
      console.error("Failed to fetch all customers:", err);
      setError(
        err.message || "Failed to load customers. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // NEW: Handle "Today Callbacks" button press
  const handleTodayCallbacks = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiData: CustomerData[] = await fetchTodayCallbacksApi();
      setCustomers(mapCustomerDataToDisplay(apiData));
      // Reset other filters and search term when "Today Callbacks" is applied
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

  // NEW: Handle Stage filter selection
  const handleStageFilter = async (stageName: string) => {
    setSelectedStage(stageName);
    setShowStagePicker(false); // Close the picker modal

    if (stageName === "") {
      // If "Select a stage" is chosen, load all customers
      loadAllCustomers();
    } else {
      try {
        setLoading(true);
        setError(null);
        const apiData: CustomerData[] = await fetchCustomersByStageApi(
          stageName
        );
        setCustomers(mapCustomerDataToDisplay(apiData));
        // Reset other filters and search term conceptually if this is the primary filter
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

  // NEW: Handle Source filter selection
  const handleSourceFilter = async (sourceName: string) => {
    setSelectedSource(sourceName);
    setShowSourcePicker(false); // Close the picker modal

    if (sourceName === "") {
      // If "Select a source" is chosen, load all customers
      loadAllCustomers();
    } else {
      try {
        setLoading(true);
        setError(null);
        const apiData: CustomerData[] = await fetchCustomersBySourceApi(
          sourceName
        );
        setCustomers(mapCustomerDataToDisplay(apiData));
        // Reset other filters and search term conceptually if this is the primary filter
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

  // Handle search input (remains from original code)
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    // You'll need to filter the `customers` array based on `text` here
    // For now, it just updates the searchTerm state.
    // To actually filter the displayed list, you would typically filter the `customers` state
    // or make an API call with the search term. For this example, I'll keep it simple
    // and assume you'll integrate the filtering logic later, perhaps by filtering the `customers` array
    // directly, or passing the search term to an API if your backend supports it.
  };

  // Initial data load on component mount and fetch filter options
  useEffect(() => {
    const initData = async () => {
      await loadAllCustomers(); // Load initial customers
      const fetchedStages = await fetchStagesApi();
      setStages(fetchedStages);
      const fetchedSources = await fetchSourcesApi();
      setSources(fetchedSources);
    };
    initData();
  }, []); // Empty dependency array means this runs once on mount

  const handleInputChange = (
    field: keyof NewCustomerFormData,
    value: string
  ) => {
    setNewCustomerData({ ...newCustomerData, [field]: value });
  };

  const handleAddNewCustomer = async () => {
    // Basic validation
    if (
      !newCustomerData.name ||
      !newCustomerData.phone ||
      !newCustomerData.email
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCustomerApi(newCustomerData); // Call the API
      Alert.alert("Success", "Customer added successfully!");
      setNewCustomerData({
        name: "",
        phone: "",
        email: "",
      });
      setShowNewCustomerForm(false);
      loadAllCustomers(); // Re-fetch all customers to show the new one and reset filters
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
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Customers</Text>
        </View>
        <Ionicons name="person-circle-outline" size={28} color="white" />
      </View>

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

      {/* Search, New Button, and Refresh Button (in their original searchRow View) */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => setShowNewCustomerForm(true)}
          >
            <Text style={{ ...styles.buttonText, color: "#1e40af" }}>
              + New
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={loadAllCustomers}
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
        <Text style={[styles.columnHeader, { flex: 1, textAlign: "right" }]}>
          CREATED ON DATE
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={customers} // Use fetched customers data
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
            <Text style={[styles.customerPhone, { flex: 1 }]}>
              {item.phone}
            </Text>
            <View style={{ flex: 1.5, alignItems: "flex-end" }}>
              <Text style={styles.customerDate}>{item.date}</Text>
            </View>
          </View>
        )}
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
  // Previous filterRow, now holds only the filter buttons
  filterRow: {
    flexDirection: "row",
    // No specific justifyContent here, items will flow with gap
    gap: 10, // Spacing between filter buttons
    paddingRight: 20, // To allow scrolling content to not be cut off
  },
  // Original searchRow, now back to holding search, new, and refresh
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    justifyContent: "space-between", // Distributes items
  },
  searchInput: {
    flex: 1, // Allow search input to take available space
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  newButton: {
    backgroundColor: "#fff",
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
  },
  customerDate: {
    color: "#cbd5e0",
    fontSize: 12,
  },
  // --- MODAL STYLES ---
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
  // NEW STYLES for filter buttons and pickers
  filterSelectBtn: {
    backgroundColor: "#374151",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8, // Added paddingVertical for better touch area
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    minWidth: 120, // Give it a minimum width
  },
  filterText: {
    color: "#fff",
    fontSize: 13,
  },
  todayCallbacksBtn: {
    backgroundColor: "#1e40af", // Adjusted to match the web's blue-900
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
    width: modalCalculatedWidth * 0.8, // Slightly smaller than new customer modal
    maxHeight: Dimensions.get("window").height * 0.6, // Max height for picker list
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
});

export default CustomersScreen;
