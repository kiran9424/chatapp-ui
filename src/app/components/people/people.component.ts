import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import _ from 'lodash'
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  peoples = [];
  loggedInUser: any;
  users = [];
  socket: any;
  constructor(private peopleService: PeopleService, private tokenService: TokenService) {
    this.socket = io('http://localhost:8080')
  }

  ngOnInit() {

    this.loggedInUser = this.tokenService.getDecodedToken().data;
    this.getAllPeople();
    this.getPeopleById();

    this.socket.on("refreshPage",(data)=>{
      this.getAllPeople();
    this.getPeopleById();
    })
  }


  getAllPeople() {
    this.peopleService.getAllPeople().subscribe(
      (data) => {
        _.remove(data.message, { username: this.loggedInUser.username })
        this.peoples = data.message;
      },
      () => {

      })
  }

  followUser(user) {
    this.peopleService.followUser(user._id).subscribe(
      (newuser) => {
        this.socket.emit('refresh', {});
        console.log(newuser);

      },
      () => {

      })

  }

  getPeopleById() {
    this.peopleService.getPeopleById(this.loggedInUser._id).subscribe(
      (data) => {
        this.users = data.user.following;

      }, () => {

      })
  }

  checkIfUserIsFollowing(arr, id) {
    const result = _.find(arr, ['userFollowed._id', id]);
    if (result) {
      return true;
    }
    return false;
  }

}
