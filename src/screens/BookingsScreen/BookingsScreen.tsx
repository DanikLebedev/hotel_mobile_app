import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MoreScreenBody } from '../MoreScreen/MoreScreen';

export const BookingsScreenBody = () => {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>Orders Screen</Text>
        </View>
    );
};

export const BookingsScreen = () => {
    const BookingStack = createStackNavigator();
    return (
        <BookingStack.Navigator>
            <BookingStack.Screen
                name={'Search'}
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
