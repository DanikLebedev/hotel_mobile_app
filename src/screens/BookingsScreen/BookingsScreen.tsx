import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MoreScreenBody } from '../MoreScreen/MoreScreen';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../context/client.context';
import { OrderService } from '../../APIServices/orderService';
import { Customer, OrderCart } from '../../interfaces/clientInterfaces';
import { Loader } from '../../components/Loader/Loader';
import { OrderItem } from '../../components/OrderItem/OrderItem';
import Toast from 'react-native-tiny-toast';
import { ErrorToast, SuccessToast } from '../../components/Toast/Toast';
import { CustomerService } from '../../APIServices/customerService';

export const BookingsScreenBody = ({ navigation }) => {
    const context = useContext(ClientContext);
    const [orders, setOrders] = useState<OrderCart[]>(context.orderHistory);
    const [userEmail, setUserEmail] = useState<string>(
        context.fetchedUserInfo.email,
    );

    const update = useCallback(() => {
        if (context.isAuthenticated) {
            OrderService.getOrdersHistory({
                Authorization: `Bearer ${context.token}`,
            }).then(({ ordercarts }) => {
                setOrders(ordercarts);
            });

            CustomerService.getCustomer({
                Authorization: `Bearer ${context.token}`,
            }).then(customer => setUserEmail(customer.email));
        }
    }, [context.token, context.isAuthenticated]);

    const onDelete = async (id: string) => {
        const filteredOrders = orders.filter(order => {
            return order._id !== id;
        });
        try {
            const data = await OrderService.deleteUserOrder(
                JSON.stringify({ _id: id }),
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${context.token}`,
                },
            );
            setOrders(filteredOrders);
            update();
            Toast.show(data.message, SuccessToast);

        } catch (e) {
            Toast.show('Something went wrong', ErrorToast);
        }
    };

    useEffect(() => {
        update();
        navigation.addListener('focus', () => update());
    }, [update, context.orderHistory, navigation]);

    if (!context.isAuthenticated || !context.orderHistory) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Please log in, to see your orders
                </Text>
            </View>
        );
    }

    const filteredUserOrders = orders.filter(order => {
        return order.userEmail === userEmail && order.status === 'booked';
    });

    return (
        <View style={styles.container}>
            {context.orderHistory[0] ? (
                filteredUserOrders.length ? (
                    <FlatList
                        data={filteredUserOrders}
                        renderItem={({ item }) => {
                            return (
                                <OrderItem
                                    order={item}
                                    key={item._id}
                                    onDelete={onDelete}
                                />
                            );
                        }}
                    />
                ) : (
                    <Text style={styles.title}>There no orders yet</Text>
                )
            ) : (
                <Loader />
            )}
        </View>
    );
};

export const BookingsScreen = () => {
    const BookingStack = createStackNavigator();
    return (
        <BookingStack.Navigator>
            <BookingStack.Screen
                name={'Bookings'}
                component={BookingsScreenBody}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                }}
            />
        </BookingStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
    },
});
