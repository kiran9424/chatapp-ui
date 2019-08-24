import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }

    signup(data): Observable<any> {
        return this.http.post('/api/chatapp/signup', data);
    }

    signin(data): Observable<any> {
        return this.http.post('/api/chatapp/signin', data);
    }
}