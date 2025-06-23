import axiosInstance from "./axiosInstance"; // Import your pre-configured axios instance
import {
  AdminDirectBookingPayload,
  BookingData,
  BookingsApiResponse,
  NewBookingPayload,
} from "./types/bookingTypes";

export async function fetchBookingsApi(): Promise<BookingData[]> {
  try {
    const response = await axiosInstance.get<BookingsApiResponse>(
      "/emp/booking"
    ); // Use relative path
    console.log("Bookings API Success All Data Raw Response:",response.data.bookings); // Log the full raw response for debugging

    if (response.data && Array.isArray(response.data.bookings)) {
      return response.data.bookings;
    } else {
      console.warn(
        "API response did not contain a 'bookings' array:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

// Function for creating a booking (used by the "Existing" modal)
export async function createBookingApi(
  bookingPayload: NewBookingPayload
): Promise<BookingData> {
  try {
    const response = await axiosInstance.post<BookingData>(
      "/emp/booking", // Use relative path
      bookingPayload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

// Create a direct admin booking using the /admin/direct/booking endpoint (POST)
export const createDirectBookingApi = async (
  payload: AdminDirectBookingPayload
): Promise<BookingData> => {
  try {
    const response = await axiosInstance.post<BookingData>(
      "/emp/direct/booking", // Use relative path
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating direct booking:", error);
    throw error;
  }
};

// --- NEW FILTER API FUNCTIONS (using axiosInstance) ---

export const fetchBookingsByStoreApi = async (
  storeId: number
): Promise<BookingData[]> => {
  try {
    const response = await axiosInstance.get<BookingsApiResponse>(
      `/emp/booking/${storeId}` // Use relative path
    );
    if (response.data && Array.isArray(response.data.bookings)) {
      return response.data.bookings;
    }
    throw new Error(
      response.data.message || "Failed to fetch bookings by store."
    );
  } catch (error) {
    console.error("Error fetching bookings by store:", error);
    throw error;
  }
};

export const fetchBookingsByStatusApi = async (
  status: string
): Promise<BookingData[]> => {
  try {
    const response = await axiosInstance.get<BookingsApiResponse>(
      `/emp/booking/status/${status}` // Use relative path
    );
    if (response.data && Array.isArray(response.data.bookings)) {
      return response.data.bookings;
    }
    throw new Error(
      response.data.message || "Failed to fetch bookings by status."
    );
  } catch (error) {
    console.error("Error fetching bookings by status:", error);
    throw error;
  }
};

export const fetchBookingsByPaidStatusApi = async (
  paidStatus: string
): Promise<BookingData[]> => {
  try {
    const response = await axiosInstance.get<BookingsApiResponse>(
      `/emp/booking/payment/${paidStatus}` // Use relative path
    );
    if (response.data && Array.isArray(response.data.bookings)) {
      return response.data.bookings;
    }
    throw new Error(
      response.data.message || "Failed to fetch bookings by paid status."
    );
  } catch (error) {
    console.error("Error fetching bookings by paid status:", error);
    throw error;
  }
};

export const fetchBookingsByCustomerTypeApi = async (
  customerType: string
): Promise<BookingData[]> => {
  try {
    const response = await axiosInstance.get<BookingsApiResponse>(
      `/emp/booking/type/customer/${customerType}` // Use relative path
    );
    if (response.data && Array.isArray(response.data.bookings)) {
      return response.data.bookings;
    }
    throw new Error(
      response.data.message || "Failed to fetch bookings by customer type."
    );
  } catch (error) {
    console.error("Error fetching bookings by customer type:", error);
    throw error;
  }
};

export const fetchBookingsByDateApi = async (
  date: string // Expected format: YYYY-MM-DD
): Promise<BookingData[]> => {
  try {
    const response = await axiosInstance.get<BookingsApiResponse>(
      `/emp/booking/date/${date}` // Use relative path
    );
    if (response.data && Array.isArray(response.data.bookings)) {
      return response.data.bookings;
    }
    throw new Error(
      response.data.message || "Failed to fetch bookings by date."
    );
  } catch (error) {
    console.error("Error fetching bookings by date:", error);
    throw error;
  }
};

// Existing fetch functions for dropdown data
export const fetchCustomersApi = async () => {
  try {
    const response = await axiosInstance.get("/customer"); // Use relative path
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const fetchStoresApi = async () => {
  try {
    const response = await axiosInstance.get("/admin/store"); // Use relative path
    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};

export const fetchPackagesApi = async () => {
  try {
    const response = await axiosInstance.get("/admin/package"); // Use relative path
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};
