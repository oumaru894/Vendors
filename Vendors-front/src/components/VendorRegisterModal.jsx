import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { SIZES,COLORS } from '../../assets/constants'
const VendorRegisterModal = ({visibility}) => {
    const [modalVisible, setModalVisible] = useState(false)

    if (visibility){
        setModalVisible(true)
    }
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', paddingVertical: 5, borderRadius: 10, alignItems: 'center', width: SIZES.width / 2 + 90 }}>
            <Text style={{ fontFamily: 'bold' }}>Item Name: </Text>
            <Text style={{ fontFamily: 'bold' }}>Please enter your number:</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: SIZES.width / 2 + 50, borderRadius: 10, textAlign:'center'}}
              onChangeText={handleInputChange}
              keyboardType='numeric'
              value={contact}
            />
            <CustomBtn
              title={"Submit"}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </Modal>
  )
}

export default VendorRegisterModal

const styles = StyleSheet.create({

})