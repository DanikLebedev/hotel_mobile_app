import * as React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ChangeEvent, useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { ClientContext } from '../../context/client.context';
import { UserData } from '../../interfaces/clientInterfaces';
import { AuthService } from '../../APIServices/authService';
import Toast from 'react-native-tiny-toast';
import { SuccessToast } from '../../components/Toast/Toast';
import { Loader } from '../../components/Loader/Loader';

const DismissKeyboard = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
};

export const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const context = useContext(ClientContext);

    const registerHandler = async () => {
        const form = { email, password, name, lastName };
        try {
            setLoading(true);
            const data: UserData = await AuthService.registerUser(form, {
                'Content-Type': 'application/json',
            });
            const loginData: UserData = await AuthService.loginUser(form, {
                'Content-Type': 'application/json',
            });
            setLoading(false);
            Toast.showSuccess(data.message, SuccessToast);
            context.loginUser(
                loginData.token,
                loginData.userId,
                loginData.status,
                loginData.email,
            );
            navigation.popToTop();
        } catch (e) {
            console.log(e);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
      <DismissKeyboard>
        <View style={styles.container}>
            <View style={styles.loginWrapper}>
                <View style={styles.inputWrapper}>
                    <Input
                        leftIcon={<Ionicons name="ios-mail" size={26} />}
                        value={email}
                        keyboardType={'email-address'}
                        textContentType="emailAddress"
                        onChangeText={text => setEmail(text)}
                        placeholderTextColor={'#fff'}
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
                        placeholderTextColor={'#fff'}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        leftIcon={<Ionicons name="ios-person" size={26} />}
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder={'first name'}
                        placeholderTextColor={'#fff'}
                        inputStyle={styles.inputStyle}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        leftIcon={<Ionicons name="ios-person" size={26} />}
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                        placeholder={'last name'}
                        placeholderTextColor={'#fff'}
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
      </DismissKeyboard>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#cdcdcd',
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
