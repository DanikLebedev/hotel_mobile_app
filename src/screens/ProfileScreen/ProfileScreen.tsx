import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../LoginScreen/LoginScreen';

const ProfileScreenBody = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>ProfileScreen</Text>
            <Button
                title={'login'}
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
};

export const ProfileScreen = () => {
    const ProfileStack = createStackNavigator();
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name={'Profile'}
                component={ProfileScreenBody}
            />
            <ProfileStack.Screen name={'Login'} component={LoginScreen} />
        </ProfileStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});
