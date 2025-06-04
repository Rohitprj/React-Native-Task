import axiosInstance from './axiosInstance';
import { LoginResponse } from './types/user';

export const loginUser = async (email: string, password: string):Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};   