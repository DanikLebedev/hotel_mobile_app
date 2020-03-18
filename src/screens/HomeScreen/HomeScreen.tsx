import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClientContext } from '../../context/client.context';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { Themed } from 'react-navigation';

const HomeScreenBody = ({ navigation }) => {
    const context = useContext(ClientContext);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | number>(
        '',
    );

    const checkInPicker = (
        <DatePicker
            style={{ width: 300 }}
            date={checkIn}
            mode="date"
            placeholder="select date"
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
            placeholder="select date"
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.mainTitleWrapper}>
                    <Text style={styles.mainTitleText}>
                        Welcome to our hotel!
                    </Text>
                </View>
                <View style={styles.searchFormWrapper}>
                    <View style={styles.searchFormItem}>
                        <Text style={styles.searchFormLabel}>Check In</Text>
                        {checkInPicker}
                    </View>
                    <View style={styles.searchFormItem}>
                        <Text style={styles.searchFormLabel}>Check Out</Text>
                        {checkOutPicker}
                    </View>
                    <View style={styles.searchFormItem}>
                        <Text style={styles.searchFormLabel}>Category</Text>
                        <View style={styles.SearchFormSelectWrapper}>
                            <Ionicons name={'ios-list'} size={26} />
                            <View style={styles.SearchFormSelect}>
                                <RNPickerSelect
                                    onValueChange={value => console.log(value)}
                                    style={{
                                        placeholder: {
                                            textAlign: 'center'
                                        },
                                        modalViewTop: {
                                            backgroundColor: '#00000077'
                                        },
                                        modalViewBottom: {
                                            backgroundColor: '#000',
                                        },
                                       done: {
                                            color: '#000'
                                       }

                                    }}
                                    items={[
                                        {
                                            label: 'President',
                                            value: 'President',
                                            color: '#fff'
                                        },
                                        { label: 'Family', value: 'President', color: '#fff' },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const LogoTitle = props => {
    return <Text style={styles.headerTitle}>Rixos Hotel</Text>;
};

export const HomeScreen = () => {
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name={'Home'}
                component={HomeScreenBody}
                options={{
                    headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: '#000' },
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
    scrollView: {
        marginHorizontal: 20,
    },
    headerTitle: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
    },
    mainTitleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitleText: {
        color: '#000',
        fontSize: 20,
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
        width: '100%',
    },
    SearchFormSelect: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 20,
        width: 265,
        padding: 11,
        marginLeft: 15
    },
    SearchFormSelectWrapper: {
       flexDirection: 'row',
        alignItems: 'center'
    }
});
