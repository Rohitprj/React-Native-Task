import {
  createBookingApi,
  createDirectBookingApi,
  fetchBookingsApi,
} from "@/utils/bookingApi";
import {
  AdminDirectBookingPayload,
  BookingData,
  DisplayBookingItem,
  NewBookingPayload,
} from "@/utils/types/bookingTypes";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
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

// Assuming you have these API utility functions defined, e.g., in a new `dataFetchApi.ts`
import {
  fetchCustomersApi,
  fetchPackagesApi,
  fetchStoresApi,
} from "@/utils/bookingApi"; // You'll create these

// Define types for your API responses (replace with your actual types if different)
interface Customer {
  id: number;
  name: string;
  // ... other customer properties
}

interface Store {
  id: number;
  name: string;
  // ... other store properties
}

interface Package {
  id: number;
  name: string;
  // ... other package properties
}

// Get screen width once outside the component to avoid recalculations
const screenWidth = Dimensions.get("window").width;
const modalCalculatedWidth = screenWidth * 0.9; // Calculate 90% of screen width

const BookingsScreen = () => {
  const [bookings, setBookings] = useState<DisplayBookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for dropdown data
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true); // To track dropdown data loading
  const [dataError, setDataError] = useState<string | null>(null); // To track dropdown data error

  // State for the "+ New" (Direct Admin Booking) modal
  const [showNewDirectBookingForm, setShowNewDirectBookingForm] =
    useState<boolean>(false);
  const [newDirectBookingData, setNewDirectBookingData] =
    useState<AdminDirectBookingPayload>({
      bookingType: "Package", // Default type for this modal
      storeId: 0, // Changed to 0 for picker default
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

  // Function to load dropdown data from APIs
  const loadDropdownData = async () => {
    try {
      setDataLoading(true);
      setDataError(null);
      const [customersResponse, storesResponse, packagesResponse] =
        await Promise.all([
          fetchCustomersApi(), // Your API call for customers
          fetchStoresApi(), // Your API call for stores
          fetchPackagesApi(), // Your API call for packages
        ]);

      setCustomers(customersResponse.customers || []); // Assuming response.customers
      setStores(storesResponse.stores || []); // Assuming response.stores
      setPackages(packagesResponse.packages || []); // Assuming response.packages
    } catch (err) {
      console.error("Failed to fetch dropdown data:", err);
      setDataError("Failed to load necessary data for forms.");
    } finally {
      setDataLoading(false);
    }
  };

  // Initial data load on component mount
  useEffect(() => {
    loadBookings();
    loadDropdownData(); // Load dropdown data when component mounts
  }, []);

  // Handler for the "+ New" (Direct Admin Booking) modal inputs
  const handleNewDirectBookingFormChange = (
    field: keyof AdminDirectBookingPayload,
    value: string | number | null // Allow null for packageId, price, overs
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
      storeId: newDirectBookingData.storeId, // storeId is now directly from picker
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
          "Package is required for Package booking."
        );
        setIsSubmittingDirect(false);
        return;
      }
      payload.packageId = newDirectBookingData.packageId; // packageId is now directly from picker
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

    // Basic validation for common fields for Direct Admin Booking
    if (
      payload.storeId === 0 || // Validate storeId for picker
      !payload.customerName ||
      !payload.customerPhone ||
      !payload.customerEmail
    ) {
      Alert.alert(
        "Validation Error",
        "Store, Customer Name, Phone, and Email are required."
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
    value: string | number | null // Allow null for packageId, price, overs
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
          "Package is required for Package booking."
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
    if (
      isNaN(payload.customerId) ||
      payload.customerId === 0 ||
      isNaN(payload.storeId) ||
      payload.storeId === 0
    ) {
      Alert.alert("Validation Error", "Customer and Store must be selected.");
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

  // Overall loading check for initial data (bookings + dropdown data)
  if (loading || dataLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  // Overall error check for initial data
  if (error || dataError) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error || dataError}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            loadBookings();
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

              {/* Customer Details for New Direct Booking (Manual Fields) */}
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

              {/* Store Picker for New Direct Booking (API based) */}
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

              {/* Conditional Fields based on Booking Type for Direct Admin Booking */}
              {newDirectBookingData.bookingType === "Package" ? (
                <>
                  {/* Package Picker for New Direct Booking (API based) */}
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
              <Text style={styles.formTitle}>Add New Booking</Text>

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

              {/* Common Fields with Pickers */}
              <Text style={styles.inputLabel}>Customer</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={customerBookingData.customerId.toString()}
                  onValueChange={(itemValue) =>
                    handleCustomerBookingFormChange("customerId", itemValue)
                  }
                  style={styles.pickerStyle}
                  itemStyle={styles.pickerItemStyle} // Apply text color to items
                >
                  <Picker.Item label="Select a customer" value="0" />
                  {customers.map((customer) => (
                    <Picker.Item
                      key={customer.id}
                      label={customer.name}
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

              {/* Conditional Fields based on Booking Type */}
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
    // Removed, header itself has margin-bottom
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
  // --- Picker specific styles ---
  pickerContainer: {
    backgroundColor: "#0f172a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 15,
    overflow: "hidden", // Ensures picker content stays within bounds
    height: 50, // Set a fixed height for consistency
    justifyContent: "center", // Center content vertically
  },
  pickerStyle: {
    color: "#fff", // Text color of the selected item
    height: 50, // Must match pickerContainer height
    width: "100%",
  },
  pickerItemStyle: {
    color: "#fff", // For individual picker items (iOS only, Android uses pickerStyle color)
    fontSize: 16, // Adjust font size for items
  },
});

export default BookingsScreen;
