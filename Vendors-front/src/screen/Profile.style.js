import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    marginTop:35
    
  },
  cover: {
    width: '100%',
    height: SIZES.height * 0.2,
    resizeMode: 'cover',
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
  profileContainer: {
    alignItems: 'center',
    marginTop: -SIZES.height * 0.1,
    paddingVertical: 20,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    //elevation: 5,
    //borderWidth:1,
    
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginTop:18,
    marginRight:15,
    marginLeft:-30
  },
  name: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft:20
  },
  loginBtn: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuWrapper: {
    marginTop: 20,
  },
  menuItems: {
    flexDirection: 'row',
    alignItems:'flex-start',
    //backgroundColor: COLORS.white,
    marginBottom: 10,
    padding: 10,
    //borderRadius: 10,
    //elevation: 3,
    width:SIZES.width-50,
    borderBottomWidth:1
  },
  menuItems2:{
    flexDirection: 'row',
    alignItems:'flex-start',
    //backgroundColor: COLORS.white,
    marginBottom: 10,
    padding: 10,
    //borderRadius: 10,
    //elevation: 3,
    width:300,
  
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  emial:{
    color:COLORS.primary,
    marginLeft:20
  }
});

export default styles;
