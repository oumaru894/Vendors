import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/constants'

const CustomBtn = ({title, onPress, validate,style}) => {
  return (
    <TouchableOpacity style={style||styles.btnStyle(validate===false? COLORS.tertiary:COLORS.primary)} onPress={onPress}>
        <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
    btnText:{
        fontFamily:'bold',
        color:COLORS.white,
        fontSize:18,

    },
    btnStyle:(backgroundColor)=>({
        backgroundColor: backgroundColor,
        height:50,
        width:'100%',
        marginVertical:20,
        backgroundColor:COLORS.primary,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12
    })
})