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