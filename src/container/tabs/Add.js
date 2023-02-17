import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import InputScrollView from 'react-native-input-scroll-view';
import ScreenA from '../screens/ScreenA';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import getItems from './Items'

export const StateContext = React.createContext();



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
        }
    }
    return state;
}
const inintialState = {
    inputValues: {
        name: 'Sundar kumar',
        amount: 3000,
        discount_price: '',
        discription: '',
        image_url: ''
    },
    inputValidities: {
        name: false,
        amount: false,
        discount_price: false,
        discription: false,
        image_url: false,
    },
    formIsValid: false
}

const Add = ({ route, navigation }) => {

    const [formState, dispatchFormState] = useReducer(formReducer, inintialState);

    const [imageData, setImageData] = useState(null)

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState]);



    const openCamera = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' })
        setImageData(result)

        if (!result.didCancel) {
            const reference = storage().ref(imageData.assets[0].fileName);
            const pathToFile = imageData.assets[0].uri;
            // uploads file
            await reference.putFile(pathToFile);
            const url = await storage()
                .ref(imageData.assets[0].fileName)
                .getDownloadURL();
            console.log(url);
            onSubmit(url)
        } else {
            console.log(result);
            setImageData(result)
        }

    }


    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Firebase App permission Camera',
                    message: 'Firebase social app needs access to your permisson' +
                        'so you can take awesome pictures',
                    buttonNeutral: 'ask me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Ok'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                openCamera()
            } else {
                console.log('permission denied');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const onSubmit = async (url) => {
        firestore()
            .collection('Items')
            .add({
                name: formState.inputValues.name,
                amount: formState.inputValues.amount,
                discount_price: formState.inputValues.discount_price,
                discription: formState.inputValues.discription,
                image_url: '',
                imageUrl: url + '',
                qty:1,
                itemId:1,
            })
            .then(() => {
                console.log('User Updated!');
                navigation.goBack()
                getItems()
            });
    }

    return (
        <StateContext.Provider value={{ state: formState, dispatch: inputChangeHandler }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add Item</Text>
                </View>

                {imageData !== null ? (
                    <Image
                        source={{ uri: imageData.assets[0].url }}
                        style={styles.imageStyle}
                    />
                ) :null}



                <View style={{ flex: 1 }}>
                    <InputScrollView>
                        <ScreenA />
                    </InputScrollView>
                </View>


                <TouchableOpacity
                    style={styles.picBtn}
                    onPress={() => {
                        requestPermission()
                    }}
                >
                    <Text>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.picBtn, { backgroundColor: '#5246f2', marginBottom: 10 }]}
                    onPress={() => {
                        onSubmit()
                    }}
                >
                    <Text style={{ color: '#fff' }}>Save</Text>
                </TouchableOpacity>


            </ScrollView>
        </StateContext.Provider>
    )
}


export default Add

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        elevation: 0.5,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700'
    },
    picBtn: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    imageStyle: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20
    }
})