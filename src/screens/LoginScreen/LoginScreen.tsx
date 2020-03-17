import * as React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { ChangeEvent, useState } from 'react';
import { config } from '../../../config';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { useAuth } from '../../deviceStorage';

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginUser} = useAuth()


    const loginHandler = async () => {
        const form = { email, password };
        try {
            const response = await fetch(config.API_URL + '/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data)
            await loginUser(data.token, data.userId,  data.status, data.email)
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginWrapper}>
                <View style={{ marginBottom: 20 }}>
                    <Input leftIcon={<Ionicons name="ios-mail" size={26}/>}
                           value={email} keyboardType={'email-address'} onChangeText={text => setEmail(text)}
                           placeholder={'email'}/>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Input leftIcon={<Ionicons name="ios-lock" size={26}/>} value={password}
                           onChangeText={text => setPassword(text)} placeholder={'password'}/>
                </View>

                <Button type={'outline'} raised title={'Login'} onPress={loginHandler}/>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    loginWrapper: {
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1
    }
});
