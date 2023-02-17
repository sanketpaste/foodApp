import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Loder from '../../components/Loder'
import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'

const SignupScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [mobile,setMobile]=useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    
    const saveData = () => {
        setModalVisible(true)
        const userId = uuid.v4()
        firestore()
            .collection('Users')
            .doc(userId)
            .set({
                name: name,
                email: email,
                password: password,
                mobile:mobile,
                userId:userId,
                cart:[]
            })
            .then(res => {
                setModalVisible(false)
                navigation.goBack()
            })
            .catch(error => {
                setModalVisible(false)
                console.log(error);
            })
    }
    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ marginTop: 100, fontSize: 24, fontWeight: '800' }}>Signup</Text>

                <TextInput
                    value={name}
                    placeholder='Enter Name'
                    onChangeText={text => {
                        setName(text)
                    }}
                    style={{
                        width: '80%',
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 50,
                    }}
                />
                 <TextInput
                    value={mobile}
                    placeholder='Enter Number'
                    onChangeText={text => {
                        setMobile(text)
                    }}
                    style={{
                        width: '80%',
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 20,
                    }}
                />
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
                        marginTop: 20,
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
                        width: "70%",
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'orange'
                    }}
                    onPress={() => {
                        if (name !== '' && email !== '' && password !== '') {
                            saveData()
                        } else {
                            alert('please enter data')
                        }

                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: '800' }}>Signup</Text>
                </TouchableOpacity>
                <Loder modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </View>

        </ScrollView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({})  