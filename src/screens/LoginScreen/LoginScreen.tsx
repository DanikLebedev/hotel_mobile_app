import * as React from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { useNavigation, StackActions } from '@react-navigation/native';
import { ClientContext } from '../../context/client.context';
import { Loader } from '../../components/Loader/Loader';
import { AuthService } from '../../APIServices/authService';
import Toast from 'react-native-tiny-toast';
import { ErrorToast, SuccessToast } from '../../components/Toast/Toast';
import { useForm } from 'react-hook-form';
import { Data } from '../../interfaces/clientInterfaces';

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
    const { register, setValue, handleSubmit, errors } = useForm();
    const [isReset, setIsReset] = useState(false);
    const [validateError, setValidateError] = useState({
        email: false,
        password: false,
    });
    const [resetEmail, setResetEmail] = useState('');

    const loginHandler = async () => {
        const form = { email, password };
        if (email === '' && password === '') {
            setValidateError({ ...validateError, email: true, password: true });
        } else if (password === '') {
            setValidateError({
                ...validateError,
                password: true,
                email: false,
            });
        } else if (email === '') {
            setValidateError({
                ...validateError,
                email: true,
                password: false,
            });
        } else {
            try {
                setLoading(true);
                const data = await AuthService.loginUser(form, {
                    'Content-Type': 'application/json',
                });
                setLoading(false);
                if (!data.token) {
                    Toast.show(data.message, ErrorToast);
                } else {
                    setValidateError({
                        ...validateError,
                        email: false,
                        password: false,
                    });
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
        }
    };

    const resetPasswordHandler = async () => {
        if (email === '') {
            setValidateError({
                ...validateError,
                email: true,
                password: false,
            });
        } else {
            try {
                setLoading(true);
                const response = await fetch('/api/client/reset', {
                    method: 'POST',
                    body: JSON.stringify(resetEmail),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data: Data = await response.json();
                setIsReset(false);
                Toast.show(data.message, SuccessToast);
            } catch (e) {
                console.log(e.message);
                Toast.show('Something went wrong', ErrorToast);
            }
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (isReset) {
        return (
            <View style={styles.backgroundImage}>
                <Text style={styles.title}>Reset Password</Text>
                <DismissKeyboard>
                    <View style={styles.container}>
                        <View style={styles.loginWrapper}>
                            <View style={styles.inputWrapper}>
                                <Input
                                    errorMessage={
                                        validateError.email
                                            ? 'This is required'
                                            : ''
                                    }
                                    leftIcon={
                                        <Ionicons
                                            name="ios-mail"
                                            color={'#000'}
                                            size={26}
                                        />
                                    }
                                    value={resetEmail}
                                    keyboardType={'email-address'}
                                    textContentType="emailAddress"
                                    placeholderTextColor={'#cdcdcd'}
                                    onChangeText={text => setResetEmail(text)}
                                    placeholder={'email'}
                                    inputStyle={styles.inputStyle}
                                />
                            </View>
                            <TouchableOpacity onPress={() => setIsReset(false)}>
                                <Text style={styles.forgotText}>Go Back</Text>
                            </TouchableOpacity>
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
                                title={'Reset  '}
                                titleStyle={{ color: '#fff' }}
                                onPress={resetPasswordHandler}
                                buttonStyle={styles.unregisterButton}
                            />
                        </View>
                    </View>
                </DismissKeyboard>
            </View>
        );
    }

    return (
        <View style={styles.backgroundImage}>
            <DismissKeyboard>
                <View style={styles.container}>
                    <View style={styles.loginWrapper}>
                        <View style={styles.inputWrapper}>
                            <Input
                                errorMessage={
                                    validateError.email
                                        ? 'This is required'
                                        : ''
                                }
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
                                errorMessage={
                                    validateError.password
                                        ? 'This is required'
                                        : ''
                                }
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
                        <TouchableOpacity onPress={() => setIsReset(true)}>
                            <Text style={styles.forgotText}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
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
    title: {
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 30,
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
    forgotText: {
        marginBottom: 20,
        fontSize: 15,
        padding: 10,
        color: '#1da1f2',
    },
});
