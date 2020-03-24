import React, { useState } from 'react';
import { OrderCart } from '../../interfaces/clientInterfaces';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
interface OrderProps {
    order: OrderCart;
    onDelete: (id: string) => void;
}

export const OrderItem: React.FC<OrderProps> = (props: OrderProps) => {
    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <TouchableOpacity style={styles.orderItem} onPress={toggleShowModal}>
            <View style={styles.orderInfoWrapper}>
                <View>
                    <View style={styles.orderInfoItem}>
                        <Ionicons
                            size={26}
                            name={'ios-business'}
                            color={'#fff'}
                        />
                        <Text style={styles.orderInfoField}>
                            Category: {props.order.category}
                        </Text>
                    </View>
                    <View style={styles.orderInfoItem}>
                        <Ionicons
                            size={26}
                            name={'ios-calendar'}
                            color={'#fff'}
                        />
                        <Text style={styles.orderInfoField}>
                            Check In:{' '}
                            {new Date(props.order.checkIn).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={styles.orderInfoItem}>
                        <Ionicons
                            size={26}
                            name={'ios-calendar'}
                            color={'#fff'}
                        />
                        <Text style={styles.orderInfoField}>
                            Check Out:{' '}
                            {new Date(
                                props.order.checkOut,
                            ).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={styles.orderInfoItem}>
                        <Ionicons size={26} name={'ios-cash'} color={'#fff'} />
                        <Text style={styles.orderInfoField}>
                            Price: {props.order.price}$
                        </Text>
                    </View>
                    <View style={styles.orderInfoItem}>
                        <Ionicons
                            size={26}
                            name={'ios-person'}
                            color={'#fff'}
                        />
                        <Text style={styles.orderInfoField}>
                            Guests: {props.order.guests}
                        </Text>
                    </View>
                    <View style={styles.orderInfoItem}>
                        <Ionicons
                            size={26}
                            name={'ios-clipboard'}
                            color={'#fff'}
                        />
                        <Text style={styles.orderInfoField}>
                            Wishes: {props.order.comment}
                        </Text>
                    </View>
                </View>
                <View>
                    <Ionicons
                        name={'ios-arrow-forward'}
                        size={30}
                        color={'#fff'}
                    />
                </View>
            </View>
            <Modal isVisible={showModal} onBackdropPress={toggleShowModal}>
                <View style={styles.modalBody}>
                    <Text style={styles.modalBodyTitle}>Actions</Text>
                    <View style={styles.modalButtonWrapper}>
                        <TouchableOpacity
                            onPress={id => {
                                props.onDelete(props.order._id);
                                toggleShowModal();
                            }}
                        >
                            <Text style={styles.deleteButton}>
                                Delete order
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleShowModal}>
                            <Text style={styles.cancelButton}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        backgroundColor: '#000',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
    },
    orderInfoItem: {
        flexDirection: 'row',
    },
    orderInfoWrapper: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    orderInfoField: {
        color: '#fff',
        marginBottom: 10,
        fontSize: 16,
        justifyContent: 'center',
        marginLeft: 20,
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
    },
});
