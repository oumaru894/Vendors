import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import StarRating from 'react-native-star-rating';
//import  BottomSheet  from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import {  BottomSheet } from '@rneui/themed';
import BottomSheet from 'react-native-bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SIZES } from '../../assets/constants';
import GoBackBtn from './GoBackBtn';
import TitleHead from './TitleHead';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ReviewForm = ({ isVisible, onClose, route }) => {
  
  const navigation = useNavigation()
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const { _item } = route.params;
  
  const bottomSheetRef = useRef(null);

  

  const handleSubmit = async () => {
    const id = await AsyncStorage.getItem('id') //getting the user infor from local storage
    const userId = `user_${JSON.parse(id)}` //parsing json into javascript object
    try {
      

      /* console.log("id",id)
      
      console.log("id",userId)
      console.log("user",userInfo) */
      
      
      const response = await axios.post('http://192.168.43.210:8008/review-add', { 
        "rating":rating, 
        "content":review,
        "sender_id":id,
        "product_id":_item.id,
          
       });
      console.log('Response:', _item.image_1);
      // Handle success, e.g., show success message, navigate to another screen.
      
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., show error message
    }

    navigation.navigate("ProductDetail",{item:_item})
  };

  const renderContent = () => (
    <View style={styles.container}>
      <View>
      <Text style={styles.label}>Rate your experience:</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={rating => setRating(rating)}
        fullStarColor={'#F39C12'}  // Color for filled stars
        emptyStarColor={'#E0E0E0'} // Color for empty stars
        starSize={30}
        containerStyle={{ width: '100%', alignItems: 'center', marginBottom: 20 }}
      />
      <Text style={styles.label}>Write your review:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setReview(text)}
        value={review}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );

  return (
  
       <View style={{flex: 1,
        padding: SIZES.large,
        backgroundColor:'white',
        zIndex:99}}>
        <TitleHead
        onPress={() => navigation.goBack()}
        title={'Add Review'}
        />
      {renderContent()}
       </View> 
      
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    
    marginVertical:SIZES.height/7
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    minHeight: 100, // Minimum height for multiline input
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ReviewForm;
