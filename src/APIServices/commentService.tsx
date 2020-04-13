import { CRUDServices } from './CRUDServices';
import {
    Data,
    Feedbacks,
    Comment,
    Comments,
} from '../interfaces/clientInterfaces';
import { config } from '../../config';

export class CommentService {
    public static async getAllComments(): Promise<Comments> {
        const comments: Comments = await CRUDServices.getData(
            config.API_URL + '/api/client/comment',
        );
        return comments;
    }

    public static async postComment(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.postData(
            config.API_URL + '/api/client/comment/add',
            body,
            headers,
        );
        return response;
    }

    public static async deleteComment(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.deleteData(
            config.API_URL+ '/api/client/comment/delete',
            body,
            headers,
        );
        return response;
    }

    public static async updateComment(body: {}, headers?: {}): Promise<Data> {
        const response: Data = await CRUDServices.putData(
            config.API_URL + '/api/client/comment/update',
            body,
            headers,
        );
        return response;
    }
}
