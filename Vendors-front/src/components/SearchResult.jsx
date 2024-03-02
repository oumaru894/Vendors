import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './searchResult.style';
import { ImageURL } from '../../assets/constants/Urls/Url';




const SearchResult = ({item}) => {
    const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity onPress={()=>navigation.navigate('ProductDetail', {item})} style={styles.container}>
        <View style={styles.image}>
        <Image
          source={{uri:`${ImageURL}${item.image_1}/${item.vendor_id}`}}
          style={styles.productImag}
          />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.productName}>{item.product_name}</Text>
            <Text style={styles.productName}>{item.vendorr_id}</Text>
            <Text style={styles.productName}>$ {item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SearchResult

