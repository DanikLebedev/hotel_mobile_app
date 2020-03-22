import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ClientContext } from '../../context/client.context';
import { Room } from '../../interfaces/clientInterfaces';
import { RoomService } from '../../APIServices/roomService';
import { Loader } from '../../components/Loader/Loader';
import { RoomListItem } from '../../components/RoomListItem/RoomListItem';

export const RoomListScreen = ({ navigation }) => {
    const context = useContext(ClientContext);
    const [rooms, setRooms] = useState<Room[]>(context.fetchedAllRooms);

    useEffect(() => {
        RoomService.getAllRooms().then(({ rooms }) => setRooms(rooms));
    }, [context.fetchedAllRooms]);

    return (
        <View style={styles.container}>
            {context.fetchedAllRooms ? (
                <FlatList
                    data={rooms}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    navigation.navigate('RoomInfo', {
                                        roomId: item._id,
                                    })
                                }
                            >
                                <RoomListItem room={item} />
                            </TouchableOpacity>
                        );
                    }}
                />
            ) : (
                <Loader />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});
