import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import SearchResult from '../components/SearchResult'
import TitleHead from '../components/TitleHead'
import { COLORS, SIZES, SHADOWS } from '../../assets/constants';
import { ImageURL } from '../../assets/constants/Urls'
import { CustomBtn } from '../components'
import { useNavigation } from '@react-navigation/native'



const MyProduct = () => {

    // states
    const [userData, setUserData] = useState([])
    const [data, setData] = useState([])

    //navigation
    const navigation = useNavigation()
    
    useEffect(()=>{
        getProduct()
    },[])
    const getProduct = async ()=>{
        const id = await AsyncStorage.getItem('id')
        const _id = JSON.parse(id)
        try{
          const user = await AsyncStorage.getItem(`user_${_id}`);
          if (user){
            const rawData = JSON.parse(user);
            setUserData(rawData);
          }
          
          const response = await axios.get(`http://192.168.43.210:8008/vendorsproduct/${_id}`);
          setData(response.data);
          console.log("data1",data);
        }
        catch(error){
          console.log(error);
        }
      }
    
    // view to render
    const renderItem = ({item}) =>(
        <View>
      <TouchableOpacity onPress={()=>navigation.navigate('ProductDetail', {item})} style={styles.ItemContainer}>
        <View style={styles.image}>
        <Image
          source={{uri:`${ImageURL}${item.image_1}/${item.vendor_id}`}}
          style={styles.productImag}
          />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.productName}>{item.product_name}</Text>
            <Text style={styles.productName}>{item.vendor_id}</Text>
            <Text style={styles.productName}>$ {item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
    )
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TitleHead
        title={`My Products`}
        />
        </View>
        <View style={{width:SIZES.width/1.04,marginLeft:6.5}}>
        <CustomBtn
        title={"Creat New Product"}
        onPress={()=>navigation.navigate('AddProduct')}
        />
        </View>
        <Text style={styles.text}>Here is all Yor Products</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => {item.id}}
        renderItem={renderItem}
        style={{marginHorizontal:12}}
      
      />
    </View>
  )
}

export default MyProduct

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#f8f8f8',
    },

    header:{
        marginTop:20,
        alignItems:'flex-start',
        marginTop:10,
        padding:16,
        elevation:1,
        backgroundColor:COLORS.white,
        marginBottom:5
    },
    text:{
        textAlign:'center',
        margin:20,
        fontFamily:'bold',
        fontSize:20
    },
    ItemContainer:{
        flex:1,
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom: SIZES.small,
        flexDirection:'row',
        padding:SIZES.medium,
        backgroundColor: '#fff',
        ...SHADOWS.medium,
        shodowColor:COLORS.lightWhite
    },
    image:{
        width:70,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        justifyContent:'center',
        alignContent:'center'
    },
    productImag:{
        width: "100%",
        height:65,
        borderRadius:SIZES.small,
        resizeMode:"cover"
    },

    textContainer:{
        flex:1,
        marginHorizontal:SIZES.medium
    },
    productName:{
        fontSize:SIZES.medium,
        fontFamily:"bold",
        color: COLORS.primary
    },
    sellerName:{
        fontSize:SIZES.small +2,
        fontFamily:"regular",
        color: COLORS.gray,
        marginTop:3
    }
})