import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../assets/constants";


const styles = StyleSheet.create({
    input:{
        flex:1,
        borderWidth:1,
        borderRadius:10,
        marginHorizontal:SIZES.xSmall,
        textAlign:'center',
    },
    
    container:{
        flex:1,
        margin:10,
        paddingTop:20
    },
    textWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:SIZES.small,
        paddingVertical:SIZES.small,
    },
    addressInput:{
        alignItems:'center',
        borderBottomWidth:1
    },

    addressWrapper:{
        margin:SIZES.medium,  
    },
deliverText:{
    fontFamily:'bold',
    fontSize:17,
    marginBottom:SIZES.small
},
name:{
    fontFamily:'semi-bold',
    fontSize:14
    
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
  checkoutButtonText: {
    color: 'white',
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
  loadingContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    alignContent:'center'
},
quantityButton: {
  fontSize: 20,
  marginHorizontal: 8,
  fontFamily:'bold',
  color:COLORS.primary
},
addCart:{
  position:'absolute',
  top:50,
  //right:100,
  left:210,
  backgroundColor:COLORS.primary,
  overflow:'hidden',
  padding:1.2,
  borderTopLeftRadius:15,
  borderBottomRightRadius:10,
  bottom:-14 

},
deleteCart:{
  position:'absolute',
  bottom:50,
  ///right:100,
  left:210,
  backgroundColor:COLORS.primary,
  overflow:'hidden',
  padding:1.2,
  borderBottomLeftRadius:15,
  borderTopRightRadius:10,
  top:-14
},
quantityInfo:{
  flexDirection:'row',
  justifyContent:'space-between',
  backgroundColor:COLORS.secondary,
  borderRadius:50,
  height:30
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
checkoutButton: {
  backgroundColor: COLORS.primary,
  padding: 10,
  borderRadius: 8,
},
totalText:{
  fontFamily:'bold',
  
}


})

export default styles
