import {ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert  } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {GoBackBtn, CustomBtn } from '../components/index'
import styles from './RegisterStyle';
import { Formik } from 'formik';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { COLORS } from '../../assets/constants';
import * as Yup from 'yup'; 
import { registerURL } from '../../assets/constants/Urls';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const validationSchema = Yup.object({
  password: Yup.string()
  // for password validation
    .min(8, 'Must be 8 characters or more')
    .required('Required')
    .matches(/\w*[a-z]\w*/,'password must contain small letter')
    .matches(/\w*[A-Z]\w*/,'password must contain capital letter'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match'), // matching password
  email: Yup.string().email('Invalid email address').required('Required'), // for email validation

})

const RegisterPage = ({navigation}) => {
  const [loadData, setLoadData] = useState(false) //loading of data
  const [responseData, setResponseData] = useState(null) //network response
  const [hiddenText, setHiddenText] = useState(true) // for hiding password

  //handling sign up 
    const handleSignUp = async (values)=>{
      setLoadData(true) // making load true
      axios.post(registerURL,
         { 
          //data being sent to the data base
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,

      },
       {
          headers: {'Content-Type': 'application/json'}
      }).then((response) => {
          console.log(response.data)
          const jsonValue = JSON.stringify(response.data)

          setLoadData(false) // making load false

          if(response.status === 200){
            setLoadData(false)
            setResponseData(response.data)
    
            /* AsyncStorage.setItem(`user_${responseData.id}`, JSON.stringify(responseData)) // storing user into local storage by stringifying data
            
            AsyncStorage.setItem('id',JSON.stringify(responseData.id)) // storing user id into local storage for easy handling purpose
            console.log('after status code',response.data)
            console.log('200') */
            navigation.navigate('Login') //going to home after login
    
          }else{
    
            Alert.alert(
              "Registration Error",
              "please try again",
              [
                {
                  text: "Ok", onPress:()=> console.log("continue pressed") 
                }
              ]
            )
          }
    
      }).catch((error) => {
          console.log('error',error)
          setLoadData(false)
      }).finally(()=>{
        //adding finally because an error won't allow navtion to login
        //but this error does not seem to stop the submission in the database
        navigation.navigate('Login') //going to home after login
      })
    }
  

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
  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal:20}}>
        <View>
          <GoBackBtn onPress={()=>navigation.goBack()}/>
          {/* <Image
          source={require("../../assets/images/bk.png")}
          style={styles.cover}
          /> */}
          <Text style={styles.title}> Register and Enhance the Economy</Text>

          

          
          <Formik 

          //using formik for form handling and validation too

            initialValues={{firstName:'',lastName:'', email: '', password: '',confirmPassword:''}} // email first value is empty
            validationSchema={validationSchema} // validation of formik == validation of yup
            onSubmit={(value)=>{handleSignUp(value)}} //submit final value
            >
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, setFieldTouched})=>(
            
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>First Name</Text>
                <View style={styles.inputWrapper(touched.firstName ? COLORS.primary:COLORS.offwhite)}>
                  <MaterialCommunityIcons
                  name='email-outline'
                  size={20}
                  color={COLORS.gray}
                  style={styles.styleIcon}
                  />
                  <TextInput
                  placeholder='Enter first name'
                  onFocus={()=>{setFieldTouched('firstName')}} // focuses when firstName field touched
                  onBlur={()=>{setFieldTouched('firstName','')}} // losese focus when firstName feild not touched
                  value={values.firstName} 
                  onChangeText={handleChange('firstName')}
                  //autoCapitalize='none'
                  autoCorrect={false}
                  style={{flex:1}}
                  />
                </View>
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorNotification}>{errors.firstName}</Text>
                )}
                
                
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Last Name</Text>
                <View style={styles.inputWrapper(touched.lastName ? COLORS.primary:COLORS.offwhite)}>
                  <MaterialCommunityIcons
                  name='email-outline'
                  size={20}
                  color={COLORS.gray}
                  style={styles.styleIcon}
                  />
                  <TextInput
                  placeholder='Enter last name'
                  onFocus={()=>{setFieldTouched('lastName')}} // focuses when lastName feild touched
                  onBlur={()=>{setFieldTouched('lastName','')}} // losese focus when lastName feild not touched
                  value={values.lastName} 
                  onChangeText={handleChange('lastName')}
                  //autoCapitalize='none'
                  autoCorrect={false}
                  style={{flex:1}}
                  />
                </View>
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorNotification}>{errors.lastName}</Text>
                )}
                
                
              
                
              </View> 
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
                  secureTextEntry={true}
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

              
              <View style={styles.wrapper}>
                <Text style={styles.label}>Confirm password</Text>
                <View style={styles.inputWrapper(touched.password ? COLORS.primary:COLORS.offwhite)}>
                  <MaterialCommunityIcons // will change icon source
                  name='lock-outline'
                  size={20}
                  color={COLORS.gray}
                  style={styles.styleIcon}
                  />
                  <TextInput
                  placeholder='Repeat password'
                  onFocus={()=>{setFieldTouched('confirmPassword')}}
                  onBlur={()=>{setFieldTouched('confirmPassword','')}}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={true}
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

              <CustomBtn title={"Sign Up"} onPress={isValid?handleSubmit:()=>{inValidSubmission()} }
               validate={isValid} // if valid
               
               />
            </View>

            )}
          </Formik>
          
        </View>
      </SafeAreaView>
    </ScrollView>
  )
};


export default RegisterPage;
