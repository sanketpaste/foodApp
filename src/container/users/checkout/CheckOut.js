import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import { useIsFocused } from '@react-navigation/native'
import RazorpayCheckout from 'react-native-razorpay';

let userId = ''
const CheckOut = ({ navigation }) => {
  const [cartList, setCartList] = useState([])
  const isFocused = useIsFocused()
  const [selectedAddress, setSeletedAddress] = useState('No Selected Address')

  useEffect(() => {
    getCartItem()
    getAddressList()
  }, [isFocused])

  const getCartItem = async () => {
    userId = await AsyncStorage.getItem('USERID')
    const user = await firestore().collection('Users').doc(userId).get()
    setCartList(user._data.cart)
  }
  const getTotal = () => {
    let total = 0
    cartList.map(item => {
      total = total + item.data.qty * item.data.discount_price
    })
    return total
  }
  const getAddressList = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS')
    const user = await firestore().collection('Users').doc(userId).get()
    let tempCart = []
    tempCart = user._data.address
    tempCart.map(item => {
      if (item.addressId == addressId) {
        setSeletedAddress(
          item.street +
          ',' +
          item.city +
          ',' +
          item.pincode +
          ',' +
          item.mobile
        )
      }
    })

  }
  const payNow = async () => {
    const email = await AsyncStorage.getItem('EMAIL')
    const name = await AsyncStorage.getItem('NAME')
    const mobile = await AsyncStorage.getItem('MOBILE')

    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_2VYHup8J177yIx',
      amount: getTotal() * 100,
      name: 'Food App',
      order_id: '',//Replace this with an order_id created using Orders API.
      prefill: {
        email: email,
        contact: mobile,
        name: name
      },
      theme: { color: '#f57214' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      
      navigation.navigate('OrderStatus',{
        status:'success',
        paymentId:data.razorpay_payment_id,
        cartList:cartList,
        total:getTotal(),
        address:selectedAddress,
        userId:userId,
        userName:name,
        userEmail:email,
        userMobile:mobile,
      })
    }).catch((error) => {
      // handle failure
      
      navigation.navigate('OrderStatus',{
        status:'failed',
        
      })
    });
  }


  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={cartList}
          renderItem={({ item, index }) => (
            <View style={styles.itemsView}>
              <Image source={{ uri: item.data.imageUrl }} style={styles.imageView} />
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.discText}>{item.data.discription}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.discountText}>{'$' + item.data.discount_price}</Text>
                  <Text style={styles.priceText}>{'$' + item.data.amount}</Text>
                </View>
              </View>

              <Text style={styles.nameText}>{'Qty:' + item.data.qty}</Text>
            </View>

          )
          }
        />
      </View>

      <View style={styles.totalView}>
        <Text style={styles.nameText}>Total</Text>
        <Text style={styles.nameText}>{'$' + getTotal()}</Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.nameText}>Select Address</Text>
        <Text style={[styles.nameText,
        { color: '#273DE7', textDecorationLine: 'underline' }]}
          onPress={() => {
            navigation.navigate('Address')
          }}
        >Change Address</Text>
      </View>
      <Text style={{
        margin: 15,
        width: '100%',
        color: '#000',
        fontSize: 16,
        fontWeight: '600'
      }}>{selectedAddress}</Text>

      <TouchableOpacity
        disabled={selectedAddress == 'No Selected Address' ? true : false}
        style={[styles.payBtn,
        {
          backgroundColor: selectedAddress == 'No Selected Address' ? '#d1c7c7' : 'green'
        }
        ]} onPress={() => {
          if (selectedAddress !== 'No Selected Address') {
            payNow()
            // navigation.navigate('OrderStatus',{
            //   status:'success'
            // })
          }
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Pay Now {'$' + getTotal()}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CheckOut

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsView: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    elevation: 4,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center'
  },
  imageView: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5
  },
  nameView: {
    width: '35%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700'
  },
  discText: {
    fontSize: 14,
    fontWeight: '600'
  },
  priceText: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5

  },
  discountText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700'
  },
  totalView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderTopWidth: 0.3,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#535151'
  },
  payBtn: {
    width: '90%',
    height: 50,
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
})