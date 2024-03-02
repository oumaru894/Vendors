import { StyleSheet } from "react-native";
import { COLORS,SIZES } from "../../assets/constants";




const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: SIZES.medium,
      backgroundColor:'white',
      zIndex:99
      
    },
    
    productInfo: {
      marginBottom: 16,
    },
   
    productDescription: {
      fontSize: 16,
      color: 'gray',
    },
    
    reviewItem: {
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      paddingBottom: 8,
    },
    seeMoreText:{
      left: SIZES.xxLarge*5-10 
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    reviewText: {
      fontSize: 14,
      marginBottom: 4,
    },
    rating: {
      fontSize: 12,
      color: 'gray',
    },
    createReviewWrapper: {
      position: 'absolute',
      top:SIZES.height-200,
      left: '90%',
      backgroundColor:COLORS.secondary,
      borderRadius:50,
      width:30,
      height:30,
      zIndex: 1,
      alignItems:'center'
      

      //transform: [{ translateX: -12 }, { translateY: -12 }], // Half the size of the icon
    },

    createIcon: {
      //position: 'absolute',
      // Ensure the icon is on top of other content
    },
    RenderContainer: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      
      marginVertical:SIZES.height/4
    },
    RenderLabel: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    RenderInput: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      width: '100%',
      minHeight: 100, // Minimum height for multiline input
    },
  });
  
  export default styles;
  