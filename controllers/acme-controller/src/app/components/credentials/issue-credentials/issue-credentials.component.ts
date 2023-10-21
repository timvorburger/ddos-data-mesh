import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ConnectionStatus } from 'src/app/enums/connection-status';
import { Connection } from 'src/app/models/connection';
import { Attribute } from 'src/app/models/credential';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-issue-credentials',
  templateUrl: './issue-credentials.component.html',
  styleUrls: ['./issue-credentials.component.scss']
})
export class IssueCredentialsComponent {
  testAttributes: Attribute[]
  connections: Connection[]

  constructor(private agentService: AgentService){}

  ngOnInit() {
    this.testAttributes = [
      {name: "test", value: "value1", mimeType: ""},
      {name: "test1", value: "value1", mimeType: ""},
      {name: "test2", value: "value1", mimeType: ""},
      {name: "test3", value: "value1", mimeType: ""}
    ]
    this.agentService.getConnections().pipe(
      map((connections: Connection[]) => this.connections = connections.filter((connection: Connection) => connection.state === ConnectionStatus.ACTIVE))
      ).subscribe();
  }

}
