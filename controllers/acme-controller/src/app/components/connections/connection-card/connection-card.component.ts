import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConnectionStatus } from 'src/app/enums/connection-status';
import { Connection } from 'src/app/models/connection';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss']
})
export class ConnectionCardComponent {
  @Input() connection: Connection;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  ConnectionStatus = ConnectionStatus;


  removeConnection(connection: any) {
    this.remove.emit(connection);
  }

}
