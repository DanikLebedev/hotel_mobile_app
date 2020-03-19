import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../context/client.context';
import { config } from '../../../config';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';

import Constants from 'expo-constants';

export const RoomInfoScreen = () => {
    const [roomId, setRoomId] = useState('');
    const navigationState = useNavigationState(state => state.routes);

    const checkParams = () => {
        const paramObj = navigationState.filter(({ params }) => {
            return params !== undefined ? params['roomId'] : params;
        });
        setRoomId(paramObj[0].params['roomId']);
        console.log(roomId);
    };

    const roomInfo = useContext(ClientContext).fetchedAllRooms.filter(room => {
        return room._id === roomId;
    });

    useEffect(() => {
        checkParams();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.wrapper}>
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
                                    name={'ios-cash'}
                                    color={'#000'}
                                    size={20}
                                />
                                <Text style={styles.featuresItemText}>
                                    Price:{' '}
                                    {roomInfo[0] ? roomInfo[0].price : null}$
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
                                    {roomInfo[0] ? roomInfo[0].guests : null}
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
                                    {roomInfo[0] ? roomInfo[0].area : null} m2
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
                        </View>
                        <View style={styles.descriptionWrapper}>
                            <Text style={styles.descriptionTitle}>
                                Description
                            </Text>
                            <Text>
                                {roomInfo[0] ? roomInfo[0].description : null}
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Amet atque corporis cupiditate
                                enim facilis officia officiis possimus, quos,
                                repudiandae, tempora ullam unde? Atque,
                                consectetur consequatur cum deserunt dolores ea
                            </Text>
                        </View>
                        <View style={styles.bookForm}>
                            <Input placeholder={'checkIn'}/>
                            <Input placeholder={'checkIn'}/>
                            <Input placeholder={'checkIn'}/>
                            <Button title={'book'}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    featuresItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
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
        flex: 1
    }
});
