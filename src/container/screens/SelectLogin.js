import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SelectLogin = ({ navigation }) => {

    const checkAdminLogin = async () => {
        const email = await AsyncStorage.getItem('EMAIL')
        if(email!==null){
          navigation.navigate('HomeScreen')
        }else{
          navigation.navigate('login')
        }
      }
      const checkUserLogin = async () => {
        const email = await AsyncStorage.getItem('EMAIL')
        if(email!==null){
          navigation.navigate('Dashbord')
        }else{
          navigation.navigate('UserLogin')
        }
      }

    return (
        <View style={styles.container}>

            <Text style={{ color: '#000', fontSize: 20 }}>Select Login Type</Text>

            <TouchableOpacity
                style={styles.adminloginBtn}
                onPress={() => {
                    checkAdminLogin()
                }}
            >
                <Text style={{ color: '#fff', fontSize: 20 }}>Select Admin Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
             style={styles.adminloginBtn}
             onPress={()=>{
                checkUserLogin()
             }}
             >
                <Text style={{ color: '#fff', fontSize: 20 }}>Select User Login</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SelectLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    adminloginBtn: {
        width: '90%',
        height: 50,
        backgroundColor: '#8908a6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 20
    }
})