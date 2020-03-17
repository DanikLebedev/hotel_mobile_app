import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const MoreScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>MoreScreen</Text>
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
