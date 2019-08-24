import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css'
import { PeopleService } from 'src/app/services/people.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: any;
  notifications = [];
  socket: any;
  count =[];
  constructor(private tokenService: TokenService, private router: Router, private peopleService: PeopleService) {

    this.socket = io('http://localhost:8080')
  }

  ngOnInit() {
    this.user = this.tokenService.getDecodedToken().data;
    const element = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(element, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    });

    this.getNotifications();

    this.socket.on('refreshPage',()=>{
      this.getNotifications();
    })

  }

  logout() {
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

  backToHomePage() {
    this.router.navigate(['/streams']);
  }

  getNotifications() {
    this.peopleService.getPeopleByUserName(this.user.username).subscribe(
      (data) => {
        this.notifications = data.user.notifications.reverse();
        const value = _.filter(this.notifications,['read',false]);
        this.count = value;
      }, (err) => {
        if(err.error.token === null){
          this.tokenService.deleteToken();
          this.router.navigate(['/']);
        }
      })
  }

  timeFormatter(time) {
    return moment(time).fromNow();
  }

  markAllAsRead() {
    this.peopleService.markAllAsRead().subscribe(
      (data) => {
        this.socket.emit('refresh', {})
      })
  }
}
