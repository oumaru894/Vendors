import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/home';
import DetailsScreen from './src/components/detail';
import {Nav,ProductDetail, Cart, NewRivals, Login, Favorite,Orders} from './src/screen/screen';
import RegisterPage from './src/screen/Register';
import Chat from './src/components/chat';
import ParallaxHeader from './src/screen/app';
import AddProduct from './src/screen/AddProduct';
import ReviewPage from './src/screen/Review';
import * as Font from 'expo-font';
import ReviewForm from './src/components/RatingReviewForm';
import {LocationContext} from './assets/context/LocationContext';
import { userInfoContext } from './assets/context/userInfo';
import PaymentPage from './src/screen/Payement';
import OrdersPage from './src/screen/OrderPage';
import ProfilePage from './src/screen/SellerProfile';
import MyProduct from './src/screen/MyProduct';
import Notification from './src/screen/Notification';
import SellerRegistrationPage from './src/screen/SellerRegistration';

const Stack = createNativeStackNavigator();



const App = () => {

  const[location, setLocation] = useState(null)
  const [userInfo, setUserInfo] = useState(null)


  const defaultLocation = { "city": "Monrovia", "country": "Liberia", "district": "7", "isoCountryCode": "LBR", "street": "Mechlin Street", "postalCode": "1000-10"}

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'regular': require('./assets/fonts/regular.ttf'),
        'bold': require('./assets/fonts/bold.ttf'),
        'semi-bold': require('./assets/fonts/semi-bold.ttf'),
        'medium': require('./assets/fonts/semi-bold.ttf'),
        'semibold': require('./assets/fonts/semi-bold.ttf'),

      });
    }

    loadFonts();
  }, []);

   useEffect(()=>{
    setLocation(defaultLocation)

  }, [])
  
  
  return (
    <LocationContext.Provider  value={{location, setLocation}}>
      {/* <userInfoContext.Provider value={{userInfo,setUserInfo}}> */}
      <NavigationContainer>  
        <Stack.Navigator>
        <Stack.Screen
          name="Nav"
          component={Nav}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="ProductList"
          component={NewRivals}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="orders"
          component={Orders}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="parallax"
          component={ParallaxHeader}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Review"
          component={ReviewPage}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="ReviewForm"
          component={ReviewForm}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="Payment"
          component={PaymentPage}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="OrdersPage"
          component={OrdersPage}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="SellerProfile"
          component={ProfilePage}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="MyProduct"
          component={MyProduct}
          options={{headerShown:false}}
          />

          <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown:false}}
          />

          <Stack.Screen
          name="registerVendor"
          component={SellerRegistrationPage}
          options={{headerShown:false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
      {/* </userInfoContext.Provider > */}
    </LocationContext.Provider >

  );
};

export default App;
