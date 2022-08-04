import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Shoppit } from './Shoppit'
import { SwipeListView } from 'react-native-swipe-list-view'
import { VStack, Input, Icon, NativeBaseProvider, Box, Heading } from 'native-base'
import uuid from 'uuid-random'
import { FontAwesome5 } from '@expo/vector-icons'

const ShoppitList = () => {
    //receive state & dispatch from App.js
    const { state, dispatch } = useContext(Shoppit);
    const [shoppitText, setShoppitText] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [editShoppit, setEditShoppit] = useState(null)
    const buttonTitle = editMode ? "Edit" : "Add";

    const handleSubmit = () => {
        if(editMode){
            dispatch({type:'edit', payload:{...editShoppit, text:shoppitText}})
            setEditMode(false)
            setEditShoppit(null)
        }
        else{
            const newShoppit = {id: uuid(), text:shoppitText}
            dispatch({type: 'add', payload: newShoppit})
        }
        setShoppitText('') //so to clear the field after adding new shopping item
    }

    const renderItem = data => (
        <Box
            bg={{
                linearGradient:{
                    colors:["lightBlue.300", "violet.800"],
                    start:[0,0],
                    end:[1,0]
                }
            }}
            p='12'
            rounded='x1'
            text={{
                fontSize:"md",
                fontWeight:"medium",
                color:"warmGray.50"
                textAlign:"center"
            }}
        >
            {data.item.text}
        </Box>
    )
}

export default ShoppitList