import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons'; // You may need to install this package
import axios from 'axios';
import { categoryURL, categoryProduct } from '../../assets/constants/Urls/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    // Fetch categories from the database.
    const fetchCategories = async () => {
      try {
        const categoriesData = await axios.get(categoryURL);
        //console.log(categoriesData.data)
        setCategories(categoriesData.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // getting product by category
  const getproducts =  async (id)=>{


    try {
      const productData = await axios.get(categoryProduct+id);
      //console.log(categoriesData.data)
      setProduct(productData.data);
      console.log(productData.data,'cat');
      if (product.length!=0){
        //console.log("product",product);
        navigation.navigate('ProductList', {category:product})
        
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const renderCategoryItem = ({ item }) => (
    
    <TouchableOpacity  onPress={()=>{
      getproducts(item.category_id)
    }}>
      <View style={styles.categoryItem}>
      <Image
      source={{uri:item.image_uri}}
      style={{width:10,height:30,aspectRatio:1,borderRadius:70,resizeMode:'cover'}}
      /><Text style={styles.categoryText}>{item.category_name}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  categoryItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CategoryList;
