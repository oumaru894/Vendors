import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import styles from './Cart.style';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TitleHead from '../components/TitleHead';
import axios from 'axios';
import { CartURL } from '../../assets/constants/Urls';
import { ImageURL } from '../../assets/constants/Urls';
import { addCartURL, addOrderURL, deleteCart, updateCart, favoriteUrl, favoriteDelete } from '../../assets/constants/Urls/Url';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../assets/constants';
import { Ionicons,MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'; // You may need to install this package
import { useFocusEffect } from '@react-navigation/native';




const Favorite = ({navigation, isHeader, onPress, orders}) => {



  //states
  const [cartItems, setCartItems] = useState([]);
  const [selected, setSelected]  = useState(null);
  const [total, setTotal] = useState(null)
  
  
 /*  useEffect(() => {
    // Call the function to get cart data when the component mounts
    getCartData();
  },[]); // useEffect runs once when the component mounts
 */
  useFocusEffect(
    //usefocus effect to fetch data every tie the screen is focused
    React.useCallback(()=>{
      getFavoriteData()
    },[])
    
  ) 
   // Function to retrieve cart data from database
   const getFavoriteData = async () => {
    try {
      // Usinng the AsyncStorage getItem method to retrieve the client id
      const _id = await AsyncStorage.getItem('id')
      //getting cart data from database
      const storedCartData = await axios.get(`${favoriteUrl+_id}`)
      

      // If there is stored data, parse it and set it to the state
      if (storedCartData) {
        setCartItems(storedCartData.data);
      }
    } catch (error) {
      console.error('Error retrieving cart data:', error);
    }
  };

  if (!cartItems){
    return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={SIZES.xxLarge}
            color={COLORS.primary}
            />
        </View>
    )
  }

  // delete cart item
  const deleteItem = async (_id,item)=>{
     await axios.delete(deleteCart+_id).then((response)=>{
      getCartData();
     })
    .catch((error)=>{
      console.log(error)
    })
  }

  console.log(cartItems,'vs')

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: `${ImageURL}${item.image_url}/${item.vendor_id}` }}
        style={styles.cartImage}
      /><View style={styles.cartInfo}>
      <Text style={styles.itemName}>{item.product_name}</Text>
      <View style={styles.quantityContainer}>
        
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
       
      </View>
    </View>
  
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isHeader?
        <View></View>
        :<View><TitleHead
        title={`Favorite`}
        />
        <View style={{borderBottomWidth:1,marginTop:-15 }}>
        <Text style={[styles.totalText,]}></Text>
      </View></View>}
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      
    </View>
  );
};

export default Favorite;
