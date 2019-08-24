import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class TokenService {
    constructor(private cookie: CookieService) { }

    setToken(token) {
        this.cookie.set('chat_token', token);
    }

    getToken() {
        return this.cookie.get('chat_token');
        
    }

    deleteToken() {
        return this.cookie.delete('chat_token');
    }

    getDecodedToken(){
        const token = this.getToken();
        let decodedToken;
        if(token){
            decodedToken = token.split('.')[1];
            decodedToken = JSON.parse(window.atob(decodedToken));
        }
        return decodedToken;
    }
}