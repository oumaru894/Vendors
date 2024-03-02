import {TouchableOpacity, StyleSheet, Text, View, Image,ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './SingleView.style'
import {Ionicons, Fontisto} from 'react-native-vector-icons'
import { COLORS } from '../../assets/constants'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {ProductDetail} from '../screen/screen'
import { productsURL } from '../../assets/constants/Urls'
import { ImageURL } from '../../assets/constants/Urls'
import { vendorUrl } from '../../assets/constants/Urls'
import axios from 'axios'
import { addCartURL } from '../../assets/constants/Urls'
import AsyncStorage from '@react-native-async-storage/async-storage'
const SingleView = ({item, category}) => {
  const navigation = useNavigation()
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userLogin, setUserLogin] = useState(false)
  // geting vendor
  useFocusEffect(
    //usefocus effect to fetch data every tie the screen is focused
    React.useCallback(()=>{
      fetchData()
      
    },[])
  )

  
//checking for existoing user
useEffect(()=>{
  existingUser();
},[])

  // invalid Submission Alert Function
  const inValidSubmission = () => {
    Alert.alert(
      "Invalid Submission",
      "Please login to permofrm this action",
      [
        {
          text: "Cancel", onPress:()=> console.log("cancel pressed")
        },
        {
          text: "Login", onPress:()=> {navigation.navigate('Login')}
        }
      ]
    )
  }

  //existing user
  const existingUser = async () => {
    const id = await AsyncStorage.getItem('id') //getting the user infor from local storage
   
    try{
        if(id){ 
            setUserLogin(true)
            console.log("my id",id);

        }else{
            //inValidSubmission()
            setUserLogin(false)
        }
    }
    catch (error){
        console.error('error in getting data')
    }
}
  
  const fetchData = async ()=>{
    await axios.get(vendorUrl+item.vendor_id).then((response)=>{
      setUser(response.data)
      console.log(response.data,'user')
      console.log(user,'user')
      if (user){
        setIsLoading(false)
      }

    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleAddCart = async (item) => {
    if (userLogin) {
      
     
        // update cart state with new data
        const _id = await AsyncStorage.getItem('id')
        try{
          if (_id){
          //submitting cart
  
          const response = await axios.post(`${addCartURL}`,{
            "product_name":item.product_name,
            "price":item.price * item.quantity,
            "product_id":item.id,
            "vendor_id":item.vendor_id,
            "image_url":item.image_1,
            "quantity":item.quantity,
            "client_id": _id,
            "secondary_id":item.id * _id + 1,
  
            })
            //Alert user for existing cart
            if (response.status===204){
              Alert.alert(
                "Cart",
                "This item already exist",
                [
                  {
                    text: "Okay", onPress:()=> console.log("cancel pressed")
               
                  }
                ]
              )
  
            }
          }
        }catch(error){
          console.log('cart',error)
        
      }
    } else {
      inValidSubmission();
    }
  }

  return (
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetail", {item})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
          source={{uri:`${ImageURL}${item.image_1}/${item.vendor_id}`}}
          style={styles.image}  
          
          />
        </View>
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>{item.product_name}</Text>
            <Text style={styles.suplier}>{!isLoading?user.first_name+" "+user.last_name:<ActivityIndicator size={10} color={COLORS.primary}/>}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        

        <TouchableOpacity style={styles.addBtn}  onPress={()=>{handleAddCart(item)}}>
          <Ionicons
          name="add-circle" 
          size={35}
          color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default SingleView

