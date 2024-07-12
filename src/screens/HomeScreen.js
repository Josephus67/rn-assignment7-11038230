import React, { useState, useEffect, useCallback } from 'react';
import { 
  FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View, 
  ActivityIndicator, TextInput, RefreshControl
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Images from "../constants/Images";
import { useCart } from '../../CartContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchProducts = async (pageNumber = 1) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products?limit=14&page=${pageNumber}`);
      const response = await res.json();
      return response;
    } catch (error) {
      throw new Error("Failed to fetch products. Please try again.");
    }
  };

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const initialData = await fetchProducts();
      setData(initialData);
      setFilteredData(initialData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadInitialData().then(() => setRefreshing(false));
  }, []);

  const loadMoreData = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const newData = await fetchProducts(page + 1);
      setData([...data, ...newData]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Pressable onPress={() => navigation.navigate("ProductDetailsScreen", { product: item })}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        >
          <Pressable style={styles.addButton} onPress={() => addToCart(item)}>
            <Image source={Images.add_circle} />
          </Pressable>
        </ImageBackground>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
          <Text style={styles.productPrice}>${Math.floor(item.price)}</Text>
        </View>
      </Pressable>
    </View>
  );

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image source={Images.Menu} />
        </Pressable>
        <Image source={Images.Logo} />
        <View style={styles.headerRight}>
          <Image source={Images.Search} />
          <Pressable onPress={() => navigation.navigate("CheckoutScreen")}>
            <Image style={styles.shoppingBag} source={Images.shoppingBag} />
          </Pressable>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>OUR STORY</Text>
        <View style={styles.subHeaderIcons}>
          <View style={styles.iconContainer}>
            <Image source={Images.Listview} />
          </View>
          <View style={styles.iconContainer}>
            <Image source={Images.Filter} />
          </View>
        </View>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => isLoadingMore ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shoppingBag: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 20,
  },
  subHeaderIcons: {
    flexDirection: 'row',
  },
  iconContainer: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 50,
    marginLeft: 10,
  },
  productItem: {
    width: '47%',
    margin: 5,
    borderRadius: 10,
    padding: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addButton: {
    margin: 5,
  },
  productInfo: {
    marginTop: 5,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  productCategory: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 18,
    color: 'orange',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});