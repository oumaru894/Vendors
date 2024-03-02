import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../assets/constants";


const styles = StyleSheet.create({
    cover:{
        height:SIZES.height/2.4,
        width:SIZES.width-60,
        resizeMode:'contain',
        marginBottom:SIZES.xxLarge
    },
    title:{
        fontFamily:'bold',
        fontSize:SIZES.xLarge,
        color:COLORS.primary,
        alignItems:'center',
        marginBottom:SIZES.xxLarge
    },
    
    wrapper:{
        marginBottom:20
    },
    label:{
        fontFamily:"regular",
        fontSize:SIZES.xSmall,
        marginBottom:5,
        marginEnd: 5,
        textAlign:"left"
    },

    inputWrapper:(borderColor) => ({
        borderColor:borderColor,
        backgroundColor: COLORS.lightWhite,
        borderwidth:1, 
        height: 50,
        borderRadius:12,
        flexDirection:'row',
        paddingHorizontal:15,
        alignItems:'center'
    }),
    styleIcon:{
        marginRight:11
    },
    
    errorNotification:{
        color:COLORS.red,
        fontFamily:'regular',
        marginTop:5,
        marginLeft:5,
        fontSize:SIZES.xSmall

    },
    registerView:{
        alignItems:'center',
        marginBottom: 10,
    },
    register:{
        fontFamily: 'regular',
        fontSize: SIZES.small,
        paddingHorizontal:10
       

    }
})


export default styles