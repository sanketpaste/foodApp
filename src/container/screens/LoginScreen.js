import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const saveData = async () => {
        firestore()
        .collection('Users')
        // Filter results
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot);
               if (querySnapshot.docs.length > 0) {
                if (querySnapshot.docs[0]._data.email === email &&
                    querySnapshot.docs[0]._data.password === password
                ) {

                    alert('Admin Logged in Successfull')
                    navigation.navigate('HomeScreen')

                } else {
                    alert('Email id or Password may') 
                }
                console.log(
                    querySnapshot.docs[0]._data.email +
                    ' ' +
                    querySnapshot.docs[0]._data.password
                );

        } else {
            console.log('account not found');
        }
        }).catch(error => {
            console.log(error);
        });
        
    }
    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ marginTop: 100, fontSize: 24, fontWeight: '800',color:'#000' }}>Login</Text>
                <TextInput
                    value={email}
                    placeholder='Enter email'
                    onChangeText={text => {
                        setEmail(text)
                    }}
                    style={{
                        width: '80%',
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 100,
                    }}
                />
                <TextInput
                    value={password}
                    placeholder='Enter pssword'
                    onChangeText={text => {
                        setPassword(text)
                    }}
                    
                    style={{
                        width: '80%',
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 20,
                    }}
                />
                <TouchableOpacity
                    style={{
                        width: 200,
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 20,
                        marginTop: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'orange'
                    }}
                    onPress={() => {
                        if(email!==''&& password!==''){
                            saveData()
                        }else{
                            alert('please enter data')
                        }
                        
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: '800' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Signup')
                    }}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: '800',
                            textDecorationLine: 'underline',
                            marginTop: 50,
                            color:'#000'
                        }}>Create New Account
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})