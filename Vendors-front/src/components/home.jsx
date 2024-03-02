import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "./home.style";
import {Ionicons, Fontisto} from 'react-native-vector-icons'
import Header from './Header'
import Carousel from "./carosel";
import Heading from "./heading";
import ProductRow from "./productRow";
import { useNavigation } from "@react-navigation/native";
import ProductList from "./ProductList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationContext from "../../assets/context/LocationContext";
import CategoryList from "./category";


const Home = ({navigation}) => {
    const [userData, setUserData] = useState(null)
    const [userLogin, setUserLogin] = useState(false)
    
    //const navigation = useNavigation()
    //const{location} = useContext(LocationContext)

    /* useEffect(()=>{
        existingUser();
    },[]
    ) */
    /* const existingUser = async () => {
        const id = await AsyncStorage.getItem('id') //getting the user infor from local storage
        const userId = `user_${JSON.parse(id)}` //parsing json into javascript object 
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
    } */
    return (
        <SafeAreaView style={{flex:1}}>
            
                {<Header  /* locatio={location} */ />}
                <CategoryList/>
                <Carousel/>
                <Heading isBtn={true}/>
                <ProductRow/>
                <Heading name={'Products'}  />
                <ProductList
                />
           
        </SafeAreaView>
    )
}




export default Home