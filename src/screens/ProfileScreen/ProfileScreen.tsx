import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../LoginScreen/LoginScreen';
import { ClientContext } from '../../context/client.context';
import { Button, Input, ListItem } from 'react-native-elements';
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
    const [showEditModal, setShowEditModal] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>({
        approved: false,
        message: '',
        userEmail: context.fetchedUserInfo.email,
        userLastName: context.fetchedUserInfo.lastName,
        userName: context.fetchedUserInfo.name,
    });

    const update = useCallback(() => {
        CustomerService.getCustomer({
            Authorization: `Bearer ${context.token}`,
        }).then(customer => setUserInfo(customer));
    }, [context.token]);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    };

    const toggleShowEditModal = () => {
        setShowEditModal(!showEditModal);
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

    const updateUserInfo = async (): Promise<void> => {
        const data = await CustomerService.updateCustomer(
            JSON.stringify(userInfo),
            {
                Authorization: `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
        );
        update();
        Toast.show(data.message, SuccessToast);
        toggleShowEditModal();
    };

    const menuList = [
        {
            title: 'History',
            icon: 'ios-albums',
            navigate: () => navigation.navigate('History'),
        },
        {
            title: 'Send Feedback',
            icon: 'ios-send',
            navigate: () => toggleShowModal(),
        },
        {
            title: 'Logout',
            icon: 'ios-exit',
            navigate: () => context.logoutUser(),
        },
    ];

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
                {menuList.map((item, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => item.navigate()}
                        >
                            <ListItem
                                title={item.title}
                                containerStyle={{
                                    backgroundColor: '#fff',
                                    borderColor: '#000',
                                }}
                                leftIcon={
                                    <Ionicons name={item.icon} size={26} />
                                }
                                bottomDivider={true}
                                chevron={true}
                            />
                        </TouchableOpacity>
                    );
                })}
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
            <Modal
                isVisible={showEditModal}
                onBackdropPress={toggleShowEditModal}
            >
                <View style={styles.modalBody}>
                    <Text style={styles.modalTitle}>Update info</Text>
                    <Input
                        onChangeText={text =>
                            setUserInfo({ ...userInfo, name: text })
                        }
                        value={userInfo.name}
                        leftIcon={<Ionicons name={'ios-person'} size={26} />}
                        leftIconContainerStyle={{ marginRight: 10 }}
                    />
                    <Input
                        onChangeText={text =>
                            setUserInfo({ ...userInfo, lastName: text })
                        }
                        value={userInfo.lastName}
                        leftIcon={<Ionicons name={'ios-person'} size={26} />}
                        leftIconContainerStyle={{ marginRight: 10 }}
                    />
                    <Input
                        onChangeText={text =>
                            setUserInfo({ ...userInfo, email: text })
                        }
                        value={userInfo.email}
                        leftIcon={<Ionicons name={'ios-mail'} size={26} />}
                        leftIconContainerStyle={{ marginRight: 10 }}
                    />
                    <Button
                        title={'Update info  '}
                        onPress={updateUserInfo}
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

    const headerEditButton = () => {
        return context.isAuthenticated ? (
            <TouchableOpacity onPress={toggleShowEditModal}>
                <Ionicons
                    name={'ios-brush'}
                    style={{ paddingRight: 20 }}
                    size={26}
                    color={'#fff'}
                />
            </TouchableOpacity>
        ) : null;
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
        }).start();
        navigation.setOptions({
            headerRight: headerEditButton,
        });
        update();
    }, [navigation, update]);

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                {context.isAuthenticated ? registerLayout : unregisterLayout}
            </View>
        </ScrollView>
    );
};

export const ProfileScreen = () => {
    const ProfileStack = createStackNavigator();
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name={'Profile'}
                component={ProfileScreenBody}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
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
        backgroundColor: '#fff',
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
        marginTop: 20,
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
        backgroundColor: '#fff',
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
        backgroundColor: '#fff',
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
    updateInfoInput: {
        marginBottom: 10,
    },
    inputStyle: {
        marginLeft: 10,
        color: '#000',
    },
});
