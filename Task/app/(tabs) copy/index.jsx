import {
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import car from "../../assets/images/Car.png";
import wheel from "../../assets/images/Wheel.png";
import parking from "../../assets/images/parking.png";
import boy from "../../assets/images/boy.png";

export default function index() {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          width: Dimensions.get("screen").width - 30,
          flexDirection: "row",
          marginVertical: 10,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 30,
            backgroundColor: "lightgrey",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "center",
            width: Dimensions.get("screen").width - 110,
            right: 7,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
            }}
          >
            Taxify
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            borderRadius: 30,
            backgroundColor: "lightgrey",
            right: 7,
          }}
        >
          <Link href={"/notification"}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Link>
        </View>
      </View>
      <ScrollView>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={24} color="white" />
            <TextInput
              style={styles.searchInput}
              placeholderTextColor="white"
              placeholder="Search destination"
            />
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginBottom: 100,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Top Categories
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 15,
            }}
          >
            <View
              style={{
                height: 120,
                width: 80,
                backgroundColor: "lightgrey",
                borderRadius: 10,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Image source={car} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Ride
              </Text>
            </View>
            <View
              style={{
                height: 120,
                paddingHorizontal: 10,
                backgroundColor: "lightgrey",
                borderRadius: 10,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Image source={parking} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Outstation
              </Text>
            </View>
            <View
              style={{
                height: 120,
                width: 80,
                backgroundColor: "lightgrey",
                borderRadius: 10,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Image source={wheel} style={{ height: 40, width: 40 }} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Rental
              </Text>
            </View>
          </View>
          <View style={{ gap: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Today's Offers
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: 240,
                borderRadius: 10,
                borderColor: "lightgrey",
                padding: 20,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 200,
                  backgroundColor: "lightgrey",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ transform: [{ rotate: "90deg" }] }}>
                  20% OFF
                </Text>
              </View>
              <View style={{ marginLeft: 10, gap: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 210,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Image source={boy} />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Rohit Kumar
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <AntDesign name="star" size={16} color="#ffcc00" />
                    <Text
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
                <View
                  style={{ borderStyle: "dashed", borderWidth: 0.5 }}
                ></View>
                <Text>Upto 10 km from Delhi area</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5 name="car" size={22} color="black" />
                      <Text>Mini{"\n"}Sedan</Text>
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="person" size={20} color="black" />
                      <Text>4{"\n"}Persons</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text>Valid till :</Text>
                    <Text>20/02/2026</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                height: 240,
                borderRadius: 10,
                borderColor: "lightgrey",
                padding: 20,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 200,
                  backgroundColor: "lightgrey",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ transform: [{ rotate: "90deg" }] }}>
                  20% OFF
                </Text>
              </View>
              <View style={{ marginLeft: 10, gap: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 210,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {/* <Image source={boy} /> */}
                    <Ionicons
                      name="person-circle-outline"
                      size={32}
                      color="black"
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Mike Downson
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <AntDesign name="star" size={16} color="#ffcc00" />
                    <Text
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
                <View
                  style={{ borderStyle: "dashed", borderWidth: 0.5 }}
                ></View>
                <Text>Upto 10 km from Delhi area</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5 name="car" size={22} color="black" />
                      <Text>Mini{"\n"}Sedan</Text>
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="person" size={20} color="black" />
                      <Text>4{"\n"}Persons</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text>Valid till :</Text>
                    <Text>20/02/2026</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                height: 240,
                borderRadius: 10,
                borderColor: "lightgrey",
                padding: 20,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 200,
                  backgroundColor: "lightgrey",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ transform: [{ rotate: "90deg" }] }}>
                  20% OFF
                </Text>
              </View>
              <View style={{ marginLeft: 10, gap: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 210,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {/* <Image source={boy} /> */}
                    <Ionicons
                      name="person-circle-sharp"
                      size={32}
                      color="black"
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      John Wick
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <AntDesign name="star" size={16} color="#ffcc00" />
                    <Text
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
                <View
                  style={{ borderStyle: "dashed", borderWidth: 0.5 }}
                ></View>
                <Text>Upto 10 km from Delhi area</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5 name="car" size={22} color="black" />
                      <Text>Mini{"\n"}Sedan</Text>
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="person" size={20} color="black" />
                      <Text>4{"\n"}Persons</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text>Valid till :</Text>
                    <Text>20/02/2026</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    width: "100%",
  },
  searchBox: {
    width: "90%",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 16,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "400",
    paddingVertical: 5,
    color: "white",
  },
});
