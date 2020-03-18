import { createContext } from 'react';
import { Room } from '../interfaces/clientInterfaces';

export interface ClientContext {
    token: string | null;
    userId: string | null;
    loginUser: (jwtToken: any, id: any, status: any, email: any) => void;
    logoutUser: () => void;
    isAuthenticated: boolean;
    userStatus: string;
    userEmail: string;
    fetchedAllRooms: Room[]
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
});
