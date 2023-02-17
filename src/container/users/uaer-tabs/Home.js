import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import firestore from '@react-native-firebase/firestore'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

let userId = ''
const Home = () => {
  const navigation = useNavigation()
  const [items, setItems] = useState([])
  const [cartCounter, setCartCounter] = useState(0)
  const isFocused = useIsFocused()

  useEffect(() => {
    firestore()
      .collection('Items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempDtata = []
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ',
            documentSnapshot.id,
            documentSnapshot.data()
          );
          tempDtata.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data()
          })
        });
        setItems(tempDtata)
      });
    return
  }, [])

  useEffect(() => {
    getCartItem()
  }, [isFocused])

  const getCartItem = async () => {
    userId = await AsyncStorage.getItem('USERID')
    const user = await firestore().collection('Users').doc(userId).get()
    setCartCounter(user._data.cart.length)
  }

  const onAddToCart = async (item, index) => {
    userId = await AsyncStorage.getItem('USERID')
    const user = await firestore().collection('Users').doc(userId).get()
    console.log(user._data.cart)
    let tempCart = []
    tempCart = user._data.cart
    if (tempCart.length > 0) {

      let existing = false
      tempCart.map(itm => {
        if (itm.id == item.id) {
          existing = true
          itm.data.qty = itm.data.qty + 1
        }
      })
      if (existing == false) {
        tempCart.push(item)
      }
      firestore().collection('Users').doc(userId).update({
        cart: tempCart,
      })
    } else {
      tempCart.push(item)
    }
    console.log(tempCart)

    firestore().collection('Users').doc(userId).update({
      cart: tempCart,
    })
    getCartItem()
  }

  return (
    <View style={{flex:1}}>
      <Header
        title={'FoodApp'}
        icon={require('../../../images/cart.png')}
        count={cartCounter}
        onClickIcon={() => {
          navigation.navigate('Cart')
        }}
      />
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View style={[styles.itemsView,{ marginBottom: index == items.length - 1 ? 100 : 10 }]}>
            <Image source={{ uri: item.data.imageUrl }} style={styles.imageView} />
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.data.name}</Text>
              <Text style={styles.discText}>{item.data.discription}</Text>
              <View style={styles.priceView}>
                <Text style={styles.discountText}>{'$' + item.data.discount_price}</Text>
                <Text style={styles.priceText}>{'$' + item.data.amount}</Text>
              </View>
            </View>
            <View style={{ flex:1,justifyContent: 'center',alignItems:'center' }}>
              <TouchableOpacity
                style={styles.addCart}
                onPress={() => {
                  onAddToCart(item, index)
                }}
              >
                <Text style={{ color: '#fff' }}>Add To Cart</Text>
              </TouchableOpacity>
            </View>

          </View>
        )
        }
      />
    </View >
  )
}

export default Home

const styles = StyleSheet.create({
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
  addCart: {
    backgroundColor: 'green',
    height:40, 
    width: '100%',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center'
  }
})