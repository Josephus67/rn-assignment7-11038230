
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Images from "../constants/Images";
import { useCart } from '../../CartContext';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSum(total);
  }, [cart]);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        resizeMode="contain"
        style={styles.productImage}
        source={{ uri: item.image }}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <Pressable onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
          <Image style={styles.removeIcon} source={Images.remove} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Image source={Images.Logo} />
        <Image source={Images.Search} />
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>CHECKOUT</Text>
        <View style={styles.titleUnderline}></View>
      </View>
      
      <FlatList
        style={styles.cartList}
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.checkoutBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>EST. TOTAL</Text>
          <Text style={styles.totalAmount}>${Math.floor(sum)}</Text>
        </View>
        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
  },
  titleUnderline: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 5,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImage: {
    width: 120,
    height: 180,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    color: '#BAB02C',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeButton: {
    alignSelf: 'flex-end',
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#000',
  },
  totalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  totalText: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 20,
    color: 'orange',
  },
  checkoutButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
  },
});