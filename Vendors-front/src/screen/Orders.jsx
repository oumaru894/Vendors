import { StyleSheet, Text, View,TextInput,FlatList,Image,TouchableOpacity, Alert,ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './orders.style'
import { CustomBtn } from '../components'
import {Heading} from '../components'
import axios from 'axios'
import { addOrderURL } from '../../assets/constants/Urls/Url'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImageURL } from '../../assets/constants/Urls/Url';
import { Picker } from '@react-native-picker/picker';
import { orderURL, CartURL,updateCart,deleteCart } from '../../assets/constants/Urls/Url'
import Cart from './cart'
import { useFocusEffect } from '@react-navigation/native'
import { COLORS } from '../../assets/constants'
import { Ionicons,MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'; // You may need to install this package
import { SIZES } from '../../assets/constants'


const Orders = () => {
  const [cartItems, setCartItems] = useState([])

  const navigation = useNavigation()
  const route = useRoute()
  const [user,setUser] = useState([])
 

  const [hideInputs, setHideInputs] = useState(false)
  const [total, setTotal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip_code: "1000-10",
    country: "",
  })

  useFocusEffect(
    //usefocus effect to fetch data every tie the screen is focused
    (React.useCallback(()=>{
      getCartData()
    },[isLoading]))
    
  ) 
   // Function to retrieve cart data from database
  const getCartData = async () => {
    try {
      // Usinng the AsyncStorage getItem method to retrieve the client id
      const _id = await AsyncStorage.getItem('id')
      const userId = `user_${JSON.parse(_id)}`
      const currentUser = await AsyncStorage.getItem(userId)
      //console.log('user',user,'us');
      if (currentUser){
        setUser(currentUser)
        setIsLoading(false)
        console.log('user',user,'us');
      }
      
      //getting cart data from database
      const storedCartData = await axios.get(`${CartURL+_id}`)
      

      // If there is stored data, parse it and set it to the state
      if (storedCartData) {
        setCartItems(storedCartData.data);
      }
    } catch (error) {
      console.error('Error retrieving cart data:', error);
    }
  };
   

  // invalid Submission Alert Function
  const inValidSubmission = () => {
    Alert.alert(
      "Invalid Submission",
      "please address information",
      [
        {
          text: "ok", onPress:()=> console.log("continue pressed")
        }
      ]
    )
  }

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

  //deleting order item
  const deleteItem = async (_id,item)=>{
    await axios.delete(deleteCart+_id).then((response)=>{
     getCartData();
    })
   .catch((error)=>{
     console.log(error)
   })
 }

 //update item item
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

  //handle submit function
  const handleSubmit = async () =>{
    id = await AsyncStorage.getItem('id')
    
    try{
        const response = await axios.post(addOrderURL,{
          "client_id":id, 
          "invoice": Math.floor(Math.random() * ((cartItems.length+150) - (cartItems.length-150) + 1)) + (cartItems.length-150),
          "total_price": total,
          "items": cartItems,
          "shipping_address":address,
          
      })
      //console.log('name',cartItems[1].product_name)
      setHideInputs(true)
    }catch(error){
      console.error("error on posting order",error)
    }
  }
  if (isLoading){
    return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={SIZES.xxLarge}
            color={COLORS.primary}
            />
        </View>
    )
  }
  return (
    <View style={styles.container}>{!hideInputs?
      <View style={styles.addressInput}>
        <Heading
        name={'Address Info'}/>
       <View style={styles.textWrapper}>
        <TextInput
        placeholder='Street'
        value={address.street} 
        onChangeText={(val)=>setAddress({...address, street:val})}
        autoCapitalize='words'
        autoCorrect={false}
        style={styles.input}
        />
        <TextInput
        placeholder='City'
        value={address.city} 
        onChangeText={(val)=>setAddress({...address, city:val})}
        autoCapitalize='words'
        autoCorrect={false}
        style={styles.input}
        />
      </View>
      <View style={styles.textWrapper}>
        <TextInput
        placeholder='State / County'
        value={address.state} 
        onChangeText={(val)=>setAddress({...address, state:val})}
        autoCapitalize='words'
        autoCorrect={false}
        style={styles.input}
        />
        <TextInput
        placeholder='Country'
        value={address.country} 
        onChangeText={(val)=>setAddress({...address, country:val})}
        autoCapitalize='words'
        autoCorrect={false}
        style={styles.input}
        />
      </View>
      <CustomBtn
      title={'Submit Address'}
      onPress={handleSubmit}
      />
      </View>:<View></View>}
      <View style={styles.addressWrapper}>
        <Text style={styles.deliverText}>Deliver to</Text>
        <Text style={styles.name}>{user.firstname}</Text>
        <Text>{address.street||"Street"}</Text>
        <View style={{flexDirection:"row"}}>
        <Text>{address.city||"City"}, </Text>
        <Text>{address.state||"County"}, </Text>
        <Text>{address.country||"Country"}</Text>
        </View>
      
      </View> 
        
        <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.cart_id}
      />
      <View style={styles.totalContainer}>
      
        <Text style={styles.totalText}>Total: <Text style={{color:COLORS.primary}}>${calculateTotal()}</Text></Text>
        <TouchableOpacity style={styles.checkoutButton}  onPress={(() => {
          {hideInputs?navigation.replace('Payment'):inValidSubmission()}})}>
          <Text style={styles.checkoutButtonText}>     Order    </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Orders


