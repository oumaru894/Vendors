import {StyleSheet} from "react-native";
import { COLORS, SIZES } from "../../assets/constants";
import React from "react"

const styles=StyleSheet.create({

    
    container: {
        width: 166,
        height: 'auto',
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.offwhite,
        marginEnd: 10
        
    },

    imageContainer: {  
        flex:1, 
        width:150,
        marginLeft: SIZES.small/2,
        marginTop: SIZES.small/2,
        borderRadius: SIZES.small,
        overflow: "hidden",
        height:'auto'

    }, 
    image: {
        aspectRatio: 1,
        resizeMode:'cover'
    },
    details:{
        padding: SIZES.small
    },
    title:{
        fontFamily: "bold",
        fontSize: SIZES.large,
        marginBottom: 2
        
    },
    suplier:{
        fontFamily: "regular",
        fontSize: SIZES.small,
        color: COLORS.gray
    },
    price: {
        fontFamily: "bold",
        fontSize: SIZES.medium
    },
    addBtn:{
        position: "absolute",
        bottom: SIZES.xSmall,
        right: SIZES.xSmall
    },
    workLength:{
        color:COLORS.black,
        fontFamily:'bold',
        fontSize: 16
    },
    jobLength:{
        color:COLORS.black
    }
})

export default styles