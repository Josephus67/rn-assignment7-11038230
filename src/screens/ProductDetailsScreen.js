import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ProductDetailsScreen() {
  const route = useRoute();
  const { product } = route.params;
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}
    >
      <ScrollView style={{ width: "100%" }}>
        <View style={{ width: "100%", padding: 20 }}>
          <View style={{ width: "100%" }}>
            <Image
              source={{ uri: product.image }}
              resizeMode="contain"
              style={{ width: "100%", height: 400 }}
            />
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 23 }}>{product.title}</Text>
            <Text style={{ fontSize: 16, color: "#8A8A8A" }}>
              {product.category}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 25,
                fontWeight: 400,
                color: "red",
              }}
            >
              ${Math.floor(product.price)}
            </Text>
            <Text style={{ marginTop: 10, fontSize: 20, color: "#5D5D5D" }}>
              Description:
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "#919191" }}>
              {product.description}
            </Text>
            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/Images/Do Not Bleach.png")}
              />
              <Text style={{ marginLeft: 10, fontSize: 16, color: "#5D5D5D" }}>
                Do not use bleach
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/Images/Do Not Tumble Dry.png")}
              />
              <Text style={{ marginLeft: 10, fontSize: 16, color: "#5D5D5D" }}>
                Do not tumble dry
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/Images/Do Not Wash.png")}
              />
              <Text style={{ marginLeft: 10, fontSize: 16, color: "#5D5D5D" }}>
                Dry clean with tetrachloroethylene
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/Images/Iron Low Temperature.png")}
              />
              <Text style={{ marginLeft: 10, fontSize: 16, color: "#5D5D5D" }}>
                Iron at a maximum of 110oC/230oF
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "#A8A8A8",
                marginVertical: 10,
              }}
            ></View>
            <View style={{ justifyContent: "space-between", marginTop: 15 }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../assets/Images/Shipping.png")} />
                <View>
                  <Text
                    style={{ marginLeft: 10, fontSize: 17, color: "#1E1E1E" }}
                  >
                    Free Flat Rate Shipping
                  </Text>
                  <Text
                    style={{ marginLeft: 10, fontSize: 16, color: "#5D5D5D" }}
                  >
                    Estimated to be delivered on 09/11/2021 - 12/11/2021.
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Image source={require("../../assets/Images/Up.png")} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#000",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: 70,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="plus" size={24} color="white" />
            <Text style={{ marginLeft: 10, fontSize: 16, color: "#FFFFFF" }}>
              ADD TO BASKET
            </Text>
          </View>

          <FontAwesome name="heart-o" size={24} color="white" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
