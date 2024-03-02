import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../assets/constants";




const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
      padding: 10,
      margin:20
    },
    orderContainer: {
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      width:'100%',
      elevation:1,
      zIndex:999,
      backgroundColor:COLORS.lightWhite
    },
    orderIdText: {
      fontSize: 15,
      fontFamily: 'bold',
      marginBottom: 5,
    },
    itemCountText: {
      fontSize: 16,
      marginBottom: 5,
      
    },
    itemImage: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
    flatListContent: {
      flexGrow: 1,
      width: '100%',
    },
    itemName:{
        fontFamily:'semibold',
        marginHorizontal:10,
        marginVertical:30, 
    },
    header:{
        marginBottom:15
    }
  });
  
  export default styles;
  