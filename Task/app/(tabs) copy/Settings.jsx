import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import {
  AntDesign,
  EvilIcons,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
// import { TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function newLoc() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <View
        style={{
          alignItems: "center",
          width: Dimensions.get("screen").width,
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
          }}
        >
          Settings
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <EvilIcons name="user" size={120} color="black" />
        </View>
        <View
          style={{
            backgroundColor: "#f2f2f2",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            top: -20,
          }}
        >
          <View style={{ paddingHorizontal: 30, paddingVertical: 40, gap: 20 }}>
            <View>
              <View style={{ gap: 20 }}>
                <View style={{ gap: 5 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Rohit Kumar
                  </Text>
                  <Text
                    style={{ fontSize: 16, textAlign: "center", color: "grey" }}
                  >
                    irohitprj2001@gmail.com
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#f1b10e",
                    width: Dimensions.get("screen").width - 50,
                    paddingVertical: 20,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>My Wallet Balence</Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "700",
                      fontSize: 18,
                    }}
                  >
                    ₹1,55,900.00
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#d3d7de",
                    width: Dimensions.get("screen").width - 50,
                    padding: 20,
                    gap: 20,
                  }}
                >
                  <Text>Genral</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <FontAwesome5
                        name="user-circle"
                        size={24}
                        color="black"
                      />
                      <Text>Profile settings</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View
                    style={{ height: 1, width: 260, backgroundColor: "grey" }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <FontAwesome6
                        name="location-dot"
                        size={24}
                        color="black"
                      />
                      <Text>Saved Location</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View
                    style={{ height: 1, width: 260, backgroundColor: "grey" }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="bank"
                        size={24}
                        color="black"
                      />
                      <Text>Bank details</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View
                    style={{ height: 1, width: 260, backgroundColor: "grey" }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <AntDesign name="codesquareo" size={24} color="black" />
                      <Text>Promo code list</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>

                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#d3d7de",
                    width: Dimensions.get("screen").width - 50,
                    padding: 20,
                    gap: 20,
                  }}
                >
                  <Text>App details</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <MaterialIcons
                        name="settings-applications"
                        size={24}
                        color="black"
                      />
                      <Text>App settings</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View
                    style={{ height: 1, width: 260, backgroundColor: "grey" }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="share-circle"
                        size={24}
                        color="black"
                      />
                      <Text>Share app</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                  <View
                    style={{ height: 1, width: 260, backgroundColor: "grey" }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="chat-processing-outline"
                        size={24}
                        color="black"
                      />
                      <Text>Chat support</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#f7d4d7",
                    width: Dimensions.get("screen").width - 50,
                    padding: 20,
                    gap: 20,
                  }}
                >
                  <Text style={{ color: "#d52a35" }}>Alert zone</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <AntDesign name="deleteuser" size={24} color="#d52a35" />
                      <Text style={{ color: "#d52a35" }}>Delete account</Text>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="#d52a35"
                    />
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: 260,
                      backgroundColor: "#d52a35",
                    }}
                  />
                  <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <MaterialCommunityIcons
                          name="logout"
                          size={50}
                          color="black"
                        />
                        <Text style={styles.modalText}>Come Back Soon</Text>
                        <Text
                          style={{ ...styles.modalText, fontWeight: "400" }}
                        >
                          Are you sure You want to Logout?
                        </Text>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Text style={styles.textStyle}>
                              Stay, Logged in
                            </Text>
                          </Pressable>
                          <Link
                          href={"/MobNo"}
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Text style={styles.textStyle}>Yes, Logout</Text>
                          </Link>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <Pressable onPress={() => setModalVisible(true)}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <SimpleLineIcons
                          name="logout"
                          size={23}
                          color="#d52a35"
                        />
                        <Text style={{ color: "#d52a35" }}>Logout</Text>
                      </View>
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color="#d52a35"
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get("screen").width - 30,
    height: 200,
    padding: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#000000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "700",
  },
});
