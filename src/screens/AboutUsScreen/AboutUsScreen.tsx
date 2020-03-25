import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const AboutUsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>About Us</Text>
            <View style={styles.descriptionWrapper}>
                <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Adipisci dignissimos ex, ipsa maiores porro qui rerum totam.
                    Dolorem doloremque exercitationem, magnam quisquam sunt
                    tempore! A atque iusto molestias nostrum voluptatem.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20
    },
    mainTitle: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    },
    descriptionWrapper: {
        flex: 1,
        marginHorizontal: 20
    },
    descriptionText: {
        fontSize: 18,
    }
});
