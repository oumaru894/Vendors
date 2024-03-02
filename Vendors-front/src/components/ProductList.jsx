import { StyleSheet, Text, View,ActivityIndicator, FlatList } from 'react-native'
import React from 'react';
import styles from './ProductList.style';
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES } from '../../assets/constants';

import SingleView from './SingleView';

const ProductList = ({category}) => {

  console.log(category, 'category')
    const{data, error, isLoading} = useFetch();
    if (isLoading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={SIZES.xxLarge}
                color={COLORS.primary}
                />
            </View>
        )
    } 


  return (
    <View style={styles.container}>
      <FlatList
        data={category||data}
        numColumns={2}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> <SingleView item={item}  />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={()=> <View style={styles.seperator}/>}
      />
    </View>
  )
}

export default ProductList

