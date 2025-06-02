// import { Link } from "expo-router";
// import React, { useState } from "react";
// import {
//   Dimensions,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Checkbox } from "react-native-paper";

// const { width } = Dimensions.get("window");

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image
//         source={require("../assets/Logo/logo 1.png")}
//         style={styles.logo}
//         resizeMode="contain"
//       />

//       <Text style={styles.title}>Login</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           placeholder="Enter your email"
//           placeholderTextColor="#aaa"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           placeholder="Enter your password"
//           placeholderTextColor="#aaa"
//           value={password}
//           onChangeText={setPassword}
//           style={styles.input}
//           secureTextEntry
//         />
//       </View>

//       <View style={styles.row}>
//         <View style={styles.checkboxContainer}>
//           <Checkbox
//             status={rememberMe ? "checked" : "unchecked"}
//             onPress={() => setRememberMe(!rememberMe)}
//             color="#004AAD"
//           />
//           <Text style={styles.checkboxLabel}>Remember me</Text>
//         </View>

//         <TouchableOpacity>
//           <Text style={styles.forgotPassword}>Forgot Password?</Text>
//         </TouchableOpacity>
//       </View>

//       <Link href="./(tabs)" asChild>
//         <Pressable style={styles.loginButton}>
//           <Text style={styles.loginButtonText}>Log In</Text>
//         </Pressable>
//       </Link>
//     </ScrollView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 60,
//     // backgroundColor: "#fff",
//     flexGrow: 1,
//     justifyContent: "center",
//   },
//   logo: {
//     height: 140,
//     width: "60%",
//     marginBottom: 10,
//     alignSelf: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: "500",
//     marginBottom: 5,
//   },
//   input: {
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f9f9f9",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   checkboxLabel: {
//     fontSize: 14,
//   },
//   forgotPassword: {
//     fontSize: 14,
//     color: "#004AAD",
//   },
//   loginButton: {
//     backgroundColor: "#004AAD",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// import { AntDesign } from "@expo/vector-icons"; // for eye icon
// import { Link } from "expo-router";
// import React, { useState } from "react";
// import {
//   Dimensions,
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { Checkbox } from "react-native-paper";

// const { width } = Dimensions.get("window");

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <Image
//             source={require("../assets/Logo/logo 1.png")}
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           <Text style={styles.title}>Login</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               placeholder="Enter your email"
//               placeholderTextColor="#aaa"
//               value={email}
//               onChangeText={setEmail}
//               style={styles.input}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Password</Text>
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 placeholder="Enter your password"
//                 placeholderTextColor="#aaa"
//                 value={password}
//                 onChangeText={setPassword}
//                 style={styles.passwordInput}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <AntDesign
//                   name={showPassword ? "eye" : "eyeo"}
//                   size={20}
//                   color="#444"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.checkboxContainer}>
//               <Checkbox
//                 status={rememberMe ? "checked" : "unchecked"}
//                 onPress={() => setRememberMe(!rememberMe)}
//                 color="#004AAD"
//               />
//               <Text style={styles.checkboxLabel}>Remember me</Text>
//             </View>

//             <TouchableOpacity>
//               <Text style={styles.forgotPassword}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           <Link href="./(tabs)" asChild>
//             <Pressable style={styles.loginButton}>
//               <Text style={styles.loginButtonText}>Log In</Text>
//             </Pressable>
//           </Link>
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 60,
//     flexGrow: 1,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   logo: {
//     height: 140,
//     width: "60%",
//     marginBottom: 10,
//     alignSelf: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontWeight: "500",
//     marginBottom: 5,
//   },
//   input: {
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#f9f9f9",
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     backgroundColor: "#f9f9f9",
//   },
//   passwordInput: {
//     flex: 1,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     paddingHorizontal: 10,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   checkboxLabel: {
//     fontSize: 14,
//   },
//   forgotPassword: {
//     fontSize: 14,
//     color: "#004AAD",
//   },
//   loginButton: {
//     backgroundColor: "#004AAD",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
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
import { Checkbox } from "react-native-paper";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../assets/Logo/logo 1.png")}
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

          <View style={styles.row}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={rememberMe ? "checked" : "unchecked"}
                onPress={() => setRememberMe(!rememberMe)}
                color="#004AAD"
              />
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Link href="./(tabs)" asChild>
            <Pressable style={styles.loginButton}>
              <Text style={styles.loginText}>Log In</Text>
            </Pressable>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
    // flexGrow: 1,
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
