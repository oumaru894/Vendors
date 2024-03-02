import { Text, View, TouchableOpacity,SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../assets/constants';
import styles from './NewRivals.style'
import ProductList from '../components/ProductList';
import { useRoute } from '@react-navigation/native';

const NewRivals = ({navigation, route}) => {
  //const { route } = useRoute();
  const { category } = route.params ||"";
  console.log(category, 'category');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Ionicons name='chevron-back-circle'
            size={30} color={COLORS.lightWhite}/>
          </TouchableOpacity>
          <Text style={styles.heading}>Product</Text>
        </View>
        <ProductList category={category||null}/>
      </View>
    </SafeAreaView>
  )
}

export default NewRivals

