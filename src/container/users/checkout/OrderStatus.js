import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';


const OrderStatus = ({ navigation }) => {
    const route = useRoute()
    useEffect(() => {
        if (route.params.status == 'success') {
            placeOrder()
        }
    }, [])

    const placeOrder = async () => {
        let tempOrder = []
        let user = await firestore()
            .collection('Users')
            .doc(route.params.userId)
            .get()
        tempOrder = user._data.orders
        tempOrder.push({
            items: route.params.cartList,
            address: route.params.address,
            orderBy: route.params.userName,
            userEmail: route.params.userEmail,
            userMobile: route.params.userMobile,
            userId: route.params.userId,
            orderTotal: route.params.total,
            paymentId: route.params.paymentId
        })

        firestore().collection('Users').doc(route.params.userId).update({
            cart: [],
            orders: tempOrder
        })

        firestore().collection('Orders').add({
            data:
            {
                items: route.params.cartList,
                address: route.params.address,
                orderBy: route.params.userName,
                userEmail: route.params.userEmail,
                userMobile: route.params.userMobile,
                userId: route.params.userId,
                orderTotal: route.params.total,
                paymentId: route.params.paymentId,
            },
            orderBy: route.params.userId
        })
    }
    return (
        <View style={styles.container}>
            <Image
                source={
                    route.params.status == 'success'
                        ? require('../../../images/success.gif')
                        : require('../../../images/failed.gif')
                }
                style={styles.icon}
            />
            <Text style={styles.msg}>
                {
                    route.params.status == 'success'
                        ? 'Order Place Successfully !!'
                        : 'Order Failed !!'
                }
            </Text>
            <TouchableOpacity
                style={styles.backToHome}
                onPress={() => {
                    navigation.navigate('Dashbord')
                }}
            >
                <Text>Go To Home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OrderStatus

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: '30%',
        width: '50%'
    },
    msg: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',

    },
    backToHome: {
        width: '50%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50
    }
})