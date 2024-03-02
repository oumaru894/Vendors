// ProductReview.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ProductReview = ({ product }) => {
    const productData = {
        name: 'Example Product',
        description: 'This is a sample product description.',
        reviews: [
          { id: 1, user: 'User1', text: 'Great product!', rating: 5 },
          { id: 2, user: 'User2', text: 'Not bad.', rating: 3 },
          { id: 3, user: 'User3', text: 'Could be better.', rating: 2 },
        ],
      };
      product=productData //will remove when backend is there

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.reviewText}>{item.text}</Text>
      <Text style={styles.rating}>Rating: {item.rating}/5</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{'product.name'}</Text>
        <Text style={styles.productDescription}>{'product.description'}</Text>
      </View>

      <FlatList
        data={product.reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReviewItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productInfo: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: 'gray',
  },
  reviewItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: 'gray',
  },
});

export default ProductReview;
