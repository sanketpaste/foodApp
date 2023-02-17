import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'

import Search from './uaer-tabs/Search'
import WishList from './uaer-tabs/WishList'
import Profile from './uaer-tabs/Profile'
import Order from './uaer-tabs/Order'
import Home from './uaer-tabs/Home'

const Dashbord = () => {
  const [selectedItem, setSelectedItem] = useState(0)

  return (
    <View style={styles.container}>

      {selectedItem == 0 ? (
        <Home />
      ) : selectedItem == 1 ? (
        <Search />
      ) : selectedItem == 2 ? (
        <WishList />
      ) : selectedItem == 3 ? (
        <Order />
      ) : (
        <Profile />
      )}

      <View style={styles.bottomTabView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedItem(0)
          }}
        >
          <Image
            source={selectedItem == 0 ?
              require('../../images/home_fill.png') :
              require('../../images/home.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedItem(1)
          }}
        >
          <Image
            source={selectedItem == 1 ?
              require('../../images/search_fill.png') :
              require('../../images/search.png')
            }
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedItem(2)
          }}
        >
          <Image
            source={selectedItem == 2 ?
              require('../../images/wish_fill.png') :
              require('../../images/wish.png')}
            style={[styles.bottomIcon,]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedItem(3)
          }}
        >
          <Image
            source={selectedItem == 3 ?
              require('../../images/order_fill.png') :
              require('../../images/order.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedItem(4)
          }}
        >
          <Image
            source={selectedItem == 4 ?
              require('../../images/profile_fill.png') :
              require('../../images/profile.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Dashbord

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTabView: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
  },
  bottomTab: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomIcon: {
    height: 24,
    width: 24
  }
})