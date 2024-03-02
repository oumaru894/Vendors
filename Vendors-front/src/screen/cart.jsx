import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native';
import styles from './Cart.style';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TitleHead from '../components/TitleHead';
import axios from 'axios';
import { CartURL } from '../../assets/constants/Urls';
import { ImageURL } from '../../assets/constants/Urls';
import { addCartURL, addOrderURL, deleteCart, updateCart } from '../../assets/constants/Urls/Url';
import { useNavigation } from '@react-navigation/native';
import { COLORS,SIZES } from '../../assets/constants';
import { Ionicons,MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'; // You may need to install this package
import { useFocusEffect } from '@react-navigation/native';





const Cart = ({navigation, isHeader, onPress, orders}) => {



  //states
  const [cartItems, setCartItems] = useState([]);
  const [selected, setSelected]  = useState(null);
  const [total, setTotal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  
 /*  useEffect(() => {
    // Call the function to get cart data when the component mounts
    getCartData();
  },[]); // useEffect runs once when the component mounts
 */
  useFocusEffect(
    //usefocus effect to fetch data every tie the screen is focused
    React.useCallback(()=>{
      getCartData()
    },[])
    
  ) 
   // Function to retrieve cart data from database
   const getCartData = async () => {
    try {
      // Usinng the AsyncStorage getItem method to retrieve the client id
      const _id = await AsyncStorage.getItem('id')
      //getting cart data from database
      
      const storedCartData = await axios.get(`${CartURL+_id}`)
      

      // If there is stored data, parse it and set it to the state
      if (storedCartData) {
        setCartItems(storedCartData.data);
        setIsLoading(true)
      }
    } catch (error) {
      console.error('Error retrieving cart data:', error);
    }

  };

  // Calculate total when cartItems change
  useEffect(() => {
    setTotal(calculateTotal());
  }, [cartItems]);

  // calculting total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  //updating cart
  const updateQuantity = (itemId, newQuantity) => {
    console.log('id',itemId)
    if(newQuantity != 0 || newQuantity > 0) {
      const cartChange = cartItems.map((index) =>
        index.cart_id === itemId ? { ...index, quantity: newQuantity } : index
      );
      setCartItems(cartChange);
    }
  };


  // delete cart item
  const deleteItem = async (_id,item)=>{
     await axios.delete(deleteCart+_id).then((response)=>{
      getCartData();
     })
    .catch((error)=>{
      console.log(error)
    })
  }

  //update cart item
  const UpdateItem = async (_product_id, item) =>{
    console.log(cartItems[item])
    try{
      const response = await axios.put(updateCart+_product_id,item)
      if (response.data){
        getCartData()
      }
    }catch(error){
      console.log(error)
    }
  }

  
  if (!cartItems){
    return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={SIZES.xxLarge}
            color={COLORS.primary}
            />
        </View>
    )
  }
  


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: `${ImageURL}${item.image_url}/${item.vendor_id}` }}
        style={styles.cartImage}
      /><View style={styles.cartInfo}>
      <Text style={styles.itemName}>{item.product_name}</Text>
      <View style={styles.quantityContainer}>
        <View style={styles.quantityInfo}>
          <TouchableOpacity onPress={() => updateQuantity(item.cart_id, item.quantity - 1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.cart_id, item.quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View><Text style={styles.itemPrice}>${item.price}</Text></View>
      </View>
      
      
      <View style={styles.deleteCart}>
        <TouchableOpacity onPress={() => deleteItem(item.cart_id,item)}>
          <AntDesign
              name='delete'
              size={24}
              color={COLORS.tertiary}
              />
        </TouchableOpacity>
      </View>
      <View style={styles.addCart}>
        <TouchableOpacity onPress={() => UpdateItem(item.cart_id,item)}>
          <Ionicons
          name='add-circle'
          size={24}
          color={COLORS.white}

          />
        </TouchableOpacity>
      </View>  
      </View>
    </View>
  
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isHeader?
        <View></View>
        :<View><TitleHead
        title={`Cart( ${cartItems.length} )`}
        />
        <View style={{borderBottomWidth:1,marginTop:-15 }}>
        <Text style={[styles.totalText,]}></Text>
      </View></View>}
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.cart_id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: <Text style={{color:COLORS.primary}}>${calculateTotal()}</Text></Text>
        <TouchableOpacity style={styles.checkoutButton}  onPress={onPress || (() => {
            if (cartItems.length > 0) {
             navigation.navigate("orders");
            }})}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
