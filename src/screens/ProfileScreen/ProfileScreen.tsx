import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../LoginScreen/LoginScreen';
import { ClientContext } from '../../context/client.context';
import { Button } from 'react-native-elements';
import { RegisterScreen } from '../RegisterScreen/RegisterScreen';
import { Ionicons } from '@expo/vector-icons';
import { Customer, Feedback } from '../../interfaces/clientInterfaces';
import { CustomerService } from '../../APIServices/customerService';
import { OrderHistoryScreen } from '../OrderHistoryScreen/OrderHistoryScreen';
import Modal from 'react-native-modal';
import { FeedbackService } from '../../APIServices/feedbackService';
import Toast from 'react-native-tiny-toast';
import { SuccessToast } from '../../components/Toast/Toast';

const ProfileScreenBody = ({ navigation }) => {
    const context = useContext(ClientContext);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [userInfo, setUserInfo] = useState<Customer>(context.fetchedUserInfo);
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>({
        approved: false,
        message: '',
        userEmail: context.fetchedUserInfo.email,
        userLastName: context.fetchedUserInfo.lastName,
        userName: context.fetchedUserInfo.name,
    });

    const toggleShowModal = () => {
        setShowModal(!showModal);
    };

    const addFeedbackHandler = async (): Promise<void> => {
        const data = await FeedbackService.postFeedback(
            { ...feedback },
            {
                Authorization: `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
        );
        Toast.show(data.message, SuccessToast);
        toggleShowModal();
    };

    const registerLayout = (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Ionicons
                        style={styles.avatar}
                        name={'ios-person'}
                        size={160}
                    />
                    <Text style={styles.name}>
                        {userInfo.name} {userInfo.lastName}
                    </Text>
                    <Text style={styles.userInfo}>{userInfo.email}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.infoContent}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('History')}
                        >
                            <Text style={styles.info}>
                                <Ionicons
                                    name={'ios-albums'}
                                    size={26}
                                    color={'#fff'}
                                />{' '}
                                History
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.infoContent}>
                        <TouchableOpacity onPress={toggleShowModal}>
                            <Text style={styles.info}>
                                <Ionicons
                                    name={'ios-send'}
                                    size={26}
                                    color={'#fff'}
                                />{' '}
                                Send Feedback
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.infoContent}>
                        <TouchableOpacity onPress={() => context.logoutUser()}>
                            <Text style={styles.info}>
                                {' '}
                                <Ionicons
                                    name={'ios-exit'}
                                    size={26}
                                    color={'#fff'}
                                />{' '}
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal isVisible={showModal} onBackdropPress={toggleShowModal}>
                <View style={styles.modalBody}>
                    <Text style={styles.modalTitle}>Leave feedback</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.feedbackInput}
                        placeholder={'your feedback...'}
                        placeholderTextColor={'#cdcdcd'}
                        onChangeText={text =>
                            setFeedback({ ...feedback, message: text })
                        }
                    />
                    <Button
                        title={'Send Feedback  '}
                        onPress={addFeedbackHandler}
                        buttonStyle={styles.unregisterButton}
                        iconRight={true}
                        icon={
                            <Ionicons
                                name={'ios-send'}
                                color={'#fff'}
                                size={26}
                            />
                        }
                    />
                </View>
            </Modal>
        </View>
    );

    const unregisterLayout = (
        <View style={styles.unregisterWrapper}>
            <Animated.View
                style={{ ...styles.unregisterItem, opacity: fadeAnim }}
            >
                <Text style={styles.unregisterText}>Go to login page</Text>
                <Button
                    buttonStyle={styles.unregisterButton}
                    title={'Login'}
                    onPress={() => navigation.navigate('Login')}
                />
            </Animated.View>
            <Animated.View
                style={{ ...styles.unregisterItem, opacity: fadeAnim }}
            >
                <Text style={styles.unregisterText}>
                    Don't have an account?
                </Text>
                <Button
                    title={'Register'}
                    onPress={() => navigation.navigate('Register')}
                    buttonStyle={styles.unregisterButton}
                />
            </Animated.View>
        </View>
    );

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
        }).start();
        CustomerService.getCustomer({
            Authorization: `Bearer ${context.token}`,
        }).then(customer => setUserInfo(customer));
    }, [context.token]);

    return (
        <View style={styles.container}>
            {context.isAuthenticated ? registerLayout : unregisterLayout}
        </View>
    );
};

export const ProfileScreen = () => {
    const ProfileStack = createStackNavigator();
    const context = useContext(ClientContext);

    const headerEditButton = () => {
        return context.isAuthenticated ? (
            <TouchableOpacity>
                <Ionicons
                    name={'ios-brush'}
                    style={{ paddingRight: 20 }}
                    size={26}
                    color={'#fff'}
                />
            </TouchableOpacity>
        ) : null;
    };

    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name={'Profile'}
                component={ProfileScreenBody}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerRight: headerEditButton,
                }}
            />
            <ProfileStack.Screen
                name={'Login'}
                component={LoginScreen}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
            <ProfileStack.Screen
                name={'Register'}
                component={RegisterScreen}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
            <ProfileStack.Screen
                name={'History'}
                component={OrderHistoryScreen}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
        </ProfileStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    feedbackInput: {
        padding: 30,
        borderWidth: 1,
        borderColor: '#cdcdcd',
        width: '100%',
        height: 150,
        marginVertical: 20,
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: 18,
    },
    unregisterWrapper: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-around',
        textAlign: 'center',
        flexDirection: 'column',
        backgroundColor: '#cdcdcd'
    },
    unregisterItem: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
    unregisterText: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 20,
    },
    unregisterButton: {
        width: 200,
        backgroundColor: '#000',
    },
    registerWrapper: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-around',
        textAlign: 'center',
        flexDirection: 'column',
    },
    userInfoWrapper: {
        backgroundColor: '#000',
        padding: 20,
    },
    userInfoText: {
        color: '#fff',
    },
    header: {
        backgroundColor: '#DCDCDC',
        paddingTop: 150,
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        marginBottom: 10,
        textAlign: 'center',
    },
    name: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: '#778899',
        fontWeight: '600',
    },
    body: {
        backgroundColor: '#000',
        height: 500,
        alignItems: 'center',
        paddingLeft: 40,
    },
    item: {
        flexDirection: 'row',
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: '#FFFFFF',
    },
});
