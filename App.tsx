import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Navigation } from './src/components/Navigation/Navigation';
import { useAuth } from './src/hooks/deviceStorage';
import { ClientContext } from './src/context/client.context';
import { useCallback, useEffect, useState } from 'react';
import {
    Article,
    Category,
    Customer,
    Room,
} from './src/interfaces/clientInterfaces';
import { RoomService } from './src/APIServices/roomService';
import { ArticleService } from './src/APIServices/articleService';
import { CategoryService } from './src/APIServices/categoryService';
import { CustomerService } from './src/APIServices/customerService';

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
    const [fetchedAllRooms, setFetchedAllRooms] = useState<Room[]>([]);
    const [fetchedAllArticles, setFetchedAllArticles] = useState<Article[]>([]);
    const [fetchedAllCategories, setFetchedAllCategories] = useState<
        Category[]
    >([]);
    const [fetchedUserInfo, setFetchedUserInfo] = useState<Customer>({
        email: '',
        lastName: '',
        name: '',
        order: [],
        password: '',
    });

    const fetchCustomerInfo: CallableFunction = useCallback(async () => {
        const customer: Customer = await CustomerService.getCustomer({
            Authorization: `Bearer ${token}`,
        });
        setFetchedUserInfo(customer);
    }, [token]);

    const fetchAllRooms = useCallback(() => {
        RoomService.getAllRooms().then(({ rooms }) =>
            setFetchedAllRooms(rooms),
        );
    }, []);

    const fetchAllArticles = useCallback(() => {
        ArticleService.getAllArticles().then(({ article }) => {
            setFetchedAllArticles(article);
        });
    }, []);

    const fetchAllCategories = useCallback(() => {
        CategoryService.getAllCategories().then(({ categories }) => {
            setFetchedAllCategories(categories);
        });
    }, []);

    useEffect(() => {
        fetchAllRooms();
        fetchAllArticles();
        fetchAllCategories();
        fetchCustomerInfo();
    }, [fetchAllRooms, fetchAllArticles, fetchAllCategories]);

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
                fetchedAllRooms,
                fetchedAllArticles,
                fetchedAllCategories,
                fetchedUserInfo,
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
