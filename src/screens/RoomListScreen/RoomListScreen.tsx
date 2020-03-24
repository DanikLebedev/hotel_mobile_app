import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    RefreshControl,
} from 'react-native';
import { ClientContext } from '../../context/client.context';
import { Room } from '../../interfaces/clientInterfaces';
import { RoomService } from '../../APIServices/roomService';
import { Loader } from '../../components/Loader/Loader';
import { RoomListItem } from '../../components/RoomListItem/RoomListItem';

export const RoomListScreen = ({ navigation }) => {
    const context = useContext(ClientContext);
    const [rooms, setRooms] = useState<Room[]>(context.fetchedAllRooms);
    const [refreshing, setRefreshing] = useState(false);

    const update = useCallback(() => {
        setRefreshing(true);
        RoomService.getAllRooms().then(({ rooms }) => {
            setRefreshing(false);
            setRooms(rooms);
        });
    }, []);

    useEffect(() => {
        navigation.addListener('focus', () => update());
    }, [update, context.fetchedAllRooms]);

    return (
        <View style={styles.container}>
            {context.fetchedAllRooms ? (
                <FlatList
                    data={rooms}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={update}
                        />
                    }
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
                                <RoomListItem key={index} room={item} />
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
