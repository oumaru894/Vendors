import { COLORS, SIZES } from "../../assets/constants";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    coverPhoto: {
      width: '100%',
      height: 200, 
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    profileContainer: {
      alignItems: 'center',
      top:-50
      
    },
    profilePhoto: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: 'white',
      //aspectRatio:1
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginTop: 10,
    },
    seperator:{
        height:16
    },
    rating:{
        top:-SIZES.large,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal:SIZES.large,
        borderBottomWidth:1,
        borderTopWidth:1
    },
    ratingText:{
        color: COLORS.gray,
        fontFamily:"medium",
        paddingHorizontal:SIZES.xSmall
    },
    followButton:{
        alignItems:'center', 
        marginBottom:20
    }

});

  export default styles