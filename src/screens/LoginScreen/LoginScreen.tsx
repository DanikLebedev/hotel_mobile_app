import * as React from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { useNavigation, StackActions } from '@react-navigation/native';
import { ClientContext } from '../../context/client.context';
import { Loader } from '../../components/Loader/Loader';
import { AuthService } from '../../APIServices/authService';
import Toast from 'react-native-tiny-toast';
import { ErrorToast } from '../../components/Toast/Toast';
import CachedImage from 'react-native-expo-cached-image';

const DismissKeyboard = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
};

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
        <View style={styles.backgroundImage}>
            <DismissKeyboard>
                <View style={styles.container}>
                    <View style={styles.loginWrapper}>
                        <View style={styles.inputWrapper}>
                            <Input
                                leftIcon={
                                    <Ionicons
                                        name="ios-mail"
                                        color={'#000'}
                                        size={26}
                                    />
                                }
                                value={email}
                                keyboardType={'email-address'}
                                textContentType="emailAddress"
                                placeholderTextColor={'#cdcdcd'}
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
                                        color={'#000'}
                                        size={26}
                                    />
                                }
                                value={password}
                                onChangeText={text => setPassword(text)}
                                placeholder={'password'}
                                placeholderTextColor={'#cdcdcd'}
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
                            titleStyle={{ color: '#fff' }}
                            onPress={loginHandler}
                            buttonStyle={styles.unregisterButton}
                        />
                    </View>
                </View>
            </DismissKeyboard>
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
        color: '#000',
    },
    unregisterButton: {
        width: 200,
        backgroundColor: '#000',
    },
    backgroundImage: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
