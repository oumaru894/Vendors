import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Alert } from 'react-native';
import styles from './review.style';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { prodcutReviewURL } from '../../assets/constants/Urls/Url';
import { useRoute } from '@react-navigation/native';



const ProductReview = ({ _item }) => {
  const navigation = useNavigation()
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [review,setReview] = useState([])

  useEffect(()=>{
    reviews()
  },[_item])

  const reviews = async()=>{
    try{
      if (_item.id){
        const response = await axios.get(`${prodcutReviewURL+_item.id}`)
 
      if (response.data){
        setReview(response.data)
        
      }
      }
      
      
    }
    catch(error){
      console.log("Error",response)
    }
  }
  console.log(review.length,'hhygfgf')
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.userName}>{item.username}</Text>
      <Text style={styles.reviewText}>{item.content}</Text>
      <Text style={styles.rating}>Rating: {item.rating}/5</Text>
    </View>
  );


  const reviewsToShow = showAllReviews ? review : review.slice(0, 3);

  return (
  
    <View style={styles.container}>
      <View style={styles.productInfo}>
      <Text style={styles.title}>Reviews</Text>
    </View>

      <FlatList
        data={reviewsToShow}
        keyExtractor={(item) => item.review_id}
        renderItem={renderReviewItem}
      />

      <TouchableOpacity onPress={() => {
        if(review.length!=0){
          navigation.navigate('Review', { reviews: review, _item:_item })
        }
        else{
          Alert.alert(
            "Review not yet available",
            "Be the first to add reviw and rate the product",
            [
              {
                text: "Cancel", onPress:()=> console.log("cancel pressed")
              },
              {
                text: "add review", onPress:()=> navigation.navigate('ReviewForm',{ reviews: review, _item:_item })
              }
            ]
          )
        }
        }}>
          <Text style={styles.seeMoreText}>
            {showAllReviews ? 'See Less Reviews' : 'See More Reviews'}
          </Text>
        </TouchableOpacity>
     
        
    </View>
    
  );
};

export default ProductReview;
