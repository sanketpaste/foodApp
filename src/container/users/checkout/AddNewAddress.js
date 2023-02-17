import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../components/Input'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddNewAddress = ({ navigation }) => {
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [mobile, setMobile] = useState('')

  const saveAddress = async () => {
    const addressId = uuid.v4();
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('Users').doc(userId).get()
    let tempCart = [] 
    tempCart = user._data.address
    tempCart.push({ street, city, pincode, mobile, addressId })

    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        address: tempCart,
      })
      .then(res => {
        console.log('successfully added');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Street'}
        value={street}
        onChangeText={txt => setStreet(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter City '}
        value={city}
        onChangeText={txt => setCity(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Pincode'}
        value={pincode}
        maxLength={6}
        keyboardType="number-pad"
        onChangeText={txt => setPincode(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Contact '}
        value={mobile}
        maxLength={10}
        keyboardType="number-pad"
        onChangeText={txt => setMobile(txt)}
      />

      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          saveAddress()
        }}
      >
        <Text style={styles.btnText}>Save Address</Text>
      </TouchableOpacity>

    </View>
  )
}

export default AddNewAddress

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
  },
  addNewBtn: {
    width: '90%',
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600'
  }
})