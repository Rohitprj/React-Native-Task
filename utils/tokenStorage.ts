import AsyncStorage from "@react-native-async-storage/async-storage";

type UserData = {
  email: string;
  token: string;
  role: string;
  appAccess: {
    [key: string]: boolean;
  };
};

export const storeUserData = async (data: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const data = await AsyncStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const removeUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("userData");
  } catch (error) {
    console.error("Error removing user data:", error);
  }
};
