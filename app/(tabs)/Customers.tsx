import axiosInstance from "@/utils/axiosInstance"; // Import axiosInstance
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react"; // Import useEffect
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView, // Import ActivityIndicator for loading state
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
}

interface CustomersApiResponse {
  valid: boolean;
  customers: CustomerData[];
}

// Interface for data displayed in FlatList
interface DisplayCustomerItem {
  id: number;
  name: string;
  phone: string;
  date: string; // Formatted date
  status: string; // E.g., "PAID", "UNPAID" - will be mocked or derived
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
    if (response.data && Array.isArray(response.data.customers)) {
      return response.data.customers;
    } else {
      console.warn(
        "API response did not contain a 'customers' array:",
        response.data
      );
      return [];
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
      customerData // Direct payload as it matches NewCustomerFormData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
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

  // Function to load customers from API
  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiData: CustomerData[] = await fetchCustomersApi();

      // Map API data to DisplayCustomerItem
      const mappedData: DisplayCustomerItem[] = apiData.map((customer) => ({
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        // Assuming 'createdAt' is available for 'date' and we'll mock status
        date: new Date(customer.createdAt).toLocaleDateString("en-GB"), // Format date as DD/MM/YYYY
        status: Math.random() > 0.5 ? "PAID" : "UNPAID", // Mocking status for now
      }));
      setCustomers(mappedData);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data load on component mount
  useEffect(() => {
    loadCustomers();
  }, []);

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
      loadCustomers(); // Re-fetch customers to show the new one
    } catch (err) {
      Alert.alert("Error", "Failed to add customer. Please try again.");
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
          onPress={loadCustomers} // Retry fetching data
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

      {/* Search and New Button */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
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
          <TouchableOpacity style={styles.iconButton} onPress={loadCustomers}>
            {/* Added onPress to refresh button */}
            <SimpleLineIcons name="refresh" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 1.5 }]}>NAME</Text>
        {/* Adjusted flex */}
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
            {/* <Text style={[styles.customerDate, { flex: 1 }]}>{item.date}</Text> */}
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
  topRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  searchInput: {
    width: "50%",
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
  },
  buttonText: {
    color: "white", // Default for white buttons, overridden for +New
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
    // flex will be set inline
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
});

export default CustomersScreen;

// import axiosInstance from "@/utils/axiosInstance"; // Import axiosInstance
// import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
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
//   createdAt: string; // Assuming the API returns this
//   // Add other fields from your API response if any (e.g., status, orders count)
//   // For 'status' in your current mock data, we'll map it based on other logic or API response if available.
//   // For now, we'll map a dummy status or derive it.
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
//         {/*
//           Use specific flex values for each column to control their width.
//           Make sure these flex values are consistent with the data rows.
//         */}
//         <Text style={[styles.columnHeader, { flex: 2 }]}>NAME</Text>
//         <Text style={[styles.columnHeader, { flex: 1, textAlign: "center" }]}>
//           PHONE
//         </Text>
//         <Text style={[styles.columnHeader, { flex: 1.5, textAlign: "right" }]}>
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
//             {/* Wrap each logical column's content in a View with the corresponding flex */}
//             <View style={{ flex: 2 }}>
//               <Text style={styles.customerName}>{item.name}</Text>
//               <Text
//                 style={item.status === "PAID" ? styles.paid : styles.unpaid}
//               >
//                 {item.status}
//               </Text>
//             </View>
//             {/* Use text alignment styles for phone and date */}
//             {/* <View style={{ flex: 1 }}>
//               <Text style={styles.customerPhone}>{item.phone}</Text>
//             </View> */}
//             <Text style={[styles.customerPhone, { flex: 1 }]}>
//               {item.phone}
//             </Text>
//             <View style={{ flex: 1.5, alignItems: "flex-end" }}>
//               <Text style={styles.customerDate}>{item.date}</Text>
//             </View>
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
// });

// export default CustomersScreen;
