import { View,Text,TouchableOpacity,TextInput, Touchable } from "react-native";
import React from 'react'
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../assets/constants";

import {Feather, Ionicons} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import Search from "./search";


const Header = () => {
    const navigation = useNavigation()

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contianer}>
                <TouchableOpacity><Text style={styles.mainTitle}>Market</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Job')}><Text style={styles.mainTitle}>Job</Text></TouchableOpacity>

            </View>
            <View style={styles.searchBar}>
                
                <View style={styles.searchWrapper}>
                    <TextInput
                    style={styles.searchInput}
                    value=""
                    onPressIn={()=> {navigation.navigate("search")}}
                    placeholder="Search here"/>
                </View>
                
                <View>
                <TouchableOpacity style={styles.searchBtn}>
                    <Ionicons name="camera-outline" size={SIZES.xLarge} color="black"/>
                </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Feather name="search" size={20} color='white' style={styles.searchIcon}/>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default Header