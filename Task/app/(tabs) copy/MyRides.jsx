import { View, Text, Dimensions, ScrollView, Image } from "react-native";
import React from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import boy from "../../assets/images/boy.png";
import { Link } from "expo-router";

export default function MyRides() {
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          width: Dimensions.get("screen").width,
          marginTop: 40,
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 13,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
          }}
        >
          My Ride
        </Text>
        <View
          style={{
            padding: 10,
            borderRadius: 30,
            backgroundColor: "lightgrey",
          }}
        >
          <Link href={"/notification"}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Link>
        </View>
      </View>
      <ScrollView horizontal>
        <View
          style={{
            padding: 20,
            backgroundColor: "white",
            gap: 16,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 42,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: "black",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Active Ride
            </Text>
          </View>
          <View
            style={{
              height: 42,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: "black",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Pending Ride
            </Text>
          </View>
          <View
            style={{
              height: 42,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: "black",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Complete Ride
            </Text>
          </View>
          <View
            style={{
              height: 42,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: "black",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Cancel Ride
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 20, backgroundColor: "white" }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "lightgrey",
            padding: 20,
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
          }}
        >
          <View style={{ marginLeft: 10, gap: 20 }}>
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
                  name="car-side"
                  size={24}
                  color="black"
                  style={{
                    borderWidth: 2,
                    paddingVertical: 6,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  ID:1234567890
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Entypo name="dot-single" size={24} color="#3366ff" />
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#3366ff",
                  }}
                >
                  Active
                </Text>
              </View>
              {/* <View>
                <Text>hello</Text>
              </View> */}
            </View>
            <View
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                width: Dimensions.get("screen").width - 100,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
