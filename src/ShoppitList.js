import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Shoppit } from './Shoppit'
import { SwipeListView } from 'react-native-swipe-list-view'
import { VStack, Input, Icon, NativeBaseProvider, Box, Heading } from 'native-base'
import uuid from 'uuid-random'
import { FontAwesome5 } from '@expo/vector-icons'

const LinearGradient = require("expo-linear-gradient").LinearGradient;

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
                color:"warmGray.50",
                textAlign:"center"
            }}
        >
            {data.item.text}
        </Box>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={StyleSheet.rowBack}>
            <TouchableOpacity onPress={() => editRow(data.item, rowMap)}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={StyleSheet.backRightbtn} onPress={() => deleteRow(data.item)}>
                <Text style={{color:'#FFF'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const deleteRow = (shoppit) => {
        dispatch({type:'delete', payload:shoppit});
    };

    const editRow = (shoppit, rowMap) => {
        setShoppitText(shoppit.text)
        setEditMode(true)
        setEditShoppit(shoppit)
        if (rowMap[shoppit.id]){
            rowMap[shoppit.id].closeRow();
        }
    };

    return (
        <View style={{flex:1, marginTop:60}}>
            <View style={{marginLeft:5,marginBottom:10}}>
                <VStack w='100%' space={5} alignSelf="center">
                    <Heading fontSize={'42'}>Shoppit!</Heading>
                    <View style={{flexDirection:'row', marginRight:60, marginLeft:2}}>
                        <Input
                            placeholder='Add shoppit'
                            onChangeText={text => setShoppitText(text)}
                            value={shoppitText}
                            variant='filled'
                            width='100%'
                            borderRadius='10'
                            py='1'
                            px='2'
                            borderWidth='7'
                            InputLeftElement={<Icon ml='2' size='7' color='gray.100'
                            as={<FontAwesome5 name='pencil-alt' />} />}   
                            />
                            <Button
                                onPress={handleSubmit}
                                title={buttonTitle}
                                style={{height:20}}
                            />
                    </View>
                </VStack>
            </View>
            <SwipeListView
            data={state.shoppits}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            />
        </View>
    )
}

const config = {
    dependencies: {
        "linear-gradient" : LinearGradient
    }
};

export default () => {
    return (
        <NativeBaseProvider config={config}>
            <ShoppitList/>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    rowBack:{
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
        paddingLeft: 15
    },
    backRightbtn:{
        alignItems:'center',
        bottom:0,
        justifyContent:'center',
        top:0,
        width:75,
        backgroundColor:'red',
        right:0
    }
})