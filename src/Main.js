import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


import ColorThemeProvider from './context/ColoursThemeContext'
import AppStack from './navigation/AppStack'

const Start = () => {
    return (
        
            <ColorThemeProvider><AppStack /></ColorThemeProvider>
       
    )
}

export default Start

const styles = StyleSheet.create({})