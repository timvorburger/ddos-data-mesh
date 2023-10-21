import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ConnectionStatus } from 'src/app/enums/connection-status';
import { Connection } from 'src/app/models/connection';
import { Attribute } from 'src/app/models/credential';
import { Schema } from 'src/app/models/schema';
import { AgentService } from 'src/app/services/agent.service';
import {
  createAttributesFromSchema,
  getSchemaMetas,
} from 'src/app/shared/helpers/schemaHelpers';

@Component({
  selector: 'app-issue-credentials',
  templateUrl: './issue-credentials.component.html',
  styleUrls: ['./issue-credentials.component.scss'],
})
export class IssueCredentialsComponent {
  schemaAttributes: Attribute[];
  testAttributes: Attribute[];
  connections: Connection[];
  schemas: Schema[];
  selectedSchema: Schema;
  selectedSchemaId: string;
  credDefId: string;
  submitDisabled: boolean = true;

  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.agentService
      .getConnections()
      .pipe(
        map(
          (connections: Connection[]) =>
            (this.connections = connections.filter(
              (connection: Connection) =>
                connection.state === ConnectionStatus.ACTIVE
            ))
        )
      )
      .subscribe();

    this.agentService
      .getSchemas()
      .pipe(
        map((schemaIds: any) => {
          this.schemas = getSchemaMetas(schemaIds);
        })
      )
      .subscribe();
  }

  handleChange($event: Event) {
    const htmlElement = $event.target as HTMLSelectElement;
    this.selectedSchemaId = htmlElement.value;

    this.agentService
      .getCredentialDefinitions(this.selectedSchemaId)
      .pipe(
        map((cred_ids: string[]) => {
          this.credDefId = cred_ids[0];
        })
      )
      .subscribe();
    this.agentService
      .getSchema(this.selectedSchemaId)
      .pipe(
        map((el: string[]) => {
          this.schemaAttributes = createAttributesFromSchema(el);
          console.log(this.selectedSchema)
        })
      )
      .subscribe();
  }
}
