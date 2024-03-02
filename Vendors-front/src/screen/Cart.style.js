import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../assets/constants";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    itemContainer: {
      flexDirection:'row',
      //justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      elevation:4,
      //shadowColor:SHADOWS.medium,
      backgroundColor:COLORS.white,
      borderRadius:10,
      marginTop:SIZES.small,
      height:SIZES.xxLarge*2,
      position:'relative'
    },
    checkBox:{
      borderWidth:1,
      width:20,
      alignItems:'center',
      textAlign:'center'
    },
    
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemPrice: {
      fontSize: 16,
      fontFamily:'bold',
      paddingHorizontal:40
  
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      paddingTop:9,
      //borderWidth:1,
      width:SIZES.width/2-8
    },
    quantityButton: {
      fontSize: 20,
      marginHorizontal: 8,
      fontFamily:'bold',
      color:COLORS.primary
    },
    quantityText: {
      fontSize: 16,
      fontFamily:'semibold',
      marginTop:3
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,

    },
    header: {
      marginTop:10,
      
    },
    checkoutButton: {
      backgroundColor: COLORS.primary,
      padding: 10,
      borderRadius: 8,
    },
    checkoutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cartImage:{
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
        paddingHorizontal:10,
        marginHorizontal:10
    },
    deleteButton: {
      color: COLORS.primary,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    addButton: {
      color: COLORS.primary,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    cartInfo:{
      flexDirection:'column'
    },
    quantityInfo:{
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:COLORS.secondary,
      borderRadius:50,
      height:30
    },
    deleteCart:{
      position:'absolute',
      bottom:50,
      ///right:100,
      left:195,
      backgroundColor:COLORS.primary,
      overflow:'hidden',
      padding:1.2,
      borderBottomLeftRadius:15,
      borderTopRightRadius:10,
      top:-14
    },
    addCart:{
      position:'absolute',
      top:50,
      //right:100,
      left:195,
      backgroundColor:COLORS.primary,
      overflow:'hidden',
      padding:1.2,
      borderTopLeftRadius:15,
      borderBottomRightRadius:10,
      bottom:-14 

    },
    totalText:{
      fontFamily:'bold',
      
    }
  });

  export default styles