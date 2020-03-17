import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../LoginScreen/LoginScreen';
import {  useAuth } from '../../deviceStorage';

const HomeScreenBody = ({ navigation }) => {
    const {token, loginUser, logoutUser, userId} = useAuth()
    const isAuthenticated = !!token

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>HomeScreen</Text>
            {isAuthenticated ? <Text>user logged in</Text>: null}
        </View>
    );
};

const LogoTitle = props => {
    return <Text>Rixos <Text style={{fontWeight: 'bold', color: "#c6a47e"}}>Hotel</Text></Text>
};

export const HomeScreen = () => {
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name={'Home'}
                component={HomeScreenBody}
                options={{ headerTitle: props => <LogoTitle {...props} /> }}
            />
            <HomeStack.Screen name={'Login'} component={LoginScreen} />
        </HomeStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});
