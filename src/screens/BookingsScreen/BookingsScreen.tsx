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
    const SearchStack = createStackNavigator();
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
                name={'Search'}
                component={BookingsScreenBody}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                }}
            />
        </SearchStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});
