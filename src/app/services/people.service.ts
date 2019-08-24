import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeopleService {

    constructor(private http: HttpClient) { }

    getAllPeople(): Observable<any> {
        return this.http.get('/api/chatapp/people')
    }

    followUser(userFollowed): Observable<any> {
        return this.http.post('/api/chatapp/followuser', { userFollowed });
    }

    unFollowUser(userFollowed): Observable<any> {
        return this.http.post('/api/chatapp/unfollowuser', { userFollowed })
    }

    getPeopleById(id): Observable<any> {
        return this.http.get(`/api/chatapp/people/${id}`);
    }

    getPeopleByUserName(username): Observable<any> {
        return this.http.get(`/api/chatapp/peoplename/${username}`);
    }

    markNotificationAsReadOrDelete(id, deleteNotifcation?): Observable<any> {
        return this.http.post(`/api/chatapp/marknotification/${id}`, { id, deleteNotifcation });
    }

    markAllAsRead(): Observable<any> {
        return this.http.post('/api/chatapp/markallasread', { all: true });
    }
}