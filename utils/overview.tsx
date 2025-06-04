import axiosInstance from './axiosInstance';

export default async function overview() {
     const response = await axiosInstance.get("/auth/dashboard-details/"); 
     return response.data;
}
