import axiosInstance from "./axiosInstance";
import {
  AdminDirectBookingPayload,
  BookingData,
  BookingsApiResponse,
  NewBookingPayload,
} from "./types/bookingTypes";

export async function fetchBookingsApi(): Promise<BookingData[]> {
  try {
    const response = await axiosInstance.get<BookingsApiResponse>(
      "/admin/booking"
    ); // Specify the expected response type
    console.log("Bookings API Raw Response:", response.data); // Log the full raw response for debugging

    // Check if the 'bookings' array exists and is an array
    if (response.data && Array.isArray(response.data.bookings)) {
      return response.data.bookings; // Return the array of bookings
    } else {
      console.warn(
        "API response did not contain a 'bookings' array:",
        response.data
      );
      return []; // Return an empty array if 'bookings' is not found or not an array
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error; // Re-throw to be caught by the component
  }
}

// New function for creating a booking (used by the "Existing" modal)
export async function createBookingApi(
  bookingPayload: NewBookingPayload
): Promise<BookingData> {
  try {
    // Assuming the POST endpoint for bookings is /booking
    const response = await axiosInstance.post<BookingData>(
      "/admin/booking",
      bookingPayload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

// NEW: Create a direct admin booking using the /admin/direct/booking endpoint (POST)
export const createDirectBookingApi = async (
  payload: AdminDirectBookingPayload
): Promise<BookingData> => {
  try {
    const response = await axiosInstance.post<BookingData>(
      "/admin/direct/booking", // The new endpoint
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating direct booking:", error);
    throw error;
  }
};
