import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { PeopleService } from 'src/app/services/people.service';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  user: any;
  notifications = [];
  socket: any;
  constructor(private token: TokenService, private peopleService: PeopleService) {
    this.socket = io('http://localhost:8080');
  }

  ngOnInit() {
    this.user = this.token.getDecodedToken().data;
    this.getUserByName();
    this.socket.on('refreshPage', () => {
      this.getUserByName();
    })

  }

  getUserByName() {
    this.peopleService.getPeopleByUserName(this.user.username).subscribe(
      (data) => {
        this.notifications = data.user.notifications.reverse();
      },
      () => {

      });
  }

  timeFormatter(time) {
    return moment(time).fromNow();
  }

  markAsRead(data) {
    this.peopleService.markNotificationAsReadOrDelete(data._id).subscribe(
      (result) => {
        this.socket.emit('refresh', {});
      },
      () => {

      });

  }

  deleteNotification(data) {
    this.peopleService.markNotificationAsReadOrDelete(data._id, true).subscribe(
      (result) => {
        this.socket.emit('refresh', {})
      }, () => {

      })
  }

}
