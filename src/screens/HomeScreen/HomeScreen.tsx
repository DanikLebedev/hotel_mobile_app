import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClientContext } from '../../context/client.context';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { OrderService } from '../../APIServices/orderService';
import {
    OrderCarts,
    OrderCart,
    Category,
} from '../../interfaces/clientInterfaces';
import { SearchResultsScreen } from '../SearchResultsScreen/SearchResultScreen';
import { RoomInfoScreen } from '../RoomInfoScreen/RoomInfoScreen';
import { ImageCarousel } from '../../components/Carousel/Carousel';
import Toast from 'react-native-tiny-toast';
import { ErrorToast } from '../../components/Toast/Toast';
import { Loader } from '../../components/Loader/Loader';
import { CategoryService } from '../../APIServices/categoryService';
import { ArticleInfoScreen } from '../ArticleInfoScreen/ArticleInfoScreen';

const HomeScreenBody = ({ navigation }) => {
    const context = useContext(ClientContext);
    const fetchedCategories = context.fetchedAllCategories;
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>(fetchedCategories);
    const [selectData, setSelectData] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | number>(
        '',
    );

    const findRoomHandler = async () => {
        if (!checkIn || !checkOut || !selectedCategory) {
            Toast.show('Incorrect Data', ErrorToast);
        }
        if (context.isAuthenticated) {
            setLoading(true);
            const {
                ordercarts,
            }: OrderCarts = await OrderService.getAllOrders();
            const bookedOrders: OrderCart[] = ordercarts.filter(order => {
                return (
                    order.category === selectedCategory &&
                    Date.parse(order.checkOut) > Date.parse(checkIn) &&
                    order.status === 'booked'
                );
            });
            const filteredByCategoryOrders: OrderCart[] = ordercarts.filter(
                order => {
                    return order.category === selectedCategory;
                },
            );
            if (bookedOrders.length !== 0) {
                setLoading(false);
                Toast.show('sorry all rooms booked');
                return;
            } else {
                setLoading(false);
                navigation.navigate('SearchResults', {
                    category: filteredByCategoryOrders[0].category,
                });
            }
        } else {
            setCheckIn('');
            setCheckOut('');
            setSelectedCategory('');
            setLoading(false);
            navigation.navigate('Login');
        }
    };

    const checkInPicker = (
        <DatePicker
            style={{ width: 300 }}
            date={checkIn}
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
            onDateChange={date => setCheckIn(date)}
        />
    );

    const checkOutPicker = (
        <DatePicker
            style={{ width: 300 }}
            date={checkOut}
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
            onDateChange={date => setCheckOut(date)}
        />
    );

    useEffect(() => {
        CategoryService.getAllCategories().then(({ categories }) => {
            setCategories(categories);
        });
        if (categories) {
            const selectItems: Category[] = categories.map(category => {
                category['label'] = category.title;
                category['color'] = '#fff';
                category['value'] = category.title;
                delete category._id;
                delete category['__v'];
                return category;
            });
            setSelectData(selectItems);
        }
    }, [fetchedCategories]);

    if (loading || !categories) {
        return <Loader />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.findRoomForm}>
                    <View style={styles.mainTitleWrapper}>
                        <Text style={styles.mainTitleText}>Find your room</Text>
                    </View>
                    <View style={styles.searchFormWrapper}>
                        <View style={styles.searchFormItem}>
                            {checkInPicker}
                        </View>
                        <View style={styles.searchFormItem}>
                            {checkOutPicker}
                        </View>
                        <View style={styles.searchFormItem}>
                            <View style={styles.SearchFormSelectWrapper}>
                                <Ionicons name={'ios-list'} size={26} />
                                <View style={styles.SearchFormSelect}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Choose category',
                                            color: '#fff',
                                        }}
                                        onValueChange={value =>
                                            setSelectedCategory(value)
                                        }
                                        style={{
                                            placeholder: {
                                                textAlign: 'center',
                                            },
                                            modalViewTop: {
                                                backgroundColor: '#00000077',
                                            },
                                            modalViewBottom: {
                                                backgroundColor: '#000',
                                            },
                                            done: {
                                                color: '#000',
                                            },
                                        }}
                                        items={selectData}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.SearchFormSelectWrapper}>
                            <Ionicons name={'ios-search'} size={26} />
                            <TouchableOpacity
                                style={styles.findButton}
                                onPress={findRoomHandler}
                            >
                                <Text style={styles.findButtonText}>
                                    Find room
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.articleWrapper}>
                    {context.fetchedAllArticles ? (
                        <ImageCarousel />
                    ) : (
                        <Loader />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const HomeLogoTitle = props => {
    return <Text style={styles.headerTitle}>Rixos Hotel</Text>;
};

const SearchLogoTitle = props => {
    return (
        <View style={styles.searchHeader}>
            <Ionicons name={'ios-search'} color={'#fff'} size={26} />
            <Text style={styles.headerTitle}>Results</Text>
        </View>
    );
};

const RoomInfoLogoTitle = props => {
    return (
        <View style={styles.searchHeader}>
            <Ionicons name={'ios-search'} color={'#fff'} size={26} />
            <Text style={styles.headerTitle}>Details</Text>
        </View>
    );
};

export const HomeScreen = () => {
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name={'Home'}
                component={HomeScreenBody}
                options={{
                    headerTitle: props => <HomeLogoTitle {...props} />,
                    headerStyle: { backgroundColor: '#000' },
                }}
            />
            <HomeStack.Screen
                name={'SearchResults'}
                component={SearchResultsScreen}
                options={{
                    headerTitle: props => <SearchLogoTitle {...props} />,
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
            <HomeStack.Screen
                name={'RoomInfo'}
                component={RoomInfoScreen}
                options={{
                    headerTitle: props => <RoomInfoLogoTitle {...props} />,
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
            <HomeStack.Screen
                name={'ArticleInfo'}
                component={ArticleInfoScreen}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
        </HomeStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    headerTitle: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    mainTitleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitleText: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
    },
    searchFormWrapper: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    searchFormLabel: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    searchFormItem: {
        marginBottom: 20,
        width: 300,
    },
    SearchFormSelect: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 20,
        width: 265,
        padding: 11,
        marginLeft: 15,
    },
    SearchFormSelectWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    findButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 11,
        borderWidth: 1,
        borderRadius: 20,
        width: 265,
        marginLeft: 15,
        backgroundColor: '#000',
    },
    findButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 15,
        width: 200,
        textAlign: 'center',
    },
    findRoomForm: {
        flex: 1,
        padding: 20,
    },
    articleWrapper: {
        flex: 1,
        height: 300,
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
