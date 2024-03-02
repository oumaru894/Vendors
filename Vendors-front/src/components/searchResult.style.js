import { StyleSheet } from "react-native";
import { COLORS,SIZES,SHADOWS } from "../../assets/constants";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom: SIZES.small,
        flexDirection:'row',
        padding:SIZES.medium,
        backgroundColor: '#fff',
        ...SHADOWS.medium,
        shodowColor:COLORS.lightWhite
    },
    image:{
        width:70,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        justifyContent:'center',
        alignContent:'center'
    },
    productImag:{
        width: "100%",
        height:65,
        borderRadius:SIZES.small,
        resizeMode:"cover"
    },

    textContainer:{
        flex:1,
        marginHorizontal:SIZES.medium
    },
    productName:{
        fontSize:SIZES.medium,
        fontFamily:"bold",
        color: COLORS.primary
    },
    sellerName:{
        fontSize:SIZES.small +2,
        fontFamily:"regular",
        color: COLORS.gray,
        marginTop:3
    }
})


export default styles