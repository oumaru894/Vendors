import { FlatList, Text, View, ActivityIndicator } from "react-native";
import React from 'react';
import { COLORS, SIZES } from "../../assets/constants";

import SingleView from "./SingleView";
import styles from "./productRow.style";
import useFetch from "../../hook/useFetch";

const ProductRow = () => {
    const {data, isLoading, error} = useFetch()
    const products = [1,2,3,4,5];
    return (
        <View style={styles.container}>
            {isLoading? (<ActivityIndicator size={SIZES.large} color={COLORS.primary}/>) 
            //: error? (
               // <Text>something went wrong</Text>
                

            //)
            :
            (<FlatList
            data={data}
            keyExtractor={(item)=> {item.id}}
            renderItem={({item}) => <SingleView item={item} />}
            horizontal
            contentContainerStyle={{columnGap: SIZES.xSmall}}
        />)}
            
        </View>
    )
}

export default ProductRow