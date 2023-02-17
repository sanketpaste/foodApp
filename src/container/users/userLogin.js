import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loder from '../../components/Loder';

const UserLogin = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    

    const saveData = async () => {
        setModalVisible(true)
        firestore()
            .collection('Users')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
                setModalVisible(false);
                /* ... */
                console.log(querySnapshot.docs);

             if(querySnapshot.docs[0]._data !== null){
                if (email ===querySnapshot.docs[0]._data.email &&
                    password === querySnapshot.docs[0]._data.password) {
                        goToNextScreen(
                            querySnapshot.docs[0]._data.userId,
                            querySnapshot.docs[0]._data.name,
                            querySnapshot.docs[0]._data.mobile,
                            
            
                        );
                    }
             }    
            })
            .catch(error => {
                setModalVisible(false);
                console.log(error);
                alert('Please Check Email/Password');
              });

            }

    const goToNextScreen = async (userId, name,mobile) => {
        await AsyncStorage.setItem('USERID', userId)
        await AsyncStorage.setItem('NAME', name)
        await AsyncStorage.setItem('MOBILE',mobile)
        await AsyncStorage.setItem('EMAIL', email)
        alert('Login successfull')
        navigation.navigate('Dashbord')

    }

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ marginTop: 100, fontSize: 24, fontWeight: '800' }}>User Login</Text>
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
                        width: '70%',
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'orange'
                    }}
                    onPress={() => {
                        if (email !== '' && password !== '') {
                            saveData()
                        } else {
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
                            marginTop: 50
                        }}>Create New Account
                    </Text>
                </TouchableOpacity>
                <Loder modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </View>
        </ScrollView>
    )
}

export default UserLogin

const styles = StyleSheet.create({})