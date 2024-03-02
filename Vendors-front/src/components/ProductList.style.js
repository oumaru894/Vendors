import {StyleSheet} from 'react-native';
import { COLORS, SIZES } from '../../assets/constants';

const styles = StyleSheet.create({

    container:{
       //alignItems:'center',
       paddingLeft:SIZES.small/2,
       paddingTop:SIZES.large,
       paddingBottom:SIZES.xxLarge
    },

    loadingContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        alignContent:'center'
    },

    seperator:{
        height: 16
    }
})

export default styles