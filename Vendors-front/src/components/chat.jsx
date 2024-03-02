import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import io from 'socket.io-client';
import { URL } from '../../assets/constants/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOCKET_SERVER_URL ='http://192.168.43.210:3000'; // Replace with your backend server URL
//console.log('io:', io);

const Chat = ({navigation,id}) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  
  const recipientSid = 1
  
  useEffect(() => {
    // Connect to the socket server when the component mounts
   
    AsyncStorage.getItem('id')
    .then((userid) => {
      const userId = `user_${JSON.parse(userid)}`;
      console.log('userId h', userId);
      const newSocket = io(SOCKET_SERVER_URL,{
        query: { user_id:userId}
      })
      console.log(userId);
  
      setSocket(newSocket);
  
      // Listen for incoming messages
      newSocket.on('message', (msg) => {
  
        setMessages((prevMessages) => [...prevMessages, msg]);
        console.log(messages)
        
      });
    })
    .catch((error) => {
      console.error('Error fetching user ID from AsyncStorage:', error);
    });
    


    // Clean up the socket connection when the component unmounts
    return () =>{
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);


  useEffect(() => {
    if (socket) {
      socket.on('private_message', (data) => {
        console.log(`Private message received: ${data.message}`);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    
      if (socket && recipientSid && messages) {
        socket.emit('private_message', {
          recipient_sid: recipientSid,
          message: messages,
        });
        
      }
    if (socket) {
      // Emit the message to the server
      console.log('socket available', socket)
      //ysocket.
      socket.emit('message', inputMessage);
      

      // Clear the input field
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat Room</Text>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.message}>
            {msg}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
  },
});

export default Chat;
