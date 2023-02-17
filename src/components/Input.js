import React, { useReducer, useEffect, useContext } from 'react'
import { StyleSheet, TextInput, Text, View, Platform } from 'react-native'
import IsEmpty from '../utils/IsEmpty';
import { ColorThemeContext } from '../context/ColoursThemeContext';

const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true,
            }
        default:
            return state;
    }
}

const Input = (props) => {
    const Theme = useContext(ColorThemeContext).Colors;
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValid,
        touched: false,
    });

    const { onInputChange = () => { }, id, containerStyle = {}, labelStyle = {}, textInputStyle = {} } = props;
    useEffect(() => {
        // if(inputState.touched){
        onInputChange(id, inputState.value, inputState.isValid);

    }, [inputState, onInputChange])

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && emailRegex.test(test.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
    }

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
    }
    return (
        <View style={{ margin: 10 }}> 
            {!IsEmpty(props.labal) && <Text style={[{ fontSize: 14, color: Theme.COLOR_TYPE_5, marginLeft: 5, marginBottom: 5, fontFamily: 'Montserrat-SemiBold' }, labelStyle]}>{props.labal}</Text>}
            <TextInput
                {...props}
                style={[styles.textInput, { color: Theme.COLOR_GRAY_DARK, backgroundColor: Theme.COLOR_WHITE, minHeight: props.minHeight }]}
                value={inputState.value}
                onChangeText={(text) => textChangeHandler(text)}
                onBlur={lostFocusHandler}
                inputAccessoryViewID={'uniqueID'}
                textAlignVertical="top"
                
            />
            {
                !inputState.isValid && inputState.touched &&
                <Text style={{ fontSize: 10, color: 'red' }}>{props.errorText}</Text>
            }
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    textInput: {
        textAlignVertical: 'top',
        fontFamily: 'Montserrat-Medium',
        padding: 10,
        fontSize: 16,

        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 4,
        elevation: 1
    },
})
