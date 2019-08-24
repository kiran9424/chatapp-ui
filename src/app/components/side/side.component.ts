import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { PeopleService } from 'src/app/services/people.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  user: any;
  userData = [];
  socket: any;
  constructor(private tokenService: TokenService, private peopleService: PeopleService) {
    this.socket = io('http://localhost:8080')
  }

  ngOnInit() {
    
    this.user = this.tokenService.getDecodedToken().data;
    this.getUsersData();
    this.socket.on('refreshPage', () => {
      this.getUsersData();
    })
  }

  getUsersData() {
    this.peopleService.getPeopleById(this.user._id).subscribe(
      (data) => {
        this.userData = data.user;
      }, () => {

      })
  }

}
