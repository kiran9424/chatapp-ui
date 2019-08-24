import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { PeopleService } from 'src/app/services/people.service';
import io from 'socket.io-client'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  user: any;
  following = [];
  socket: any;
  constructor(private tokenService: TokenService, private peopleService: PeopleService) {
    this.socket = io('http://localhost:8080');
  }

  ngOnInit() {
    this.user = this.tokenService.getDecodedToken().data;
    this.getUserById();
    this.socket.on('refreshPage', () => {
      this.getUserById();
    })
  }

  getUserById() {
    this.peopleService.getPeopleById(this.user._id).subscribe(
      (data) => {
        this.following = data.user.following;
      }, () => {

      })
  }

  unFollowUser(user) {
    this.peopleService.unFollowUser(user._id).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
      },
      () => {

      })
  }

}
