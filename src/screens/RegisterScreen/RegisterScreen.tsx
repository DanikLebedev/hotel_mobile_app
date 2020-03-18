import * as React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { ChangeEvent, useContext, useState } from 'react';
import { config } from '../../../config';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { useAuth } from '../../deviceStorage';
import { useNavigation } from '@react-navigation/native';
import { ClientContext } from '../../context/client.context';

export const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const context = useContext(ClientContext);
    const navigation = useNavigation();

    const registerHandler = async () => {
        const form = { email, password, name, lastName };
        try {
            const response = await fetch(config.API_URL + '/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            await context.loginUser(
                data.token,
                data.userId,
                data.status,
                data.email,
            );
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginWrapper}>
                <View style={styles.inputWrapper}>
                    <Input
                        leftIcon={<Ionicons name="ios-mail" size={26} />}
                        value={email}
                        keyboardType={'email-address'}
                        textContentType="emailAddress"
                        onChangeText={text => setEmail(text)}
                        placeholder={'email'}
                        inputStyle={styles.inputStyle}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        leftIcon={<Ionicons name="ios-lock" size={26} />}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder={'password'}
                        textContentType={'password'}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        leftIcon={<Ionicons name="ios-person" size={26} />}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder={'first name'}
                        inputStyle={styles.inputStyle}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        leftIcon={<Ionicons name="ios-person" size={26} />}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder={'last name'}
                        inputStyle={styles.inputStyle}
                    />
                </View>
                <Button
                    iconRight
                    icon={
                        <Ionicons
                            name={'ios-log-in'}
                            color={'#fff'}
                            size={26}
                        />
                    }
                    raised
                    title={'Register  '}
                    onPress={registerHandler}
                    buttonStyle={styles.unregisterButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    loginWrapper: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    inputWrapper: {
        marginBottom: 20,
        width: '100%',
    },
    inputStyle: {
        marginLeft: 10,
    },
    unregisterButton: {
        width: 200,
        backgroundColor: '#000',
    },
});
