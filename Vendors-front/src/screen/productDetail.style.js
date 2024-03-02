import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../assets/constants";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({

    jobTitle:{
        paddingLeft: 15,
        fontFamily:"bold",
        fontSize:SIZES.large,
        marginTop:SIZES.medium

    },
    jobDate:{
        paddingLeft: 20,
        paddingEnd:15,
        color: 'gray',
        fontFamily:'regular'
    },
    subtext:{
        flexDirection:'row',
    },
    upperRow:{
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: SIZES.xxLarge,
        width: SIZES.width -44,
        zIndex: 999

    },
     image:{
        aspectRatio:1,
        resizeMode: "cover"
     },

    details:{
        marginTop: -SIZES.large,
        backgroundColor: COLORS.lightWhite,
        width: SIZES.width,
        borderTopLeftRadius:SIZES.medium,
        borderTopRightRadius:SIZES.medium
    },
    cartRow:{
        paddingBottom:SIZES.small,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width,
        //position:'absolute',
        top: 20,
        backgroundColor:COLORS.white,
        zIndex:9999,
        marginBottom:25

 
    },
    cartBtn:{
        width:130,
        borderWidth:1,
        borderColor:'black',
        padding:SIZES.small/2,
        borderRadius:SIZES.large,
        marginLeft: 12
    },
    titleRow: {
        marginHorizontal:20,
        paddingBottom:SIZES.small,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width -44,
        top: 20
    },

    ratingRow:{
        paddingBottom: SIZES.small,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width:SIZES.width -10,
        top: 5
    },
    rating:{
        top:SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal:SIZES.large
    },
    ratingText:{
        color: COLORS.gray,
        fontFamily:"medium",
        paddingHorizontal:SIZES.xSmall
    },
    title: {
        fontFamily:"bold",
        fontSize:SIZES.large
    },
    cartTitle: {
        marginLeft:SIZES.small,
        fontFamily:"bold",
        fontSize:SIZES.medium,
        color:COLORS.black
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: "semibold",
        fontSize:SIZES.large
    },
    priceWrapper:{
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large

    },
    addCart:{
        width:37,
        height:37,
        borderRadius: 50,
        margin: SIZES.small/2,
        backgroundColor: COLORS.black,
        alignItems:"center",
        justifyContent: 'center',
        right:10
    },

    descriptionWrapper:{
        marginTop: SIZES.large*2,
        marginHorizontal: SIZES.large
    },
    description:{
        fontFamily: "medium",
        fontSize:SIZES.large - 2
    },
    descText:{
        fontFamily: 'regular',
        fontSize: SIZES.small,
        textAlign: 'justify',
        marginBottom: SIZES.small
    },

    location:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        backgroundColor: COLORS.secondary,
        padding:5,
        borderRadius: SIZES.large

    },
   
    requirementText:{
        fontFamily: 'regular',
        fontSize: SIZES.small,
        textAlign: 'justify',
        marginTop: SIZES.xSmall
    },
    requirementText2:{
        fontFamily: 'bold',
        fontSize: SIZES.small,
        textAlign: 'justify',
        marginTop: SIZES.xSmall,
    },
    requirementWrapper1:{
        flexDirection:'column', 
        paddingLeft:20
    },
    requirementWrapper2:{
        flexDirection:'column', 
        paddingLeft:20
    },
    jobBtn:{
        alignItems:'center',
        justifyContent:"center",
        marginTop: SIZES.large
        
    },
    applyTitle: {
        marginLeft:SIZES.small,
        fontFamily:"bold",
        fontSize:SIZES.medium,
        color:COLORS.lightWhite,
        textAlign:'center'
    },
    applyBtn:{
        width:SIZES.width *0.7,
        backgroundColor:COLORS.primary,
        padding:SIZES.small/2,
        borderRadius:SIZES.large,
        marginLeft: 12
    }

})

export default styles