import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
     checkLogin()
    }, 3000)
  }, [])

  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL')
    if(email!==null){
      navigation.navigate('SelectLogin')
    }else{
      navigation.navigate('SelectLogin')
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '800',color:'red' }}>Firebase</Text>

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})