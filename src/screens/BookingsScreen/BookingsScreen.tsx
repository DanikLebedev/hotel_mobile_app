import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MoreScreenBody } from '../MoreScreen/MoreScreen';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../context/client.context';
import { OrderService } from '../../APIServices/orderService';
import { OrderCart } from '../../interfaces/clientInterfaces';
import { Loader } from '../../components/Loader/Loader';
import { OrderItem } from '../../components/OrderItem/OrderItem';
import Toast from 'react-native-tiny-toast';
import { ErrorToast, SuccessToast } from '../../components/Toast/Toast';


export const BookingsScreenBody = () => {
    const context = useContext(ClientContext);
    const [orders, setOrders] = useState<OrderCart[]>(context.orderHistory);

    const update = useCallback(() => {
        OrderService.getOrdersHistory({
            Authorization: `Bearer ${context.token}`,
        }).then(({ ordercarts }) => setOrders(ordercarts));
    }, [context.token]);

    const filteredUserOrders = () => {
        if (orders) {
            return orders.filter(order => {
                return (
                    order.userEmail === context.fetchedUserInfo.email && order.status === 'booked'
                );
            });
        }
    }
    const onDelete =  async (id: string) => {
        const filteredOrders = orders.filter(order => {
            return order._id !== id
        })
        setOrders(filteredOrders)
        try {
            const data = await OrderService.deleteUserOrder(JSON.stringify({ _id: id }), {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            });
            update();
            Toast.show(data.message, SuccessToast);
        } catch (e) {
            Toast.show('Something went wrong', ErrorToast);
        }
    }

    useEffect(() => {
        update();
    }, [update, context.orderHistory]);

    if(!context.orderHistory) {
        return <Loader/>
    }


    return (
        <View style={styles.container}>
            {context.token? filteredUserOrders().length ? (  <FlatList
                data={filteredUserOrders()}
                renderItem={({item}) => {
                    return (
                        context.orderHistory[0] ?  ( <OrderItem order={item} key={item._id} onDelete={onDelete}/>) : <Loader/>
                    )
                }

                }
            />): (<Text>There no orders yet</Text>):<Text>Please log in, to see your orders</Text>}

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
});
