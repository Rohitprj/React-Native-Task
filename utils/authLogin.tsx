import axios from './axiosInstance';
import { LoginResponse } from './types/user';

export const loginUser = async (email: string, password: string):Promise<LoginResponse> => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};   