import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import Items from '../tabs/Items'
import Transactions from '../tabs/Transactions'
import Orders from '../tabs/Orders'
import Add from '../tabs/Add'
import Notifications from '../tabs/Notifications'

const HomeScreen = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(0)


  return (
    <View style={styles.container}>
      {selectedItem === 0 ? (
        <Items />
      ) : selectedItem === 1 ? (
        <Transactions />
      ) : selectedItem === 3 ? (
        <Orders />
      ) : (
        <Notifications />
      )

      }
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[styles.bottomTab,
          { tint: selectedItem === 0 ? 'red' : 'black' }
          ]}
          onPress={() => {
            setSelectedItem(0)
          }}>
          <Image
            source={require('../../images/items.png')}
            style={[styles.bottomTabImg,
            { tintColor: selectedItem === 0 ? 'red' : 'black' }
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedItem(1)
          }}>
          <Image
            source={require('../../images/transaction.png')}
            style={[styles.bottomTabImg,
            { tintColor: selectedItem === 1 ? 'red' : 'black' }
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            navigation.navigate('Add')
          }}>
          <Image
            source={require('../../images/add.png')}
            style={[styles.bottomTabImg,
            { width: 35, height: 35, tintColor: selectedItem === 2 ? 'red' : 'black' }
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedItem(3)
          }}>
          <Image
            source={require('../../images/orders.png')}
            style={[styles.bottomTabImg,
            { tintColor: selectedItem === 3 ? 'red' : 'black' }
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomTab,]}
          onPress={() => {
            setSelectedItem(4)
          }}>
          <Image
            source={require('../../images/notifications.png')}
            style={[styles.bottomTabImg, { tintColor: selectedItem === 4 ? 'red' : 'black' }]}
          />
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0
  },
  bottomTab: {
    flex: 1,
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomTabImg: {
    width: 24,
    height: 24,
  },

}) 