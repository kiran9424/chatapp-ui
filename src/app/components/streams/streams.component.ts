import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  token: any;
  streams = false;
  topStreams = false;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.streams = true;
    this.token = this.tokenService.getDecodedToken();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});

  }

  changeTabs(value) {
    if (value === 'streams') {
      this.streams = true;
      this.topStreams = false;
    }

    if (value === 'topStreams') {
      this.streams = false;
      this.topStreams = true;
    }
  }



}
