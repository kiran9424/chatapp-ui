import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  hideNav:any;
  constructor() { }

  ngOnInit() {
    this.hideNav = document.querySelector('.nav-content')
  }

  ngAfterViewInit(){
    this.hideNav.style.display = 'none';
  }

}
