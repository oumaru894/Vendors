import {ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert  } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {GoBackBtn, CustomBtn } from '../components/index'
import styles from './Login.style';
import { Formik } from 'formik';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { COLORS } from '../../assets/constants';
import * as Yup from 'yup'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginURL } from '../../assets/constants/Urls';
import axios from 'axios';

// validation for form
const validationSchema = Yup.object({
  password: Yup.string()
  // for password validation
    .min(8, 'Must be 8 characters or more')
    .required('Required'),

  
  email: Yup.string().email('Invalid email address').required('Required'), // for email validation
})

const Login = ({navigation}) => {
  const [loadData, setLoadData] = useState(false) //loading of data
  const [responseData, setResponseData] = useState(null) //network response
  const [hiddenText, setHiddenText] = useState(false) // for hiding password

  // invalid Submission Alert Function
  const inValidSubmission = () => {
    Alert.alert(
      "Invalid Submission",
      "please provide valid information",
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

  // login lofic
  const handleLogin = async (values)=>{
    setLoadData(true) // making loading true
    
      const route = loginURL //endpoint
      
      
      // post request to API
      await axios.post(route,
        values,{
          headers: { 'Content-Type': 'application/json' }})
          .then((response)=>{
            console.log('Response!', response.data)
            setLoadData(false)
            setResponseData(response.data)
            console.log(responseData)

            AsyncStorage.setItem(`user_${response.data.id}`, JSON.stringify(response.data)) // storing user into local storage by stringifying data
            AsyncStorage.setItem('id',JSON.stringify(response.data.id)) // storing user id into local storage for easy handling purpose
            setLoadData(false)
            //navigation.navigate('Nav') //going to home after login
            
            navigation.reset({
              index: 0,
              routes: [{ name: 'Nav' }],
          });

          }).catch((error)=>{
      // making alert for network error
      Alert.alert(
        "Network Error",
        "please check your connection and try again",
        [
          {
            text: "Ok", onPress:()=> console.error(error)
          }
        ]
      )
    })
  }
  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal:20}}>
        <View>
          <GoBackBtn onPress={()=>navigation.goBack()}/>
          <Image
          source={require("../../assets/images/bak.png")}
          style={styles.cover}
          />
          <Text style={styles.title}> Ulimited Sale Today</Text>

          

          
          <Formik 

          //using formik for form handling and validation too

            initialValues={{ email: '', password: ''}} // email first value is empty
            validationSchema={validationSchema} // validation of formik == validation of yup
            onSubmit={(value)=>{handleLogin(value)}} //submit final value
            >
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, setFieldTouched})=>(
            
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper(touched.email ? COLORS.primary:COLORS.offwhite)}>
                  <MaterialCommunityIcons
                  name='email-outline'
                  size={20}
                  color={COLORS.gray}
                  style={styles.styleIcon}
                  />
                  <TextInput
                  placeholder='Enter email'
                  onFocus={()=>{setFieldTouched('email')}} // focuses when email feild touched
                  onBlur={()=>{setFieldTouched('email','')}} // losese focus when email feild not touched
                  value={values.email} 
                  onChangeText={handleChange('email')}
                  autoCapitalize='none'
                  autoCorrect={false}
                  style={{flex:1}}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorNotification}>{errors.email}</Text>
                )}
                
                
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper(touched.password ? COLORS.primary:COLORS.offwhite)}>
                  <MaterialCommunityIcons // will change icon source
                  name='lock-outline'
                  size={20}
                  color={COLORS.gray}
                  style={styles.styleIcon}
                  />
                  <TextInput
                  placeholder='Enter password'
                  onFocus={()=>{setFieldTouched('password')}}
                  onBlur={()=>{setFieldTouched('password','')}}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={!hiddenText}
                  style={{flex:1}}
                  />
                  <TouchableOpacity onPress={() => {setHiddenText(!hiddenText)}}>
                    <MaterialCommunityIcons name={hiddenText?"eye-outline":"eye-off-outline"} size={24} 
                    /> 
                  </TouchableOpacity>
                    
                  
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorNotification}>{errors.password}</Text>
                )}
              
              </View>
              <CustomBtn title={"L O G I N"} onPress={isValid?handleSubmit:()=>{inValidSubmission()} }
               validate={isValid} // if valid
               
               />
            </View>

            )}
          </Formik>
          <View style={styles.registerView}>
            <TouchableOpacity onPress={()=>(navigation.navigate('Register'))}><Text style={styles.register}> Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>(navigation.navigate('forgot password?'))}><Text style={[styles.register,{color:'blue'}]}> forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Login

