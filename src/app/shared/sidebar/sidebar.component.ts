import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() getUser : EventEmitter<any> = new EventEmitter<any>();

  @Input() dataUser : any;
  @Input() identify : String;
  
  public IMAGE = environment.IMAGE;

  constructor() { }

  ngOnInit(): void {
  }

  _itemUser(item) {
    this.getUser.emit(item);
  }

}
