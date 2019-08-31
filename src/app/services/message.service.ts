import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(private http: HttpClient) { }

    SendMessage(senderId, receiverId, receiverName, textMessage): Observable<any> {
        return this.http.post(`/api/chatapp/sendmessage/${senderId}/${receiverId}`,
            { receiverId, receiverName, textMessage }
        )
    }

    getAllMessages(senderId, receiverId): Observable<any> {
        return this.http.get(`/api/chatapp/sendmessage/${senderId}/${receiverId}`);
    }
}