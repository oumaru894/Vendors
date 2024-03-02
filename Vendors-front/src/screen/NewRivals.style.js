import {StyleSheet} from  'react-native';
import { COLORS,SIZES } from '../../assets/constants';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.lightWhite,

    },
    wrapper:{
        flex:1,
        backgroundColor: COLORS.lightWhite
    },
    upperRow:{
        width: SIZES.width-50,
        marginHorizontal:SIZES.large,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        position:'absolute',
        backgroundColor:COLORS.primary,
        borderRadius:SIZES.large,
        top:SIZES.xxLarge,
        zIndex:999
    },
    heading:{
        fontFamily:"semibold",
        fontSize:SIZES.medium,
        marginLeft:5,
        color:COLORS.lightWhite
    }
    
})

export default  styles