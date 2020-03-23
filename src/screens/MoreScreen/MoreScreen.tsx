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
import { ArticleListScreen } from '../ArticleListScreen/ArticleListScreen';
import { ArticleInfoScreen } from '../ArticleInfoScreen/ArticleInfoScreen';
import { ListItem } from 'react-native-elements';

export const MoreScreenBody = ({ navigation }) => {
    const list = [
        {
            title: 'All Rooms',
            icon: 'ios-bed',
            navigate: () => navigation.navigate('RoomList'),
        },
        {
            title: 'All Articles',
            icon: 'ios-clipboard',
            navigate: () => navigation.navigate('ArticleList'),
        },
        {
            title: 'About Us',
            icon: 'ios-business',
            navigate: () => navigation.navigate('AboutUs'),
        },
    ];
    return (
        <View style={styles.container}>
            {list.map((item, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => item.navigate()}>
                        <ListItem
                            title={item.title}
                            leftIcon={<Ionicons name={item.icon} size={26} />}
                            bottomDivider={true}
                            chevron={true}
                        />
                    </TouchableOpacity>
                );
            })}
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
            <MoreStack.Screen
                name={'ArticleList'}
                component={ArticleListScreen}
                options={{
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
            <MoreStack.Screen
                name={'ArticleInfo'}
                component={ArticleInfoScreen}
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
        height: '100%',
        backgroundColor: '#fff',
    },
});
