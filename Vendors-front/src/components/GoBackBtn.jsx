import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import { COLORS, SIZES } from '../../assets/constants';
import { useNavigation } from '@react-navigation/native';

const GoBackBtn = ({onPress}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={onPress || navigation.goBack}>
        <Ionicons
            name='chevron-back-circle'
            size={31}
            color={COLORS.primary}
        />
    </TouchableOpacity>
  )
}

export default GoBackBtn

const styles = StyleSheet.create({
    goBackBtn:{
        alignItems:'center',
        position:'absolute',
        zIndex:999,
        top: SIZES.large-10
    }
})