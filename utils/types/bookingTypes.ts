export interface BookingData {
  id: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "PAID" | "UNPAID"; // Add other possible statuses
  storeId: number;
  bookingType: string;
  date: string;
  time: string;
  overs: number;
  oversLeft: number;
  price: number;
  packageId: number;
  customerId: number;
  lastPlayedDate: string | null;
  paymentMarkedBy: string | null;
  paymentMarkedAt: string | null;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
  store: {
    id: number;
    name: string;
    address: string;
    storeLocation: string | null;
    mapsLocation: string | null;
    phone: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
  customer: {
    id: number;
    email: string | null;
    phone: string;
    name: string;
    profile: string | null;
    customer_type: string;
    otp: string | null;
    createdAt: string;
    updatedAt: string;
  };
  package: {
    id: number;
    name: string;
    price: number;
    overs: number;
    description: string | null;
    title: string | null;
    validity: string;
    image: string;
    normalMachinePrice: number | null;
    roboArmPrice: number | null;
    sessionsPerMonth: number | null;
    oversPerMonth: number | null;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Interface for the data you want to display in the FlatList
export interface DisplayBookingItem {
  id: number; // Use API's ID for keyExtractor
  name: string;
  store: string;
  status: "PAID" | "UNPAID" | string; // 'string' to cover other API statuses if needed
}

// Interface for the API response structure
export interface BookingsApiResponse {
  valid: boolean;
  bookings: BookingData[];
}
// export interface NewBookingPayload {
//   packageId?: number;
//   storeId: number;
//   customerId: number;
//   bookingType: "Package" | "Custom";
//   price?: number;
//   overs?: number;
// }

// Payload for the original create booking API (e.g., /booking) - uses customerId
export interface NewBookingPayload {
  customerId: number;
  storeId: number;
  bookingType: "Package" | "Custom";
  packageId?: number | null; // Optional if bookingType is Custom
  price?: number | null; // Optional if bookingType is Package
  overs?: number | null; // Optional if bookingType is Package
}
// NEW: Payload for the admin/direct/booking API - uses customer details directly
export interface AdminDirectBookingPayload {
  packageId?: number | null; // Optional if bookingType is Custom
  storeId: number;
  bookingType: "Package" | "Custom";
  price?: number | null; // Optional if bookingType is Package
  overs?: number | null; // Optional if bookingType is Package
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}
