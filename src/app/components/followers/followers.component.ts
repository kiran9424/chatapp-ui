import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { PeopleService } from 'src/app/services/people.service';
import io from 'socket.io-client'

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  followers = [];
  user: any;
  socket:any;
  constructor(private tokenService: TokenService, private peopleService: PeopleService) { 
    this.socket = io('http://localhost:8080');
  }

  ngOnInit() {
    this.user = this.tokenService.getDecodedToken().data;
    this.getFollowers();
    this.socket.on('refreshPage',()=>{
      this.getFollowers();
    })
  }

  getFollowers() {
    this.peopleService.getPeopleById(this.user._id).subscribe(
      (data) => {
        this.followers = data.user.followers;
      },
      () => {

      })
  }

}
