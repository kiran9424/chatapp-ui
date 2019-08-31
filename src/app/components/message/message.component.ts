import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { PeopleService } from 'src/app/services/people.service';
import io from 'socket.io-client';
import { CaretEvent, EmojiEvent } from "ng2-emoji-picker";


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {

  public eventMock;
  public eventPosMock;

  public direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
  public toggled = false;
  public content = ' ';

  private _lastCaretEvent: CaretEvent;

  textMessage: any;
  user: any;
  messagesArray = [];
  socket: any;
  singleUser: any
  typingMessage: any;
  typing = false;
  constructor(private tokenService: TokenService,
    private activeRoute: ActivatedRoute,
    private messageService: MessageService,
    private peopleService: PeopleService) {
    this.socket = io('http://localhost:8080')
  }

  ngOnInit() {
    this.user = this.tokenService.getDecodedToken().data;
    this.activeRoute.params.subscribe((param) => {
      this.getUserByName(param.name);
      this.socket.on('refreshPage', () => {
        this.getUserByName(param.name);
      })
    })
    this.socket.on('is_typing', (data) => {
      if (data.sender === this.singleUser.username) {
        this.typing = true;
      }
    })
    //has_stopped_typing
    this.socket.on('has_stopped_typing', (data) => {
      if (data.sender === this.singleUser.username) {
        this.typing = false;
      }
    })
  }

  ngAfterViewInit() {
    const params = {
      room1: this.user.username,
      room2: this.singleUser.username
    }
    this.socket.emit('join chat', params)
  }


  getUserByName(name) {
    this.peopleService.getPeopleByUserName(name).subscribe(
      (data) => {
        this.singleUser = data.user;
        console.log(data.user);

        this.getAllMessages(this.user._id, data.user._id);
      })
  }
  getAllMessages(senderId, receiverId) {
    this.messageService.getAllMessages(senderId, receiverId).subscribe(
      (data) => {
        this.messagesArray = data.message.messages;

      }, () => { })

  }
  sendMessage() {
    if (this.textMessage) {
      this.messageService.SendMessage(this.user._id, this.singleUser._id, this.singleUser.username, this.textMessage).subscribe(
        (data) => {
          this.socket.emit('refresh', {});
          this.textMessage = '';
        })
    }

  }

  handleSelection(event: EmojiEvent) {
    this.content = this.content.slice(0, this._lastCaretEvent.caretOffset) + event.char + this.content.slice(this._lastCaretEvent.caretOffset);
    this.eventMock = JSON.stringify(event);
    this.textMessage = this.content;
    this.toggled != this.toggled;
    this.content = ''
  }

  handleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;
    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
  }
  Toggled(){
    this.toggled = !this.toggled;
  }

  isTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.singleUser.username
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }
    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.singleUser.username
      })
    }, 500)
  }

  

}
