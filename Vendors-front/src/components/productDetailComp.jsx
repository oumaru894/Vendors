import {React, useState} from 'react'
import { useRoute } from '@react-navigation/native'
import styles from '../screen/productDetail.style';
import { View, Text, TouchableOpacity, ScrollView,Dimensions, Image} from 'react-native';
import {Ionicons, Fontisto,SimpleLineIcons, MaterialCommunityIcons} from 'react-native-vector-icons'
import { COLORS, SIZES } from '../../assets/constants';
import { SliderBox } from 'react-native-image-slider-box';
/* animation */
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset} from 'react-native-reanimated'



const ProductDetailComp = ({navigation}) => {

    // for animation
    const scrollRef = useAnimatedRef();
    const scrollOfset = useScrollViewOffset(scrollRef);
    
    /* style for animation */
    const imageAnimatedStyle = useAnimatedStyle(() => {
      return{
        transform:[
          {
            translateY:interpolate(
            scrollOfset.value,
            [-500, 0, 500],
            [-500, 0, 500]
            )
          }
        ]
      }
    })
    

    // images
    const defaultImages = [
        imageOne,
        imageTwo,
        imageThree
    ]

    // counting states
  const [count, setCount] = useState(1)
  const route = useRoute()
  const {item} = route.params

    
  
  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 1){
      setCount(count - 1)
    }

  }
  //console.log(item)
  return (
    <View>
      <View style={styles.upperRow}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Ionicons name="chevron-back-circle" size={30} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> {}}>
        <Ionicons name="heart" size={30} color={COLORS.primary} />
      </TouchableOpacity>
      </View>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
        source={{uri:"https://www.globalicejewelry.com/cdn/shop/products/RolexSubmarinerDateYellowGoldBlackBezelandblackdial126618lninDubaiUAE_720x.png?v=1676397536"}}
        style={[{ width: "95%", height:500, marginBottom:20 },imageAnimatedStyle]}

        />
        
    <View>
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.titleRow}> 
          <Text style={styles.title}> {item.product_name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            
            {[1,2,3,4,5].map((index)=>(
              <Ionicons
              key={index}
              name='star'
              size={24}
              color='gold'
              />
            ))}
            
            <Text style={styles.ratingText} > (4.0)</Text>
          </View>
          <View style={styles.rating}>
            
          <TouchableOpacity onPress={()=>{increment()}}>
            <SimpleLineIcons
            name="plus"
            size={20}
            />
          </TouchableOpacity >
            <Text style={styles.ratingText} > {count} </Text>
            <TouchableOpacity onPress={()=>{decrement()}}>
            <SimpleLineIcons
            name="minus"
            size={20}
            />
          </TouchableOpacity>
          </View>

        </View>
        <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>
                <Text style={styles.descText}>
                  {item.desc}
                </Text>
              </Text>
        </View>
        <View style={{marginBottom:SIZES.small}}>
              <View style={styles.location}>
                <View style={{flexDirection:'row'}}>
                  <Ionicons
                  name='location-outline' size={20}
                  />
                  <Text>  Liberia</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons
                  name='truck-delivery-outline' size={20}
                  />
                  <Text>  Free Delivery   </Text>
                </View>
              </View>
        </View>
        
      </View>
      
    </View>
    
    </View>
    </Animated.ScrollView>
    </View>
    
  )
}

export default ProductDetailComp
