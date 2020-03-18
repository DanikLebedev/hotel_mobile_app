import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationState } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../context/client.context';
import { config } from '../../../config';

export const RoomInfoScreen = () => {
    const [roomId, setRoomId] = useState('')
    const navigationState = useNavigationState(state => state.routes)

    const checkParams = () => {
        const paramObj = navigationState.filter(({params}) => {
            return  params !== undefined ? params['roomId']: params
        })
        setRoomId(paramObj[0].params['roomId'])
        console.log(roomId)
    }


    const roomInfo = useContext(ClientContext).fetchedAllRooms.filter(room => {
        return room._id === roomId
    })

    useEffect(() => {
        checkParams()
    }, [])



    return (
        <View style={styles.container}>
            <View  style={styles.roomCardWrapper}>
                <Image style={styles.image} source={roomInfo[0] ? {uri : config.API_URL + '/static/' + roomInfo[0].image}: null}/>
                <Text style={styles.roomTitle}>{roomInfo[0] ? roomInfo[0].title: null}</Text>
                <Text style={styles.roomTitle}>Category: {roomInfo[0] ?roomInfo[0].category: null}</Text>
                <Text style={styles.roomTitle}>Description: {roomInfo[0] ? roomInfo[0].description: null}</Text>
                <Text style={styles.roomTitle}>Price: {roomInfo[0] ? roomInfo[0].price: null}</Text>
                <Text style={styles.roomTitle}>Guests: {roomInfo[0] ?roomInfo[0].guests: null}</Text>
                <Text style={styles.roomTitle}>Area: {roomInfo[0] ? roomInfo[0].area: null}</Text>
                <Text style={styles.roomTitle}>Rooms: {roomInfo[0] ?roomInfo[0].rooms: null}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    roomCardWrapper: {
        borderWidth: 1,
        borderColor: '#cdcdcd',
        padding: 20
    },
    roomTitle: {
        fontSize: 20,
    }
});
