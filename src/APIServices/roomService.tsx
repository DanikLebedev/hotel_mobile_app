import { CRUDServices } from './CRUDServices';
import { Data, Rooms } from '../interfaces/clientInterfaces';
import { config } from '../../config';

export class RoomService {
    public static async getAllRooms(): Promise<Rooms> {
        const rooms: Rooms = await CRUDServices.getData(
            config.API_URL + '/api/admin/room',
        );
        return rooms;
    }

    public static async postRoom(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData(
            '/api/admin/room',
            body,
            headers,
        );
        return response;
    }

    public static async getRoomById(id: string | undefined): Promise<Rooms> {
        const rooms: Rooms = await CRUDServices.getData(
            config.API_URL + `/api/client/rooms/${id}`,
        );
        return rooms;
    }

    public static async deleteRoom(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData(
            '/api/admin/room/delete',
            body,
            headers,
        );
        return response;
    }

    public static async updateRoom(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData(
            '/api/admin/room/update',
            body,
            headers,
        );
        return response;
    }
}
