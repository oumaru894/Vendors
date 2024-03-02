import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TextInput, ActivityIndicator } from 'react-native';
import { ImageURL, paymentURL, addPaymentURL, deleteCart } from '../../assets/constants/Urls';
import styles from './payment.style';
import { CustomBtn, Heading } from '../components';
import { SIZES, COLORS } from '../../assets/constants';
import { useFocusEffect } from '@react-navigation/native';

const Notification = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contact, setContact] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [isLoading])
  );

  const fetchOrders = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      if (!id) {
        console.log("No user ID found");
        return;
      }
      const response = await axios.get(`${paymentURL + id}`);
      setOrders(response.data);
      console.log(response.data);
    if (orders.length!=0){
        setIsLoading(false);
        console.log('order good',orders);
      }
      
      console.log("payment:", orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const handleInputChange = (text) => {
    setContact(text);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(addPaymentURL, {
        product_name: selectedItem.product_name,
        client_id: selectedItem.client_id,
        vendor_id: selectedItem.vendor_id,
        amount: Number(selectedItem.price) * Number(selectedItem.quantity),
        quantity: selectedItem.quantity,
        client_phone: contact,
      });
      setContact('');
      console.log("Payment :", selectedItem);
      if (response.status === 201) {
        const _id = Number(selectedItem.id);
        const deleteItem = await axios.delete(deleteCart + _id);
        console.log("data", deleteItem.data);
      }
    } catch (error) {
      console.log(error);
    }
    setModalVisible(false);
  };

  const handleMakePayment = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

 
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderIdText}>{item.invoice}</Text>
      <Text style={styles.itemCountText}>This order contains {item.quantity} in total</Text>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: `${ImageURL}${item.image_url}/${item.vendor_id}` }} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.product_name}</Text>
      </View>
      <Text style={[styles.itemCountText, { fontSize: 14 }]}>Please confirm payment to secure delivery</Text>
      <CustomBtn
        title={"Make payment"}
        onPress={() => { handleMakePayment(item) }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
        </View>
      ) : (
        <View>
          <View style={styles.header}>
            <Heading name={"Confirm Order"} />
          </View>
          <Text style={{ margin: 10 }}>
            Order successfully placed. Your orders have split into multiple orders because there might be multiple vendors
          </Text>
          {console.log(orders,"orders")}
          {orders && orders.length > 0 ? (
            <FlatList
              data={orders}
              renderItem={renderOrderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.flatListContent}
            />
          ) : (
            <Text>No orders found</Text>
          )}
        </View>
      )}
     
    </View>
  );
};

export default Notification;
