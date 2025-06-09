// import axiosInstance from "./axiosInstance";
// import {
//   AdminDirectBookingPayload,
//   BookingData,
//   BookingsApiResponse,
//   NewBookingPayload,
// } from "./types/bookingTypes";

// export async function fetchBookingsApi(): Promise<BookingData[]> {
//   try {
//     const response = await axiosInstance.get<BookingsApiResponse>(
//       "/admin/booking"
//     ); // Specify the expected response type
//     console.log("Bookings API Raw Response:", response.data); // Log the full raw response for debugging

//     // Check if the 'bookings' array exists and is an array
//     if (response.data && Array.isArray(response.data.bookings)) {
//       return response.data.bookings; // Return the array of bookings
//     } else {
//       console.warn(
//         "API response did not contain a 'bookings' array:",
//         response.data
//       );
//       return []; // Return an empty array if 'bookings' is not found or not an array
//     }
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     throw error; // Re-throw to be caught by the component
//   }
// }

// // New function for creating a booking (used by the "Existing" modal)
// export async function createBookingApi(
//   bookingPayload: NewBookingPayload
// ): Promise<BookingData> {
//   try {
//     // Assuming the POST endpoint for bookings is /booking
//     const response = await axiosInstance.post<BookingData>(
//       "/admin/booking",
//       bookingPayload
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     throw error;
//   }
// }

// // NEW: Create a direct admin booking using the /admin/direct/booking endpoint (POST)
// export const createDirectBookingApi = async (
//   payload: AdminDirectBookingPayload
// ): Promise<BookingData> => {
//   try {
//     const response = await axiosInstance.post<BookingData>(
//       "/admin/direct/booking", // The new endpoint
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error creating direct booking:", error);
//     throw error;
//   }
// };

// export const fetchCustomersApi = async () => {
//   try {
//     const response = await axiosInstance.get("/customer"); // Adjust endpoint as needed
//     // Assuming your customer API returns { customers: [...] } directly
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching customers:", error);
//     throw error;
//   }
// };

// export const fetchStoresApi = async () => {
//   try {
//     const response = await axiosInstance.get("/admin/store"); // Adjust endpoint as needed
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching stores:", error);
//     throw error;
//   }
// };

// export const fetchPackagesApi = async () => {
//   try {
//     const response = await axiosInstance.get("/admin/package"); // Adjust endpoint as needed
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching packages:", error);
//     throw error;
//   }
// };

import axiosInstance from "./axiosInstance"; // Import your pre-configured axios instance
import {
  AdminDirectBookingPayload,
  BookingData,
  BookingsApiResponse,
  NewBookingPayload,
} from "./types/bookingTypes";

// The base URL is now configured in axiosInstance.ts, so we don't need it here.
// const BASE_URL = "https://striketheball.in/api"; // No longer needed here

export async function fetchBookingsApi(): Promise<BookingData[]> {
  try {
    const response = await axiosInstance.get<BookingsApiResponse>(
      "/admin/booking"
    ); // Use relative path
    console.log("Bookings API Raw Response:", response.data); // Log the full raw response for debugging

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
      "/admin/booking", // Use relative path
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
      "/admin/direct/booking", // Use relative path
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
      `/admin/booking/${storeId}` // Use relative path
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
      `/admin/booking/status/${status}` // Use relative path
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
      `/admin/booking/payment/${paidStatus}` // Use relative path
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
      `/admin/booking/type/customer/${customerType}` // Use relative path
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
      `/admin/booking/date/${date}` // Use relative path
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
