import React from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import styles from './heading.style';
import { useNavigation } from '@react-navigation/native';
import {Feather, Ionicons} from '@expo/vector-icons'
import { SIZES, COLORS } from '../../assets/constants';


const Heading = ({name,isBtn}) => {
  const navigation = useNavigation()
  return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{name || ' Top Ranking'}</Text>
            
            {isBtn && (
      <TouchableOpacity onPress={() => { navigation.navigate('ProductList') }}>
        <Feather
          name='grid'
          size={24}
          color={COLORS.primary}
        />
    </TouchableOpacity>
)}

            
          </View>
      </View>
  );
};

export default Heading;
