import React,{useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { avatarURL } from '../../assets/constants/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = ({ profileImage, name, location, isDay }) => {
    isDay = true;

    const [userData, setUserData] = useState(null)


    useFocusEffect(
        //usefocus effect to fetch data every tie the screen is focused
        React.useCallback(()=>{
          existingUser()
        },[])
        
      )
      
        const existingUser = async () => {
            const id = await AsyncStorage.getItem('id') //getting the user infor from local storage
            const userId = `user_${JSON.parse(id)}` //parsing json into javascript object
            console.log(id)
            
            try{
                const currentUser = await AsyncStorage.getItem(userId); //geting current user
                if(currentUser !== null){ 
                    const rawData = JSON.parse(currentUser) // making current user into javascript object
                    setUserData(rawData)
                    console.log("my data",userData);
                    
                    
    
                }else{
                    navigation.navigate('Login')
                }
            }
            catch (error){
                console.error('error in getting data')
            }
        }
    // Replace single backslashes with double backslashes 
    const defaultProfile = "C:\\Users\\USERPC\\Desktop\\vendors-complete\\vendors\\assets\\images\\userDefault.png"
    return (
        <View style={styles.header}>
            <View style={styles.profileContainer}>
                <Image source={{uri:userData ? `${avatarURL}${userData.id}` : "https://ed-spaces.com/wp-content/uploads/2020/10/default-avatar-profile-icon-vector-18942381.jpg"}} style={styles.profileImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{userData?userData.firstname +" "+ userData.lastname:"default User"}</Text>
                    <Text style={styles.location}>{userData?userData.user_type +" "+ userData.lastname:"default User"}</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                {isDay ? (
                    <Ionicons name="sunny" size={28} color="yellow" />
                ) : (
                    <Ionicons name="moon" size={28} color="gray" />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff', // Set your desired background color
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconContainer: {
        marginRight: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 12,
        color: '#666',
    },
});

export default Header;
