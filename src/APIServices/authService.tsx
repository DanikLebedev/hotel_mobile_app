import { UserData } from '../interfaces/clientInterfaces';
import { CRUDServices } from './CRUDServices';
import { config } from '../../config';

export class AuthService {
    public static async loginUser(body: {}, headers?: {}): Promise<UserData> {
        const response: UserData = await CRUDServices.postData(
            config.API_URL + '/api/auth/login',
            body,
            headers,
        );
        return response;
    }

    public static async registerUser(
        body: {},
        headers?: {},
    ): Promise<UserData> {
        const response: UserData = await CRUDServices.postData(
            config.API_URL + '/api/auth/register',
            body,
            headers,
        );
        return response;
    }

    public static async loginAdmin(body: {}, headers?: {}): Promise<UserData> {
        const response: UserData = await CRUDServices.postData(
            '/api/admin/login',
            body,
            headers,
        );
        return response;
    }
}
