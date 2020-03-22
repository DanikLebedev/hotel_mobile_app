import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RoomListScreen } from '../RoomListScreen/RoomListScreen';
import { RoomInfoScreen } from '../RoomInfoScreen/RoomInfoScreen';

export const MoreScreenBody = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.infoContent}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RoomList')}
                        >
                            <Text style={styles.info}>
                                <Ionicons
                                    name={'ios-bed'}
                                    size={26}
                                    color={'#fff'}
                                />{' '}
                                All Rooms
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.infoContent}>
                        <TouchableOpacity>
                            <Text style={styles.info}>
                                <Ionicons
                                    name={'ios-clipboard'}
                                    size={26}
                                    color={'#fff'}
                                />{' '}
                                All Articles
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.infoContent}>
                        <TouchableOpacity style={styles.infoContentWrapper}>
                            <View>
                                <Text style={styles.info}>
                                    {' '}
                                    <Ionicons
                                        name={'ios-business'}
                                        size={26}
                                        color={'#fff'}
                                    />{' '}
                                    About Us
                                </Text>
                            </View>
                            <View>
                                {/*<Ionicons*/}
                                {/*    name={'ios-arrow-forward'}*/}
                                {/*    size={26}*/}
                                {/*    color={'#fff'}*/}
                                {/*/>*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export const MoreScreen = () => {
    const MoreStack = createStackNavigator();
    return (
        <MoreStack.Navigator>
            <MoreStack.Screen
                name={'More'}
                component={MoreScreenBody}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
            <MoreStack.Screen
                name={'RoomList'}
                component={RoomListScreen}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
            <MoreStack.Screen
                name={'RoomInfo'}
                component={RoomInfoScreen}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
        </MoreStack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#000',
    },
    body: {
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    item: {
        flexDirection: 'row',
        marginTop: 20,
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    infoContentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
