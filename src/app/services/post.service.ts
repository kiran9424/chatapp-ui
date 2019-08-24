import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class PostService {

    constructor(private http: HttpClient) { }

    addPost(data): Observable<any> {
        return this.http.post('/api/chatapp/post', data);
    }

    getAllPosts(): Observable<any> {
        return this.http.get('/api/chatapp/post');
    }

    timeFormat(time) {
        return moment(time).fromNow();
    }

    postLike(data): Observable<any> {
        return this.http.post('/api/chatapp/postlike', data);
    }

    addComment(postId, data): Observable<any> {
        return this.http.post(`/api/chatapp/postcomment/`, { postId, data });
    }

    getSinglePost(postId): Observable<any> {
        return this.http.get(`/api/chatapp/post/${postId}`);
    }
}