import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';


const Address = ({ navigation }) => {
  const [addressList, setAddressList] = useState([])
  const [selectedAddress, setSelectedAddress] = useState('')
  const isFocused = useIsFocused()

  useEffect(() => {
    getAddressList()
  }, [isFocused])

  const getAddressList = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS')
    const user = await firestore().collection('Users').doc(userId).get()
    let tempCart = []
    tempCart = user._data.address
    tempCart.map(item => {
      if (item.addressId == addressId) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
    setAddressList(tempCart)
  }
  const saveDefaultAddress = async (item) => {
    await AsyncStorage.setItem('ADDRESS', item.addressId)
    let tempCart = []
    tempCart = addressList
    tempCart.map(itm => {
      if (itm.addressId == item.addressId) {
        itm.selected = true
      } else {
        itm.selected = false
      }
    })

    let temp = []

    tempCart.map(item => {
      temp.push(item)
    })
    setAddressList(temp)

  }
  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={({ item, index }) => {
          return (
            <View style={[
              styles.addressItem,
              { marginBottom: index == addressList.length - 1 ? 100 : 10 },
            ]}>
              <View>
                <Text>{'Street: ' + item.street}</Text>
                <Text>{'City: ' + item.city}</Text>
                <Text>{'Pincode: ' + item.pincode}</Text>
                <Text>{'Mobile: ' + item.mobile}</Text>
              </View>
              {item.selected == true ? (
                <Text>default</Text>
              ) : (
                <TouchableOpacity style={styles.defaultBtn}
                onPress={()=>{
                  saveDefaultAddress(item)
                }}
                >
                  <Text style={{ color: '#fff' }}>Set Default</Text>
                </TouchableOpacity>
              )}

            </View>
          )
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddNewAddress')
        }}
      >
        <Text style={styles.btnText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Address

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  addressItem: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20
  },
  defaultBtn: {
    backgroundColor: 'green',
    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: 'center'
  }
})