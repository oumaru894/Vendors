import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GoBackBtn from './GoBackBtn'
import { SIZES } from '../../assets/constants'
const TitleHead = ({onPress, title}) => {
  return (
    <View style={[styles.header, {flexDirection:'row', zIndex:1,}]}>
        <GoBackBtn onPress={onPress}/>
        
        <Text style={[styles.title,{marginHorizontal:SIZES.width/4.5}]}>{title}</Text>
      </View>
  )
}

export default TitleHead

const styles = StyleSheet.create({
    header:{
        marginTop:10,
        paddingTop:10
      },
      title: {
        fontSize: SIZES.large,
        fontFamily: 'semibold',
        
      },
})