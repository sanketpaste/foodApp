import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get('window')

const Header = ({ title, icon, onClickIcon, count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {icon && (
        <View style={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            onPress={() => {
              onClickIcon()
            }}
          >
            <Image source={icon} style={styles.iconStyle} />
          </TouchableOpacity>
          <View style={styles.count}>
            <Text style={{color:'#fff'}}>{count ? count : '0'}</Text>
          </View>

        </View>
      )}


    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    width: width,
    elevation: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'purple'
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  count:{
    backgroundColor:'red',
    width:20,
    height:20,
    borderRadius:10,
    top:5,
    right:0,
    position:'absolute',
    alignItems:'center'
  }
})