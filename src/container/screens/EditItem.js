import { Image, StyleSheet, Text, View,TouchableOpacity,ScrollView,PermissionsAndroid } from 'react-native'
import React,{ useCallback, useReducer, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import InputScrollView from 'react-native-input-scroll-view';
import ScreenA from './ScreenA';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import ScreenB from './ScreenB'; 
import { useRoute } from '@react-navigation/native';


export const StateContext2 = React.createContext();

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

const EditItem = ({navigation}) => {
    const route= useRoute()
    const items = route.params.data


    const [formState, dispatchFormState] = useReducer(formReducer, inintialState);

    const [imageData, setImageData] = useState({
        assets:[{uri:route.params.data.imageUrl}]
    })

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

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState]);

    const onSubmit = async (url) => {
        firestore()
            .collection('Items')
            .doc(route.params.id )
            .update({
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
            });
    }
  return (
    <StateContext2.Provider value={{ state: formState, dispatch: inputChangeHandler }}>
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Edit Item</Text>
        </View>

        {imageData !== null ? (
            <Image
                source={{ uri: imageData.assets[0].uri }}
                style={styles.imageStyle}
            />
        ) :items.imageUrl}

        <View style={{ flex: 1 }}>
            <InputScrollView>
                <ScreenB  itemDetails={items}/>
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
            <Text style={{ color: '#fff' }}>Save Changes</Text>
        </TouchableOpacity>


    </ScrollView>
</StateContext2.Provider>
)
}
  

export default EditItem

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




