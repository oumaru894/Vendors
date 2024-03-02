import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {COLORS, SIZES,SHADOWS} from "../../assets/constants/index"
import { View, Text } from 'react-native';

// screens
import Search from "../components/search";
import Home from "../components/home";
import Profile from "./Profile";
import Chat from "../components/chat";

// screen names
const HomeName = 'Home'
const profile = 'Account'
const search = 'Search'
const chat = 'Chat'


const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarShowLebel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70,
    }
}

const Nav = () => {
    return(

        <Tab.Navigator
        screenOptions={screenOptions}
        >
        <Tab.Screen 
        name={HomeName}
        component={Home}
        options={{
            tabBarIcon: ({focused}) => {
                return <Ionicons name={focused ? "home" : "home-outline"}
                        size = {24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                        />
                
            }
        }}
        />

        <Tab.Screen 
        name={search}
        component={Search}
        options={{
            tabBarIcon: ({focused}) => {
                return <Ionicons name={focused ? "search" : "search-outline"}
                        size = {24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                        />
                
            }
        }}
        />

        
        <Tab.Screen 
        name={profile}
        component={Profile}
        options={{
            tabBarIcon: ({focused}) => {
                return <Ionicons name={focused ? "person" : "person-outline"}
                        size = {24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                        />
                
            }
        }}
        />
        </Tab.Navigator>
    )
}

export default Nav