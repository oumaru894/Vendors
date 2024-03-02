import { View, Text, TouchableOpacity, ScrollView,Image, Alert} from 'react-native';
import {React, useState, useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import styles from './productDetail.style';
import {Ionicons, Fontisto,SimpleLineIcons, MaterialCommunityIcons} from 'react-native-vector-icons'
import { COLORS, SIZES } from '../../assets/constants';
import {ProductReview, ProductDetailComp, Heading, ProductList, SellerDetailComponent} from '../components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageURL } from '../../assets/constants/Urls';
import { addCartURL } from '../../assets/constants/Urls';
import { addFavoriteUrl } from '../../assets/constants/Urls';
import axios from 'axios';
/* animation */
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context';
//import addCart from '../../hook/addCart';
//import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const Stack = createNativeStackNavigator()

const ProductDetail = ({navigation} ) => {
  //const [cart, setCart] = useState([])
    /* style for animation */
  
  const scrollRef = useAnimatedRef();
  const scrollOfset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return{
      transform:[
        {
          translateY:interpolate(
          scrollOfset.value,
          [-500, 0, 500],
          [-500 / 2, 0, 500 * 0.75]
          )
        },
        {
          scale: interpolate(scrollOfset.value, [-500, 0, 500], [2,1,1])
        },
      ]
    }
  })

  const headeeAnimatedStyle = useAnimatedStyle(()=>{
    return{
      opacity: interpolate(scrollOfset.value, [-500,0, 500],[2,1,1])
    } 
  })

  const [count, setCount] = useState(1)
  const route = useRoute()
  const [userLogin, setUserLogin] = useState(false)
  const {item} = route.params

    
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
  
  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 1){
      setCount(count - 1)
    }

  }
  
  // handle add to favorite
  const handleAddFavorite = async () => {
    if (count){
      //creating new object with additional 'quantity' property
      
      const newCart = {...item, quantity:count}
      // update cart state with new data
      const _id = await AsyncStorage.getItem('id')
      console.log(_id,'vendor id');
      try{
        if (_id){
        //submitting cart

        const response = await axios.post(`${addFavoriteUrl}`,{
          "product_name":newCart.product_name,
          "price":newCart.price * newCart.quantity,
          "product_id":newCart.id,
          "vendor_id":newCart.vendor_id,
          "image_1":newCart.image_1,
          "client_id": _id,
          
          }, {
            headers: { 'Content-Type': 'application/json' }
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
    }
  }
  // handle add cart function
  const handleAddCart = async () => {
    if (userLogin){
      if (count){
        //creating new object with additional 'quantity' property
        
        const newCart = {...item, quantity:count}
        // update cart state with new data
        const _id = await AsyncStorage.getItem('id')
        try{
          if (_id){
          //submitting cart
  
          const response = await axios.post(`${addCartURL}`,{
            "product_name":newCart.product_name,
            "price":newCart.price * newCart.quantity,
            "product_id":newCart.id,
            "vendor_id":newCart.vendor_id,
            "image_url":newCart.image_1,
            "quantity":newCart.quantity,
            "client_id": _id,
            "secondary_id":newCart.id * _id + 1,
  
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
      }
    }
    else{
      inValidSubmission()
    }
    
  }
   
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} contentContainerStyle={{alignItems:'center'}}>
      <Animated.View style={[styles.upperRow, headeeAnimatedStyle,imageAnimatedStyle]}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Ionicons name="chevron-back-circle" size={30} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> handleAddFavorite()}>
        <Ionicons name="heart" size={30} color={COLORS.primary} />
      </TouchableOpacity>
      </Animated.View>
        <Animated.Image
        source={{uri:`${ImageURL}${item.image_1}/${item.vendor_id}`}}
        style={[{ width: "100%", height:400, marginBottom:20, },imageAnimatedStyle]}

        />
        
    <View>
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.titleRow}> 
          <Text style={styles.title}>{item.product_name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            
            {[1,2,3,4,5].map((index)=>(
              <Ionicons
              key={index}
              name='star'
              size={24}
              color='gold'
              />
            ))}
            
            <Text style={styles.ratingText} > (4.0)</Text>
          </View>
          <View style={styles.rating}>
            
          <TouchableOpacity onPress={()=>{increment()}}>
            <SimpleLineIcons
            name="plus"
            size={20}
            />
          </TouchableOpacity >
            <Text style={styles.ratingText} > {count} </Text>
            <TouchableOpacity onPress={()=>{decrement()}}>
            <SimpleLineIcons
            name="minus"
            size={20}
            />
          </TouchableOpacity>
          </View>

        </View>
        <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>
                <Text style={styles.descText}>
                  {item.desc}
                </Text>
              </Text>
        </View>
        <View style={{marginBottom:SIZES.small}}>
              <View style={styles.location}>
                <View style={{flexDirection:'row'}}>
                  <Ionicons
                  name='location-outline' size={20}
                  />
                  <Text>  Liberia</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons
                  name='truck-delivery-outline' size={20}
                  />
                  <Text>  Free Delivery   </Text>
                </View>
              </View>
        </View>
        
      </View>
      
    </View>
    
    </View>
    
    
 
        
    <View style={{backgroundColor:'white',width:SIZES.width}}>
    <ProductReview _item={item}/>
      <View style={{borderBottomWidth:1}}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('SellerProfile',{vendor_id:item.vendor_id} )
        }}>
          <SellerDetailComponent
          id={item.vendor_id}/>
        </TouchableOpacity>
      <Heading name={'You May Also Like'}  />
      </View>
    <ProductList 
      />
    </View>
    </Animated.ScrollView>
    <View style={{position:'relative' }}>
      <View style={styles.cartRow}>
            <TouchableOpacity onPress={()=>navigation.navigate('Chat', id=item.vendor_id)} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>Chat Now</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleAddCart()} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>Add Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{userLogin?navigation.navigate('Cart')
            :inValidSubmission()}} style={styles.addCart}>
              
            <Fontisto
            name="shopping-bag" 
            size={22} 
            color={COLORS.lightWhite}
            />
            </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
    
  
  )
}

export default ProductDetail