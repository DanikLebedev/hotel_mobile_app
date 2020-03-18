import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../../screens/ProfileScreen/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { BookingsScreen } from '../../screens/BookingsScreen/BookingsScreen';
import { MoreScreen } from '../../screens/MoreScreen/MoreScreen';

export const Navigation = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#fff"
                barStyle={{ backgroundColor: '#000' }}
            >
                <Tab.Screen
                    name={'Home'}
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name={'Profile'}
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <Ionicons
                                name="ios-person"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name={'Bookings'}
                    component={BookingsScreen}
                    options={{
                        tabBarLabel: 'Bookings',
                        tabBarIcon: ({ color }) => (
                            <Ionicons
                                name="ios-briefcase"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name={'More'}
                    component={MoreScreen}
                    options={{
                        tabBarLabel: 'More',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-more" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
