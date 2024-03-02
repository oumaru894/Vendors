import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TextInput, Alert } from 'react-native';
import { ImageURL, orderURL, CartURL, addPaymentURL, deleteCart } from '../../assets/constants/Urls';
import styles from './payment.style';
import { CustomBtn, Heading } from '../components';
import { SIZES } from '../../assets/constants';
import { StackActions } from '@react-navigation/native';



const PaymentPage = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contact, setContact] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        if (!id) {
          console.log("No user ID found");
          return;
        }
        const response = await axios.get(`${orderURL+id}`);
        setOrders(response.data);
        console.log(response.data,'my order')
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const removeSelectedItem = (item) => {
    const updatedOrders = orders.items.filter((orderItem) => orderItem !== item);
    setOrders({ ...orders, items: updatedOrders });
  };

  const handleInputChange = (text) => {
    setContact(text);
  };

  const handleSubmit = async () => {
    // Handle form submission here
    try{
      const response = await axios.post(addPaymentURL,{
        product_name:selectedItem.product_name,
        client_id : selectedItem.client_id,
        vendor_id : selectedItem.vendor_id,
        amount : Number(selectedItem.price) * Number(selectedItem.quantity),
        quantity: selectedItem.quantity,
        client_phone : contact,
      })
      setContact('')
      console.log(contact,'contact');
      
      console.log("Payment :", selectedItem);
      if(response.status === 201){
        const cart_id_ = selectedItem.cart_id
        console.log(cart_id_,'delete id');
        const deleteItem = await axios.delete(deleteCart+cart_id_)
        console.log("data deleted",deleteItem.data)
        removeSelectedItem(selectedItem);
        Alert.alert(
          "PAYMENT",
          "Thank You for purchasing. You will receive a call from this vendor shortly",
          [
              {
                text: "Okay", onPress:async ()=> AsyncStorage.clear
              }
          ]
          )

      }
    
      
    }catch(error){
      console.log(error)
    }
    // After submission, close the modal
    setModalVisible(false);
  };

  const handleMakePayment = (item) => {
    setSelectedItem(item);
    console.log("jhbb",item)
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
        onPress={() => {handleMakePayment(item)}}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading
          name={"Confirm Order"}
        />
      </View>
      <Text style={{ margin: 10 }}>
        Order successfully placed. Your orders have split into multiple orders because there might be multiple vendors
      </Text>

      <FlatList
        data={orders.items}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.order_id}
        contentContainerStyle={styles.flatListContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', paddingVertical: 5, borderRadius: 10, alignItems: 'center', width: SIZES.width / 2 + 90 }}>
            <Text style={{ fontFamily: 'bold' }}>Item Name: {selectedItem && selectedItem.product_name}</Text>
            <Text style={{ fontFamily: 'bold' }}>Please enter your number:</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: SIZES.width / 2 + 50, borderRadius: 10, textAlign:'center'}}
              onChangeText={handleInputChange}
              keyboardType='numeric'
              value={contact}
            />
            <CustomBtn
              title={"Submit"}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentPage;
