import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RoomListScreen } from '../RoomListScreen/RoomListScreen';
import { RoomInfoScreen } from '../RoomInfoScreen/RoomInfoScreen';
import { ArticleListScreen } from '../ArticleListScreen/ArticleListScreen';
import { ArticleInfoScreen } from '../ArticleInfoScreen/ArticleInfoScreen';
import { ListItem } from 'react-native-elements';
import { AboutUsScreen } from '../AboutUsScreen/AboutUsScreen';

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
            <FlatList
                data={list}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => item.navigate()}
                        >
                            <ListItem
                                title={item.title}
                                containerStyle={{
                                    backgroundColor: '#cdcdcd',
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
                }}
            />
        </View>
    );
};

const RoomInfoLogoTitle = props => {
    return (
        <View style={styles.searchHeader}>
            <Ionicons name={'ios-business'} color={'#fff'} size={26} />
            <Text style={styles.headerTitle}>Details</Text>
        </View>
    );
};
const RoomListLogoTitle = props => {
    return (
        <View style={styles.searchHeader}>
            <Ionicons name={'ios-list'} color={'#fff'} size={26} />
            <Text style={styles.headerTitle}>All Rooms</Text>
        </View>
    );
};

const ArticleInfoLogoTitle = props => {
    return (
        <View style={styles.searchHeader}>
            <Ionicons name={'ios-clipboard'} color={'#fff'} size={26} />
            <Text style={styles.headerTitle}>Details</Text>
        </View>
    );
};

const ArticleListLogoTitle = props => {
    return (
        <View style={styles.searchHeader}>
            <Ionicons name={'ios-list'} color={'#fff'} size={26} />
            <Text style={styles.headerTitle}>Articles</Text>
        </View>
    );
};

const AboutLogoTitle = props => {
    return (
        <View style={styles.searchHeader}>
            <Ionicons name={'ios-albums'} color={'#fff'} size={26} />
            <Text style={styles.headerTitle}>About Us</Text>
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
                    headerTitle: props => <RoomListLogoTitle {...props} />,
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
                    headerTitle: props => <RoomInfoLogoTitle {...props} />,
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
                    headerTitle: props => <ArticleListLogoTitle {...props} />,
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
                    headerTitle: props => <ArticleInfoLogoTitle {...props} />,
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff' },
                    headerBackTitleStyle: { color: '#fff' },
                    headerTintColor: '#fff',
                }}
            />
            <MoreStack.Screen
                name={'AboutUs'}
                component={AboutUsScreen}
                options={{
                    headerTitle: props => <AboutLogoTitle {...props} />,
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
        backgroundColor: '#cdcdcd',
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
