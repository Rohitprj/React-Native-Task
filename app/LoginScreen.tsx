import { loginUser } from "@/utils/authLogin";
import { storeUserData } from "@/utils/tokenStorage";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const handleLogin = async () => {
  //   try {
  //     const res = await loginUser(email, password);
  //     console.log("Response", res);

  //     if (res.status === 200 && res.user?.token) {
  //       // Save full user data here
  //       await storeUserData({
  //         email: res.user.email,
  //         token: res.user.token,
  //         role: res.user.role,
  //         appAccess: res.user.appAccess, // must be an object like { clients: true, bookings: true }
  //       });

  //       Alert.alert("Login Successful");
  //       // router.replace("/(tabs)"); // for admin
  //       // router.replace("/(subAdmin)");
  //       // router.replace("/(employee)/Bookings");
  //     } else {
  //       Alert.alert("Login Failed", res.message);
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     Alert.alert("Error", "Something went wrong");
  //   }
  // };
  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      console.log("Response", res);

      if (res.status === 200 && res.user?.token) {
        const user = res.user;

        // Save user data to async storage
        await storeUserData({
          email: user.email,
          token: user.token,
          role: user.role,
          appAccess: user.appAccess,
        });

        Alert.alert("Login Successful");

        // Redirect based on role
        const role = user.role?.toUpperCase();

        if (role === "ADMIN") {
          router.replace("/(tabs)");
        } else if (role === "SUBADMIN") {
          router.replace("/(subAdmin)");
        } else if (role === "EMPLOYEE") {
          router.replace("/(employee)/Bookings");
        } else {
          Alert.alert("Error", "Invalid role. Please contact support.");
        }
      } else {
        Alert.alert("Login Failed", res.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong during login");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../assets/Logo/Splash.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Log In</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <AntDesign
                  name={showPassword ? "eye" : "eyeo"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: "center",
  },
  logo: {
    width: "60%",
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F1F1F1",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  forgot: {
    fontSize: 14,
    color: "#004AAD",
  },
  loginButton: {
    backgroundColor: "#004AAD",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
