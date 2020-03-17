import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const SearchScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>SearchScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});
