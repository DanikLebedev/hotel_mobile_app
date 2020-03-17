// import { AsyncStorage } from 'react-native';
//
// export const deviceStorage = {
//     async saveItem(token, userId, userEmail) {
//         try {
//             await AsyncStorage.setItem('@token', token);
//             await AsyncStorage.setItem('@userId', userId);
//             await AsyncStorage.setItem('@userEmail', userEmail);
//         } catch (e) {
//             console.log(e.message);
//         }
//     },
//
//     async getItem(key) {
//         try {
//             const value = await AsyncStorage.getItem(key);
//             if(value !== null) {
//                 return value
//             }
//         } catch (e) {
//             console.log(e.message)
//         }
//     }
// };

import { useCallback, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

interface Storage {
    token: string;
    userId: string;
    status: string;
    email: string;
}

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userStatus, setUserStatus] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const loginUser = useCallback(async (jwtToken, id, status, email) => {
        setToken(jwtToken);
        setUserId(id);
        setUserStatus(status);
        setUserEmail(email);
       await AsyncStorage.setItem(storageName, JSON.stringify({
           token: jwtToken,userId: id, userStatus: status, userEmail: email
       }))
    }, []);
    const logoutUser = useCallback(async () => {
        setToken(null);
        setUserId(null);
        setUserStatus('');
        setUserEmail('');
        await AsyncStorage.removeItem(storageName);
        }, []);

    useEffect(() => {
        AsyncStorage.getItem(storageName).then(data => {
            console.log(data)
            if (data) {
                const userData = JSON.parse(data)
                if (userData && userData.token) {{
                    loginUser(userData.token, userData.userId, userData.status, userData.email)
                }}
            }
        })

    }, [loginUser]);

    return { loginUser, logoutUser, token, userId, userStatus, userEmail };
};

