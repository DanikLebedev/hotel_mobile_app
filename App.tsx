import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Navigation } from './src/components/Navigation/Navigation';
import { useAuth } from './src/deviceStorage';
import { ClientContext } from './src/context/client.context';

export default function App() {
    const {
        loginUser,
        logoutUser,
        token,
        userId,
        userEmail,
        userStatus,
    } = useAuth();
    const isAuthenticated = !!token;

    return (
        <ClientContext.Provider
            value={{
                token,
                loginUser,
                logoutUser,
                userId,
                userEmail,
                userStatus,
                isAuthenticated,
            }}
        >
            <StatusBar barStyle={'light-content'} />
            <Navigation />
        </ClientContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cdcdcd',
    },
});
