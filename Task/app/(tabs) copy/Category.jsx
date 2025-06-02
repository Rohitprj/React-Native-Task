import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import car from "../../assets/images/Car.png";
import { Link } from "expo-router";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import parking from "../../assets/images/parking.png";

export default function Category() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          width: Dimensions.get("screen").width,
          justifyContent: "space-between",
          paddingHorizontal: 13,
        }}
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
            }}
          >
            Categories
          </Text>
        </View>
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

      <View style={{ paddingVertical: 20, gap: 20 }}>
        <View
          style={{
            height: 120,
            width: Dimensions.get("screen").width - 40,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            alignSelf: "center",
            flexDirection: "row",
            padding: 15,
            gap: 15,
          }}
        >
          <Image source={car} style={{ width: 100, alignSelf: "center" }} />
          <View style={{ height: 90, width: 1, backgroundColor: "grey" }} />
          <View style={{ gap: 5 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Ride
            </Text>
            <Text style={{ color: "grey" }}>
              Used for intercity{"\n"}travelling
            </Text>
            <AntDesign name="arrowright" size={20} color="black" />
          </View>
        </View>
        <View
          style={{
            height: 120,
            width: Dimensions.get("screen").width - 40,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            alignSelf: "center",
            flexDirection: "row",
            padding: 15,
            gap: 15,
          }}
        >
          <Image
            source={parking}
            style={{ width: 100, height: 85, alignSelf: "center" }}
          />
          <View style={{ height: 90, width: 1, backgroundColor: "grey" }} />
          <View style={{ gap: 5 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Outstation
            </Text>
            <Text style={{ color: "grey" }}>
              Used for travelling city to{"\n"}city
            </Text>
            <AntDesign name="arrowright" size={20} color="black" />
          </View>
        </View>

        <View
          style={{
            height: 120,
            width: Dimensions.get("screen").width - 40,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            alignSelf: "center",
            flexDirection: "row",
            padding: 15,
            gap: 15,
          }}
        >
          <FontAwesome6 name="car-side" size={80} color="black" />
          <View style={{ height: 90, width: 1, backgroundColor: "grey" }} />
          <View style={{ gap: 5 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Rental
            </Text>
            <Text style={{ color: "grey" }}>
              Used for get vehicle on{"\n"}rent
            </Text>
            <AntDesign name="arrowright" size={20} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
}
