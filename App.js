import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View, Image } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import { CartProvider } from './CartContext';
import Images from "./src/constants/Images";
import { CartContext } from './CartContext';


const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Pressable onPress={() => props.navigation.closeDrawer()}>
        <Ionicons name="close" size={30} color="#000" />
      </Pressable>
      <Text style={{ fontSize: 26, fontWeight: '300', marginTop: 20 }}>ERIC ATSU</Text>
    </View>
    <View style={{ padding: 20 }}>
      {['Store', 'Locations', 'Blog', 'Jewelry', 'Electronic', 'Clothing'].map((item, index) => (
        <Pressable 
          key={index} 
          style={{ paddingVertical: 10 }}
          onPress={() => {
            // Handle navigation or action for each item
            props.navigation.navigate('Home');
          }}
        >
          <Text style={{ fontSize: 18 }}>{item}</Text>
        </Pressable>
      ))}
    </View>
  </SafeAreaView>
);

export default function App() {
  return (
    <CartProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                width: '80%',
              },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Drawer.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </CartProvider>
  );
}