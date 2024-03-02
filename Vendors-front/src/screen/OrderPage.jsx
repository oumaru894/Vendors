import { StyleSheet, Text, View,TextInput,FlatList,Image,TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './orders.style'
import { CustomBtn } from '../components'
import {Heading} from '../components'
import axios from 'axios'
import { addOrderURL, orderURL, ImageURL } from '../../assets/constants/Urls/Url'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS,SIZES } from '../../assets/constants'




const OrdersPage = () => {

  const navigation = useNavigation()


  const [items, setItems] = useState([])
  const [orders,setOrders] = useState(null)
  const [total, setTotal] = useState(0)

  
  const [address, setAddress] = useState({})
  

  // fetching data order data from
  useFocusEffect(
    //usefocus effect to fetch data every tie the screen is focused
    React.useCallback(()=>{
      fetchOrders()
    },[])
    
  ) 

  const fetchOrders = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (!id) {
        console.log("No user ID found");
        return;
      }
      const response = await axios.get(`${orderURL+id}`);
      if (response){
        setOrders(response.data);
        setItems(response.data.items);
        setAddress(response.data.shipping_address)
      }
      console.log("orders",orders)
    
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
    const tempTotal = 0
      for(i=0;i<orders.items.length;i++){
        tempTotal += i.quantity * i.price
      }
      setTotal(tempTotal);
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
  
  //calculating total
  
  //handle submit function
  const handleSubmit = async () =>{
    id = await AsyncStorage.getItem('id')
    
    try{
      console.log(items)
        const response = await axios.post(addOrderURL,{
          "client_id":id, 
          "invoice": Math.floor(Math.random() * ((items.length+150) - (items.length-150) + 1)) + (items.length-150),
          "total_price": total,
          "items": items,
          "shipping_address":address,

          
      })
      console.log(response.data)

    }catch(error){
      console.error("error on posting order",error)

    }
  }

  // rennder view
  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer,{paddingHorizontal:20}]}>
      
      
      <Image
          source={{uri:`${ImageURL}${item.image_url}/${item.vendor_id}`}}
          style={styles.cartImage}
          />
      <Text style={styles.itemName}>{item.product_name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{item.quantity}</Text>
      </View>
    </View>
  );

  if (!orders){
    return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={SIZES.xxLarge}
            color={COLORS.primary}
            />
        </View>
    )
  }
 
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center',borderBottomColor:COLORS.primary,borderBottomWidth:2}}>
      <Heading
      name={"Orders"}
      />
      </View>
      {console.log("address",address)}
      <View style={styles.addressWrapper}>
        <Text style={styles.deliverText}>Deliver to</Text>
        <Text style={styles.name}>{"Customer name"}</Text>
        <Text>{address.street||"Street"}</Text>
        <View style={{flexDirection:"row"}}>
        <Text>{address.city||"City"}, </Text>
        <Text>{address.state||"County"}, </Text>
        <Text>{address.country||"Country"}</Text>
        </View>
        <Text>{"zip_code"||"1000-10"}</Text>
        <Text>{/* "contact"|| */"077------4"}</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.cart_id}
      />
        {/* <Cart
        orders={items}
        isHeader={true} 
        
        onPress={()=>{
          hideInputs?navigation.navigate('Payment'):inValidSubmission()
        }}
        /> */}
    </View>
  )
}

export default OrdersPage


