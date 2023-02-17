import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'


let userId = ''
const Cart = ({navigation}) => {
  const [cartList, setCartList] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    getCartItem()
  }, [isFocused])

  const getCartItem = async () => {
    userId = await AsyncStorage.getItem('USERID')
    const user = await firestore().collection('Users').doc(userId).get()
    setCartList(user._data.cart)
  }

  const addItem = async (item) => {
    const user = await firestore().collection('Users').doc(userId).get()
    let tempCart = []
    tempCart = user._data.cart
    tempCart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty + 1
      }
    })
    firestore().collection('Users').doc(userId).update({
      cart: tempCart,
    })
    getCartItem()
  }
  const removeItem = async (item) => {
    const user = await firestore().collection('Users').doc(userId).get()
    let tempCart = []
    tempCart = user._data.cart
    tempCart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty - 1
      }
    })
    firestore().collection('Users').doc(userId).update({
      cart: tempCart,
    })
    getCartItem()

  }
  const deleteItem = async (index) => {
    const user = await firestore().collection('Users').doc(userId).get()
    let tempCart = []
    tempCart = user._data.cart
    tempCart.splice(index, 1)

    firestore().collection('Users').doc(userId).update({
      cart: tempCart,
    })
    getCartItem()
  }

  const getTotal = () => {
    let total = 0
    cartList.map(item => {
      total = total + item.data.qty * item.data.discount_price
    })
    return total
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartList}
        renderItem={({ item, index }) => (
          <View style={[styles.itemsView,{ marginBottom: index == cartList.length - 1 ? 100 : 10 }]}>
            <Image source={{ uri: item.data.imageUrl }} style={styles.imageView} />
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.data.name}</Text>
              <Text style={styles.discText}>{item.data.discription}</Text>
              <View style={styles.priceView}>
                <Text style={styles.discountText}>{'$' + item.data.discount_price}</Text>
                <Text style={styles.priceText}>{'$' + item.data.amount}</Text>
              </View>
            </View>

            <View style={styles.addRemoveView}>
              <TouchableOpacity
                style={[styles.addCart, { marginRight: 10 }]}
                onPress={() => {
                  if (item.data.qty > 1) {
                    removeItem(item)
                  } else {
                    deleteItem(index)
                  }

                }}
              >
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700' }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.data.qty}</Text>
              <TouchableOpacity
                style={[styles.addCart, { marginLeft: 10 }]}
                onPress={() => {
                  addItem(item)
                }}
              >
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        }
      />
      {cartList.length > 0 && (
        <View style={styles.checkOutView}>
          <Text style={{ color: '#000', fontWeight: '600' }}>
            {'Items:(' + cartList.length + ')\nTotal:$' + getTotal()}
          </Text>
          <TouchableOpacity
            style={[styles.addCart, { width: 100, height: 40, justifyContent: 'center', alignItems: 'center' }]}
            onPress={()=>{
              navigation.navigate('CheckOut')
            }}
            >
            <Text style={{color:'#fff'}}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemsView: {
    flexDirection: 'row',
    width: '90%',
    elevation: 4,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding:10
  },
  imageView: {
    width: '30%',
    height: '100%',
    borderRadius: 10,
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
  addRemoveView: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',


  },
  addCart: {
    backgroundColor: 'green',
    height:40,
    borderRadius: 10,
    width:30,
    justifyContent:'center',
    alignItems:'center'

  },
  checkOutView: {
    flex:1,
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})