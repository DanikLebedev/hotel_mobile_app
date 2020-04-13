import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Room } from '../../interfaces/clientInterfaces';
import { config } from '../../../config';

interface RoomListItem {
    room: Room;
}

export const RoomListItem: React.FC<RoomListItem> = (props: RoomListItem) => {
    return (
        <View style={styles.roomItemWrapper}>
            <View style={styles.roomImageWrapper}>
                <Image
                    style={styles.roomImage}
                    source={{
                        uri: config.API_URL + '/static/' + props.room.image,
                    }}
                />
            </View>
            <View style={styles.roomInfoWrapper}>
                <Text style={styles.roomInfoField}>
                    Category: {props.room.category}
                </Text>
                <Text style={styles.roomInfoField}>
                    Price: {props.room.price}$
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    roomItemWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    roomImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    roomImageWrapper: {
        flex: 1,
    },
    roomInfoWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    roomInfoField: {
        fontSize: 16,
    },
});
