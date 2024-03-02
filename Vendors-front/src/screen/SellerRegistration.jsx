import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CustomBtn } from '../components';
import TitleHead from '../components/TitleHead';
import { COLORS, SIZES } from '../../assets/constants';
import Header from '../components/Header';
import axios from 'axios';
import { vendorProductURL, vendorRegisterURL } from '../../assets/constants/Urls';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SellerRegistrationPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('');


  // navigation
  const navigation = useNavigation()

  const handleRegistration = async () => {
    if (password && confirmPassword === password) {
        try {
            const response = await axios.put(vendorRegisterURL, {
                email: email,
                username: fullName,
                contact: phoneNumber,
                password: password,
            });

            const id = await AsyncStorage.getItem("id");
            const userId = `user_${JSON.parse(id)}`;
            let userData = await AsyncStorage.getItem(userId); // Await here

            console.log(response, 'response');
            console.log(userData, "mAy id");

            if (userData) {
                userData = JSON.parse(userData); // Parse the JSON string
                console.log(userData.id, "tIy");
                console.log(userData.user_type, "tIy");
                // Now you can access user_type safely
                    userData.user_type = "vendor"
                if (userData.user_type === "vendor") {
                    AsyncStorage.setItem(`user_${userData.id}`, JSON.stringify(userData));
                    AsyncStorage.setItem('id', JSON.stringify(userData.id));
                    console.log("success!");
                    console.log("user data 2", userData);
                }
            }
            navigation.navigate("Nav");
        } catch (error) {
            console.error(error);
            // Handle error if needed
        }
    } else {
        Alert.alert(
            "No Match",
            "Password does not match",
            [
                { text: "Okay", onPress: () => console.log("cancel pressed") }
            ]
        );
    }
};


  return (
    <View style={styles.container1}>
        <Header
        
        />

   {/*      <View style={{backgroundColor:COLORS.lightWhite, width:SIZES.width,paddingHorizontal:10,marginTop:-10, backgroundColor:COLORS.secondary,}}>
        <TitleHead
        title={"Vendor "}
        />
        </View> */}
        <View style={styles.container}>
        <Text style={styles.title}>Seller Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <CustomBtn
      title={"Register as a Vendor"}
      onPress={()=>{
        handleRegistration()
      }}
      />
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container1:{
    flex: 1,
    marginTop:SIZES.xxLarge,
    justifyContent: 'center',
    //alignItems: 'center',


  }
});

export default SellerRegistrationPage;
