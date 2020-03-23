import { createContext, Dispatch, SetStateAction } from 'react';
import {
    Article,
    Category,
    Customer,
    Order,
    OrderCart,
    Room,
} from '../interfaces/clientInterfaces';

export interface ClientContext {
    token: string | null;
    userId: string | null;
    loginUser: (jwtToken: any, id: any, status: any, email: any) => void;
    logoutUser: () => void;
    isAuthenticated: boolean;
    userStatus: string;
    userEmail: string;
    fetchedAllRooms: Room[];
    fetchedAllArticles: Article[];
    fetchedAllCategories: Category[];
    fetchedUserInfo: Customer;
    orderHistory: OrderCart[];
}

function noop() {}

export const ClientContext = createContext<ClientContext>({
    userStatus: '',
    token: null,
    userId: null,
    loginUser: noop,
    logoutUser: noop,
    isAuthenticated: false,
    userEmail: '',
    fetchedAllRooms: [
        {
            area: 0,
            category: '',
            description: '',
            guests: 0,
            image: '',
            isBooked: false,
            price: 0,
            rooms: 0,
            title: '',
            _id: '',
        },
    ],
    fetchedAllArticles: [{ title: '', image: '', text: '', createdAt: '' }],
    fetchedAllCategories: [{ title: '' }],
    fetchedUserInfo: {
        email: '',
        lastName: '',
        name: '',
        order: [],
        password: '',
    },
    orderHistory: [
        {
            orderId: '',
            status: '',
            userEmail: '',
            category: '',
            checkOut: '',
            checkIn: '',
            _id: '',
            comment: '',
            guests: 0,
            userId: '',
            price: 0,
        },
    ],
});
