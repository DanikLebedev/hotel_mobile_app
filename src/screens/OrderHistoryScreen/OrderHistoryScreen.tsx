import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { OrderCart } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';
import { OrderService } from '../../APIServices/orderService';
import { OrderHistoryItem } from '../../components/OrderHistoryItem/OrderHistoryItem';

export const OrderHistoryScreen = () => {
    const context = useContext(ClientContext);
    const [orderHistory, setOrderHistory] = useState<OrderCart[]>(
        context.orderHistory,
    );

    const update = useCallback(() => {
        OrderService.getOrdersHistory({
            Authorization: `Bearer ${context.token}`,
        }).then(({ ordercarts }) => setOrderHistory(ordercarts));
    }, [context.token]);

    useEffect(() => {
        update();
    }, [update, context.orderHistory]);

    return (
        <View>
            {orderHistory.length ? (
                <FlatList
                    data={orderHistory}
                    renderItem={({ item }) => {
                        return <OrderHistoryItem order={item} key={item._id} />;
                    }}
                />
            ) : (
                <View>
                    <Text>There no orders yey</Text>
                </View>
            )}
        </View>
    );
};
