// import { Colors } from "@/constants/Colors";
// import { removeUserData } from "@/utils/tokenStorage";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import axios from "axios";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";

// type Customer = {
//   id: number;
//   name: string;
//   phone: string;
//   createdAt: string;
// };

// const CustomersScreen = () => {
//   const [customersData, setCustomersData] = useState<Customer[]>([]);
//   const [filteredData, setFilteredData] = useState<Customer[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showLogout, setShowLogout] = useState(false);

//   const router = useRouter();

//   const handleLogout = async () => {
//     await removeUserData();
//     router.replace("/LoginScreen");
//   };
//   const fetchCustomers = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         "https://striketheball.in/api/customer/clients"
//       );
//       if (response.data?.valid && Array.isArray(response.data?.customers)) {
//         setCustomersData(response.data.customers);
//         setFilteredData(response.data.customers);
//         setSearchTerm("");
//       } else {
//         console.warn(
//           "API response did not contain valid 'customers' array:",
//           response.data
//         );
//         setError("Invalid data received from server. Please try again.");
//       }
//     } catch (err: any) {
//       console.error("Error fetching customers:", err);

//       setError(
//         err.message ||
//           "Failed to load customers. Please check your network connection."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const handleSearch = (text: string) => {
//     setSearchTerm(text);
//     const lowercased = text.toLowerCase();
//     const filtered = customersData.filter(
//       (item) =>
//         item.name?.toLowerCase().includes(lowercased) ||
//         item.phone?.includes(lowercased)
//     );
//     setFilteredData(filtered);
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text style={styles.loadingText}>Loading customers...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={[styles.container, styles.centerContent]}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchCustomers}>
//           <Text style={styles.buttonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Text style={styles.headerTitle}>Client</Text>
//         </View>
//         {/* <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
//           <Ionicons name="person-circle-outline" size={28} color="#000" />
//         </TouchableOpacity> */}
//       </View>
//       {/* {showLogout && <Button title="Logout" onPress={handleLogout} />} */}
//       {/* Search and Refresh */}
//       <View style={styles.searchRow}>
//         <TextInput
//           placeholder="Search by name or phone"
//           placeholderTextColor="#94a3b8"
//           style={styles.searchInput}
//           value={searchTerm}
//           onChangeText={handleSearch}
//         />
//         <TouchableOpacity style={styles.iconButton} onPress={fetchCustomers}>
//           <SimpleLineIcons name="refresh" size={20} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Table Headers */}
//       <View style={styles.tableHeader}>
//         <Text style={[styles.columnHeader, { flex: 2 }]}>NAME</Text>
//         <Text style={[styles.columnHeader, { flex: 1 }]}>PHONE</Text>
//         <Text style={[styles.columnHeader, { flex: 1 }]}>CREATED ON DATE</Text>
//       </View>

//       {/* List */}
//       <FlatList
//         data={filteredData}
//         keyExtractor={(item) => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <Text style={[styles.customerName, { flex: 2 }]}>{item.name}</Text>
//             <Text style={[styles.customerPhone, { flex: 1 }]}>
//               {item.phone}
//             </Text>
//             <Text style={[styles.customerDate, { flex: 1 }]}>
//               {new Date(item.createdAt).toLocaleDateString()}
//             </Text>
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
//   buttonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 13,
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
//     color: "#000",
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 12,
//     justifyContent: "space-between",
//   },
//   searchInput: {
//     width: "70%",
//     // backgroundColor: "#1e293b",
//     color: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//     borderWidth: 1.5,
//     borderColor: Colors.STB.buttons,
//   },
//   iconButton: {
//     backgroundColor:Colors.STB.buttons,
//     padding: 10,
//     borderRadius: 8,
//   },
//   tableHeader: {
//     flexDirection: "row",
//     paddingBottom: 8,
//     paddingTop: 12,
//     borderBottomColor: "#334155",
//     borderBottomWidth: 1,
//     marginBottom: 6,
//   },
//   columnHeader: {
//     color: "#000",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   row: {
//     flexDirection: "row",
//     paddingVertical: 18,
//     borderBottomColor: "#1e293b",
//     borderBottomWidth: 1,
//   },
//   customerName: {
//     color: Colors.STB.text,
//     fontWeight: "bold",
//     fontSize: 13,
//   },
//   customerPhone: {
//     color: "grey",
//     fontSize: 12,
//     textAlign: "center",
//   },
//   customerDate: {
//     color: "grey",
//     fontSize: 12,
//     textAlign: "right",
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
//   },
// });

// export default CustomersScreen;

import { Colors } from "@/constants/Colors";
import axiosInstance from "@/utils/axiosInstance"; // Import axiosInstance
import { getUserData, removeUserData } from "@/utils/tokenStorage";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useRouter } from "expo-router"; // Ensure useRouter is imported if used
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert, // Import Alert for showing messages
  Dimensions, // Import Dimensions for screen width
  FlatList,
  KeyboardAvoidingView, // For keyboard handling in modals
  Modal,
  Platform, // For platform-specific KAV behavior
  ScrollView, // For horizontal scrolling
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const modalCalculatedWidth = screenWidth * 0.9;
// Adjusted tableContentWidth for NAME, PHONE, CREATED ON DATE, ACTION
const tableContentWidth = 470; // NAME (150) + PHONE (180) + CREATED ON DATE (80) + ACTION (60)

type Customer = {
  id: number;
  name: string;
  phone: string; // Kept as 'phone' as per your provided type
  createdAt: string;
  // If your GET API *does* return 'email' for existing customers,
  // even if it's not in the type you explicitly provided,
  // you might want to add 'email?: string | null;' here.
  // For this response, we'll assume GET doesn't return it for display purposes.
};

interface CustomerEditPayload {
  name: string;
  email: string | null; // This payload still uses 'email' based on your curl example
}

// API Function for PUT Request using axiosInstance
async function updateCustomerApi(
  customerId: number,
  payload: CustomerEditPayload
): Promise<any> { // Return type 'any' because we're not sure of the exact response structure after PUT
  try {
    const response = await axiosInstance.put<any>( // Using 'any' as return type for now
      `/customer/${customerId}`, // Using relative path based on curl `/customer/7343`
      payload
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error updating client ${customerId}:`, error);
    // More descriptive error handling
    if (error.response && error.response.status === 404) {
      throw new Error("Client not found or incorrect API endpoint. Please verify the ID and URL.");
    } else if (error.response) {
      throw new Error(error.response.data.message || "Failed to update client.");
    } else {
      throw new Error(error.message || "Failed to update client. Check network connection.");
    }
  }
}

const CustomersScreen = () => {
  const [customersData, setCustomersData] = useState<Customer[]>([]);
  const [filteredData, setFilteredData] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await removeUserData();
    router.replace("/LoginScreen");
  };

  const [userEmail, setUserEmail] = useState<string>("");

  // States for Edit Customer Modal
  const [showEditCustomerModal, setShowEditCustomerModal] =
    useState<boolean>(false);
  const [selectedCustomerForEdit, setSelectedCustomerForEdit] =
    useState<Customer | null>(null);
  const [editCustomerName, setEditCustomerName] = useState<string>("");
  // IMPORTANT: The `editCustomerEmail` state is used because your PUT API expects 'email'.
  // However, since your GET API returns 'phone' and not 'email' (as per your type),
  // this will initialize to `null` or an empty string, and any email data would be new input.
  const [editCustomerEmail, setEditCustomerEmail] = useState<string | null>(""); 
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState<boolean>(false);


  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get( // Using plain axios here as per your original code
        "https://striketheball.in/api/customer/clients"
      );
      const asyncUserData = await getUserData();
      if (asyncUserData?.email) setUserEmail(asyncUserData.email);
      if (response.data?.valid && Array.isArray(response.data?.customers)) {
        // IMPORTANT: Here we assume the API returns 'name', 'phone', 'createdAt'.
        // If the API also returns 'email', you can map it:
        // email: c.email || null,
        const fetchedClients: Customer[] = response.data.customers.map((c: any) => ({
            id: c.id,
            name: c.name,
            phone: c.phone, // Assuming API returns 'phone'
            createdAt: c.createdAt,
        }));
        setCustomersData(fetchedClients);
        setFilteredData(fetchedClients);
        setSearchTerm("");
      } else {
        console.warn(
          "API response did not contain valid 'customers' array:",
          response.data
        );
        setError("Invalid data received from server. Please try again.");
      }
    } catch (err: any) {
      console.error("Error fetching customers:", err);

      setError(
        err.message ||
        "Failed to load customers. Please check your network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const lowercased = text.toLowerCase();
    const filtered = customersData.filter(
      (item) =>
        item.name?.toLowerCase().includes(lowercased) ||
        item.phone?.includes(lowercased) // MODIFIED: Search by phone, as per your Customer type
    );
    setFilteredData(filtered);
  };

  // --- Functions for Edit Customer Modal ---
  const openEditModal = (customer: Customer) => {
    setSelectedCustomerForEdit(customer);
    setEditCustomerName(customer.name);
    // Initialize email to null or empty, as the fetched Customer type doesn't have it.
    // If your GET API *does* return email and you added it to Customer type,
    // you'd initialize with `customer.email`.
    setEditCustomerEmail(null); 
    setShowEditCustomerModal(true);
  };

  const handleEditCustomerNameChange = (text: string) => {
    setEditCustomerName(text);
  };

  const handleEditCustomerEmailChange = (text: string) => { 
    setEditCustomerEmail(text);
  };

  const handleUpdateCustomer = async () => {
    if (!selectedCustomerForEdit) return;

    if (!editCustomerName.trim()) { 
      Alert.alert("Validation Error", "Name cannot be empty.");
      return;
    }
    // Basic email validation if an email is provided (optional, but good practice)
    if (editCustomerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editCustomerEmail)) {
        Alert.alert("Validation Error", "Please enter a valid email address, or leave it empty.");
        return;
    }

    setIsUpdatingCustomer(true);
    try {
      const payload: CustomerEditPayload = {
        name: editCustomerName,
        email: editCustomerEmail, // Sending 'email' as per your curl example
      };
      await updateCustomerApi(selectedCustomerForEdit.id, payload);
      Alert.alert("Success", "Client updated successfully!");
      setShowEditCustomerModal(false);
      await fetchCustomers(); // Refresh the list
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to update client.");
      console.error("Client update error:", err);
    } finally {
      setIsUpdatingCustomer(false);
    }
  };
  // --- END: Functions for Edit Customer Modal ---

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading clients...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCustomers}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity> */}
          <Text style={styles.headerTitle}>Clients</Text>
        {/* <TouchableOpacity
          style={styles.headerIcons}
          onPress={() => setShowLogout(true)}
        >
          <Ionicons name="person-circle-outline" size={26} color="black" />
        </TouchableOpacity> */}
      </View>

      {/* <Modal visible={showLogout} transparent animationType="slide">
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
      </Modal> */}
      {/* Search and Refresh */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search by name or phone" // Kept as 'phone'
          placeholderTextColor={Colors.STB.buttons}
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.iconButton} onPress={fetchCustomers}>
          <SimpleLineIcons name="refresh" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Table Headers */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        
      </ScrollView>

      {/* List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View>        
        <View style={styles.tableHeader}>
          <Text style={[styles.columnHeader, { width: 150}]}>NAME</Text>
          <Text style={[styles.columnHeader, { width: 180, textAlign: "center" }]}>
            PHONE {/* Kept as PHONE */}
          </Text>
          <Text style={[styles.columnHeader, { width: 80, textAlign: "right" }]}>
            CREATED ON
          </Text>
          <Text style={[styles.columnHeader, { width: 60, textAlign: "center" }]}>
            ACTION {/* ADDED: Action column header */}
          </Text>
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minWidth: tableContentWidth }} // Ensure FlatList content can extend horizontally
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={[styles.customerName, { width: 150 }]}>
                {item.name}
              </Text>
              <Text style={[styles.customerPhone, { width: 180, textAlign: "center" }]}>
                {item.phone} {/* Display PHONE */}
              </Text>
              <Text style={[styles.customerDate, { width: 80, textAlign: "right" }]}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              {/* Action Column with Edit Button */}
              <View style={[styles.actionsColumn, { width: 60, alignItems: 'center' }]}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditModal(item)}
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
                <Text style={styles.emptyListText}>No clients found.</Text>
              </View>
            )
          }
        />
        </View>
      </ScrollView>

      {/* Edit Customer Modal */}
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
          <ScrollView contentContainerStyle={styles.formScrollContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Edit Client Details</Text>

              <Text style={styles.inputLabel}>Client Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter client name"
                placeholderTextColor="#94a3b8"
                value={editCustomerName}
                onChangeText={handleEditCustomerNameChange}
              />

              {/* Input for Email, as your PUT API expects it */}
              <Text style={styles.inputLabel}>Client Email</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter client email (optional)"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                value={editCustomerEmail || ''} 
                onChangeText={handleEditCustomerEmailChange}
                autoCapitalize="none"
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
                    <Text style={styles.buttonText}>Update</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowEditCustomerModal(false)}
                  disabled={isUpdatingCustomer}
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
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    marginBottom: 12,
    justifyContent: "space-between",
  },
  searchInput: {
    width: "70%",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.STB.buttons,
  },
  iconButton: {
    backgroundColor: Colors.STB.buttons,
    padding: 10,
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 12,
    borderBottomColor: "#334155",
    borderBottomWidth: 1,
    marginBottom: 6,
    width: tableContentWidth, // Fixed width for horizontal scrolling
  },
  columnHeader: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
    flexShrink: 0, // Prevent shrinking
    height: 30, // Set a fixed height for headers
  },
  row: {
    flexDirection: "row",
    paddingVertical: 14, 
    borderBottomColor: "#1e293b",
    borderBottomWidth: 1,
    alignItems: "center", 
    marginBottom: 10, 
    width: tableContentWidth, // Fixed width for horizontal scrolling
  },
  customerName: {
    color: Colors.STB.text,
    fontWeight: "bold",
    fontSize: 13,
  },
  customerPhone: { // This style is still used for displaying phone
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
  },
  customerDate: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "right",
  },
  actionsColumn: { // ADDED: Style for actions column
    alignItems: "center", // Center the edit button
  },
  editButton: { // ADDED: Style for edit button
    backgroundColor: Colors.STB.buttons,
    padding: 8,
    borderRadius: 5,
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
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Styles for the Edit Customer Modal
  formScrollContainer: { // ADDED: Scroll container for form
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
  },
  formContainer: { // ADDED: Form container styles
    backgroundColor: "#1e293b",
    borderRadius: 10,
    padding: 20,
    width: modalCalculatedWidth,
    alignSelf: "center",
  },
  formTitle: { // ADDED: Form title styles
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: { // ADDED: Input label styles
    color: "#cbd5e0",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },
  formInput: { // ADDED: Form input styles
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
  formActions: { // ADDED: Form actions container styles
    flexDirection: "column",
    marginTop: 20,
    gap: 10,
  },
  submitButton: { // ADDED: Submit button styles
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: { // ADDED: Disabled submit button styles
    backgroundColor: "#60a5fa",
  },
  cancelButton: { // ADDED: Cancel button styles
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#94a3b8",
  },
  cancelButtonText: { // ADDED: Cancel button text styles
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CustomersScreen;