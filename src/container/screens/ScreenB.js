import React, { useContext, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Input from '../../components/Input'


import { StateContext } from '../tabs/Add'
import { StateContext2 } from './EditItem'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
// const duration = [
//     { id: 1, name: '1 Month', periodIndays: 30 },
//     { id: 2, name: '3 Month', periodIndays: 90 },
//     { id: 3, name: '6 Month', periodIndays: 180 },
//     { id: 4, name: '1 Year', periodIndays: 360 },
// ]

const ScreenB = ({itemDetails}) => {
    console.log('checkDetails',itemDetails);
    const stateContext = useContext(StateContext2)
    
    return (
        <View>
            {/* <DatePicker
                selectedDate={new Date()}
                onDateChange={(current_date) => stateContext.dispatch('start_date', current_date, true)}

            /> */}

            <Input
                id='name'
                labal='Enter Item Name'
                errorText='Wrong Title'
                initialValue={itemDetails.name}
                initialValid={true}
                onInputChange={stateContext.dispatch}
                required
            />

            <Input
                id='amount'
                labal='Enter Item Price'
                errorText='Wrong Title'
                initialValue={itemDetails.amount}
                initialValid={true}
                onInputChange={stateContext.dispatch}
                required
            />
            <Input
                id='discount_price'
                labal='Enter Item Discount Price'
                errorText='Wrong Title'
                initialValue={itemDetails.discount_price}
                initialValid={true}
                onInputChange={stateContext.dispatch}
                required
            />

            <Input
                id='discription'
                labal='Enter Item Discription'
                errorText='Wrong Title'
                initialValue={itemDetails.discription}
                initialValid={true}
                numberOfLines={5}
                onInputChange={stateContext.dispatch}
                required
            />
            <Input
                id='image_url'
                labal='Enter Item Url'
                errorText='Wrong Title'
                initialValue={itemDetails.imageUrl}
                initialValid={true}

                onInputChange={stateContext.dispatch}
                required
            />
            
          

            {/* <SingleSelectionDropdown
                queTitle={"Lavf=="}
                data={duration}
                // itemStyle={CStyles.singleSlectDropDown}
                _dropdownValue={''}
                set_dropdownValue={(item) => { }} /> */}

        </View>
    )
}
export default ScreenB
const styles = StyleSheet.create({})