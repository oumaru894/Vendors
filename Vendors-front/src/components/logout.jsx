import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = () => {
 const handleLogout = async ()=>{
    AsyncStorage.clear
 }

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})