import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { config } from './config';

export default function App() {
    const [category, setCategory] = useState([]);

    const getCategory = async () => {
        const response = await fetch(`${config.API_URL}/api/admin/category`);
        const data = await response.json();
        console.log('button', category);
        setCategory(data);
    };

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Button title={'press me'} onPress={getCategory}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
