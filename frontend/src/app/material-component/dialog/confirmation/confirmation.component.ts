import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  onEmitStatusChange = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

}
