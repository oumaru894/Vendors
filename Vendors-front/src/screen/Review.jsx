import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/review.style';
import { GoBackBtn } from '../components';
import { COLORS, SIZES } from '../../assets/constants';
import { Ionicons } from '@expo/vector-icons';
import TitleHead from '../components/TitleHead';

const ReviewPage = ({ route }) => {
  const { reviews, _item } = route.params;
  const navigation = useNavigation();

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.userName}>{item.username}</Text>
      <Text style={styles.reviewText}>{item.content}</Text>
      <Text style={styles.rating}>Rating: {item.rating}/5</Text>
    </View>
  );

  

  return (
    <SafeAreaView style={[styles.container,{position:'relative'}]}>
       <View style={styles.createReviewWrapper}>
        <TouchableOpacity onPress={()=>{navigation.navigate('ReviewForm',{_item})}}>
            <Ionicons
            name='create-outline'
            size={24} 
            color={COLORS.primary}
            style={styles.createIcon}
            />
        </TouchableOpacity>
       </View>
       <TitleHead
        onPress={() => navigation.goBack()}
        title={'Add Review'}
        />

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
      />
    </SafeAreaView>
  );
};

export default ReviewPage;
