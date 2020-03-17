import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Navigation } from './src/components/Navigation/Navigation';
import { useAuth } from './src/deviceStorage';

export default function App() {
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Navigation />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cdcdcd',
    },
    nav: {
        backgroundColor: '#000',
    },
});
