import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { Room } from '../../interfaces/clientInterfaces';
import { useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../context/client.context';
import { config } from '../../../config';

export const SearchResultsScreen = ({ navigation }) => {
    const [category, setCategory] = useState('');
    const navigationState = useNavigationState(state => state.routes);

    const checkParams = () => {
        const paramObj = navigationState.filter(({ params }) => {
            return params !== undefined ? params['category'] : params;
        });
        setCategory(paramObj[0].params['category']);
    };

    const filteredRooms = useContext(ClientContext).fetchedAllRooms.filter(
        room => {
            return room.category === category;
        },
    );

    const goToRoomInfo = (id: string) => {
        navigation.navigate('RoomInfo', { roomId: id });
    };

    useEffect(() => {
        checkParams();
    }, []);

    return (
        <View style={styles.container}>
            {filteredRooms.map((room, key) => {
                return (
                    <TouchableOpacity
                        key={key}
                        onPress={() => goToRoomInfo(room._id)}
                    >
                        <View style={styles.roomCardWrapper}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri:
                                        config.API_URL +
                                        '/static/' +
                                        room.image,
                                }}
                            />
                            <Text style={styles.roomTitle}>{room.title}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    roomCardWrapper: {
        borderWidth: 1,
        borderColor: '#cdcdcd',
        padding: 20,
    },
    roomTitle: {
        fontSize: 20,
    },
});
