import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { ConnectionStatus } from 'src/app/enums/connection-status';
import { Connection } from 'src/app/models/connection';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.scss']
})
export class ConnectionListComponent {
  connections: any[] = [];

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.agentService.getConnections().pipe(
      map((connections: Connection[]) => {
        return connections.filter((connection: Connection) => connection.state === ConnectionStatus.ACTIVE || connection.state === ConnectionStatus.REQUESTED)
      })
    )
  }

  onRemoveConnection(connection: any) {
    this.agentService.removeConnection(connection.connection_id)
      .pipe(
        filter((connectionId: string) => !!connectionId),
        map((connectionId: string) =>
          this.connections = this.connections.filter((conn: any) => conn.connection_id !== connectionId))
      )
      .subscribe();
  }
}
