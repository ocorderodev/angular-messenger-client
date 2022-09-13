import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/models/User';
import { Message } from 'src/app/models/Message';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  @ViewChild('scroll', { static : false }) private myScroll : ElementRef;

  public user = new User('','','','','','','','','',false);
  public message = new Message('','','','');

  public dataUser = [];
  public IMAGE = environment.IMAGE;
  public IDENTIFY = environment.IDENTIFY;
  public messages = [];
  public identify : String;
  public imageProfile : String;
  public socket = io(environment.SOCKET);

  constructor(
    private userService : UserService,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.identify = JSON.parse(localStorage.getItem(this.IDENTIFY));
    this._getUsers();

    this.socket.on('new', function (data) {
      const message = data.message;
      this.messages.push(message);
    }.bind(this));

  }

  _getUsers () {
    this.userService.getUsers().subscribe(
      (res) => {
        this.dataUser = res.data;
      }
    );
  }

  _getItem (item) {
    const userId = item._id;
    this._getUser(userId);
    this._getMessages(userId);
  }

  _getUser(userId) {
    this.userService.getUser(userId).subscribe(
      (res) => {
        if (res.status) {
          this.user = res.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  _getMessages(to) {
    this.messageService.getMessage(this.identify, to).subscribe(
      (res) => {
        this.messages = res.data;
        this.userService.getUser(this.identify).subscribe((data) => {
          this.imageProfile = data.data.image
        });
      }
    );
  }

  _send() {
    this.message.from = this.identify;
    this.message.to = this.user._id;
    this.messageService.send(this.message).subscribe(
      (res) => {
        this.message = new Message('','','','');
        this.socket.emit('send', res.data);
        this._scroll();
      }
    );
  }

  _scroll () {
    try {
      this.myScroll.nativeElement.scrollTop = this.myScroll.nativeElement.scrollHeight;
    } catch (error) {
      
    }
  }

  ngAfterViewChecked() {
    this._scroll();
  }

}
