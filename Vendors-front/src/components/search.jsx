// screens/DetailsScreen.js

import React, {useState} from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, SafeAreaView, Image, FlatList } from 'react-native';
import styles from './search.style';
import axios from 'axios';
import {Feather, Ionicons} from '@expo/vector-icons'
import { SIZES, COLORS } from '../../assets/constants';
import SearchResult from './SearchResult';
import { searchURL } from '../../assets/constants/Urls/Url';



const Search = () => {
  const [searchKey, setSearchKey] = useState('')
  const [result, setResult] = useState([])

  const handlingSearch = async()=>{
    try {
      
      const response = await axios.get(`${searchURL}?q=${searchKey}`)
      setResult(response.data)

    } catch (error) {
      console.log("error",error)
    }
   
  }
  return (
    <SafeAreaView style={{paddingTop:25}}>
      <View style={styles.searchBar}>
          <TouchableOpacity>
              <Ionicons name="camera-outline" size={SIZES.xLarge} style={styles.searchIcon}/>
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
              <TextInput
              style={styles.searchInput}
              value={searchKey} //the value of text
              onChangeText={setSearchKey} //getting text
              placeholder="Search here"/>
          </View>
          <View>
          <TouchableOpacity style={styles.searchBtn} onPress={()=> handlingSearch()}>
              <Feather name="search" size={24} color="white"/>
          </TouchableOpacity>
          </View>
      </View>
      {result.length === 0 ?( 
        <View style={{flex: 1}}>
          <Image
          source={require('../../assets/images/Pose23.png')}
          style={styles.noResultImage}
          />
          
        </View>
      ):(<FlatList
        data={result}
        keyExtractor={(item) => {item.id}}
        renderItem={({ item }) =>(<SearchResult item={item}/>)}
        style={{marginHorizontal:12}}
      
      />)}
    </SafeAreaView>
  );
};

export default Search;
