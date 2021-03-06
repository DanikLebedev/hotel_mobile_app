import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { OrderCart } from '../../interfaces/clientInterfaces';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

interface OrderHistoryItem {
    order: OrderCart;
}

export const OrderHistoryItem: React.FC<OrderHistoryItem> = (
    props: OrderHistoryItem,
) => {
    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <TouchableOpacity
            style={styles.orderHistoryItem}
            onPress={toggleShowModal}
        >
            <View>
                <Text style={styles.orderHistoryField}>
                    <Ionicons name={'ios-calendar'} size={30} color={'#000'} />{' '}
                    Check In:{' '}
                    {new Date(props.order.checkIn).toLocaleDateString()}
                </Text>
                <Text style={styles.orderHistoryField}>
                    <Ionicons name={'ios-calendar'} size={30} color={'#000'} />{' '}
                    Check Out:{' '}
                    {new Date(props.order.checkOut).toLocaleDateString()}
                </Text>
                <Text style={styles.orderHistoryField}>
                    <Ionicons name={'ios-cash'} size={30} color={'#000'} />{' '}
                    Price: {props.order.price}$
                </Text>
            </View>
            <View>
                <View>
                    <Ionicons
                        name={'ios-arrow-forward'}
                        size={30}
                        color={'#000'}
                    />
                </View>
            </View>
            <Modal isVisible={showModal} onBackdropPress={toggleShowModal}>
                <View style={styles.modalBody}>
                    <Text style={styles.modalBodyTitle}>Information</Text>
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderInfoField}>
                            Room's category: {props.order.category}
                        </Text>
                        <Text style={styles.orderInfoField}>
                            Check In:
                            {new Date(props.order.checkIn).toLocaleDateString()}
                        </Text>
                        <Text style={styles.orderInfoField}>
                            Check Out:{' '}
                            {new Date(
                                props.order.checkOut,
                            ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.orderInfoField}>
                            Number of guests: {props.order.guests}
                        </Text>
                        <Text style={styles.orderInfoField}>
                            Price: {props.order.price}
                        </Text>
                        <Text style={styles.orderInfoField}>
                            Wishes: {props.order.comment}
                        </Text>
                        <Text style={styles.orderInfoField}>
                            Status: {props.order.status}
                        </Text>
                    </View>
                    <View style={styles.modalButtonWrapper}>
                        <TouchableOpacity onPress={toggleShowModal}>
                            <Text style={styles.cancelButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orderHistoryItem: {
        marginHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    orderHistoryField: {
        color: '#000',
        fontSize: 15,
        marginBottom: 10,
        alignItems: 'center',
        flex: 1,
    },
    modalBody: {
        backgroundColor: '#fff',
        padding: 20,
    },
    modalBodyTitle: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 30,
    },
    modalButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#ed4337',
        color: '#fff',
        padding: 10,
    },
    cancelButton: {
        backgroundColor: '#000',
        color: '#fff',
        padding: 10,
        fontSize: 16,
    },
    orderInfo: {},
    orderInfoField: {
        fontSize: 16,
        marginBottom: 5,
    },
});
