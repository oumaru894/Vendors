import { StyleSheet, Text, View,Image, Alert, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './Profile.style';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../../assets/constants';
import { useNavigation } from '@react-navigation/native';
import { addAvatarURL,avatarURL } from '../../assets/constants/Urls';
import * as ImagePicker from 'expo-image-picker';


import TitleHead from '../components/TitleHead';
// animation
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset} from 'react-native-reanimated'

//import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, SimpleLineIcons, AntDesign, Ionicons,MaterialIcons,FontAwesome } from  '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading } from '../components';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [userLogin, setUserLogin] = useState(false)
  const [seller, setSeller] = useState(true)
  
  // images states
  const [image, setImage] = useState(null)
  const [type, setType] = useState(null)
  const [name, setName] = useState(null)

  
  const navigation = useNavigation()
  
  
  useFocusEffect(
    //usefocus effect to fetch data every tie the screen is focused
    React.useCallback(()=>{
      existingUser()
    },[])
    
  )
    const existingUser = async () => {
        const id = await AsyncStorage.getItem('id') //getting the user infor from local storage
        const userId = `user_${JSON.parse(id)}` //parsing json into javascript object
        console.log(id)
        
        try{
            const currentUser = await AsyncStorage.getItem(userId); //geting current user

            if(currentUser !== null){ 
                const rawData = JSON.parse(currentUser) // making current user into javascript object
                setUserData(rawData)
                setUserLogin(true)
                

            }else{
                navigation.navigate('Login')
            }
        }
        catch (error){
            console.error('error in getting data')
        }
    }

    // image picker for profile
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
     try{
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setType(result.assets[0].mimeType)

        //submitting to database or backend
        const formData = new FormData()
        formData.append('image',{
          uri:image,
          type:type,
          name:'image1.jpeg'
        })

        await axios.put(addAvatarURL+userData.id,
          formData,{headers:{'Content-Type': 'multipart/form-data'}}).then((response)=>{
            console.log("res",response.data)
          }).catch((error)=>{
            console.log("error",error)
          })

      }
    }catch(error){
      console.log('error',error)
     }
  };


    const loggedOut =  async ()=>{
      
      const id =  await AsyncStorage.getItem('id') // getting only id
      const userId  = `user_${JSON.parse(id)}` //raw javascript data
      
     try{
        await AsyncStorage.multiRemove([userId, id])
        navigation.navigate('Nav')
        console.log('id2',id)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
      })
     }
     catch(error){
      Alert.alert(
        "logout error",
        "error logging out user",
        [
          {
            text: "Cancel", onPress:()=> console.log("cancel pressed")
          },
          {
            text: "Continue", onPress:()=> console.log("continue pressed")
          }
        ]
      )

      console.log('error logging out user', error)
     }
    }
    console.log(userData,"user")
  // logout alert
  const logout = () => {
    Alert.alert(
      "logout",
      "Are you sure you want to logout",
      [
        {
          text: "Cancel", onPress:()=> console.log("cancel pressed")
        },
        {
          text: "Continue", onPress:()=> loggedOut()
        }
      ]
    )
  }

  //delete account alert
  const deleteAccount =  () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to Delete Account",
      [
        {
          text: "Cancel", onPress:()=> console.log("cancel pressed")
        },
        {
          text: "Continue", onPress:async ()=> AsyncStorage.clear
        }
      ]
    )
  }

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to Clear Cache",
      [
        {
          text: "Cancel", onPress:()=> console.log("cancel pressed")
        },
        {
          text: "Continue", onPress:()=> console.log("continue pressed")
        }
      ]
    )
  }



  return (
    <ScrollView style={{flex:1}}>
      <StatusBar backgroundColor={COLORS.gray}/>
      <View style={styles.header}>
        
      <TitleHead
        title={`Profile`}
        />
      
      </View>
      <View style={styles.container}>
        
        
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={()=>{/* userLogin === true ? navigation.navigate("SellerProfile"):()=>{} */}}>
            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
              <TouchableOpacity onPress={pickImage} >
                {image?(<Image
                  source={{uri:image}}
                  style={styles.profile}
                />): <Image
                source={{uri: userData ? `${avatarURL}${userData.id}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfd_zHfi__RrE9HcIukgjGt6HdH7ZFbjERDA&usqp=CAU"}}
                style={styles.profile}
              />
              
              } 
              </TouchableOpacity>
              {console.log('avatar',avatarURL)}
            <View>
            <Text style={styles.name}>
              {
              userLogin === true ? userData.firstname +" "+ userData.lastname: "please Login"
              
              }
            </Text>
        
            {
            userLogin === false ? (<TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <View  style={styles.loginBtn}>
                <Text style={styles.loginText}>L O G I N      </Text>
              </View>
            </TouchableOpacity>)
            :
            (<View>
              <Text style={styles.emial}>{userData.email}</Text>
            </View>)
            }
            </View>
            </View>
          </TouchableOpacity>
          {
            userLogin === false ? (
            <View></View>
            )
            :
            ( <View style={styles.menuWrapper}>
               {
              userData && userData.user_type === "vendor"?
              (
              <View> 
                <TouchableOpacity onPress={()=> navigation.navigate('AddProduct')}>
                  <View style={styles.menuItems}>
                    <Ionicons
                    name="create-outline"
                    color={COLORS.primary}
                    size={24}
                    />
                    <Text style={styles.menuText}>Add Product</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> navigation.navigate('MyProduct')}>
                  <View style={styles.menuItems
                  }>
                    <MaterialCommunityIcons
                    name="store"
                    color={COLORS.primary}
                    size={24}
                    />
                    <Text style={styles.menuText}>Products</Text>
                  </View>
                </TouchableOpacity>
              </View>):
              
              (<View>
                <TouchableOpacity onPress={()=> {
                  Alert.alert(
                    "REGISTRATION",
                    "CLICK CONFIRM TO BECOME A VENDOR AND EARN",
                    [
                      {
                        text: "Cancel", onPress:()=> console.log("cancel pressed")
                      },
                      {
                        text: "Confirm", onPress:()=> navigation.navigate("registerVendor")
                      }
                    ]
                  )
                }}>
                  <View style={[styles.menuItems2,{height:80,alignItems:'center',borderRadius:30, width:SIZES.width-60, backgroundColor:COLORS.gray2, position:'relative'}
                  ]}>
                    <View style={[styles.menuItems2]}>
                      <MaterialIcons
                      name="sell"
                      color={COLORS.primary}
                      size={24}
                      />
                      <View style={{width:150}}>
                        <Text style={styles.menuText}>Become a Vendor</Text>
                        <Text style={{flexWrap:'wrap', paddingLeft:25, color:COLORS.gray,fontSize:10}}>Click here to Resister as a vendor and start selling</Text>
                        <View style={{marginBottom:10}}></View>
                      </View>
                      
                    </View>
                    <View>
                      
                    </View>
                    <View style={{position:'absolute',left:280}}>
                      <FontAwesome
                          name="chevron-right"
                          color={COLORS.primary}
                          size={24}
                        />
                    </View>
                    
                  
                  </View>
                    
                </TouchableOpacity>
              </View>)} 
                
              {console.log(userData,"type")}
                
              <TouchableOpacity onPress={()=> navigation.navigate('Notification')} >
                <View style={styles.menuItems}>
                  <MaterialCommunityIcons
                  name="heart-outline"
                  color={COLORS.primary}
                  size={24}
                  />
                  <Text style={styles.menuText}>Notifications</Text>
                </View>
              
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=> navigation.navigate('Favorite')} >
                <View style={styles.menuItems}>
                  <MaterialCommunityIcons
                  name="heart-outline"
                  color={COLORS.primary}
                  size={24}
                  />
                  <Text style={styles.menuText}>favorite</Text>
                </View>
              
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('OrdersPage')}>
                <View style={styles.menuItems}>
                  <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  color={COLORS.primary}
                  size={24}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                <View style={styles.menuItems}>
                  <SimpleLineIcons
                  name="bag"
                  color={COLORS.primary}
                  size={24}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> clearCache()}>
                <View style={styles.menuItems}>
                  <MaterialCommunityIcons
                  name="cached"
                  color={COLORS.primary}
                  size={24}
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{AsyncStorage.clear}/* deleteAccount() */}>
                <View style={styles.menuItems}>
                  <AntDesign
                  name="deleteuser"
                  color={COLORS.primary}
                  size={24}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> logout()}>
                <View style={styles.menuItems}>
                  <AntDesign
                  name="logout"
                  color={COLORS.primary}
                  size={24}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
              </View>
            )
          }
          

          
        </View>
      </View>
      
    </ScrollView>
  )
}
export default Profile