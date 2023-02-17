import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../container/screens/SplashScreen'
import HomeScreen from '../container/screens/HomeScreen'
import LoginScreen from '../container/screens/LoginScreen'
import SignupScreen from '../container/users/SignupScreen'
import Add from '../container/tabs/Add'
import EditItem from '../container/screens/EditItem'
import userLogin from '../container/users/userLogin'
import Dashbord from '../container/users/Dashbord'
import Cart from '../container/users/Cart'
import CheckOut from '../container/users/checkout/CheckOut'
import Address from '../container/users/checkout/Address'
import AddNewAddress from '../container/users/checkout/AddNewAddress'
import OrderStatus from '../container/users/checkout/OrderStatus'
import Home from '../container/users/uaer-tabs/Home'
import SelectLogin from '../container/screens/SelectLogin'




const Stack = createNativeStackNavigator()

const AppStack = () => {
  return (
 <NavigationContainer >
  <Stack.Navigator initialRouteName='Splash'>
    <Stack.Screen name='Splash' component={SplashScreen}/>
    <Stack.Screen name='SelectLogin' component={SelectLogin}/>
    
    <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}} />
    <Stack.Screen name='login' component={LoginScreen}/>
    <Stack.Screen name='Signup' component={SignupScreen}/>
    <Stack.Screen name='Add' component={Add} options={{headerShown:false}}/>
    <Stack.Screen name='EditItem' component={EditItem} options={{headerShown:false}}/>
    <Stack.Screen name='UserLogin' component={userLogin} options={{headerShown:false}}/>
    <Stack.Screen name='Dashbord' component={Dashbord} options={{headerShown:false}}/>
    <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
    <Stack.Screen name='Cart' component={Cart}/>
    <Stack.Screen name='CheckOut' component={CheckOut}/>
    <Stack.Screen name='Address' component={Address} />
    <Stack.Screen name='AddNewAddress' component={AddNewAddress} />
    <Stack.Screen name='OrderStatus' component={OrderStatus} options={{headerShown:false}} />

  </Stack.Navigator>

 </NavigationContainer>
  )
} 

export default AppStack

const styles = StyleSheet.create({})