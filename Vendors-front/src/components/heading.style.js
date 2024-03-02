import {StyleSheet} from 'react-native';
import { COLORS, SIZES } from '../../assets/constants';
//import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';


const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        //marginBottom: SIZES.xSmall,
        marginHorizontal: 12
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerTitle: {
        fontFamily: "semi-bold",
        fontSize: SIZES.xLarge
    }

})

export default styles