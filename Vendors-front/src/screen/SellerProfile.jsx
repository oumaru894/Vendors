import React, { useEffect,useState } from 'react';
import { View, Text, ImageBackground, Image, FlatList,ScrollView, } from 'react-native';
import styles from './SellerProfile.style'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { vendorProductURL,avatarURL } from '../../assets/constants/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SingleView from '../components/SingleView';
import FollowButton from '../components/Follow';
import { CustomBtn, Heading } from '../components';
import {Ionicons} from 'react-native-vector-icons'
import { useFocusEffect } from '@react-navigation/native';

const ProfilePage = () => {

  // getting vendor_id from route
  const route = useRoute()
  const {vendor_id} = route.params

  const navigation = useNavigation()
  
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
   //getting  user data when screen is focused
   useFocusEffect(
    React.useCallback(()=>{
      getProduct()
    },[])
  )
  
  const getProduct = async ()=>{
    const id = await AsyncStorage.getItem('id')
    const _id = JSON.parse(id)
    try{
      const user = await AsyncStorage.getItem(`user_${_id}`);
      if (user){
        const rawData = JSON.parse(user);
        setUserData(rawData);
      }
      
      const response = await axios.get(`http://192.168.43.210:8008/vendorsproduct/${vendor_id}`);
      setData(response.data);
      console.log("data1",data);
    }
    catch(error){
      console.log(error);
    }
  }
  
  console.log("data",data);
  console.log("user",userData)
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/images/space.jpg')}
        style={styles.coverPhoto}
      />
        <View style={styles.profileContainer}>
          <Image
            source={{ uri:avatarURL+vendor_id}} 
            style={styles.profilePhoto}
          />
          <Text style={styles.name}>{userData.firstname +" "+userData.lastname}</Text>
          
        </View>
        <View style={styles.rating}>
            <View style={{flexDirection:'row'}}>
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
            
            <Text style={[styles.ratingText,{color:'black'}]}>Rate Vendor</Text>
          
          </View>
        <View style={styles.followButton}>
          <FollowButton />
        </View>
        <View style={{borderTopWidth:1}}>
          <Heading
          name={"Vendor's Product"}
          
          />
      </View>
      
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> <SingleView item={item}  />}
        //contentContainerStyle={styles.container}
        ItemSeparatorComponent={()=> <View style={styles.seperator}/>}
      />
    </ScrollView>
  );
};



export default ProfilePage;
