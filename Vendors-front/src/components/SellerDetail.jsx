import  { useFocusEffect, } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { vendorUrl } from '../../assets/constants/Urls';
import axios from 'axios';
import { avatarURL } from '../../assets/constants/Urls';
import CustomBtn from './CustomBtn';
import { COLORS, SIZES } from '../../assets/constants';

const SellerDetailComponent = ({id}) => {
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // geting vendor
  useFocusEffect(
    //usefocus effect to fetch data every tie the screen is focused
    React.useCallback(()=>{
      fetchData()
    },[id])
    
  )
  
  //vendor data
  const fetchData = async ()=>{
    await axios.get(vendorUrl+id).then((response)=>{
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

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{ uri:avatarURL+id}} style={styles.profileImage} />
        <Text style={styles.sellerName}>{user.first_name}</Text>
        <View style={styles.btnStyle}>
        <CustomBtn
        title={'Follow'}
        onPress={()=>{
          Alert.alert(
            "FolloW",
            "Thank you for followinng me"
          )
        }}
        /></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems:'center',
    position:'relative',
    //borderWidth:1,
    borderRadius:50,
    elevation:9,
    index:9,
    backgroundColor:COLORS.lightWhite
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnStyle:{
    width:SIZES.width/4,
    position:'absolute',
    left:SIZES.width/2+50
    
  }
});

export default SellerDetailComponent;
