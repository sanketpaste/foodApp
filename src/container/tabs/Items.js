import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Items = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const [items, setItems] = useState([])
  console.log('check items',items);


  useEffect(() => {
    getItems()
  }, [isFocused])

  const getItems = () => {
    firestore()
      .collection('Items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        let tempDtata = []

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());

          tempDtata.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data()
          })
        })
        setItems(tempDtata)
      });
  }



  const deleteItem = (docId) => {
    firestore()
      .collection('Items')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getItems()
      });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View style={[styles.itemsView,{ marginBottom: index == items.length - 1 ? 100 : 10 }]}>
            <Image source={{ uri: item.data.imageUrl }} style={styles.imageView} />
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.data.name}</Text>
              <Text style={styles.discText}>{item.data.discription}</Text>
              <View style={styles.priceView}>
                <Text style={styles.discountText}>{'$' + item.data.discount_price}</Text>
                <Text style={styles.priceText}>{'$' + item.data.amount}</Text>
              </View>
            </View>
            <View style={{ marginRight: 10,justifyContent:'space-around',alignItems:'center' }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('EditItem', {
                  data: item.data,
                  id:item.id
                })
              }}>
                <Image source={require('../../images/edit.png')} style={styles.editBtn} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                deleteItem(item.id)
              }}>
                <Image source={require('../../images/delete.png')} style={[styles.editBtn, { marginTop: 20 }]} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default Items

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemsView: {
    flexDirection: 'row',
    width: '90%',
    elevation: 4,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding:10
  },
  imageView: {
    width: '30%',
    height: '100%',
    borderRadius: 10,
    
  },
  nameView: {
    width: '55%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700'
  },
  discText: {
    fontSize: 14,
    fontWeight: '600'
  },
  priceText: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5

  },
  discountText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700'
  },
  editBtn: {
    width: 24,
    height: 24
  }

})