import * as React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { ChangeEvent, useContext, useState } from 'react';
import { config } from '../../../config';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { useNavigation, StackActions } from '@react-navigation/native';
import { ClientContext } from '../../context/client.context';
import { Loader } from '../../components/Loader/Loader';
import { AuthService } from '../../APIServices/authService';
import Toast from 'react-native-tiny-toast';
import { ErrorToast } from '../../components/Toast/Toast';

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(ClientContext);
    const [loading, setLoading] = useState(false);

    const loginHandler = async () => {
        const form = { email, password };
        try {
            setLoading(true);
            const data = await AuthService.loginUser(form, {
                'Content-Type': 'application/json',
            });
            setLoading(false);
            if (!data.token) {
                Toast.show(data.message, ErrorToast);
            } else {
                await context.loginUser(
                    data.token,
                    data.userId,
                    data.status,
                    data.email,
                );
                navigation.dispatch(StackActions.popToTop());
            }
        } catch (e) {
            console.log(e.message);
            Toast.show('Something went wrong', ErrorToast);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <ImageBackground
            blurRadius={5}
            source={require('../../../assets/loginScreen.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.loginWrapper}>
                    <View style={styles.inputWrapper}>
                        <Input
                            leftIcon={
                                <Ionicons
                                    name="ios-mail"
                                    color={'#fff'}
                                    size={26}
                                />
                            }
                            value={email}
                            keyboardType={'email-address'}
                            textContentType="emailAddress"
                            placeholderTextColor={'#fff'}
                            onChangeText={text => setEmail(text)}
                            placeholder={'email'}
                            inputStyle={styles.inputStyle}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Input
                            leftIcon={
                                <Ionicons
                                    name="ios-lock"
                                    color={'#fff'}
                                    size={26}
                                />
                            }
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder={'password'}
                            placeholderTextColor={'#fff'}
                            textContentType={'password'}
                            inputStyle={styles.inputStyle}
                            secureTextEntry={true}
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
                        title={'Login  '}
                        onPress={loginHandler}
                        buttonStyle={styles.unregisterButton}
                    />
                </View>
            </View>
        </ImageBackground>
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
        color: '#fff',
    },
    unregisterButton: {
        width: 200,
        backgroundColor: '#000',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
});
