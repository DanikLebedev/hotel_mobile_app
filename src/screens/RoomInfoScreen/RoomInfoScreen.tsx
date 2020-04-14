import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigationState, StackActions } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../context/client.context';
import { config } from '../../../config';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import { Data, Order, OrderCart } from '../../interfaces/clientInterfaces';
import Toast from 'react-native-tiny-toast';
import { ErrorToast, SuccessToast } from '../../components/Toast/Toast';
import { OrderService } from '../../APIServices/orderService';

const DismissKeyboard = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
};

export const RoomInfoScreen = ({ navigation }) => {
    const context = useContext(ClientContext);
    const [roomId, setRoomId] = useState<string>('');
    const [order, setOrder] = useState<OrderCart>({
        category: '',
        checkIn: '',
        checkOut: '',
        comment: '',
        guests: 1,
        price: 0,
        userEmail: context.fetchedUserInfo.email,
        title: '',
        status: 'booked',
        userId: '',
    });
    const navigationState = useNavigationState(state => state.routes);

    const checkParams = () => {
        const paramObj = navigationState.filter(({ params }) => {
            return params !== undefined ? params['roomId'] : params;
        });
        setRoomId(paramObj[0].params['roomId']);
    };

    const roomInfo = useContext(ClientContext).fetchedAllRooms.filter(room => {
        return room._id === roomId;
    });

    const addOrderHandler = async (): Promise<void> => {
        if (order.checkIn > order.checkOut) {
            Toast.show('Incorrect Date, please try again', ErrorToast);
            return;
        }
        const data: Data = await OrderService.postOrder(
            { ...order },
            {
                Authorization: `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
        );
        order.checkIn = '';
        order.checkOut = '';
        order.guests = 1;
        order.comment = '';
        if (!data.ordercarts) {
            Toast.show(data.message, ErrorToast);
        } else {
            StackActions.popToTop();
            navigation.jumpTo('Bookings');
            Toast.showSuccess(data.message, SuccessToast);
        }
        if (!context.isAuthenticated) {
            Toast.showSuccess('Need to authorize', SuccessToast);
        }
    };

    const checkInPicker = (
        <DatePicker
            style={{ width: 300 }}
            date={order.checkIn}
            mode="date"
            placeholder="Check In"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                },
                dateInput: {
                    marginLeft: 36,
                    borderRadius: 20,
                },
                dateText: {
                    color: '#000',
                    justifyContent: 'flex-start',
                },
                datePicker: {
                    backgroundColor: '#000',
                },
            }}
            onDateChange={date =>
                setOrder({
                    ...order,
                    checkIn: date,
                    category: roomInfo[0].category,
                    price: roomInfo[0].price,
                    title: roomInfo[0].title,
                })
            }
        />
    );

    const checkOutPicker = (
        <DatePicker
            style={{ width: 300 }}
            date={order.checkOut}
            mode="date"
            placeholder="Check Out"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                },
                dateInput: {
                    marginLeft: 36,
                    borderRadius: 20,
                },
                dateText: {
                    color: '#000',
                    justifyContent: 'flex-start',
                },
                datePicker: {
                    backgroundColor: '#000',
                },
            }}
            onDateChange={date => setOrder({ ...order, checkOut: date })}
        />
    );

    useEffect(() => {
        checkParams();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <DismissKeyboard>
                <ScrollView>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={styles.wrapper}
                        scrollEnabled={false}
                    >
                        <View style={styles.imageWrapper}>
                            <ImageBackground
                                style={styles.image}
                                source={
                                    roomInfo[0]
                                        ? {
                                              uri:
                                                  config.API_URL +
                                                  '/static/' +
                                                  roomInfo[0].image,
                                          }
                                        : null
                                }
                            >
                                <Text style={styles.roomTitle}>
                                    {roomInfo[0] ? roomInfo[0].title : null}
                                </Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.roomCardWrapper}>
                            <View style={styles.featuresWrapper}>
                                <View style={styles.featuresItem}>
                                    <Ionicons
                                        name={'ios-pizza'}
                                        color={'#000'}
                                        size={20}
                                    />
                                    <Text style={styles.featuresItemText}>
                                        Food:{' '}
                                        {roomInfo[0] ? roomInfo[0].food : null}
                                    </Text>
                                </View>
                                <View style={styles.featuresItem}>
                                    <Ionicons
                                        name={'ios-bed'}
                                        color={'#000'}
                                        size={20}
                                    />
                                    <Text style={styles.featuresItemText}>
                                        Beds:{' '}
                                        {roomInfo[0] ? roomInfo[0].beds : null}
                                    </Text>
                                </View>
                                <View style={styles.featuresItem}>
                                    <Ionicons
                                        name={'ios-cash'}
                                        color={'#000'}
                                        size={20}
                                    />
                                    <Text style={styles.featuresItemText}>
                                        Price:{' '}
                                        {roomInfo[0] ? roomInfo[0].price : null}
                                        $
                                    </Text>
                                </View>
                                <View style={styles.featuresItem}>
                                    <Ionicons
                                        name={'ios-person'}
                                        color={'#000'}
                                        size={20}
                                    />
                                    <Text style={styles.featuresItemText}>
                                        Guests:{' '}
                                        {roomInfo[0]
                                            ? roomInfo[0].guests
                                            : null}
                                    </Text>
                                </View>
                                <View style={styles.featuresItem}>
                                    <Ionicons
                                        name={'ios-pricetag'}
                                        color={'#000'}
                                        size={20}
                                    />
                                    <Text style={styles.featuresItemText}>
                                        Rooms:{' '}
                                        {roomInfo[0] ? roomInfo[0].rooms : null}
                                    </Text>
                                </View>
                                <View style={styles.featuresItem}>
                                    <Ionicons
                                        name={'ios-business'}
                                        color={'#000'}
                                        size={20}
                                    />
                                    <Text style={styles.featuresItemText}>
                                        Area:{' '}
                                        {roomInfo[0] ? roomInfo[0].area : null}{' '}
                                        m2
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.descriptionWrapper}>
                                <Text style={styles.descriptionTitle}>
                                    Description
                                </Text>
                                <Text>
                                    {roomInfo[0]
                                        ? roomInfo[0].description
                                        : null}
                                </Text>
                            </View>
                            <View style={styles.bookForm}>
                                <Text style={styles.bookFormTitle}>
                                    Make your reservation
                                </Text>
                                <View style={styles.bookFormItem}>
                                    {checkInPicker}
                                </View>
                                <View style={styles.bookFormItem}>
                                    {checkOutPicker}
                                </View>
                                <View style={styles.bookFormItem}>
                                    <View style={styles.bookFormInputWrapper}>
                                        <Ionicons
                                            name={'ios-person'}
                                            size={26}
                                            color={'#000'}
                                        />
                                        <TextInput
                                            style={styles.bookFormInput}
                                            placeholder={'Guests'}
                                            keyboardType={'number-pad'}
                                            value={String(order.guests)}
                                            onChangeText={text =>
                                                setOrder({
                                                    ...order,
                                                    guests: Number(text),
                                                })
                                            }
                                        />
                                    </View>
                                </View>
                                <View style={styles.bookFormItem}>
                                    <View style={styles.bookFormInputWrapper}>
                                        <Ionicons
                                            name={'ios-clipboard'}
                                            size={26}
                                            color={'#000'}
                                        />
                                        <TextInput
                                            style={styles.bookFormInput}
                                            placeholder={'Comment'}
                                            value={order.comment}
                                            onChangeText={text =>
                                                setOrder({
                                                    ...order,
                                                    comment: text,
                                                })
                                            }
                                        />
                                    </View>
                                </View>
                                <View style={styles.bookFormInputWrapper}>
                                    <Ionicons
                                        name={'ios-send'}
                                        size={26}
                                        color={'#000'}
                                    />
                                    <TouchableOpacity
                                        style={styles.bookFormButton}
                                        onPress={addOrderHandler}
                                    >
                                        <Text style={styles.bookFormButtonText}>
                                            Book Room
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </DismissKeyboard>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        flex: 3,
    },
    image: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    roomCardWrapper: {
        flex: 1,
        padding: 20,
    },
    roomTitle: {
        fontSize: 20,
        color: '#fff',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: '#000',
        padding: 10,
        fontWeight: 'bold',
    },
    featuresWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 10,
    },
    featuresItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    featuresItemText: {
        fontSize: 15,
        marginLeft: 15,
    },
    descriptionWrapper: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-start',
    },
    descriptionTitle: {
        textAlign: 'center',
        fontSize: 18,
    },
    bookForm: {
        flex: 1,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        marginVertical: 20,
        elevation: 5,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    bookFormTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    bookFormItem: {
        marginBottom: 20,
        width: 300,
    },
    bookFormInput: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 20,
        padding: 11,
        width: 263,
        marginLeft: 15,
        textAlign: 'center',
    },
    bookFormInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 3,
    },
    bookFormButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 11,
        borderWidth: 1,
        borderRadius: 20,
        width: 265,
        marginLeft: 15,
        backgroundColor: '#000',
    },
    bookFormButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 15,
        width: 200,
        textAlign: 'center',
    },
});
