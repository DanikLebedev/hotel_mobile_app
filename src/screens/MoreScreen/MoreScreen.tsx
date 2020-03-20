import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

export const MoreScreenBody = () => {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>MoreScreen</Text>
        </View>
    );
};

export const MoreScreen = () => {
    const MoreStack = createStackNavigator();
    return (
        <MoreStack.Navigator>
            <MoreStack.Screen
                name={'More'}
                component={MoreScreenBody}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                }}
            />
        </MoreStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});