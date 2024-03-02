
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import styles  from './AddProduct.style';
import * as ImagePicker from 'expo-image-picker';
import { SIZES } from '../../assets/constants';
import axios from 'axios';
import { addProductURL, categoryURL} from '../../assets/constants/Urls/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddProduct = () => {

  // form for submition
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Category')
  const [selectedCondition, setSelectedCondition] = useState('condition')
  const [userData, setUserData] = useState([])

  const [category, setCategory] = useState([])
  const condition = ['New', 'Fairly-used', 'Used']

  // image states
  const [image, setImage] = useState(null)
  const [type, setType] = useState(null)
  const [name, setName] = useState(null)

  const [data, setData] = useState({
    productName:'',
    productPrice:'',
    category:[],
    description:'',
    images:[]
  })
  const navigation = useNavigation()


  useEffect(()=>{
    getUser()
  },[])
  const getUser = async ()=>{
    const id = await AsyncStorage.getItem('id')
    const _id = JSON.parse(id)
    try{
      const user = await AsyncStorage.getItem(`user_${_id}`);
      if (user){
        const rawData = JSON.parse(user);
        setUserData(rawData);
      }
    }
    catch(error){
      console.log(error);
    }
  }
 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
   try{
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    //console.log('gh');

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].mimeType)
      
      //console.log('from asset', result.assets[0].uri)
      //console.log('from image', image)
    }
   }catch(error){
    console.log('error',error)
   }
};


  const handleAddProduct = async(data,image) => {
    //here are the implementation of the add product logic
    const _id = await AsyncStorage.getItem('id') //getting the user infor from local storage
    const formData = new FormData();

      formData.append('vendor_id',_id)
      formData.append('product_name',data.productName)
      formData.append('price',data.productPrice)
      formData.append('desc',data.description)
      formData.append('category', data.category)
      formData.append('image_1',{
        uri:image,
        type:type,
        name:'image1.jpeg'
      })
      
      await axios.post(addProductURL,formData,
        {headers:{'Content-Type': 'multipart/form-data'}}
        
        ).then((response)=>{
          console.log(response,'response');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Nav' }],
        });
       
      }).catch((error)=>{
        console.log(error)
      }).finally(()=>{
        //navigation.reset('MyProduct')
      })
    

    // reset the form after adding the product
    setProductName('');
    setProductPrice('');
    setSelectedCondition('conndition');
    setSelectedCategory('Category')
  };

  useEffect(() => {
    // Fetch categories from the database.
    const fetchCategories = async () => {
      try {
        const categoriesData = await axios.get(categoryURL);
        //console.log(categoriesData.data)
        setCategory(categoriesData.data);
        console.log(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[{marginTop:30, flexDirection:'row'},styles.imageContainer]}>
        <Image 
        style={styles.sellerImage}
        source={require('../../assets/images/userDefault.png')}
        />
        <Text style={styles.sellerName}>{userData.firstname +" "+userData.lastname}</Text>
      </View>

    <ScrollView>
    <View style={styles.inputWrapper}>
      <View style={[styles.imageRow,]}>
        {image?(
          <ScrollView contentContainerStyle={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'space-between'}}>
            <View width={SIZES.width-50}>
            <TouchableOpacity style={[styles.addImages,/* {alignItems:'center', justifyContent:'center'} */]} onPress={pickImage}>
            <Image
            source={{uri:image}}
            style={styles.rowImage}

            />
            </TouchableOpacity>
          </View>
         {/*  <View width={SIZES.width-50}>
            <TouchableOpacity style={[styles.addImages,{alignItems:'center', justifyContent:'center'}]} onPress={pickImage}>
            <MaterialIcons
            name="add-photo-alternate"
            size={24}
            color="black" />
            </TouchableOpacity> 
          </View>
           */}
        </ScrollView>
        ):<View width={SIZES.width-50}>
        <TouchableOpacity style={[styles.addImages,{alignItems:'center', justifyContent:'center'}]} onPress={pickImage}>
          <MaterialIcons
          name="add-photo-alternate"
          size={24}
          color="black" />
        </TouchableOpacity>
      </View>}
        {/* <View width={SIZES.width-50}>
          <TouchableOpacity style={[styles.addImages,{alignItems:'center', justifyContent:'center'}]} onPress={pickImage}>
            <MaterialIcons
            name="add-photo-alternate"
            size={24}
            color="black" />
          </TouchableOpacity>
        </View> */}
      </View>

      <TextInput
        //product name
        style={styles.input}
        placeholder="Product Name"
        value={data.productName}
        onChangeText={(text) => setData({...data, productName: text})}
        //autoCapitalize='true'
      />

      <TextInput
      //product price
        style={styles.input}
        placeholder="Product Price"
        keyboardType="numeric"
        value={data.productPrice}
        onChangeText={(text) => setData({...data, productPrice: text})}
      />
      <View style={styles.input}>
      <Picker
      selectedValue={data.category}
      onValueChange={(itemValue) => setData({...data, category:itemValue})}
    >
      {category && category.length > 0 &&  category.map((categoryItem, index) => (
        <Picker.Item key={index} label={categoryItem.category_name} value={categoryItem.category_name} />
        
      ))}
    </Picker>
    </View>
    {console.log(category.length,'length')}


      <View style={styles.input}>
      <Picker
        selectedValue={data.condition}
        onValueChange={(itemValue) => setData({...data, condition: itemValue})}

      >
        {condition.map((condition, index) => (
          <Picker.Item key={index} label={condition} value={condition} />
        ))}
      </Picker>
      </View>

      <TextInput
      //description
        style={styles.input}
        placeholder="Description"
        value={data.description}
        onChangeText={(text) => setData({...data, description: text})}
      />

      <TouchableOpacity style={styles.addButton} title="Add Product" onPress={()=>{handleAddProduct(data,image)}}>
        <Text style={styles.addButtonText}>
          Add Product
        </Text>
      </TouchableOpacity>
      {/* Additional UI components can be added based on your requirements */}
    </View>
    </ScrollView>
    </View>
  );
};


 

export default AddProduct;
 