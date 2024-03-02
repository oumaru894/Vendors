import { StyleSheet } from "react-native";
import { COLORS,SIZES } from "../../assets/constants";



const styles= StyleSheet.create({
    mainContainer:{
        backgroundColor:COLORS.lightWhite,
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Android
        zIndex: 1, // iOS
    },
    contianer: {
        
        flexDirection:'row',
        width: "100%",
        alignItems:'center',
        justifyContent:'center',
     
    },
    mainTitle:{
        fontFamily: "bold",
        fontSize: SIZES.large,
        marginTop: 10,
        paddingHorizontal:10

    },

    searchBar:{
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginHorizontal: SIZES.small,
        boardgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor:'black',
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        height:SIZES.xxLarge -10
    },
    searchIcon:{
        marginHorizontal:10,
        borderRadius:10,
        backgroundColor:COLORS.black,
        marginTop: SIZES.xSmall -5,
        paddingHorizontal:SIZES.xSmall -3,
        
    },
    searchWrapper: {
        flex:1,
        marginRight:SIZES.small,
        borderRadius: SIZES.small
    },
    searchInput:{
        fontFamily:"regular",
        width:"100%",
        height: "100%",
        paddingHorizontal: SIZES.small
    },
    searchBtn:{
        width: 50,
        height: "100%",
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems:"center",
        
        


    }
})

export default styles