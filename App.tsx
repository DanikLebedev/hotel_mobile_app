import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Navigation } from './src/components/Navigation/Navigation';
import { useAuth } from './src/deviceStorage';
import { ClientContext } from './src/context/client.context';
import { useCallback, useEffect, useState } from 'react';
import { Room } from './src/interfaces/clientInterfaces';
import { RoomService } from './src/APIServices/roomService';

export default function App() {
    const {
        loginUser,
        logoutUser,
        token,
        userId,
        userEmail,
        userStatus,
    } = useAuth();
    const isAuthenticated = !!token;
    const [fetchedAllRooms, setFetchedAllRooms] = useState<Room[]>()

    const fetchAllRooms = useCallback(() => {
        RoomService.getAllRooms().then(({rooms}) => setFetchedAllRooms(rooms))
    }, [])

    useEffect(() => {
        fetchAllRooms()
    }, [fetchAllRooms])

    return (
        <ClientContext.Provider
            value={{
                token,
                loginUser,
                logoutUser,
                userId,
                userEmail,
                userStatus,
                isAuthenticated,
                fetchedAllRooms
            }}
        >
            <StatusBar barStyle={'light-content'} />
            <Navigation />
        </ClientContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cdcdcd',
    },
});
