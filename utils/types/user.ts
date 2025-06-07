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
