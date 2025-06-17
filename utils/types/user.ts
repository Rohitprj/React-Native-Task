export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  token: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  user: User;
}
export interface User {
  email: string;
  token: string;
  role: string;
  appAccess: {
    clients: boolean;
    bookings: boolean;
  };
}
