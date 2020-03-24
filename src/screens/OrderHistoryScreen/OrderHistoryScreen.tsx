import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Text,
    RefreshControl,
} from 'react-native';
import { OrderCart } from '../../interfaces/clientInterfaces';
import { ClientContext } from '../../context/client.context';
import { OrderService } from '../../APIServices/orderService';
import { OrderHistoryItem } from '../../components/OrderHistoryItem/OrderHistoryItem';

export const OrderHistoryScreen = ({ navigation }) => {
    const context = useContext(ClientContext);
    const [orderHistory, setOrderHistory] = useState<OrderCart[]>(
        context.orderHistory,
    );
    const [refreshing, setRefreshing] = useState(false);

    const update = useCallback(() => {
        setRefreshing(true);
        OrderService.getOrdersHistory({
            Authorization: `Bearer ${context.token}`,
        }).then(({ ordercarts }) => {
            setRefreshing(false);
            setOrderHistory(ordercarts);
        });
    }, [context.token]);

    useEffect(() => {
        navigation.addListener('focus', () => update());
    }, [update, context.orderHistory]);

    return (
        <View>
            {orderHistory.length ? (
                <FlatList
                    removeClippedSubviews={true}
                    initialNumToRender={10}
                    data={orderHistory.reverse()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={update}
                        />
                    }
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
