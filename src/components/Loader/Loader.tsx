import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={'#000'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
